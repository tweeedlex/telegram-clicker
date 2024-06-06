import routes from "../consts/api_routes";
import api from "./config";

export const validateInitData = async () => {
    try {
        const response = await api.get(routes.VALIDATE_INIT_DATA)
        return response.data;
    } catch (e) {
        return e;
    }
}