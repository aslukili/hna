export interface User {
    id: number,
    fullName: string,
    username: string,
    email: string,
    karma: number,
    role: string,
    about: string,
    // TODO: add followers and followings
}