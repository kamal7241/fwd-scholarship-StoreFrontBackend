interface ErrorModel {
    status:number ,
    message : string,
}
export class ResonseError extends Error implements ErrorModel {
    status: number;
    message: string;
    constructor(status:number , message:string){
        super(message);
        this.status = status;
        this.message = message;
    }
}