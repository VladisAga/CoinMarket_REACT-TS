import styles from './Topic.module.scss';
import { ITopic } from './topic.props';

const Topic:React.FC<ITopic> = ({children, ...props}) => {
    return (
        <h1 className={styles.topic} {...props}>{children}</h1>
    )
}

export default Topic;