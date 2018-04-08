import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CornerstoneCloudServerSharedModule } from '../../shared';
import {
    CloudMeuConfigurationService,
    CloudMeuConfigurationPopupService,
    CloudMeuConfigurationComponent,
    CloudMeuConfigurationDetailComponent,
    CloudMeuConfigurationDialogComponent,
    CloudMeuConfigurationPopupComponent,
    CloudMeuConfigurationDeletePopupComponent,
    CloudMeuConfigurationDeleteDialogComponent,
    cloudMeuConfigurationRoute,
    cloudMeuConfigurationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cloudMeuConfigurationRoute,
    ...cloudMeuConfigurationPopupRoute,
];

@NgModule({
    imports: [
        CornerstoneCloudServerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CloudMeuConfigurationComponent,
        CloudMeuConfigurationDetailComponent,
        CloudMeuConfigurationDialogComponent,
        CloudMeuConfigurationDeleteDialogComponent,
        CloudMeuConfigurationPopupComponent,
        CloudMeuConfigurationDeletePopupComponent,
    ],
    entryComponents: [
        CloudMeuConfigurationComponent,
        CloudMeuConfigurationDialogComponent,
        CloudMeuConfigurationPopupComponent,
        CloudMeuConfigurationDeleteDialogComponent,
        CloudMeuConfigurationDeletePopupComponent,
    ],
    providers: [
        CloudMeuConfigurationService,
        CloudMeuConfigurationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CornerstoneCloudServerCloudMeuConfigurationModule {}
