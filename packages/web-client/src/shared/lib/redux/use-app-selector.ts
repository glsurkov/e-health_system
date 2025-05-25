import { useSelector } from 'react-redux';

import { AppStore } from '@/shared/redux';

export const useAppSelector = useSelector.withTypes<AppStore>();
