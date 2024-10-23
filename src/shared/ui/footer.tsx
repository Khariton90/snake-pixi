import styles from './footer.module.css'

export function Footer(): JSX.Element {
	return (
		<footer className={styles.footer}>
			<a className='link' href='https://github.com/Khariton90' target='_blank'>
				Разработал Khariton90
			</a>
		</footer>
	)
}
