'use client';
import { Inter } from 'next/font/google';
import { FormEvent, useEffect } from 'react';
const inter = Inter({ subsets: ['latin'] });


type ButtonProps = {
    cssButton: string;
    type?: 'button' | 'submit' | 'reset';
    text: string;
    handleClick?: ()=> void;
    handleSubmit?: (e: FormEvent) => void;
    size?: 'small' | 'medium' | 'large';
    className?: string;
};

export function Button({
    cssButton,
    type = 'button',
    text,
    handleClick,
    handleSubmit,
    size = 'medium',
    className = '',
}: ButtonProps) {
    
    useEffect(()=>{
        console.log(handleClick)
    })
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
                      }  border-2 border-black bg-white text-black rounded-full h-12  hover:bg-gray-50 ${className}`
            }
            onSubmit={handleSubmit}
            onClick={handleClick}
        >
            {text}
        </button>
    );
}
