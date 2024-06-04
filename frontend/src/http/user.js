const API_URL = import.meta.env.VITE_API_URL;
import routes from "../consts/api_routes";
import axios from "axios";

export const validateUser = async (initData) => {
    try {
        const response = await axios.get(`${API_URL}${routes.VALIDATE_USER}`,
          {
              headers: {
                  'tg-init-data': initData
              }
          }
        );
        return response.data;
    } catch (e) {
        return e;
    }
}