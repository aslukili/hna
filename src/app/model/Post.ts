export interface Post {
    id: string, 
    authorUsername: string,
    type: string,
    title: string,
    url: string,
    description: string,
    tags: string[],
    comments: string[],
    score: number,
    upVotes: number,
    downVotes: number,
    descendants: number,
    createdAt: Date,
    updatedAt: Date,
    notEdited: boolean
    notDeleted: boolean
}