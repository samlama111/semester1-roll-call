import { ObjectId } from "mongodb";
import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqGetByClass extends BaseRequest {
    class_id: ObjectId
}

export interface ResGetByClass extends BaseResponse {
   
}

export const conf: BaseConf = {
    
}