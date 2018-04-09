/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CornerstoneCloudServerTestModule } from '../../../test.module';
import { CloudMeuZipDialogComponent } from '../../../../../../main/webapp/app/entities/cloud-meu-zip/cloud-meu-zip-dialog.component';
import { CloudMeuZipService } from '../../../../../../main/webapp/app/entities/cloud-meu-zip/cloud-meu-zip.service';
import { CloudMeuZip } from '../../../../../../main/webapp/app/entities/cloud-meu-zip/cloud-meu-zip.model';
import { CloudMeuService } from '../../../../../../main/webapp/app/entities/cloud-meu';

describe('Component Tests', () => {

    describe('CloudMeuZip Management Dialog Component', () => {
        let comp: CloudMeuZipDialogComponent;
        let fixture: ComponentFixture<CloudMeuZipDialogComponent>;
        let service: CloudMeuZipService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CornerstoneCloudServerTestModule],
                declarations: [CloudMeuZipDialogComponent],
                providers: [
                    CloudMeuService,
                    CloudMeuZipService
                ]
            })
            .overrideTemplate(CloudMeuZipDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CloudMeuZipDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CloudMeuZipService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CloudMeuZip(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cloudMeuZip = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cloudMeuZipListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CloudMeuZip();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cloudMeuZip = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cloudMeuZipListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
