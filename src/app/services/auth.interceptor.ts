import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, exhaustMap, Observable, take } from "rxjs";
import { HttpServiceService } from "./http-service.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public authService: HttpServiceService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.authService.currentUserSubject.pipe(
            // Set authentication key globally
            take(1),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedRequest = req.clone({
                    headers: new HttpHeaders().set('auth', user)
                })
                return next.handle(modifiedRequest)
            })
        ).pipe(
            // Error Handling
            catchError(err => {
                throw alert(err.error.message)
            })
        )
    }
}