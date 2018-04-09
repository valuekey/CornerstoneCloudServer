/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CornerstoneCloudServerTestModule } from '../../../test.module';
import { CloudMeuZipDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cloud-meu-zip/cloud-meu-zip-delete-dialog.component';
import { CloudMeuZipService } from '../../../../../../main/webapp/app/entities/cloud-meu-zip/cloud-meu-zip.service';

describe('Component Tests', () => {

    describe('CloudMeuZip Management Delete Component', () => {
        let comp: CloudMeuZipDeleteDialogComponent;
        let fixture: ComponentFixture<CloudMeuZipDeleteDialogComponent>;
        let service: CloudMeuZipService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CornerstoneCloudServerTestModule],
                declarations: [CloudMeuZipDeleteDialogComponent],
                providers: [
                    CloudMeuZipService
                ]
            })
            .overrideTemplate(CloudMeuZipDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CloudMeuZipDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CloudMeuZipService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
