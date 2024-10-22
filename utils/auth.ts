import { useSelector } from "react-redux";
import { RootState } from "@/store";

export class Auth{

    public static user(){
        return useSelector((state: RootState) => state.auth.user)
    }
}