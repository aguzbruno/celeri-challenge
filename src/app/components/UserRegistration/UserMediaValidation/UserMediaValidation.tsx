'use client';
import { Inter } from 'next/font/google';
import { useStepper } from '../../../store/stepper';
import { ValidationCard } from './ValidationCard';
import { CardCuriousData } from '../../Spinner/CardCuriousData';
import { Button } from '../../Form-Elements/Button';
import { MediaKeys } from '../../../types/types';

const inter = Inter({ subsets: ['latin'] });
export function UserMediaValidation() {
    const { back, userData } = useStepper();
    //Simulo un posible array que viene de api con informacion acerca de los documentos que se deben validar
    const validationCards = [
        {
            id: 1,
            title: 'Frente de DNI',
            status: 'Pendiente',
            description: 'Subí una foto del frente de tu DNI',
            action: 'Subir',
            typeOfValidation: 'frontDNI' as MediaKeys,
        },
        {
            id: 2,
            title: 'Dorso de DNI',
            status: 'Pendiente',
            description: 'Subí una foto del dorso de tu DNI',
            action: 'Subir',
            typeOfValidation: 'backDNI' as MediaKeys,
        },
        {
            id: 3,
            title: 'Validación de identidad',
            status: 'Pendiente',
            description: 'Subí una foto de tu rostro con el dni en la mano',
            action: 'Validar',
            typeOfValidation: 'selfie' as MediaKeys,
        },
    ];

    return (
        <>
            <div className="flex items-center justify-center flex-col">
                <p className={`${inter.className} sm:text-2xl font-bold`}>
                    Cargá la siguiente documentación para finalizar
                </p>
                <p className={`${inter.className} sm:text-sm font-light`}>
                    Recordá que podés enviar más de un archivo por cada tipo de
                    documento sin superar los 100mb por archivo.
                </p>
            </div>
            
                <p className={`${inter.className} sm:text-2xl font-bold`}>
                    {`${userData.firstName} ${userData.lastName}`}
                </p>
            <div className='w-9/12 flex flex-col items-center gap-5'> 
                {validationCards.map((card) => (
                    <ValidationCard
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        status={card.status}
                        action={card.action}
                        typeOfValidation={card.typeOfValidation}
                    />
                ))}
            </div>
            <div className="m-auto">
                <Button
                    handleClick={back}
                    cssButton="secondary"
                    type="button"
                    text="Atrás"
                    size="small"
                />
            </div>
            <div className="pt-20">
                <CardCuriousData />
            </div>
        </>
    );
}
