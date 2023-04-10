import { Inter } from 'next/font/google';
import { CardCuriousData } from './CardCuriousData';
import { Spinner } from './Spinner';

const inter = Inter({ subsets: ['latin'] });
export function SpinnerApi() {
    return (
        <div className="flex justify-center items-center flex-col gap-4">
            <p className={`${inter.className} sm:text-xl font-bold`}>
                Aguardá unos segundos por favor
            </p>
            <Spinner />
            <CardCuriousData />
        </div>
    );
}
