export interface Notification {
    id: number;
    userUsername: string;
    message: string;
    isRead: boolean;
    sentAt: Date;
}