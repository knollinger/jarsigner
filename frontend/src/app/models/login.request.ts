/**
 * Definiert das JSON um einen LoginRequest zu beschreiben
 */
export interface ILoginRequest {
    user: string,
    password: string
}

/** 
 * Der Login-Request
 */
export class LoginRequest {

    /**
     * 
     * @param user 
     * @param password 
     */
    constructor(
        public readonly user: string,
        public readonly password: string) {

    }

    /**
     * Transformiere ein JSON mit der signatur von ILoginRequest
     * in ein neues LoginRequest-Objekt
     * 
     * @param json 
     * @returns 
     */
    public static fromJSON(json: ILoginRequest): LoginRequest {
        return new LoginRequest(json.user, json.password);
    }

    /**
     * Transformiere das Objekt in ein JSON mit der Signatur 
     * von ILoginRequest
     * 
     * @returns 
     */
    public toJSON(): ILoginRequest {
        return {
            user: this.user,
            password: this.password
        }
    }

    /**
     * Erzeuge ein neues leeres Objekt
     * @returns 
     */
    public static empty(): LoginRequest {
        return new LoginRequest('', '');
    }    

    /**
     * Ist das Objekt leer?
     */
    public get isEmpty(): boolean {
        return this.user === '';
    }    
}
