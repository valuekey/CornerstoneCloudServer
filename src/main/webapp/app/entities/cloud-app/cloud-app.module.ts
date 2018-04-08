import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CornerstoneCloudServerSharedModule } from '../../shared';
import {
    CloudAppService,
    CloudAppPopupService,
    CloudAppComponent,
    CloudAppDetailComponent,
    CloudAppDialogComponent,
    CloudAppPopupComponent,
    CloudAppDeletePopupComponent,
    CloudAppDeleteDialogComponent,
    cloudAppRoute,
    cloudAppPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cloudAppRoute,
    ...cloudAppPopupRoute,
];

@NgModule({
    imports: [
        CornerstoneCloudServerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CloudAppComponent,
        CloudAppDetailComponent,
        CloudAppDialogComponent,
        CloudAppDeleteDialogComponent,
        CloudAppPopupComponent,
        CloudAppDeletePopupComponent,
    ],
    entryComponents: [
        CloudAppComponent,
        CloudAppDialogComponent,
        CloudAppPopupComponent,
        CloudAppDeleteDialogComponent,
        CloudAppDeletePopupComponent,
    ],
    providers: [
        CloudAppService,
        CloudAppPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CornerstoneCloudServerCloudAppModule {}
