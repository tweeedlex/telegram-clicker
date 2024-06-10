import routes from "../consts/apiRoutes";
import apiRequest from "./config";

export const validateInitData = () => {
    return apiRequest('get', routes.VALIDATE_INIT_DATA);
}

export const syncMoney = async (money, dispatch, telegramData, setTelegramData) => {
    const user = await apiRequest('post', routes.USER_MONEY, {}, {money});
    console.log("sync money", user)
    dispatch(setTelegramData({...telegramData, user}));
}

export const getMoneyInfo = () => {
    return apiRequest('get', routes.USER_MONEY);
}