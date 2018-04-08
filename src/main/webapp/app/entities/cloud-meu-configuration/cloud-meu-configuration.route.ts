import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CloudMeuConfigurationComponent } from './cloud-meu-configuration.component';
import { CloudMeuConfigurationDetailComponent } from './cloud-meu-configuration-detail.component';
import { CloudMeuConfigurationPopupComponent } from './cloud-meu-configuration-dialog.component';
import { CloudMeuConfigurationDeletePopupComponent } from './cloud-meu-configuration-delete-dialog.component';

export const cloudMeuConfigurationRoute: Routes = [
    {
        path: 'cloud-meu-configuration',
        component: CloudMeuConfigurationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudMeuConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cloud-meu-configuration/:id',
        component: CloudMeuConfigurationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudMeuConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cloudMeuConfigurationPopupRoute: Routes = [
    {
        path: 'cloud-meu-configuration-new',
        component: CloudMeuConfigurationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudMeuConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cloud-meu-configuration/:id/edit',
        component: CloudMeuConfigurationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudMeuConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cloud-meu-configuration/:id/delete',
        component: CloudMeuConfigurationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cornerstoneCloudServerApp.cloudMeuConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
