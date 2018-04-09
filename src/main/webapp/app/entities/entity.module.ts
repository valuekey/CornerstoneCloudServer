import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CornerstoneCloudServerCloudMeuModule } from './cloud-meu/cloud-meu.module';
import { CornerstoneCloudServerCloudMeuConfigurationModule } from './cloud-meu-configuration/cloud-meu-configuration.module';
import { CornerstoneCloudServerCloudEpgModule } from './cloud-epg/cloud-epg.module';
import { CornerstoneCloudServerCloudAppModule } from './cloud-app/cloud-app.module';
import { CornerstoneCloudServerCloudMeuZipModule } from './cloud-meu-zip/cloud-meu-zip.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CornerstoneCloudServerCloudMeuModule,
        CornerstoneCloudServerCloudMeuConfigurationModule,
        CornerstoneCloudServerCloudEpgModule,
        CornerstoneCloudServerCloudAppModule,
        CornerstoneCloudServerCloudMeuZipModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CornerstoneCloudServerEntityModule {}
