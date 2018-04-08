import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CloudMeuConfiguration } from './cloud-meu-configuration.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CloudMeuConfiguration>;

@Injectable()
export class CloudMeuConfigurationService {

    private resourceUrl =  SERVER_API_URL + 'api/cloud-meu-configurations';

    constructor(private http: HttpClient) { }

    create(cloudMeuConfiguration: CloudMeuConfiguration): Observable<EntityResponseType> {
        const copy = this.convert(cloudMeuConfiguration);
        return this.http.post<CloudMeuConfiguration>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cloudMeuConfiguration: CloudMeuConfiguration): Observable<EntityResponseType> {
        const copy = this.convert(cloudMeuConfiguration);
        return this.http.put<CloudMeuConfiguration>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CloudMeuConfiguration>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CloudMeuConfiguration[]>> {
        const options = createRequestOption(req);
        return this.http.get<CloudMeuConfiguration[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CloudMeuConfiguration[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CloudMeuConfiguration = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CloudMeuConfiguration[]>): HttpResponse<CloudMeuConfiguration[]> {
        const jsonResponse: CloudMeuConfiguration[] = res.body;
        const body: CloudMeuConfiguration[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CloudMeuConfiguration.
     */
    private convertItemFromServer(cloudMeuConfiguration: CloudMeuConfiguration): CloudMeuConfiguration {
        const copy: CloudMeuConfiguration = Object.assign({}, cloudMeuConfiguration);
        return copy;
    }

    /**
     * Convert a CloudMeuConfiguration to a JSON which can be sent to the server.
     */
    private convert(cloudMeuConfiguration: CloudMeuConfiguration): CloudMeuConfiguration {
        const copy: CloudMeuConfiguration = Object.assign({}, cloudMeuConfiguration);
        return copy;
    }
}
