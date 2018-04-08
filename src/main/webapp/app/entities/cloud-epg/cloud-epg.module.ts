import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CornerstoneCloudServerSharedModule } from '../../shared';
import {
    CloudEpgService,
    CloudEpgPopupService,
    CloudEpgComponent,
    CloudEpgDetailComponent,
    CloudEpgDialogComponent,
    CloudEpgPopupComponent,
    CloudEpgDeletePopupComponent,
    CloudEpgDeleteDialogComponent,
    cloudEpgRoute,
    cloudEpgPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cloudEpgRoute,
    ...cloudEpgPopupRoute,
];

@NgModule({
    imports: [
        CornerstoneCloudServerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CloudEpgComponent,
        CloudEpgDetailComponent,
        CloudEpgDialogComponent,
        CloudEpgDeleteDialogComponent,
        CloudEpgPopupComponent,
        CloudEpgDeletePopupComponent,
    ],
    entryComponents: [
        CloudEpgComponent,
        CloudEpgDialogComponent,
        CloudEpgPopupComponent,
        CloudEpgDeleteDialogComponent,
        CloudEpgDeletePopupComponent,
    ],
    providers: [
        CloudEpgService,
        CloudEpgPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CornerstoneCloudServerCloudEpgModule {}
