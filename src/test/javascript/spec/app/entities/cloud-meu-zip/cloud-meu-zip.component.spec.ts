/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CornerstoneCloudServerTestModule } from '../../../test.module';
import { CloudMeuZipComponent } from '../../../../../../main/webapp/app/entities/cloud-meu-zip/cloud-meu-zip.component';
import { CloudMeuZipService } from '../../../../../../main/webapp/app/entities/cloud-meu-zip/cloud-meu-zip.service';
import { CloudMeuZip } from '../../../../../../main/webapp/app/entities/cloud-meu-zip/cloud-meu-zip.model';

describe('Component Tests', () => {

    describe('CloudMeuZip Management Component', () => {
        let comp: CloudMeuZipComponent;
        let fixture: ComponentFixture<CloudMeuZipComponent>;
        let service: CloudMeuZipService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CornerstoneCloudServerTestModule],
                declarations: [CloudMeuZipComponent],
                providers: [
                    CloudMeuZipService
                ]
            })
            .overrideTemplate(CloudMeuZipComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CloudMeuZipComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CloudMeuZipService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CloudMeuZip(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cloudMeuZips[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
