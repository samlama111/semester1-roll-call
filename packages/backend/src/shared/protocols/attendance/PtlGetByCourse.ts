import { ObjectId } from 'mongodb'

import { CourseAttendance } from '../../models/CourseAttendance'
import { BaseRequest, BaseResponse } from '../base'

export interface ReqGetByCourse extends BaseRequest {
    course_id: ObjectId;
}

export interface ResGetByCourse extends BaseResponse {
    attendance: CourseAttendance;
}
