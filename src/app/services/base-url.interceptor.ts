import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(private apiBaseUrl: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `${this.apiBaseUrl}${req.url}` });
    return next.handle(apiReq);
  }
}
