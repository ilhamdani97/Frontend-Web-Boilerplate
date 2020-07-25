import {
    email,
    alphaNumeric,
    numberic,
    phoneNumber,
    idNumber,
    gender,
    ktp
} from '../variables'; 

export const validation = (regex) => (value) => {
    if(!value) return false
    return regex.test(value)
}

export const isRequired = (value) => {
    if(!value) return false
    return true   
}

export const isEmail = validation(email);
export const isUserName = validation(alphaNumeric);
export const isPhoneNumber = validation(phoneNumber);
export const isIdNumber = validation(idNumber);
export const isGender = validation(gender);
export const isAge = validation(numberic);

const maping = {
    isRequired,
    isEmail,
    isUserName,
    isPhoneNumber,
    isGender,
    isAge
}

export default maping