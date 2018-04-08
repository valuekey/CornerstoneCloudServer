import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CloudMeuComponent } from './cloud-meu.component';
import { CloudMeuDetailComponent } from './cloud-meu-detail.component';
import { CloudMeuPopupComponent } from './cloud-meu-dialog.component';
import { CloudMeuDeletePopupComponent } from './cloud-meu-delete-dialog.component';

export const cloudMeuRoute: Routes = [
    {
        path: 'cloud-meu',
        component: CloudMeuComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudMeu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cloud-meu/:id',
        component: CloudMeuDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudMeu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cloudMeuPopupRoute: Routes = [
    {
        path: 'cloud-meu-new',
        component: CloudMeuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudMeu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cloud-meu/:id/edit',
        component: CloudMeuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudMeu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cloud-meu/:id/delete',
        component: CloudMeuDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudMeu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
