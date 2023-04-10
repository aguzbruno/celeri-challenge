import { Inter } from 'next/font/google';
import Logo from '../../assets/CeleriLogo.svg';
import Image from 'next/image';
const inter = Inter({ subsets: ['latin'] });

export function LogoCeleri() {
    return (
        <Image src={Logo} width={425} height={189} alt="celeri-logo" priority />
    );
}
