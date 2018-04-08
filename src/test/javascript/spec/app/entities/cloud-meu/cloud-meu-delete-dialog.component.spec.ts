/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CornerstoneCloudServerTestModule } from '../../../test.module';
import { CloudMeuDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cloud-meu/cloud-meu-delete-dialog.component';
import { CloudMeuService } from '../../../../../../main/webapp/app/entities/cloud-meu/cloud-meu.service';

describe('Component Tests', () => {

    describe('CloudMeu Management Delete Component', () => {
        let comp: CloudMeuDeleteDialogComponent;
        let fixture: ComponentFixture<CloudMeuDeleteDialogComponent>;
        let service: CloudMeuService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CornerstoneCloudServerTestModule],
                declarations: [CloudMeuDeleteDialogComponent],
                providers: [
                    CloudMeuService
                ]
            })
            .overrideTemplate(CloudMeuDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CloudMeuDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CloudMeuService);
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
