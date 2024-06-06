import routes from "../consts/api_routes";
import api from "./config";
export const validateInitData = async () => {
    try {
        const response = await api.get(routes.GET_USER)
        return response.data;
    } catch (e) {
        return e;
    }
}