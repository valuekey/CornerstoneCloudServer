import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CloudMeuZipComponent } from './cloud-meu-zip.component';
import { CloudMeuZipDetailComponent } from './cloud-meu-zip-detail.component';
import { CloudMeuZipPopupComponent } from './cloud-meu-zip-dialog.component';
import { CloudMeuZipDeletePopupComponent } from './cloud-meu-zip-delete-dialog.component';

export const cloudMeuZipRoute: Routes = [
    {
        path: 'cloud-meu-zip',
        component: CloudMeuZipComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudMeuZip.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cloud-meu-zip/:id',
        component: CloudMeuZipDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudMeuZip.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cloudMeuZipPopupRoute: Routes = [
    {
        path: 'cloud-meu-zip-new',
        component: CloudMeuZipPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudMeuZip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cloud-meu-zip/:id/edit',
        component: CloudMeuZipPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudMeuZip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cloud-meu-zip/:id/delete',
        component: CloudMeuZipDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudMeuZip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
