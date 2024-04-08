export const toDollar = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
});

export const formatter = new Intl.NumberFormat('en', {
    style: 'decimal'
});