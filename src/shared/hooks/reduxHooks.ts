import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";

// Hooks personalizados con tipos para usar en la app
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();