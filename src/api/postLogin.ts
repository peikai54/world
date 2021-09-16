import http from "@/utils/http";

namespace APIPostLogin {
  export interface Params {
    username: string;
    password: string;
  }

  export interface Response {
    message: string;
    code: number;
  }

  export const url = "/login";

  export const request = (params: Params): Promise<Response> => {
    return http.post(url, {
      ...params,
    });
  };
}

export default APIPostLogin;
