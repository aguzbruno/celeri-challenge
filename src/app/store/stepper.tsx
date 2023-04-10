import { create } from 'zustand';
import { UserMail } from '../components/UserRegistration/UserMail/UserMail';
import { UserCUIT } from '../components/UserRegistration/UserCUIT/UserCUIT';
import { ReactElement } from 'react';
import { UserMediaValidation } from '../components/UserRegistration/UserMediaValidation/UserMediaValidation';
import { UserRegistrationForm } from '../components/UserRegistration/UserRegistrationForm/UserRegistrationForm';
import { UserFormData, MediaToValidate, MediaKeys } from '../types/types';

interface stepperHook {
    steps: ReactElement[];
    next: () => void;
    back: () => void;
    goTo: (index: number) => void;
    currentStepIndex: number;
    userData: UserFormData;
    setUserData: (userData: UserFormData) => void;
    hasRetakeOption: boolean;
    setHasRetakeOption: (hasRetakeOption: boolean) => void;
    mediaToValidate: MediaToValidate;
    isTakingPhoto: boolean;
    setIsTakingPhoto: (isTakingPhoto: boolean) => void;
    setMediaToValidate: (mediaToValidate: MediaToValidate) => void;
    typeOfPhoto: MediaKeys | '';
    setTypeOfPhoto: (photoOptionSelected: MediaKeys) => void;
}

export const useStepper = create<stepperHook>((set) => ({
    steps: [
        <UserMail key={0} />,
        <UserCUIT key={1} />,
        <UserRegistrationForm key={2} />,
        <UserMediaValidation key={3} />,
    ],
    next: () => {
        set((state) => {
            if (state.currentStepIndex > state.steps.length - 1) return state;
            return {
                ...state,
                currentStepIndex: state.currentStepIndex + 1,
            };
        });
    },
    back: () => {
        set((state) => {
            if (state.currentStepIndex <= 0) return state;
            return {
                ...state,
                currentStepIndex: state.currentStepIndex - 1,
            };
        });
    },
    currentStepIndex: 0,
    goTo: (index) => {
        set((state) => {
            return {
                ...state,
                currentStepIndex: index,
            };
        });
    },
    hasRetakeOption: false,
    setHasRetakeOption: (hasRetakeOption) => {
        set((state) => {
            return {
                ...state,
                hasRetakeOption: hasRetakeOption,
            };
        });
    },
    setUserData: (userData) => {
        set((state) => {
            localStorage.setItem('userData', JSON.stringify(userData));
            return {
                ...state,
                userData: userData,
            };
        });
    },
    userData: {
        cuit: '',
        firstName: '',
        secondName: '',
        lastName: '',
        gender: '',
        nationality: '',
        birthDate: '',
        email: '',
        phone: '',
        country: '',
        province: '',
        city: '',
        street: '',
        number: '',
        floor: '',
        flat: '',
        postalCode: '',
        activity: '',
        obligatedSubject: false,
        usaResident: false,
    },
    mediaToValidate: {
        frontDNI: '',
        backDNI: '',
        selfie: '',
    },
    setMediaToValidate: (mediaToValidate) => {
        set((state) => {
            localStorage.setItem(
                'mediaToValidate',
                JSON.stringify(mediaToValidate)
            );
            return {
                ...state,
                mediaToValidate: mediaToValidate,
            };
        });
    },
    typeOfPhoto: '',
    setTypeOfPhoto: (typeOfPhoto) => {
        set((state) => {
            return {
                ...state,
                typeOfPhoto: typeOfPhoto,
            };
        });
    },
    isTakingPhoto: false,
    setIsTakingPhoto: (isTakingPhoto) => {
        set((state) => {
            return {
                ...state,
                isTakingPhoto: isTakingPhoto,
            };
        });
    },
}));
