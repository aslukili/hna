export interface User {
    id: number,
    fullName: string,
    username: string,
    email: string,
    karma: number,
    role: string,
    about: string,
    followers: User[],
    following: User[],
}
