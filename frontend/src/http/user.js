import routes from "../consts/api_routes";
import apiRequest from "./config";

export const validateInitData = () => {
    return apiRequest('get', routes.VALIDATE_INIT_DATA);
}