'use client';
import { FormEvent, useEffect } from 'react';
import { useStepper } from '../../../store/stepper';
import { DoubleButtonStepper } from '../../Form-Elements/DoubleButtonStepper';
import { Inter } from 'next/font/google';
import { Input } from '../../Form-Elements/Input';
import { Select } from '../../Form-Elements/Select';
import { RadioButton } from '../../Form-Elements/RadioButton';
import { formatDate } from '../../../utils/formatDate';
import {
    countries,
    nationalities,
    provinces,
} from '../../../utils/formsArrays';

const inter = Inter({ subsets: ['latin'] });
export function UserRegistrationForm() {
    const { back, next, setUserData } = useStepper((state) => state);
    const { userData } = useStepper();

    const handleSubmitUserRegistrationForm = (e: FormEvent) => {
        e.preventDefault();
        next();
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('retakeToStep', '3');
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUserData({ ...userData, [name]: value === 'Si' ? true : false });
    };

    return (
        <div className="flex flex-col w-11/12 m-auto">
            <div className="flex flex-col justify-center items-center p-2">
                <p className={`${inter.className} text-xl font-bold`}>
                    Información tuya
                </p>
                <p className={`${inter.className} text-sm text-center`}>
                    Antes de continuar, te pedimos que revises la informacion
                    que autocompletamos por vos. Puedes corregirla en caso de
                    ser necesario
                </p>
            </div>
            <form onSubmit={(e) => handleSubmitUserRegistrationForm(e)}>
                <p
                    className={`${inter.className} sm:text-lg sm:text-left text-center font-bold p-2`}
                >
                    Datos generales
                </p>
                <div className="flex flex-col p-2">
                    <div className="flex flex-col sm:flex-row items-center ">
                        <Input
                            typeOfInput="text"
                            required={true}
                            label="Primer nombre *"
                            placeholder="Mariano"
                            value={userData?.firstName || ''}
                            name="firstName"
                            onChange={handleChange}
                            className="sm:w-1/3 "
                        />
                        <Input
                            typeOfInput="text"
                            required={false}
                            label="Segundo nombre "
                            placeholder="Nicolás"
                            value={userData.secondName || ''}
                            name="secondName"
                            onChange={handleChange}
                            className="sm:w-1/3  "
                        />
                        <Input
                            typeOfInput="text"
                            required={true}
                            label="Apellido *"
                            placeholder="Lopez"
                            value={userData?.lastName || ''}
                            name="lastName"
                            onChange={handleChange}
                            className="sm:w-1/3 "
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center ">
                        <Select
                            label="Género"
                            options={['Hombre', 'Mujer', 'Prefiero no decirlo']}
                            className="sm:w-1/3 "
                            onChange={handleChangeSelect}
                            required={true}
                            name={'gender'}
                            value={userData?.gender || ''}
                        />
                        <Select
                            label="Nacionalidad"
                            options={nationalities}
                            className="sm:w-1/3 "
                            required={true}
                            name={'nationality'}
                            onChange={handleChangeSelect}
                            value={userData?.nationality || ''}
                        />
                        <Input
                            typeOfInput="date"
                            required={true}
                            label="Fecha de nacimiento *"
                            name="birthDate"
                            onChange={handleChange}
                            value={formatDate(userData?.birthDate)}
                            placeholder="10 - 05 - 1990"
                            className="sm:w-1/3 "
                        />
                    </div>
                </div>

                <p
                    className={`${inter.className} sm:text-lg sm:text-left text-center font-bold p-2`}
                >
                    Datos de contacto
                </p>
                <div className="flex flex-col sm:flex-row items-center p-2 ">
                    <Input
                        typeOfInput="email"
                        required={true}
                        label="Email (domicilio legal electrónico) *"
                        placeholder="hola@celeri.app"
                        value={userData?.email || ''}
                        name="email"
                        onChange={handleChange}
                        className="sm:w-1/2 "
                    />
                    <Input
                        typeOfInput="number"
                        required={true}
                        label="Teléfono / celular *"
                        name="phone"
                        value={userData.phone || ''}
                        placeholder="549 11 6403-8017"
                        onChange={handleChange}
                        className="sm:w-1/2 "
                    />
                </div>
                <p
                    className={`${inter.className} sm:text-lg sm:text-left text-center font-bold p-2`}
                >
                    Direccion legal
                </p>
                <div className="flex flex-col w-full p-2">
                    <div className="flex flex-col flex-wrap sm:flex-row items-center ">
                        <Select
                            label="Pais *"
                            options={countries}
                            className="sm:w-1/3 "
                            required={true}
                            name={'country'}
                            onChange={handleChangeSelect}
                            value={userData.country}
                        />
                        <Select
                            label="Provincia *"
                            options={[...provinces]}
                            required={true}
                            className="sm:w-1/3 "
                            name={'province'}
                            onChange={handleChangeSelect}
                            value={userData?.province}
                        />
                        <Input
                            typeOfInput="text"
                            required={true}
                            label="Localidad *"
                            value={userData?.city || ''}
                            name="city"
                            placeholder="CABA"
                            onChange={handleChange}
                            className="sm:w-1/3 "
                        />
                    </div>
                    <div className="flex flex-col flex-wrap sm:flex-row items-center ">
                        <Input
                            typeOfInput="text"
                            required={true}
                            label="Calle *"
                            placeholder="Libertador"
                            name="street"
                            value={userData?.street || ''}
                            onChange={handleChange}
                            className="sm:w-4/12 "
                        />
                        <Input
                            typeOfInput="number"
                            required={true}
                            label="Altura *"
                            placeholder="3901"
                            name="number"
                            value={userData?.number || ''}
                            onChange={handleChange}
                            className="sm:w-2/12 "
                        />
                        <Input
                            typeOfInput="number"
                            required={false}
                            label="Piso"
                            placeholder="8"
                            name="floor"
                            value={userData?.floor || ''}
                            onChange={handleChange}
                            className="xl:w-2/12  sm:w-1/12 "
                        />
                        <Input
                            typeOfInput="text"
                            required={false}
                            label="Departamento"
                            placeholder="B"
                            value={userData?.flat || ''}
                            name="flat"
                            onChange={handleChange}
                            className="xl:w-2/12  sm:w-2/12  "
                        />
                        <Input
                            typeOfInput="number"
                            required={true}
                            label="Código postal *"
                            placeholder="1428"
                            name="postalCode"
                            onChange={handleChange}
                            value={userData?.postalCode || ''}
                            className="xl:w-2/12 sm:w-2/12"
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center p-2">
                    <div className="flex flex-col">
                        <p
                            className={`${inter.className} sm:text-lg sm:text-left text-center font-bold p-2`}
                        >
                            Datos laborales e impositivos
                        </p>

                        <Select
                            label="Actividad económica *"
                            options={[
                                userData?.activity,
                                'Empleado en relación de dependencia',
                                'Otro',
                            ]}
                            required={true}
                            onChange={handleChangeSelect}
                            name={'activity'}
                            value={userData?.activity}
                        />
                    </div>
                    <div className="flex flex-col p-2 lg:w-2/3 ">
                        <p
                            className={`${inter.className} sm:text-lg sm:text-left text-center font-bold p-2`}
                        >
                            Declaraciones juradas
                        </p>
                        <div className="flex flex-col lg:flex-row">
                            <RadioButton
                                name={'obligatedSubject'}
                                onChange={handleOptionChange}
                                selectedValue={userData?.obligatedSubject}
                                label="¿Es usted sujeto obligado?*"
                                className="lg:w-1/2 "
                            />
                            <RadioButton
                                name={'usaResident'}
                                selectedValue={userData?.usaResident}
                                onChange={handleOptionChange}
                                label=" ¿Es residente fiscal de los EE.UU conforme FATCA?*"
                                className="lg:w-1/2 "
                            />
                        </div>
                    </div>
                </div>
                <DoubleButtonStepper
                    handleBack={() => back()}
                    handleSubmit={handleSubmitUserRegistrationForm}
                />
            </form>
        </div>
    );
}
