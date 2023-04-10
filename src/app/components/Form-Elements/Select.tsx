'use client'
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export function Select({
    options,
    label,
    onChange,
    className,
    value,
    name,
    required
    
}: {
    options: string[];
    label?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;  
    className?:string
    value:string
    name:string
    required?:boolean
    
}) {
    return (
        <div className={`flex flex-col p-2 ${className}`}>
            {label ? (
                <label className={`${inter.className} xl:text-base text-xs ` }>{label}</label>
            ) : null}

            <select
                className={(`border rounded-lg h-12 w-52 sm:w-auto max-w-lg pl-2 xs:pl-4 xl:pl-6 text-xs outline-none placeholder:text-xs placeholder:gray-400`)}
                required
                name={name}
                onChange={onChange}
                value={value}
            >
                <option value=''> Seleccionar.. </option>
                {options.map((option, i) => (
                    <option key={i} value={option} >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
