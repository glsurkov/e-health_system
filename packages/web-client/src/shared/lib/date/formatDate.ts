import {format} from 'date-fns';

export const formatDate = (date: Date | string, type: 'short' | 'long') => {
    return format(date, type === 'long' ? 'dd.MM.yyyy' : 'dd.MM.yy');
};
