/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CornerstoneCloudServerTestModule } from '../../../test.module';
import { CloudMeuDetailComponent } from '../../../../../../main/webapp/app/entities/cloud-meu/cloud-meu-detail.component';
import { CloudMeuService } from '../../../../../../main/webapp/app/entities/cloud-meu/cloud-meu.service';
import { CloudMeu } from '../../../../../../main/webapp/app/entities/cloud-meu/cloud-meu.model';

describe('Component Tests', () => {

    describe('CloudMeu Management Detail Component', () => {
        let comp: CloudMeuDetailComponent;
        let fixture: ComponentFixture<CloudMeuDetailComponent>;
        let service: CloudMeuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CornerstoneCloudServerTestModule],
                declarations: [CloudMeuDetailComponent],
                providers: [
                    CloudMeuService
                ]
            })
            .overrideTemplate(CloudMeuDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CloudMeuDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CloudMeuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CloudMeu(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cloudMeu).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
