import { ServiceProto } from 'tsrpc-proto'

import { ReqGetByClass, ResGetByClass } from './attendance/PtlGetByClass'
import { ReqGetByCourse, ResGetByCourse } from './attendance/PtlGetByCourse'
import { ReqCreateCampus, ResCreateCampus } from './campuses/PtlCreateCampus'
import { ReqGetCampus, ResGetCampus } from './campuses/PtlGetCampus'
import { ReqCreateClass, ResCreateClass } from './classes/PtlCreateClass'
import { ReqGetClasses, ResGetClasses } from './classes/PtlGetClasses'
import { ReqListClasses, ResListClasses } from './classes/PtlListClasses'
import { ReqCreateCourse, ResCreateCourse } from './courses/PtlCreateCourse'
import { ReqGetCourses, ResGetCourses } from './courses/PtlGetCourses'
import { ReqEndRollCall, ResEndRollCall } from './roll-call/PtlEndRollCall'
import { ReqEnroll, ResEnroll } from './roll-call/PtlEnroll'
import { ReqGetRollCall, ResGetRollCall } from './roll-call/PtlGetRollCall'
import { ReqStartRollCall, ResStartRollCall } from './roll-call/PtlStartRollCall'
import { ReqTeacherGetRollCall, ResTeacherGetRollCall } from './roll-call/PtlTeacherGetRollCall'
import { ReqCreateStudent, ResCreateStudent } from './students/PtlCreateStudent'
import { ReqListStudents, ResListStudents } from './students/PtlListStudents'
import { ReqCreateTeacher, ResCreateTeacher } from './teachers/PtlCreateTeacher'
import { ReqListTeachers, ResListTeachers } from './teachers/PtlListTeachers'

export interface ServiceType {
    api: {
        'attendance/GetByClass': {
            req: ReqGetByClass;
            res: ResGetByClass;
        };
        'attendance/GetByCourse': {
            req: ReqGetByCourse;
            res: ResGetByCourse;
        };
        'campuses/CreateCampus': {
            req: ReqCreateCampus;
            res: ResCreateCampus;
        };
        'campuses/GetCampus': {
            req: ReqGetCampus;
            res: ResGetCampus;
        };
        'classes/CreateClass': {
            req: ReqCreateClass;
            res: ResCreateClass;
        };
        'classes/GetClasses': {
            req: ReqGetClasses;
            res: ResGetClasses;
        };
        'classes/ListClasses': {
            req: ReqListClasses;
            res: ResListClasses;
        };
        'courses/CreateCourse': {
            req: ReqCreateCourse;
            res: ResCreateCourse;
        };
        'courses/GetCourses': {
            req: ReqGetCourses;
            res: ResGetCourses;
        };
        'roll-call/EndRollCall': {
            req: ReqEndRollCall;
            res: ResEndRollCall;
        };
        'roll-call/Enroll': {
            req: ReqEnroll;
            res: ResEnroll;
        };
        'roll-call/GetRollCall': {
            req: ReqGetRollCall;
            res: ResGetRollCall;
        };
        'roll-call/StartRollCall': {
            req: ReqStartRollCall;
            res: ResStartRollCall;
        };
        'roll-call/TeacherGetRollCall': {
            req: ReqTeacherGetRollCall;
            res: ResTeacherGetRollCall;
        };
        'students/CreateStudent': {
            req: ReqCreateStudent;
            res: ResCreateStudent;
        };
        'students/ListStudents': {
            req: ReqListStudents;
            res: ResListStudents;
        };
        'teachers/CreateTeacher': {
            req: ReqCreateTeacher;
            res: ResCreateTeacher;
        };
        'teachers/ListTeachers': {
            req: ReqListTeachers;
            res: ResListTeachers;
        };
    };
    msg: {

    };
}

