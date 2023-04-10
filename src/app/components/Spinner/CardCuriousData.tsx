import './CardCuriousData.css';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import ImgCeleri from '../../assets/imgCeleri.svg';

const inter = Inter({ subsets: ['latin'] });

function getRandomNumberBetween1And5() {
  return Math.floor(Math.random() * 5) + 1;
}

export function CardCuriousData() {
  const randomNumber = getRandomNumberBetween1And5();

  let text = '';

  switch (randomNumber) {
    case 1:
      text = '¿Sabías que con celeri podes comprar dólares en 3 simples pasos?';
      break;
    case 2:
      text = '¿Sabías que tenes un crédito preaprobado por 1.000.000 ARS?';
      break;
    case 3:
      text = '¿Sabías que con Celeri podes adquirir clientes de forma rápida y segura automatizando el proceso de punta a punta?';
      break;
    case 4:
      text = '¿Sabías que con Celeri podes centralizár tus obligaciones ante reguladores en un solo lugar para estar siempre al día?';
      break;
    case 5:
      text = '¿Sabías que con Celeri podes reducir el riesgo de tu negocio identificando y analizando operaciones sospechosas?';
      break;
    default:
      break;
  }

  return (
    <div className="shadow-2xl bg-white sm:max-w-7xl max-w-xs gap-4 p-4 flex flex-row justify-center items-center ">
      <Image src={ImgCeleri} alt="card-curious-data" width={60} height={60} priority />
      <div className="max-w-3xl">
        <p className={`${inter.className}`}>{text}</p>
      </div>
    </div>
  );
}
