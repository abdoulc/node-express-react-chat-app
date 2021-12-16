
import { PROCESS_MESSAGE } from '../types/actionTypes';

export const processMessageAction = (encrypt, text, cypher) =>{
    return {
        type: PROCESS_MESSAGE,
        payload:{
            encrypt, 
            text, 
            cypher
        }
    }
}