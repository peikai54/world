import http from "@/utils/http";

namespace APIGetAuth {
  export interface Params {}

  export interface Response {
    message: string;
    code: number;
    data: {
      username: string;
    };
  }

  export const url = "/user-info";

  export const request = (params: Params): Promise<Response> => {
    return http.get(url, {
      ...params,
    });
  };
}

export default APIGetAuth;
