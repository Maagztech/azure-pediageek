import { Dispatch } from "redux";
import { IAuth, IAuthType, AUTH } from "../types/authType";
import { IAlertType, ALERT } from "../types/alertType";

import { checkImage, imageUpload } from "../../utils/ImageUpload";
import { patchAPI, getAPI, postAPI } from "../../utils/FetchData";
import { checkPassword } from "../../utils/Valid";

import { GET_OTHER_INFO, IGetOtherInfoType } from "../types/profileType";

import { checkTokenExp } from "../../utils/checkTokenExp";
import { IUser } from "../../utils/TypeScript";

export const updateUserPreferance =
  (avatar: File, name: string, paytm: string, about: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return;

    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;

    let url = "";
    try {
      if (avatar) {
        const check = checkImage(avatar);
        if (check) return dispatch({ type: ALERT, payload: { errors: check } });

        const photo = await imageUpload(avatar);
        url = photo.url;
      }

      dispatch({
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            paytm: paytm ? paytm : auth.user.paytm,
            about: about ? about : auth.user.about,
            avatar: url ? url : auth.user.avatar,
            name: name ? name : auth.user.name,
          },
        },
      });

      const res = await patchAPI(
        "user",
        {
          avatar: url ? url : auth.user.avatar,
          name: name ? name : auth.user.name,
          paytm: paytm ? paytm : auth.user.paytm,
          about: about ? about : auth.user.about,
        },
        access_token
      );

      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };