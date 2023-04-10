'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '../../Form-Elements/Button';
import Image from 'next/image';
import './UserMediaValidation.css';
import Swal from 'sweetalert2';
import { useStepper } from '../../../store/stepper';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export function TakePhotoFromCamera() {
    const {
        setIsTakingPhoto,
        setMediaToValidate,
        mediaToValidate,
        typeOfPhoto,
    } = useStepper();
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode:
            typeOfPhoto === 'selfie' ? { exact: 'user' } : 'environment',
    };

    const webcamRef = useRef<Webcam>(null);
    const [image, setImage] = useState<string>('');
    const [photoTaken, setPhotoTaken] = useState<boolean>(false);

    const retakePhoto = useCallback(() => {
        // En caso de que el usuario quiera retomar la foto, se reinician los estados
        setPhotoTaken(false);
        setImage('');
    }, []);

    const capturePhoto = useCallback(() => {
        // Esta funcion es para que el usuario capture la foto que quiere subir
        const imageSrc = webcamRef.current?.getScreenshot();
        setImage(imageSrc || '');
        setPhotoTaken(true);
    }, []);

    const confirmUpload = useCallback(() => {
        // Esta funcion es para que el usuario confirme que quiere subir la foto que tomo
        Swal.fire({
            title: 'La imagen se ha subido con exito!',
            icon: 'success',
        });
        setIsTakingPhoto(false);
        setMediaToValidate({ ...mediaToValidate, [typeOfPhoto]: image });
    }, [
        setIsTakingPhoto,
        setMediaToValidate,
        mediaToValidate,
        typeOfPhoto,
        image,
    ]);

    function back(){
        setIsTakingPhoto(false);
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex flex-col gap-5 p-5 items-center">
                {!photoTaken ? (
                    <>
                        <div className="relative">
                            <Webcam
                                audio={false}
                                height={720}
                                screenshotFormat="image/jpeg"
                                width={1280}
                                ref={webcamRef}
                                videoConstraints={videoConstraints}
                            />
                            { typeOfPhoto === 'selfie' ? (
                                <p
                                    className={`${inter.className} layout-dni-parragraph`}
                                >
                                    Saque una selfie con su rostro y el frente
                                    del dni
                                </p>
                            ) : (
                                <p
                                    className={`${inter.className} layout-dni-parragraph`}
                                >
                                    Por favor coloque el DNI en el recuadro
                                </p>
                            )}
                            <div className='layout-back'>
                                <Button
                                        type="button"
                                        cssButton="secondary"
                                        size="small"
                                        handleClick={back}
                                        text="Atras"
                                        className="m-auto"
                                    />
                            </div>
                            { typeOfPhoto === 'selfie' ? (null) : <div className={'layout-dni'}></div>}
                            <div className="btn-capture">
                                <Button
                                    type="button"
                                    cssButton="primary"
                                    size="small"
                                    handleClick={capturePhoto}
                                    text="Capturar"
                                    className="m-auto"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {image && (
                            <div className="relative">
                            <Image
                                src={image}
                                alt="photo"
                                width={1280}
                                height={720}
                            />
                            
                        <div className="flex flex-col gap-5 p-5 double-button">
                            <Button
                                type="button"
                                cssButton="secondary"
                                size="small"
                                handleClick={retakePhoto}
                                text="Tomar de nuevo"
                            />
                            <Button
                                type="button"
                                cssButton="primary"
                                size="small"
                                handleClick={confirmUpload}
                                text="Subir"
                            />
                        </div>
                        </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
