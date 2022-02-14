import { ResonseError } from './ResponseError';
export const asyncHandlerWrapper = async<T>(asyncHandler: () => Promise<T> , error:ResonseError ):Promise<T> =>{
    try {
       return  await asyncHandler();
    } catch (e) {
        if(error)
            throw error;
        else 
            throw e;
    }
}