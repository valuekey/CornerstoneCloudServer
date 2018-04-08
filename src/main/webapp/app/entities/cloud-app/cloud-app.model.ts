import { BaseEntity } from './../../shared';

export const enum AppStatus {
    'APP_BUILDING',
    'APP_BUILD_SUCCESS',
    'APP_BUILD_FAILED',
    'APP_NOT_SUPPORT'
}

export class CloudApp implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public epgs?: string,
        public configurations?: any,
        public uploadFile?: any,
        public status?: AppStatus,
        public accountName?: string,
        public buildFileId?: string,
        public resouceMapping?: any,
        public buildLog?: any,
        public appContent?: any,
    ) {
    }
}
