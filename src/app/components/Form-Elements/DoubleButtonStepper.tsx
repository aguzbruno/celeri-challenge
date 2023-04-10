'use client'
import { Inter } from 'next/font/google';
import { FormEvent } from 'react';
const inter = Inter({ subsets: ['latin'] });
export function DoubleButtonStepper({
    handleBack,
    handleClick,
    handleSubmit,
}: {
    handleBack: (e: FormEvent) => void;
    handleClick?: (e: FormEvent) => void;
    handleSubmit?: (e: FormEvent) => void;
}) {
    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 pb-8">
            <button
                type="button"
                className={`${inter.className} w-60 border-2 border-black bg-white text-black rounded-full h-12 sm:w-44 hover:bg-gray-50`}
                onClick={(e) => {
                    handleBack(e);
                }}
            >
                Atrás
            </button>
            <button
                className={`${inter.className} w-60 bg-black text-white rounded-full h-12 sm:w-44 hover:bg-gray-800`}
                type="submit"
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
                Continuar
            </button>
        </div>
    );
}
