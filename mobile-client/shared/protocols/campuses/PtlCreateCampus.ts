import { DbCampus } from "../../db/DbCampus";
import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqCreateCampus extends BaseRequest {
    address: string;
    name: string;
}

export interface ResCreateCampus extends BaseResponse {
    campus: DbCampus;
}

export const conf: BaseConf = {
    
}