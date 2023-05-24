import axios from "axios";
import Swal from "sweetalert2";
import strings from "translation";

const user = JSON.parse(localStorage.getItem("user") as string);
let headers: any = {
  "Content-Type": "application/json",
};
if (user && user.token) {
  headers["Authorization"] = `Bearer ${user.token}`;
}
// export const BASE_URL = "http://192.168.1.138/api/public"
export const BASE_URL = "https://oslapi.invincix.com"
const headerOption = {
  axios_option: {
    baseURL: `${BASE_URL}/api` ,
    headers,
  },
};

const axios_option = headerOption.axios_option;
const instance = axios.create(axios_option);

instance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      Swal.fire({
        icon: "warning",
        title: strings["SESSION.EXPIRED"],
        text: strings["SESSION.EXPIRED.MESSAGE"],
      }).then((result) => {
        localStorage.clear();
        window.location.href = "/";
      });
    }
    const err = {
      url: error?.toJSON().config.baseURL,
      body: JSON.parse(error?.toJSON().config.data),
      message: strings[error?.response?.data?.error?.message],
    };
    return Promise.reject(err);
  }
);

export { instance as axios };