export const serviceProto: ServiceProto<ServiceType> = {
    version: 20,
    services: [
        {
            id: 17,
            name: 'attendance/GetByClass',
            type: 'api'
        },
        {
            id: 9,
            name: 'attendance/GetByCourse',
            type: 'api'
        },
        {
            id: 12,
            name: 'campuses/CreateCampus',
            type: 'api'
        },
        {
            id: 16,
            name: 'campuses/GetCampus',
            type: 'api'
        },
        {
            id: 14,
            name: 'classes/CreateClass',
            type: 'api'
        },
        {
            id: 0,
            name: 'classes/GetClasses',
            type: 'api'
        },
        {
            id: 18,
            name: 'classes/ListClasses',
            type: 'api'
        },
        {
            id: 15,
            name: 'courses/CreateCourse',
            type: 'api'
        },
        {
            id: 1,
            name: 'courses/GetCourses',
            type: 'api'
        },
        {
            id: 4,
            name: 'roll-call/EndRollCall',
            type: 'api'
        },
        {
            id: 5,
            name: 'roll-call/Enroll',
            type: 'api'
        },
        {
            id: 6,
            name: 'roll-call/GetRollCall',
            type: 'api'
        },
        {
            id: 7,
            name: 'roll-call/StartRollCall',
            type: 'api'
        },
        {
            id: 13,
            name: 'roll-call/TeacherGetRollCall',
            type: 'api'
        },
        {
            id: 10,
            name: 'students/CreateStudent',
            type: 'api'
        },
        {
            id: 19,
            name: 'students/ListStudents',
            type: 'api'
        },
        {
            id: 11,
            name: 'teachers/CreateTeacher',
            type: 'api'
        },
        {
            id: 20,
            name: 'teachers/ListTeachers',
            type: 'api'
        }
    ],
    types: {
        'attendance/PtlGetByClass/ReqGetByClass': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'class_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    }
                }
            ]
        },
        'base/BaseRequest': {
            type: 'Interface',
            properties: [
                {
                    id: 0,
                    name: 'jwtToken',
                    type: {
                        type: 'String'
                    },
                    optional: true
                },
                {
                    id: 1,
                    name: 'currentUserId',
                    type: {
                        type: 'String'
                    },
                    optional: true
                }
            ]
        },
        'attendance/PtlGetByClass/ResGetByClass': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'class_attendance',
                    type: {
                        type: 'Array',
                        elementType: {
                            type: 'Reference',
                            target: '../models/CourseAttendance/CourseAttendance'
                        }
                    }
                }
            ]
        },
        'base/BaseResponse': {
            type: 'Interface'
        },
        '../models/CourseAttendance/CourseAttendance': {
            type: 'Interface',
            properties: [
                {
                    id: 0,
                    name: 'attendance_info',
                    type: {
                        type: 'Array',
                        elementType: {
                            type: 'String'
                        }
                    }
                },
                {
                    id: 1,
                    name: 'student_info',
                    type: {
                        type: 'Array',
                        elementType: {
                            type: 'Interface',
                            properties: [
                                {
                                    id: 0,
                                    name: 'student',
                                    type: {
                                        type: 'Reference',
                                        target: '../db/DbStudent/DbStudent'
                                    }
                                },
                                {
                                    id: 1,
                                    name: 'enrolled',
                                    type: {
                                        type: 'Array',
                                        elementType: {
                                            type: 'Boolean'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    id: 2,
                    name: 'course_name',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 3,
                    name: 'class_name',
                    type: {
                        type: 'String'
                    }
                }
            ]
        },
        '../db/DbStudent/DbStudent': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: '../db/DbUser/DbUser'
                    }
                }
            ]
        },
        '../db/DbUser/DbUser': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: '../db/DbBaseEntity/DbBaseEntity'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'uid',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 1,
                    name: 'firstname',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 2,
                    name: 'lastname',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 3,
                    name: 'email',
                    type: {
                        type: 'String'
                    }
                }
            ]
        },
        '../db/DbBaseEntity/DbBaseEntity': {
            type: 'Interface',
            properties: [
                {
                    id: 0,
                    name: '_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    }
                },
                {
                    id: 1,
                    name: 'create',
                    type: {
                        type: 'Interface',
                        properties: [
                            {
                                id: 0,
                                name: 'time',
                                type: {
                                    type: 'String'
                                }
                            },
                            {
                                id: 1,
                                name: 'uid',
                                type: {
                                    type: 'Reference',
                                    target: '?mongodb/ObjectId'
                                }
                            }
                        ]
                    },
                    optional: true
                },
                {
                    id: 2,
                    name: 'update',
                    type: {
                        type: 'Interface',
                        properties: [
                            {
                                id: 0,
                                name: 'time',
                                type: {
                                    type: 'String'
                                }
                            },
                            {
                                id: 1,
                                name: 'uid',
                                type: {
                                    type: 'Reference',
                                    target: '?mongodb/ObjectId'
                                }
                            }
                        ]
                    },
                    optional: true
                }
            ]
        },
        'attendance/PtlGetByCourse/ReqGetByCourse': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'course_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    }
                }
            ]
        },
        'attendance/PtlGetByCourse/ResGetByCourse': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 2,
                    name: 'attendance',
                    type: {
                        type: 'Reference',
                        target: '../models/CourseAttendance/CourseAttendance'
                    }
                }
            ]
        },
        'campuses/PtlCreateCampus/ReqCreateCampus': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'address',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 1,
                    name: 'name',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 2,
                    name: 'radius',
                    type: {
                        type: 'Number'
                    }
                }
            ]
        },
        'campuses/PtlCreateCampus/ResCreateCampus': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'campus',
                    type: {
                        type: 'Reference',
                        target: '../db/DbCampus/DbCampus'
                    }
                }
            ]
        },
        '../db/DbCampus/DbCampus': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: '../db/DbBaseEntity/DbBaseEntity'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'name',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 1,
                    name: 'location',
                    type: {
                        type: 'Reference',
                        target: '../models/Location/Location'
                    }
                },
                {
                    id: 2,
                    name: 'radius',
                    type: {
                        type: 'Number'
                    }
                }
            ]
        },
        '../models/Location/Location': {
            type: 'Interface',
            properties: [
                {
                    id: 0,
                    name: 'lat',
                    type: {
                        type: 'Number'
                    }
                },
                {
                    id: 1,
                    name: 'long',
                    type: {
                        type: 'Number'
                    }
                }
            ]
        },
        'campuses/PtlGetCampus/ReqGetCampus': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'campus_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    }
                }
            ]
        },
        'campuses/PtlGetCampus/ResGetCampus': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'campus',
                    type: {
                        type: 'Reference',
                        target: '../db/DbCampus/DbCampus'
                    }
                }
            ]
        },
        'classes/PtlCreateClass/ReqCreateClass': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'name',
                    type: {
                        type: 'String'
                    }
                }
            ]
        },
        'classes/PtlCreateClass/ResCreateClass': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'class',
                    type: {
                        type: 'Reference',
                        target: '../db/DbClass/DbClass'
                    }
                }
            ]
        },
        '../db/DbClass/DbClass': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: '../db/DbBaseEntity/DbBaseEntity'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'name',
                    type: {
                        type: 'String'
                    }
                }
            ]
        },
        'classes/PtlGetClasses/ReqGetClasses': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ]
        },
        'classes/PtlGetClasses/ResGetClasses': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'classes',
                    type: {
                        type: 'Array',
                        elementType: {
                            type: 'Reference',
                            target: '../db/DbClass/DbClass'
                        }
                    }
                }
            ]
        },
        'classes/PtlListClasses/ReqListClasses': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ]
        },
        'classes/PtlListClasses/ResListClasses': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'classes',
                    type: {
                        type: 'Array',
                        elementType: {
                            type: 'Reference',
                            target: '../db/DbClass/DbClass'
                        }
                    }
                }
            ]
        },
        'courses/PtlCreateCourse/ReqCreateCourse': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'name',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 1,
                    name: 'teacher_id',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 2,
                    name: 'class_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    }
                },
                {
                    id: 3,
                    name: 'campus_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    }
                }
            ]
        },
        'courses/PtlCreateCourse/ResCreateCourse': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'course',
                    type: {
                        type: 'Reference',
                        target: '../db/DbCourse/DbCourse'
                    }
                }
            ]
        },
        '../db/DbCourse/DbCourse': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: '../db/DbBaseEntity/DbBaseEntity'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'name',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 3,
                    name: 'teacher_id',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 4,
                    name: 'class_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    }
                },
                {
                    id: 5,
                    name: 'class_name',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 6,
                    name: 'enrollments',
                    type: {
                        type: 'Array',
                        elementType: {
                            type: 'Reference',
                            target: '../db/DbEnrollment/DbEnrollment'
                        }
                    }
                },
                {
                    id: 9,
                    name: 'students',
                    type: {
                        type: 'Array',
                        elementType: {
                            type: 'Reference',
                            target: '../db/DbStudent/DbStudent'
                        }
                    }
                },
                {
                    id: 8,
                    name: 'campus_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    }
                }
            ]
        },
        '../db/DbEnrollment/DbEnrollment': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: '../db/DbBaseEntity/DbBaseEntity'
                    }
                }
            ],
            properties: [
                {
                    id: 2,
                    name: 'date',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 3,
                    name: 'roll_call_started',
                    type: {
                        type: 'Boolean'
                    }
                },
                {
                    id: 5,
                    name: 'enrolled_student_ids',
                    type: {
                        type: 'Array',
                        elementType: {
                            type: 'String'
                        }
                    }
                }
            ]
        },
        'courses/PtlGetCourses/ReqGetCourses': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ],
            properties: [
                {
                    id: 1,
                    name: 'class_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    },
                    optional: true
                }
            ]
        },
        'courses/PtlGetCourses/ResGetCourses': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'courses',
                    type: {
                        type: 'Array',
                        elementType: {
                            type: 'Reference',
                            target: '../db/DbCourse/DbCourse'
                        }
                    }
                }
            ]
        },
        'roll-call/PtlEndRollCall/ReqEndRollCall': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'enrollment_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    }
                },
                {
                    id: 1,
                    name: 'course_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    }
                }
            ]
        },
        'roll-call/PtlEndRollCall/ResEndRollCall': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'enrollment',
                    type: {
                        type: 'Reference',
                        target: '../db/DbEnrollment/DbEnrollment'
                    }
                }
            ]
        },
        'roll-call/PtlEnroll/ReqEnroll': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'enrollment_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    }
                },
                {
                    id: 2,
                    name: 'location',
                    type: {
                        type: 'Reference',
                        target: '../models/Location/Location'
                    }
                }
            ]
        },
        'roll-call/PtlEnroll/ResEnroll': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'message',
                    type: {
                        type: 'String'
                    }
                }
            ]
        },
        'roll-call/PtlGetRollCall/ReqGetRollCall': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ]
        },
        'roll-call/PtlGetRollCall/ResGetRollCall': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 2,
                    name: 'course_info',
                    type: {
                        type: 'Partial',
                        target: {
                            type: 'Reference',
                            target: '../db/DbCourse/DbCourse'
                        }
                    }
                },
                {
                    id: 3,
                    name: 'roll_call_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    }
                },
                {
                    id: 4,
                    name: 'is_student_enrolled',
                    type: {
                        type: 'Boolean'
                    }
                }
            ]
        },
        'roll-call/PtlStartRollCall/ReqStartRollCall': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'course_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    }
                }
            ]
        },
        'roll-call/PtlStartRollCall/ResStartRollCall': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 1,
                    name: 'roll_call',
                    type: {
                        type: 'Reference',
                        target: '../db/DbEnrollment/DbEnrollment'
                    }
                }
            ]
        },
        'roll-call/PtlTeacherGetRollCall/ReqTeacherGetRollCall': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'course_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    }
                }
            ]
        },
        'roll-call/PtlTeacherGetRollCall/ResTeacherGetRollCall': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'enrollment_info',
                    type: {
                        type: 'Reference',
                        target: '../db/DbEnrollment/DbEnrollment'
                    }
                }
            ]
        },
        'students/PtlCreateStudent/ReqCreateStudent': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'firstname',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 1,
                    name: 'lastname',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 2,
                    name: 'email',
                    type: {
                        type: 'String'
                    }
                }
            ]
        },
        'students/PtlCreateStudent/ResCreateStudent': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'student',
                    type: {
                        type: 'Reference',
                        target: '../db/DbStudent/DbStudent'
                    }
                }
            ]
        },
        'students/PtlListStudents/ReqListStudents': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ]
        },
        'students/PtlListStudents/ResListStudents': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'students',
                    type: {
                        type: 'Array',
                        elementType: {
                            type: 'Reference',
                            target: '../db/DbStudent/DbStudent'
                        }
                    }
                }
            ]
        },
        'teachers/PtlCreateTeacher/ReqCreateTeacher': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'firstname',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 1,
                    name: 'lastname',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 2,
                    name: 'email',
                    type: {
                        type: 'String'
                    }
                }
            ]
        },
        'teachers/PtlCreateTeacher/ResCreateTeacher': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'teacher',
                    type: {
                        type: 'Reference',
                        target: '../db/DbTeacher/DbTeacher'
                    }
                }
            ]
        },
        '../db/DbTeacher/DbTeacher': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: '../db/DbUser/DbUser'
                    }
                }
            ]
        },
        'teachers/PtlListTeachers/ReqListTeachers': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseRequest'
                    }
                }
            ]
        },
        'teachers/PtlListTeachers/ResListTeachers': {
            type: 'Interface',
            extends: [
                {
                    id: 0,
                    type: {
                        type: 'Reference',
                        target: 'base/BaseResponse'
                    }
                }
            ],
            properties: [
                {
                    id: 0,
                    name: 'teachers',
                    type: {
                        type: 'Array',
                        elementType: {
                            type: 'Reference',
                            target: '../db/DbTeacher/DbTeacher'
                        }
                    }
                }
            ]
        }
    }
}
