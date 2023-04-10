import { UserFormData } from "../types/types";

export function updateFields(data: any,cuit:string,email:string): UserFormData {
        return {
            cuit: cuit,
            firstName: data?.persona?.nombre || '',
            lastName: data?.persona?.apellido || '',
            birthDate: data?.persona?.fechaNacimiento || '',
            province: data?.persona?.domicilio[0].descripcionProvincia || '',
            city: data?.persona?.domicilio[0].localidad || '',
            street: data?.persona?.domicilio[0].calle || '',
            number: data?.persona?.domicilio[0].numero || '',
            floor: data?.persona?.domicilio[0].piso || '',
            postalCode: data?.persona?.domicilio[0].codigoPostal || '',
            activity: data?.persona?.descripcionActividadPrincipal || '',
            obligatedSubject: false,
            usaResident: false,
            email: email || '',
            phone: '',
            country: '',
        };
    }