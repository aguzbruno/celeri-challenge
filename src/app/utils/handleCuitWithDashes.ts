export function handleCuitWithDashes(e: React.ChangeEvent<HTMLInputElement>){
    const inputValue = e.target.value.replace(/[^\d]/g, ''); // elimina todos los caracteres que no sean dígitos
    let formattedValue = '';

    if (inputValue.length > 0) {
        formattedValue = inputValue.slice(0, 2); // los primeros 2 dígitos
    }
    if (inputValue.length >= 3) {
        formattedValue += `-${inputValue.slice(2, 9)}`; // el guión y los siguientes 7 dígitos
    }
    if (inputValue.length >= 10) {
        formattedValue += `-${inputValue.slice(9, 11)}`; // el segundo guión y los últimos 2 dígitos
    }
    if (inputValue.length >= 11) {
        console.log(inputValue.length)
        const lastDigit = formattedValue.slice(11, 12);
        formattedValue = formattedValue.slice(0, 10) + lastDigit; // saco el guion de donde estaba
        formattedValue += `-${inputValue.slice(10, 11)}`; //Agrego el guion en la posicion correcta
    }
    return formattedValue;
}