// import { AxiosResponse } from "../types/axios/axios";
import axios, { type AxiosResponse } from "axios";

import $api from "../http";
import { IUser } from "../types/IUser";

export default class UserService {
    static fetchUsers() /* :Promise<AxiosResponse<IUser[]>> */ {
        return $api.get<IUser[]>("/users");
    }

    static fetchUser(id: string): Promise<AxiosResponse<{user :IUser}>>  {
        try {
            return $api.get<{user: IUser}>(`/api/users/${id}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data)
                throw error
            } else {
                console.error("Error fetching user:", error)
                throw new Error("Error fetching user")
            }
    }
    }
}
