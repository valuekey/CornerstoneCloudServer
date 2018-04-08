/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CornerstoneCloudServerTestModule } from '../../../test.module';
import { CloudEpgDetailComponent } from '../../../../../../main/webapp/app/entities/cloud-epg/cloud-epg-detail.component';
import { CloudEpgService } from '../../../../../../main/webapp/app/entities/cloud-epg/cloud-epg.service';
import { CloudEpg } from '../../../../../../main/webapp/app/entities/cloud-epg/cloud-epg.model';

describe('Component Tests', () => {

    describe('CloudEpg Management Detail Component', () => {
        let comp: CloudEpgDetailComponent;
        let fixture: ComponentFixture<CloudEpgDetailComponent>;
        let service: CloudEpgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CornerstoneCloudServerTestModule],
                declarations: [CloudEpgDetailComponent],
                providers: [
                    CloudEpgService
                ]
            })
            .overrideTemplate(CloudEpgDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CloudEpgDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CloudEpgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CloudEpg(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cloudEpg).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
