'use client'
import { Inter } from "next/font/google";
import { FormEvent } from "react";

const inter = Inter({ subsets: ["latin"] });

export function RadioButton({    
    label,
    onChange,
    className,
    selectedValue,
    name
}: {
    label?: string;
    onChange: (e:  React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    selectedValue:boolean | ''
    name:string
}) {
    return (
        <div  className={`flex flex-col p-2 ${className}`}>
                <label className={`${inter.className} text-xs font-semibold `}>
                    {label}
                </label>     
                <div className="flex flex-row gap-4">
                                    <label>
                                        <input type="radio" value="Si" className="mr-2" name={name}  checked={selectedValue === true} onChange={onChange} />
                                        Si
                                    </label>
                                    <label>
                                        <input type="radio" value="No"  className="mr-2" name={name}  checked={selectedValue === false} onChange={onChange} />
                                        No
                                    </label>
                </div>       
        </div>
    );
}
