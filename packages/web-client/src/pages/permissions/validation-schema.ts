import * as yup from 'yup';

const schema = yup
    .object({
        requestToId: yup.string().required('Обязательное поле'),
        permission: yup.string().required('Обязательное поле'),
    })
    .required();

export { schema };
