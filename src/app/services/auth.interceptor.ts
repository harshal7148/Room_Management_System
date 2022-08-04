import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, exhaustMap, finalize, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
import { LoaderService } from "./loader.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public authService: AuthService, public loaderService: LoaderService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('start')
        this.loaderService.isLoader.next(true)
        return this.authService.currentUserSubject.pipe(
            // Set authentication key globally
            take(1),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req).pipe(
                        finalize(
                            () => {
                                console.log('stop')
                                this.loaderService.isLoader.next(false);
                            }
                        )
                    );
                }
                const modifiedRequest = req.clone({
                    headers: new HttpHeaders().set('authorization', user)
                })
                return next.handle(modifiedRequest).pipe(
                    finalize(
                        () => {
                            console.log('stop')
                            this.loaderService.isLoader.next(false);
                        }
                    )
                )
            })
        ).pipe(
            // Error Handling
            catchError(err => {
                console.log(err);
                this.loaderService.isLoader.next(false);
                throw alert(err.error.message)
            })
        )
    }
}