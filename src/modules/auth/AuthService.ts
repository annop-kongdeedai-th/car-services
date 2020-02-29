import { request } from "./../../utils";

const userUrl = `${process.env.REACT_APP_API_ENDPOINT}/users`;

interface IAuthSignin {
  email: string;
  password: string;
}

class AuthService {
  constructor(protected url = "") {
    this.url = url;
  }

  public getUrl() {
    return this.url;
  }

  public async sign_in(queries: IAuthSignin): Promise<any> {
    try {
      const result = await request.get(this.url, { queries });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
export const authAPI = new AuthService(userUrl);
