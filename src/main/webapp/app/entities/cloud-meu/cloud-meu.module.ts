import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CornerstoneCloudServerSharedModule } from '../../shared';
import {
    CloudMeuService,
    CloudMeuPopupService,
    CloudMeuComponent,
    CloudMeuDetailComponent,
    CloudMeuDialogComponent,
    CloudMeuPopupComponent,
    CloudMeuDeletePopupComponent,
    CloudMeuDeleteDialogComponent,
    cloudMeuRoute,
    cloudMeuPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cloudMeuRoute,
    ...cloudMeuPopupRoute,
];

@NgModule({
    imports: [
        CornerstoneCloudServerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CloudMeuComponent,
        CloudMeuDetailComponent,
        CloudMeuDialogComponent,
        CloudMeuDeleteDialogComponent,
        CloudMeuPopupComponent,
        CloudMeuDeletePopupComponent,
    ],
    entryComponents: [
        CloudMeuComponent,
        CloudMeuDialogComponent,
        CloudMeuPopupComponent,
        CloudMeuDeleteDialogComponent,
        CloudMeuDeletePopupComponent,
    ],
    providers: [
        CloudMeuService,
        CloudMeuPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CornerstoneCloudServerCloudMeuModule {}
