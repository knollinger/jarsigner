import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { LoginRequest } from '../models/login.request';
import { ILoginResponse, LoginResponse } from '../models/login.response';

import { BackendRoutingService } from './backend-routing.service';



@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private static KEY_TOKEN: string = 'session.token';
    private static routes: Map<string, string> = new Map<string, string>(
        [
            ['login', 'v1/session/login']
        ]
    );

    private currentToken: string | null = null;

    /**
     * 
     * @param backendRouter 
     * @param http 
     */
    constructor(
        private backendRouter: BackendRoutingService,
        private http: HttpClient) {
    }

    /**
     * Liefere den aktuellen Token
     * 
     * @returns den token oder null wenn grade keiner vorliegt
     */
    public get token(): string | null {
        return this.currentToken;
    }

    /**
     * setze den aktuellen Token.
     */
    public set token(token: string | null) {

        this.currentToken = token;
    }

    /**
     * 
     * @param loginReq 
     */
    public login(loginReq: LoginRequest): Observable<LoginResponse> {

        const url = this.backendRouter.getRouteForName('login', SessionService.routes);
        return this.http.post<ILoginResponse>(url, loginReq.toJSON()).pipe(
            map(rsp => {
                const result = LoginResponse.fromJSON(rsp);
                this.token = result.token;
                return result;
            })
        );
    }
}
