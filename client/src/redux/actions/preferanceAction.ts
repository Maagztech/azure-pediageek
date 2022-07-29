import { Dispatch } from "redux";
import { IAuth } from "../types/authType";
import { IAlertType, ALERT } from "../types/alertType";
import { getAPI, postAPI } from "../../utils/FetchData";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { GET_HOME_BLOGS, IGetHomeBlogsType } from "../types/blogType";

export const updateUserPre =
  (interests: string[], categoryid: string[], auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
    if (!auth.access_token || !auth.user) return;
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    try {
      const res = await postAPI(
        "preferance",
        {
          interests: interests,
          categoryid: categoryid,
        },
        access_token
      );
      const blog = await getAPI(
        `home/signedblogsbycategory?page=1&limit=${8}`,
        auth.access_token
      );
      dispatch({
        type: GET_HOME_BLOGS,
        payload: { ...res.data },
      });

      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
export const updateOtherInfo =
  (gender: string, work: string, aspire: string, birthday: Date, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
    if (!auth.access_token || !auth.user) return;
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    try {
      console.log({
        work: work ? work : auth.user.work,
        gender: gender ? gender : auth.user.gender,
        aspire: aspire ? aspire : auth.user.aspire,
        birthday: birthday ? birthday : auth.user.birthday,
      });
      const res = await postAPI(
        "updateotherinfo",
        {
          work: work ? work : auth.user.work,
          gender: gender ? gender : auth.user.gender,
          aspire: aspire ? aspire : auth.user.aspire,
          birthday: birthday ? birthday : auth.user.birthday,
        },
        access_token
      );
      const blog = await getAPI(
        `home/signedblogsbycategory?page=1&limit=${8}`,
        auth.access_token
      );
      dispatch({
        type: GET_HOME_BLOGS,
        payload: { ...res.data },
      });

      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
