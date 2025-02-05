/**
 * Definiere das JSON um einen einzelnen Signatur-Fehler 
 * für ein JAR zu beschreiben
 */
export interface IJarError {
    jarName: string,
    error: string
}

/**
 * Der JAR-Signatur-Fehler als TS-Objekt
 */
export class JarError {

    /**
     * 
     * @param jarName 
     * @param error 
     */
    constructor(
        public readonly jarName: string,
        public readonly error: string) {

    }

    /**
     * Transferiere ein JSON mit einer IJarError-Signatur in ein JsrError-Objekt
     * 
     * @param json 
     * @returns 
     */
    public static fromJSON(json: IJarError): JarError {
        return new JarError(json.jarName, json.error);
    }
}

/**
 * Definiert die JSON-Response eines SignJar-API-Aufrufs
 */
export interface ISignJarsResponse {
    taskId: string
    jarErrors: IJarError[]
}

/**
 * Die SignJarResponse als TS-Objekt
 */
export class SignJarsResponse {

    /**
     * 
     * @param taskId 
     * @param jarErrors 
     */
    constructor(
        public readonly taskId: string,
        public readonly jarErrors: JarError[]) {

    }

    /**
     * Transferiere ein JSON mit der ISignJarsResponse-Signatur
     * in ein SignJarsResponse-Objekt.
     * 
     * @param json 
     * @returns 
     */
    public static fromJSON(json: ISignJarsResponse): SignJarsResponse {

        const errors: JarError[] = Array<JarError>(0);
        json.jarErrors.forEach(error => {
            errors.push(JarError.fromJSON(error));
        })
        return new SignJarsResponse(json.taskId, errors);
    }

    /**
     * Erzeuge eine leere SignJarsResponse.
     * 
     * Über Sinn und Zweck an dieser Stelle lässt sich trefflich streiten, 
     * aber alle Models sollten auch in der Lage sein eine leere Instanz zu
     * erzeugen. Das erpart an vielen Stellen blöde Abfragen auf 
     * null/undefined und auch die excessive Benutzung des !-Postfix-Operators.
     * 
     * @returns EIne leere Instanz der SignJarsResponse.
     */
    public static empty(): SignJarsResponse {
        return new SignJarsResponse('', new Array<JarError>(0));
    }

    /**
     * Teste, ob es sich um eine leere Instanz handelt.
     */
    public get isEmpty(): boolean {
        return this.taskId === '';
    }
}