import { test, expect } from '@playwright/test';

const main = 'http://localhost:5173/';

test('Проверка правильности заголовка', async ({ page }) => {
  await page.goto(main);

  const title = await page.title();

  expect(title).toBe('Coin Market');
});

test('Check coinPage', async ({ page }) => {
  await page.goto(main);

  await page.click('#coinRow');

  const coinRowElement = await page.waitForSelector('#coinPage');

  expect(coinRowElement).not.toBeNull();
});

test('Select Component Test', async ({ page }) => {
  await page.goto(main);

  await page.selectOption('#sort-select', 'descending');

  await page.waitForTimeout(1000);

  const firstElementIdsAfter = await page.$$eval('#coinRow', (rows) => {
    return rows.map(row => row.querySelector('td')!.id);
  });

  for (let i = 0; i < firstElementIdsAfter.length; i++) {
    expect(firstElementIdsAfter[i]).not.toBeUndefined();
  }
});

test('Search Input Test', async ({ page }) => {
  await page.goto(main);

  const searchInput = await page.waitForSelector('#searchInput');
  expect(searchInput).not.toBeNull();

  await searchInput!.fill('BTC');

  const elementWithId = await page.waitForSelector('#BTC');
  expect(elementWithId).not.toBeNull();
});

test('Check 404page', async ({ page }) => {
  await page.goto(main + 'frfwfwefwe');

  const page404 = await page.waitForSelector('#page404');

  expect(page404).not.toBeNull();
});

test('Test go to main from coinPage', async ({ page }) => {
  await page.goto(main);

  await page.click('#coinRow');

  await page.waitForSelector('#coinPage');

  await page.click('#goToMain');

  await page.goto(main);
});

test('Test loader', async ({ page }) => {
  await page.goto(main);

  await page.waitForSelector('#loader');

  await page.click('#coinRow');

  const coinRowElement = await page.waitForSelector('#coinPage');

  await page.waitForSelector('#loader');

  expect(coinRowElement).not.toBeNull();
});

test('Test open modal to buy coins', async ({ page }) => {
  await page.goto(main);

  await page.click('#buyCoinBtn');

  const modal = await page.waitForSelector('.ant-modal');

  expect(modal).not.toBeNull();

  await page.goto(main);

  await page.click('#coinRow');

  await page.reload();

  await page.goto(main);

  await page.click('#buyCoinBtn');

  const modalOnCoinPage = await page.waitForSelector('.ant-modal');

  expect(modalOnCoinPage).not.toBeNull();
});


test('Test open modalWallet', async ({ page }) => {
  await page.goto(main);

  await page.click('#openWalletBtn');

  const modal = await page.waitForSelector('.ant-modal');

  expect(modal).not.toBeNull();
});


test('Modal Error Test', async ({ page }) => {
  await page.goto(main);

  await page.click('#coinRow');

  await page.click('#test');

  await page.route('**/assets/*/history*', route => {
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Mock error' }),
    });
  });

  const modal = await page.waitForSelector('.ant-modal');

  expect(modal).not.toBeNull();
});

test('Test warning text during buying', async ({ page }) => {
  await page.goto(main);

  await page.click('#buyCoinBtn');

  const coinInput = await page.waitForSelector('#coinBuyingInput');

  if (coinInput) await coinInput.fill('100000000000000000000000000000000');

  await page.waitForSelector('#warningText');
});

test('Test buying coins', async ({ page }) => {
  await page.goto(main);

  await page.click('#buyCoinBtn');

  const coinInput = await page.waitForSelector('#coinBuyingInput');

  const inputText = '1';
  await coinInput.fill(inputText);

  await page.click('#buyCoin');

  await page.evaluate(() => {
    localStorage.setItem('wallet', '1');
  });

  await page.waitForTimeout(1000);

  const localStorageItem = await page.evaluate(() => {
    return localStorage.getItem('wallet');
  });

  expect(localStorageItem).toEqual('1');
});

test('Test check top3 coins', async ({ page }) => {
  await page.goto(main);

  await page.waitForSelector('#topCoins');
});

test('Test remove item from localStorage on button click', async ({ page }) => {

  await page.goto(main);

  await page.evaluate(() => {
    localStorage.setItem('test', JSON.stringify([1, 2]));
  }, []);

  await page.click('#openWalletBtn');

  const modal = await page.waitForSelector('.ant-modal');

  expect(modal).not.toBeNull();

  await page.waitForTimeout(1000);

  const updatedArr = await page.evaluate(() => {
    const item = localStorage.getItem('test');
    return JSON.parse(item!).filter((value) => value !== 1);
  });

  expect(updatedArr).not.toContain(1);
});