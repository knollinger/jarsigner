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

    public static empty(): LoginRequest {
        return new LoginRequest('', '');
    }

    public get isEmpty(): boolean {
        return this.user === '';
    }
    
    public toJSON(): ILoginRequest {
        return {
            user: this.user,
            password: this.password
        }
    }

    public isValid(): boolean {
        return this.user !== '' && this.password !== '';
    }
}