/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CornerstoneCloudServerTestModule } from '../../../test.module';
import { CloudEpgComponent } from '../../../../../../main/webapp/app/entities/cloud-epg/cloud-epg.component';
import { CloudEpgService } from '../../../../../../main/webapp/app/entities/cloud-epg/cloud-epg.service';
import { CloudEpg } from '../../../../../../main/webapp/app/entities/cloud-epg/cloud-epg.model';

describe('Component Tests', () => {

    describe('CloudEpg Management Component', () => {
        let comp: CloudEpgComponent;
        let fixture: ComponentFixture<CloudEpgComponent>;
        let service: CloudEpgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CornerstoneCloudServerTestModule],
                declarations: [CloudEpgComponent],
                providers: [
                    CloudEpgService
                ]
            })
            .overrideTemplate(CloudEpgComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CloudEpgComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CloudEpgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CloudEpg(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cloudEpgs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
