export interface Comment {
    id: string,
    authorUsername: string,
    content: string,
    post: string,
    parent: string | null,
    children: string[] | null,
    level: number,
    score: number,
    upVotes: number,
    downVotes: number,
    notDeleted: boolean,
    notUpdated: boolean,
    showReply?: boolean
}