import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>OWLtop - наш лучший топ</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
}
