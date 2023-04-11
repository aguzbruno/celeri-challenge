import { useState } from "react";
import { Input } from "../../Form-Elements/Input";
import { SpinnerApi } from "../../Spinner/SpinnerApi";
import Swal from "sweetalert2";
import { getCUITFromDNI } from "../../../services/apiClient";
import { Inter } from "next/font/google";
import { Button } from "../../Form-Elements/Button";
import { FormEvent } from 'react';
import { DoubleButtonStepper } from "../../Form-Elements/DoubleButtonStepper";

const inter = Inter({ subsets: ['latin'] });
interface UserDNIProps {
    handleBack: () => void;
  }

export function UserDNI( { handleBack }: UserDNIProps) {
    const [dniValue, setDniValue] = useState("");
    const [cuitToShow, setCuitToShow] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const handleSubmitUserDNI = async (e: FormEvent) => {
        e.preventDefault();
        if(dniValue.length < 7){
            return Swal.fire({
                icon: 'error',
                title: 'DNI INVALIDO',
                text: 'Por favor ingresa un DNI valido',
            });
        }else{
            // Si el dni es valido, voy a buscar la data a la api
            setIsLoading(true);
            const data = await getCUITFromDNI(dniValue);
            if (data?.idPersona) {
                // Si la data es valida, seteo el estado con la data obtenida
                console.log(data?.idPersona)
                setCuitToShow(data?.idPersona);
               
            } else {
                // Si la data no es valida, muestro un mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: 'No pudimos obtener tus datos',
                    text: 'Verifica que el DNI este ingresado correctamente, si el error persiste, por favor intenta mas tarde',
                });
            }
                // Desactivo el spinner
                setIsLoading(false);
            }
        }
    function handleDNI(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.value.length <= 8){
            setDniValue(e.target.value)
        }       
    }
    return !isLoading ? (
        cuitToShow ? (
        <div className='flex flex-col items-center gap-5'>
            <p className={`${inter.className} sm:text-3xl font-bold p-2`}>
                Tu cuit es :</p>
            <p className={`${inter.className} sm:text-xl p-2`}>{cuitToShow}</p>
            <Button
                        type="button"
                        cssButton="secondary"
                        handleClick={handleBack}
                        text="Atras"
                        size="small"
                    />
        </div>
        ) : (
        <div>
            <p className={`${inter.className} text-3xl font-bold p-2`}>
                Ingresa tu DNI
            </p>
            Ingresa tu DNI para conocer tu CUIT
            <form onSubmit={(e) => handleSubmitUserDNI(e)}>
                <Input
                    typeOfInput="text"
                    required={true}
                    label="DNI"
                    name="cuit"
                    value={dniValue}
                    onChange={handleDNI}
                    placeholder="11332331"
                    
                />
                <div className="flex flex-col items-center gap-5 ">
                    <Button
                        type="button"
                        cssButton="secondary"
                        handleClick={handleBack}
                        text="Atras"
                        size="small"
                    />

                    <Button
                        type="submit"
                        cssButton="primary"
                        handleSubmit={handleSubmitUserDNI}
                        text="Buscar CUIT"
                        size="small"
                    />
                </div>
                
            </form>
        </div>)
    ) : (
        <>
            <SpinnerApi />
        </>
    );
}