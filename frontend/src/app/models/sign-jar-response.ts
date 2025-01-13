export interface IJarError {
    jarName: string,
    error: string
}

export class JarError {

    constructor(
        public readonly jarName: string,
        public readonly error: string) {

    }

    public static fromJSON(json: IJarError): JarError {
        return new JarError(json.jarName, json.error);
    }
}

/**
 * 
 */
export interface ISignJarsResponse {
    taskId: string
    jarErrors: IJarError[]
}

/**
 * 
 */
export class SignJarsResponse {

    /**
     * 
     * @param taskId 
     */
    constructor(
        public readonly taskId: string,
        public readonly jarErrors: JarError[]) {

    }

    /**
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
}