import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CloudEpg } from './cloud-epg.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CloudEpg>;

@Injectable()
export class CloudEpgService {

    private resourceUrl =  SERVER_API_URL + 'api/cloud-epgs';

    constructor(private http: HttpClient) { }

    create(cloudEpg: CloudEpg): Observable<EntityResponseType> {
        const copy = this.convert(cloudEpg);
        return this.http.post<CloudEpg>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cloudEpg: CloudEpg): Observable<EntityResponseType> {
        const copy = this.convert(cloudEpg);
        return this.http.put<CloudEpg>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CloudEpg>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CloudEpg[]>> {
        const options = createRequestOption(req);
        return this.http.get<CloudEpg[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CloudEpg[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CloudEpg = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CloudEpg[]>): HttpResponse<CloudEpg[]> {
        const jsonResponse: CloudEpg[] = res.body;
        const body: CloudEpg[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CloudEpg.
     */
    private convertItemFromServer(cloudEpg: CloudEpg): CloudEpg {
        const copy: CloudEpg = Object.assign({}, cloudEpg);
        return copy;
    }

    /**
     * Convert a CloudEpg to a JSON which can be sent to the server.
     */
    private convert(cloudEpg: CloudEpg): CloudEpg {
        const copy: CloudEpg = Object.assign({}, cloudEpg);
        return copy;
    }
}
