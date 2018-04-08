import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CloudAppComponent } from './cloud-app.component';
import { CloudAppDetailComponent } from './cloud-app-detail.component';
import { CloudAppPopupComponent } from './cloud-app-dialog.component';
import { CloudAppDeletePopupComponent } from './cloud-app-delete-dialog.component';

export const cloudAppRoute: Routes = [
    {
        path: 'cloud-app',
        component: CloudAppComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudApp.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cloud-app/:id',
        component: CloudAppDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudApp.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cloudAppPopupRoute: Routes = [
    {
        path: 'cloud-app-new',
        component: CloudAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudApp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cloud-app/:id/edit',
        component: CloudAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudApp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cloud-app/:id/delete',
        component: CloudAppDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudApp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
