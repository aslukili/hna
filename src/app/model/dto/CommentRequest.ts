export interface CommentRequest {
    authorUsername: string,
    content: string,
    parent: string | null,
}