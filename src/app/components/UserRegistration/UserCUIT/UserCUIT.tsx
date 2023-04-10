'use client';
import { FormEvent, useState } from 'react';
import { useStepper } from '../../../store/stepper';
import { DoubleButtonStepper } from '../../Form-Elements/DoubleButtonStepper';
import { Inter } from 'next/font/google';
import { Input } from '../../Form-Elements/Input';
import { SpinnerApi } from '../../Spinner/SpinnerApi';
import { getPersonData } from '../../../services/apiClient';
import { UserFormData } from '../../../types/types';
import Swal from 'sweetalert2';
import { getLocalStorageItem } from '../../../utils/getLocalStorage';
import { updateFields } from '../../../utils/mockupUpdateFields';
import { handleCuitWithDashes } from '../../../utils/handleCuitWithDashes';

const inter = Inter({ subsets: ['latin'] });

export function UserCUIT() {
    const { back, next, userData, setUserData } = useStepper();
    const [isLoading, setIsLoading] = useState(false);
    const { cuit: cuitValue } = userData;

    const handleSubmitUserCUIT = async (e: FormEvent) => {
        // Si el cuit es valido, voy a buscar la data a la api
        e.preventDefault();
        // Activo el spinner
        setIsLoading(true);
        const data = await getPersonData(cuitValue);
        if (data?.persona?.nombre) {
            // Si la data es valida, seteo el estado con la data obtenida
            setUserData({
                ...userData,
                ...updateFields(data, cuitValue, userData.email),
            });
            localStorage.setItem('retakeToStep', '2');
            next();
        } else {
            // Si la data no es valida, muestro un mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'CUIT INVALIDO',
                text: 'Hubo un error al intentar obtener tus datos, por favor intenta nuevamente',
            });
        }
        // Desactivo el spinner
        setIsLoading(false);
    };

    function handleCUIT(e: React.ChangeEvent<HTMLInputElement>) {
        const cuitValue = handleCuitWithDashes(e);
        setUserData({ ...userData, cuit: cuitValue });
    }

    return !isLoading ? (
        <div>
            <p className={`${inter.className} sm:text-3xl font-bold p-2`}>
                Ingresa tu CUIT/CUIL
            </p>
            <form onSubmit={(e) => handleSubmitUserCUIT(e)}>
                <Input
                    typeOfInput="text"
                    required={true}
                    label="CUIT/CUIL"
                    name="cuit"
                    value={cuitValue}
                    onChange={handleCUIT}
                    placeholder="20-11332331-3"
                />
                <DoubleButtonStepper handleBack={back} />
            </form>
        </div>
    ) : (
        <>
            <SpinnerApi />
        </>
    );
}
