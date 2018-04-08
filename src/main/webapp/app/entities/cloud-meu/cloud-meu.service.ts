import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CloudMeu } from './cloud-meu.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CloudMeu>;

@Injectable()
export class CloudMeuService {

    private resourceUrl =  SERVER_API_URL + 'api/cloud-meus';

    constructor(private http: HttpClient) { }

    create(cloudMeu: CloudMeu): Observable<EntityResponseType> {
        const copy = this.convert(cloudMeu);
        return this.http.post<CloudMeu>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cloudMeu: CloudMeu): Observable<EntityResponseType> {
        const copy = this.convert(cloudMeu);
        return this.http.put<CloudMeu>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CloudMeu>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CloudMeu[]>> {
        const options = createRequestOption(req);
        return this.http.get<CloudMeu[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CloudMeu[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CloudMeu = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CloudMeu[]>): HttpResponse<CloudMeu[]> {
        const jsonResponse: CloudMeu[] = res.body;
        const body: CloudMeu[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CloudMeu.
     */
    private convertItemFromServer(cloudMeu: CloudMeu): CloudMeu {
        const copy: CloudMeu = Object.assign({}, cloudMeu);
        return copy;
    }

    /**
     * Convert a CloudMeu to a JSON which can be sent to the server.
     */
    private convert(cloudMeu: CloudMeu): CloudMeu {
        const copy: CloudMeu = Object.assign({}, cloudMeu);
        return copy;
    }
}
