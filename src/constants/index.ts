export enum Enviroment {
    Test = 'test',
    Development = 'dev',
    Production = 'Production',
}
export enum ports {
    Test = 5000 ,
    Dev = 3000 ,
}
export enum ErrorStatus {
    NotFound = 404,
    NotAuthorized = 401,
    Forbidden = 403,
    BadRequest = 400,
}

export enum OrderStatus {
    complete = 'complete',
    active = 'active',
}
export enum ErrorMessages {
    serverError = 'something went wrong , try again',
    NotFound = 'Page Not Found',
    NotAuthorized = 'you re Not Authorized',
    NotAuthenticated = 'user name or password is wrong',
}
