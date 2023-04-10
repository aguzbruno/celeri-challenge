import SpinnerGif from '../../assets/spinning-loading.gif';
import Image from 'next/image';

export function Spinner() {
    return (
        <div className="w-auto">
            <Image src={SpinnerGif} alt="spinner" width={260} height={260} />
        </div>
    );
}
