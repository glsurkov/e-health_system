import * as yup from 'yup';

const schema = yup
    .object({
        userId: yup.string().required('Обязательное поле'),
        secret: yup.string().required('Обязательное поле'),
    })
    .required();

export { schema };
