import { BaseEntity } from './../../shared';

export class CloudEpg implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public epgDefinition?: any,
        public accountName?: string,
        public urlMappings?: any,
        public graphInfo?: any,
    ) {
    }
}
