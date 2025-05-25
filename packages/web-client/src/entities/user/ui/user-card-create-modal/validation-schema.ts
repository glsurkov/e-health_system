import * as yup from 'yup';

const schema = yup
    .object({
        patientId: yup.string().required('Обязательное поле'),
        doctorId: yup.string().required('Обязательное поле'),
        dataHash: yup.string().required('Обязательное поле'),
    })
    .required();

export { schema };
