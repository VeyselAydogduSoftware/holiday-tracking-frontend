import Head from "next/head";

export default function Header({title, cssFiles, jsFiles}) {

    return (

        <Head>
            <title> {title ? title : 'Annual Leave Tracking App'} </title>
            <meta property="og:title" content={title ? title : 'Annual Leave Tracking App'}  key="title" />
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>

    )


}