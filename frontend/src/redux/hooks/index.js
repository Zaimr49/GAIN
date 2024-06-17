import { useDispatch, useSelector } from "react-redux";
import { store } from "../store"; // Assuming store is exported from "../store"


// Export useAppDispatch with explicit type annotation
export const useAppDispatch = useDispatch;

// Export useAppSelector with explicit type annotation
export const useAppSelector = useSelector;
