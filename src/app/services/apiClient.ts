import { MediaToValidate } from "../types/types";
const apiKey = process.env.NEXT_PUBLIC_API_KEY

export async function getPersonData(cuit: string) {
    try {
        const cuitWithoutDashes = cuit.replace(/-/g, '');
        const res = await fetch(
            `https://api-gateway.staging.scala.ly/afip/ws_sr_padron_a13/getPersona?idPersona=${cuitWithoutDashes}`,
            {
                headers: {
                    Authorization: apiKey ?? '',
                },
            }
        );
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function sendMediaToValidate(mediaToValidate: MediaToValidate) {
    const formData = new FormData();
    formData.append('backDNI', mediaToValidate.backDNI);
    formData.append('frontDNI', mediaToValidate.frontDNI);
    formData.append('selfie', mediaToValidate.selfie);
  
    try {
      const response = await fetch('/api/validate-media', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  