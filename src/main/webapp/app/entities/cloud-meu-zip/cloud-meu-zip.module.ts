import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CornerstoneCloudServerSharedModule } from '../../shared';
import {
    CloudMeuZipService,
    CloudMeuZipPopupService,
    CloudMeuZipComponent,
    CloudMeuZipDetailComponent,
    CloudMeuZipDialogComponent,
    CloudMeuZipPopupComponent,
    CloudMeuZipDeletePopupComponent,
    CloudMeuZipDeleteDialogComponent,
    cloudMeuZipRoute,
    cloudMeuZipPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cloudMeuZipRoute,
    ...cloudMeuZipPopupRoute,
];

@NgModule({
    imports: [
        CornerstoneCloudServerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CloudMeuZipComponent,
        CloudMeuZipDetailComponent,
        CloudMeuZipDialogComponent,
        CloudMeuZipDeleteDialogComponent,
        CloudMeuZipPopupComponent,
        CloudMeuZipDeletePopupComponent,
    ],
    entryComponents: [
        CloudMeuZipComponent,
        CloudMeuZipDialogComponent,
        CloudMeuZipPopupComponent,
        CloudMeuZipDeleteDialogComponent,
        CloudMeuZipDeletePopupComponent,
    ],
    providers: [
        CloudMeuZipService,
        CloudMeuZipPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CornerstoneCloudServerCloudMeuZipModule {}
