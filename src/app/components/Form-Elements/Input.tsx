'use client'
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export function Input({
    typeOfInput,
    placeholder,
    label,
    onChange,
    value,
    required,
    className,
    name,
}: {
    typeOfInput: string;
    placeholder: string;
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
    required: boolean;
    className?: string;
    name: string;
}) {
    return (
        <div className={`flex flex-col p-2 ${className}`}>
            {label && (
                <label className={`${inter.className} xl:text-base text-xs `}>
                    {label}
                </label>
            )}
            <input
                className={`border rounded-lg h-12 w-52 sm:w-auto max-w-lg pl-2 xs:pl-4 xl:pl-6 text-xs outline-none placeholder:text-xs placeholder:gray-400${
                    typeOfInput === 'date' ? ' pr-4' : ''
                }`}
                name={name}
                type={typeOfInput}
                required={required}
                value={value || ''}
                onChange={onChange || undefined}
                placeholder={placeholder}
            />
        </div>
    );
}
