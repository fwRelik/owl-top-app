import { AdvantagesProps } from './Advantages.props';
import styles from './Advantages.module.scss';
import CheckIcon from '../../public/icons/check_mark.svg';

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
	return (
		<div className={styles.advantages}>
			{advantages.map(a => (
				<div key={a._id} className={styles.advantage}>
					<CheckIcon />
					<div className={styles.title}>{a.title}</div>
					<hr className={styles.vline} />
					<div className={styles.description}>{a.description}</div>
				</div>
			))}
		</div>
	);
};
