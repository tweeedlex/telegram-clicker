import routes from "../consts/apiRoutes";
import apiRequest from "./config";

export const validateInitData = (from) => {
    return apiRequest('get', routes.VALIDATE_INIT_DATA, { params: { from } });
}

export const syncMoney = async (money, dispatch, telegramData, setTelegramData) => {
    if (telegramData?.user) {
        const user = await apiRequest('post', routes.USER_MONEY, {}, {money});
        console.log("sync money", user)
        dispatch(setTelegramData({...telegramData, user}));
    }
}

export const getMoneyInfo = () => {
    return apiRequest('get', routes.USER_MONEY);
}