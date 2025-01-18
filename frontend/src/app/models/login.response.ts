/**
 * Definiert das JSON um eine LoginResponse zu beschreiben.
 * 
 * Das JSON braucht nur den OK-Fall zu beschreiben, Fehler
 * (also HTTP-StatusCodes >= 400) werden durch den ErrorInterceptor
 * behandelt und landen nie (!!!) im Anwendungs-Code von Services.
 */
export interface ILoginResponse {
    token: string
}

/**
 * Die LoginResponse als TS-Objekt
 */
export class LoginResponse {

    /**
     * 
     * @param token 
     */
    constructor(
        public readonly token: string) {

    }

    /**
     * Transferiere ein JSON mit der OLoginResponse-Signatur
     * in ein neues LoginRespoinse-Objekt
     * 
     * @param json 
     * @returns 
     */
    public static fromJSON(json: ILoginResponse): LoginResponse {
        return new LoginResponse(json.token);
    }

    /**
     * Lege ein neues, leeres LoginResponse-Objekt an
     * 
     * @returns 
     */
    public static empty(): LoginResponse {
        return new LoginResponse('');
    }

    /**
     * Prüfe, ob das LoginResponse-Objekt leer ist
     */
    public get isEmpty(): boolean {
        return this.token === '';
    }
}