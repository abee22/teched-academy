import { RecordStatus } from './index.js';

export type Course = {
    id: string;
    name: string;
    description?: string;
    insttuctor: string;
    duration: number;
    status: RecordStatus;
}
