import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CloudEpgComponent } from './cloud-epg.component';
import { CloudEpgDetailComponent } from './cloud-epg-detail.component';
import { CloudEpgPopupComponent } from './cloud-epg-dialog.component';
import { CloudEpgDeletePopupComponent } from './cloud-epg-delete-dialog.component';

export const cloudEpgRoute: Routes = [
    {
        path: 'cloud-epg',
        component: CloudEpgComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudEpg.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cloud-epg/:id',
        component: CloudEpgDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudEpg.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cloudEpgPopupRoute: Routes = [
    {
        path: 'cloud-epg-new',
        component: CloudEpgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudEpg.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cloud-epg/:id/edit',
        component: CloudEpgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudEpg.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cloud-epg/:id/delete',
        component: CloudEpgDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudEpg.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
