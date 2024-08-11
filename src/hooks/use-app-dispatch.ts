import { AppDispatch } from '@/store/store.interface';
import { useDispatch } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
