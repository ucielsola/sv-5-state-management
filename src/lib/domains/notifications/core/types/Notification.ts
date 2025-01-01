export interface Notification {
    type: 'info' | 'warning' | 'error' | 'success';
    message: string;
    url?: string;
}