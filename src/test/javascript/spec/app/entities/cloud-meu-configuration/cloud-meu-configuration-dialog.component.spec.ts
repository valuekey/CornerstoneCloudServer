/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CornerstoneCloudServerTestModule } from '../../../test.module';
import { CloudMeuConfigurationDialogComponent } from '../../../../../../main/webapp/app/entities/cloud-meu-configuration/cloud-meu-configuration-dialog.component';
import { CloudMeuConfigurationService } from '../../../../../../main/webapp/app/entities/cloud-meu-configuration/cloud-meu-configuration.service';
import { CloudMeuConfiguration } from '../../../../../../main/webapp/app/entities/cloud-meu-configuration/cloud-meu-configuration.model';
import { CloudMeuService } from '../../../../../../main/webapp/app/entities/cloud-meu';

describe('Component Tests', () => {

    describe('CloudMeuConfiguration Management Dialog Component', () => {
        let comp: CloudMeuConfigurationDialogComponent;
        let fixture: ComponentFixture<CloudMeuConfigurationDialogComponent>;
        let service: CloudMeuConfigurationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CornerstoneCloudServerTestModule],
                declarations: [CloudMeuConfigurationDialogComponent],
                providers: [
                    CloudMeuService,
                    CloudMeuConfigurationService
                ]
            })
            .overrideTemplate(CloudMeuConfigurationDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CloudMeuConfigurationDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CloudMeuConfigurationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CloudMeuConfiguration(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cloudMeuConfiguration = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cloudMeuConfigurationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CloudMeuConfiguration();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cloudMeuConfiguration = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cloudMeuConfigurationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
