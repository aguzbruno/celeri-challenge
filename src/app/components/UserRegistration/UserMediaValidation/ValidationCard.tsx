import Check from '../../../assets/check.svg';
import Alert from '../../../assets/alert.svg';
import Subir from '../../../assets/cloud.svg';
import Validar from '../../../assets/lock.svg';
import Image from 'next/image';
import './UserMediaValidation.css';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useStepper } from '../../../store/stepper';
import { transformToBase64 } from '../../../utils/transformBase64';
import { MediaKeys } from '../../../types/types';
import { sendMediaToValidate } from '../../../services/apiClient';

interface ValidationCardProps {
    title: string;
    description: string;
    status: string;
    action: string;
    id: number;
    typeOfValidation: MediaKeys;
}

export function ValidationCard({
    title,
    description,
    status,
    action,
    id,
    typeOfValidation,
}: ValidationCardProps) {
    const {
        isTakingPhoto,
        setMediaToValidate,
        mediaToValidate,
        setIsTakingPhoto,
        setTypeOfPhoto,
    } = useStepper();
    const [isDisabled, setIsDisabled] = useState(false
    );
    const [isMobile, setIsMobile] = useState(false);
    const inputFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(mediaToValidate[typeOfValidation]){
            setIsDisabled(true);
        }
    }, [mediaToValidate]);

    useEffect(() => {
        const userAgent =
            typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
        setIsMobile(
            Boolean(
                userAgent.match(
                    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
                )
            )
        );
    }, []);

    const handleUpload = () => {
        
        if (isMobile) {
            //Esta funcion es para que el usuario pueda elegir si quiere subir una imagen o tomar una foto en caso de estar en mobile
            //Si elige subir una imagen, se abre el explorador de archivos y si elige tomar una foto, se abre la camara
            Swal.fire({
                title: 'Como desea subir la imagen?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Cargar',
                denyButtonText: `Tomar foto`,
            }).then((result) => {
                if (result.isConfirmed) {
                    //Si elige cargar una imagen, se abre el explorador de archivos
                    inputFieldRef?.current?.click();
                } else if (result.isDenied) {
                    //Si elige tomar una foto, se abre la camara
                    setTypeOfPhoto(typeOfValidation);
                    setIsTakingPhoto(true);
                }
            });
        } else {
            inputFieldRef?.current?.click();
        }
    };

    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Esta funcion es para que el usuario cargue la foto que quiere subir
        //Se abre un modal para que el usuario confirme que quiere cargar la imagen
        Swal.fire({
            title: 'Esta seguro de cargar esta imagen?',
            text: 'No podra revertir el cambio',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000000',
            cancelButtonColor: '#000000',
            confirmButtonText: 'Si, estoy seguro',
        }).then(async (result) => {
            if (result.isConfirmed) {
                //Si el usuario confirma que quiere cargar la imagen, se abre un modal de exito y se carga la imagen
                const files = e.target.files;
                if (
                    files &&
                    files.length > 0 &&
                    files[0].type.match('image.*')
                ) {
                    setIsDisabled(true);
                    // //Este seria el llamado a la api para subir la imagen
                    // sendMediaToValidate({
                    //     ...mediaToValidate,
                    //     [typeOfValidation]: await transformToBase64(files[0]),
                    // })
                    setMediaToValidate({
                        ...mediaToValidate,
                        [typeOfValidation]: await transformToBase64(files[0]),
                    });
                   
                }
                //Se abre un modal de exito
                Swal.fire(
                    'Tu imagen se ha cargado satisfactoriamente!',
                    '',
                    'success'
                );
            }
        });
    };

    return (
        <>
            <div
                className={`validation-card-container w-full xs:w-120 p-5 h-auto flex lg:flex-row flex-col items-center justify-between ${status}`}
            >
                <div className=" flex lg:flex-row flex-col justify-center items-center gap-5">
                    <span
                        className={
                            status === 'Aprobado'
                                ? `validation-card__status success`
                                : `validation-card__status pending`
                        }
                    >
                        <Image
                            src={status === 'Aprobado' ? Check : Alert}
                            alt="icon-status"
                            width={32}
                            height={32}
                            priority
                        />
                        {status}
                    </span>
                    <div className="validation-card flex flex-col justify-center items-center lg:items-start pb-4 gap-0">
                        <p className="font-bold text-xs sm:text-base">
                            {title}
                        </p>
                        <p className="text-xs sm:text-sm">{description}</p>
                    </div>
                </div>

                <form
                    action=""
                    onClick={isDisabled ? undefined : handleUpload}
                    className={
                        isDisabled
                            ? 'validation-card__action disabled'
                            : 'validation-card__action to_validate'
                    }
                >
                    <Image
                        src={action === 'Subir' ? Subir : Validar}
                        alt="icon-status"
                        width={32}
                        height={32}
                        priority
                    />
                    {isDisabled ? (
                        <span>{'Realizado'}</span>
                    ) : (
                        <span>{action}</span>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        ref={inputFieldRef}
                        id={`input-field${id}`}
                        hidden
                        onChange={uploadFile}
                    />
                </form>
            </div>
        </>
    );
}
