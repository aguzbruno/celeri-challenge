'use client';
import { useEffect, useState } from 'react';
import { UserMail } from './components/UserRegistration/UserMail/UserMail';
import { UserRetakeRegistration } from './components/UserRetakeRegistration/UserRetakeRegistration';
import { useStepper } from './store/stepper';
import { Spinner } from './components/Spinner/Spinner';
import { TakePhotoFromCamera } from './components/UserRegistration/UserMediaValidation/TakePhotoFromCamera';
import { getLocalStorageItem } from './utils/getLocalStorage';

function StepContent() {
    const { steps, currentStepIndex, isTakingPhoto } = useStepper(
        (state) => state
    );

    if (isTakingPhoto) {
        return <TakePhotoFromCamera />;
    }

    return <>{steps[currentStepIndex]}</>;
}

export default function Home() {
    const { setHasRetakeOption, hasRetakeOption, setMediaToValidate } =
        useStepper((state) => state);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //Traigo el local storage
        const userData = getLocalStorageItem('userData');
        const retakeToStep = getLocalStorageItem('retakeToStep');
        //Si existe el local storage, seteo el estado para mostrar el boton de retomar
        if (userData && retakeToStep) {
            setHasRetakeOption(true);
        }
        //Traigo el local storage de la media a validar
        const mediaToValidate = getLocalStorageItem('mediaToValidate');
        //Si existe el local storage, seteo el estado para saber que imagen pedirle al usuario
        if (mediaToValidate) {
            setMediaToValidate(mediaToValidate);
        }
        //Desactivo el spinner
        setIsLoading(false);
    }, [setHasRetakeOption, setMediaToValidate]);

    return (
        <div className="w-full p-4 flex justify-center flex-col gap-5 items-center">
            {isLoading ? (
                <Spinner />
            ) : hasRetakeOption ? (
                <UserRetakeRegistration />
            ) : (
                <StepContent />
            )}
        </div>
    );
}
