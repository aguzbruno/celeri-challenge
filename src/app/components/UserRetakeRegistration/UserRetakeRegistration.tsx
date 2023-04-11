import { FormEvent } from 'react';
import { Inter } from 'next/font/google';
import { useStepper } from '../../store/stepper';
import { Button } from '../Form-Elements/Button';
import { UserFormData } from '../../types/types';
import { getLocalStorageItem } from '../../utils/getLocalStorage';

const inter = Inter({ subsets: ['latin'] });

export function UserRetakeRegistration() {
    const { goTo, setUserData, setHasRetakeOption } = useStepper()

     const retakeRegistration = (e: FormEvent) => {
        e.preventDefault();
        // Traigo los datos del usuario y del numero de step del local storage
        const userDataFromLocalStorage = getLocalStorageItem('userData');
        const retakeLocalStorage = getLocalStorageItem('retakeToStep');
        (setUserData(userDataFromLocalStorage))
        goTo(retakeLocalStorage)
        // Desactivo el boton de retomar
        setHasRetakeOption(false);
    };

    const startNewRegistration = (e: FormEvent) => {
        e.preventDefault();
        localStorage.clear();
        goTo(0);
        setHasRetakeOption(false);
    };

    return (
        <div className={`${inter.className} continue-register w-2/5 w-auto`}>
            <p className="text-lg">
                Ya existe un proceso de vinculación de cuenta en celeri
            </p>
            <p className="font-medium text-lg pt-4">Deseas continuarlo?</p>
            <div className="flex flex-col items-center gap-5 p-5">
                <Button
                    type="button"
                    cssButton="primary"
                    handleClick={retakeRegistration}
                    text="Si, deseo continuarlo"
                />
                <Button
                    type="button"
                    cssButton="secondary"
                    handleClick={startNewRegistration}
                    text="No, iniciar desde cero"
                />
            </div>
        </div>
    );
}
