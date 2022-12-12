import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { pageConfig } from '../configs';

export default function App({ Component, pageProps, router }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>{pageConfig.title}</title>
				<meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
				<meta property='twitter:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
				<meta property='og:locale' content='ru_RU'/>
			</Head>
			<Component {...pageProps} />
		</>
	);
}
