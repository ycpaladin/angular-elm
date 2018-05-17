import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PositionService } from '../services/position.service';

@Injectable({
    providedIn: 'root'
})
export class OrderGuard implements CanActivate {


    constructor(private ponsitionService: PositionService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return new Observable<boolean>(observer => {

            // switch (route.routeConfig.path) {
            //     case 'home/:geohash':
            //         if (route.params['geohash']) {
            //             observer.next(true);
            //         }
            //         break;
            //     case '/msite/search':
            //         if()
            //         break;
            // }
            // console.log(route);
            // if(route)
            observer.next(true);
            return () => {

            };
        });
    }
}
