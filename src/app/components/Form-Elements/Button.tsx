'use client'
import { Inter } from 'next/font/google';
import { FormEvent } from 'react';
const inter = Inter({ subsets: ['latin'] });
export function Button({
    cssButton,
    type,
    text,
    handleClick,
    handleSubmit,
    size,
    className,
}: {
    cssButton: string;
    type: 'button' | 'submit' | 'reset' | undefined;
    text: string;
    handleClick?: (e: FormEvent) => void;
    handleSubmit?: (e: FormEvent) => void;
    size?: 'small' | 'medium' | 'large';
    className?: string;
}) {
    return (
        <button
            type={type}
            className={
                cssButton === 'primary'
                    ? `${inter.className} ${
                          size === 'small' ? 'w-44 sm:w-44' : 'w-60 sm:w-96'
                      } bg-black text-white rounded-full h-12  hover:bg-gray-800 ${className}`
                    : `${inter.className} ${
                          size === 'small' ? 'w-44 sm:w-44' : 'w-60 sm:w-96'
                      }  border-2 border-black bg-white text-black rounded-full h-12  hover:bg-gray-50${className}`
            }
            onSubmit={
                handleSubmit
                    ? (e) => {
                          handleSubmit(e);
                      }
                    : () => {
                          javascript: void 0;
                      }
            }
            onClick={
                handleClick
                    ? (e) => {
                          handleClick(e);
                      }
                    : () => {
                          javascript: void 0;
                      }
            }
        >
            {text}
        </button>
    );
}
