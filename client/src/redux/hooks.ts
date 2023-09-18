import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootType, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootType>  = useSelector;