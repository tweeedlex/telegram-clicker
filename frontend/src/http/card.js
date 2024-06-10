import routes from "../consts/apiRoutes";
import apiRequest from "./config";

export const createCard = (formData) => {
  return apiRequest('post', routes.ADMIN_CARD, {}, formData);
}

export const getCards = (categoryId) => {
  return apiRequest('get', routes.CARD, { params: { categoryId } });
}