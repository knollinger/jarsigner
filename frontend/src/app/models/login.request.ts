export interface ILoginRequest {
    user: string,
    password: string
}

export class LoginRequest {

    constructor(
        public readonly user: string,
        public readonly password: string) {

    }

    public static fromJSON(json: ILoginRequest): LoginRequest {
        return new LoginRequest(json.user, json.password);
    }

    public toJSON(): ILoginRequest {
        return {
            user: this.user,
            password: this.password
        }
    }

    public istValid(): boolean {
        return this.user !== '' && this.password !== '';
    }
}