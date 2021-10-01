import Document, { Html, Head, Main, NextScript } from 'next/Document'
import { Header } from '../components/header/header.component'
export default class myDocuments extends Document {
    render() {
        return (
            <Html>
                <Head>
                   
                </Head>
                <body>
                    <Main />
                    <NextScript />  
                </body>
            </Html>
        )
    }
}