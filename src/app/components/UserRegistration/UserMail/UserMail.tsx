'use client';
import { Inter } from 'next/font/google';
import { FormEvent, useEffect, useState } from 'react';
import { useStepper } from '../../../store/stepper';
import { Button } from '../../Form-Elements/Button';
import { getLocalStorageItem } from '../../../utils/getLocalStorage';

const inter = Inter({ subsets: ['latin'] });

export function UserMail() {
    const { next, setUserData, userData } = useStepper((state) => state);
    const [email, setEmail] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    useEffect(() => {
        const userDataFromLocalStorage = getLocalStorageItem('userData');
        if (userDataFromLocalStorage) {
            setEmail(userDataFromLocalStorage.email);
        }
    }, []);

    const handleSubmitUserMail = (e: FormEvent) => {
        e.preventDefault();
        if (isFormValid()){
            setUserData({ ...userData, email });
            localStorage.setItem('retakeToStep', '1');
            next();
        }
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleTermsAcceptedChange = () => {
        setTermsAccepted(!termsAccepted);
    };

    const isEmailValid = (email: string) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return regex.test(email);
    };

    const isFormValid = () => {
        return isEmailValid(email) && termsAccepted;
    };

    return (
        <div className="flex flex-col w-12/12 m-auto gap-5">
            <p className={`${inter.className} sm:text-3xl font-bold`}>
                Creá tu cuenta en celeri
            </p>
            <p className={`${inter.className} sm:text-lg font-light`}>
                Empezá a invertir de la manera más fácil
            </p>
            <form
                onSubmit={(e) => {
                    handleSubmitUserMail(e);
                }}
                className="flex justify-center flex-col gap-5 items-center"
            >
                <input
                    className=" border-b border-b-slate-300 outline-none w-full"
                    onChange={handleEmailChange}
                    type="email"
                    name="email"
                    required
                    placeholder="hola@celeri.app"
                    value={email}
                />
                <div>
                    <input
                        className="checkbox-terms checked:bg-blue-500"
                        type="checkbox"
                        required
                        id="terms"
                        name="terms"
                        checked={termsAccepted}
                        onChange={handleTermsAcceptedChange}
                        value="He leído y acepto los Terminos y condiciones"
                    />
                    <label className={`${inter.className} ml-2`}>
                        He leído y acepto los{' '}
                        <span className="underline text-sky-500">
                            Terminos y condiciones
                        </span>
                    </label>
                </div>
                <Button
                    type="submit"
                    cssButton="primary"
                    handleSubmit={handleSubmitUserMail}
                    text="Continuar"
                />
            </form>
        </div>
    );
}
