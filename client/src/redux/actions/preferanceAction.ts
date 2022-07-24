import { Dispatch } from "redux";
import { IAuth } from "../types/authType";
import { IAlertType, ALERT } from "../types/alertType";
import { getAPI, postAPI } from "../../utils/FetchData";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { IPreferance } from "../../utils/TypeScript";
import { GET_PREFERANCE, IGetPreferanceType } from "../types/preferanceType";
import {
  GET_HOME_BLOGS,
  IGetHomeBlogsType,
  IHomeBlogs,
} from "../types/blogType";

export const updateUserPre =
  (interests: string[], categoryid: string[], auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
    if (!auth.access_token || !auth.user) return;
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
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
      dispatch({ type: ALERT, payload: { loading: false } });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
