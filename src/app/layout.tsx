'use client';
import './globals.css';
import { LogoCeleri } from './components/LogoCeleri/LogoCeleri';
import { useStepper } from './store/stepper';
import Head from 'next/head';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isTakingPhoto } = useStepper();
    return (
        <html lang="en">
            <Head>
                <title>Celeri-Challenge</title>
            </Head>
            <body className=" m-auto w-full xl:w-10/12 flex justify-center flex-col items-center  ">
                {!isTakingPhoto ? <LogoCeleri /> : null}
                <main className="w-full sm:p-0 p-4">{children}</main>
            </body>
        </html>
    );
}
