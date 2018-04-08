/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CornerstoneCloudServerTestModule } from '../../../test.module';
import { CloudMeuComponent } from '../../../../../../main/webapp/app/entities/cloud-meu/cloud-meu.component';
import { CloudMeuService } from '../../../../../../main/webapp/app/entities/cloud-meu/cloud-meu.service';
import { CloudMeu } from '../../../../../../main/webapp/app/entities/cloud-meu/cloud-meu.model';

describe('Component Tests', () => {

    describe('CloudMeu Management Component', () => {
        let comp: CloudMeuComponent;
        let fixture: ComponentFixture<CloudMeuComponent>;
        let service: CloudMeuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CornerstoneCloudServerTestModule],
                declarations: [CloudMeuComponent],
                providers: [
                    CloudMeuService
                ]
            })
            .overrideTemplate(CloudMeuComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CloudMeuComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CloudMeuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CloudMeu(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cloudMeus[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
