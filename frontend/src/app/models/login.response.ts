export interface ILoginResponse {
    token: string
}

export class LoginResponse {

    constructor(
        public readonly token: string) {

    }

    public static fromJSON(json: ILoginResponse): LoginResponse {
        return new LoginResponse(json.token);
    }
}