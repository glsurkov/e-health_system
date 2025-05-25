import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/shared/redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
