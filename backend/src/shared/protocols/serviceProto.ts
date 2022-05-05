import { ServiceProto } from 'tsrpc-proto'

import { ReqAddData, ResAddData } from './PtlAddData'
import { ReqGetClasses, ResGetClasses } from './PtlGetClasses'
import { ReqGetData, ResGetData } from './PtlGetData'

export interface ServiceType {
    api: {
        'AddData': {
            req: ReqAddData,
            res: ResAddData
        },
        'GetClasses': {
            req: ReqGetClasses,
            res: ResGetClasses
        },
        'GetData': {
            req: ReqGetData,
            res: ResGetData
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    version: 4,
    services: [
        {
            id: 0,
            name: 'AddData',
            type: 'api'
        },
        {
            id: 4,
            name: 'GetClasses',
            type: 'api'
        },
        {
            id: 1,
            name: 'GetData',
            type: 'api'
        }
    ],
    types: {
        'PtlAddData/ReqAddData': {
            type: 'Interface',
            properties: [
                {
                    id: 0,
                    name: 'content',
                    type: {
                        type: 'String'
                    }
                }
            ]
        },
        'PtlAddData/ResAddData': {
            type: 'Interface',
            properties: [
                {
                    id: 0,
                    name: 'time',
                    type: {
                        type: 'Date'
                    }
                }
            ]
        },
        'PtlGetClasses/ReqGetClasses': {
            type: 'Interface',
            properties: [
                {
                    id: 0,
                    name: 'teacher_id',
                    type: {
                        type: 'Reference',
                        target: '?mongodb/ObjectId'
                    }
                }
            ]
        },
        'PtlGetClasses/ResGetClasses': {
            type: 'Interface',
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
        '../db/DbClass/DbClass': {
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
                    name: 'name',
                    type: {
                        type: 'String'
                    }
                },
                {
                    id: 3,
                    name: 'teacher',
                    type: {
                        type: 'Array',
                        elementType: {
                            type: 'Reference',
                            target: '?mongodb/ObjectId'
                        }
                    }
                }
            ]
        },
        'PtlGetData/ReqGetData': {
            type: 'Interface'
        },
        'PtlGetData/ResGetData': {
            type: 'Interface',
            properties: [
                {
                    id: 0,
                    name: 'data',
                    type: {
                        type: 'Array',
                        elementType: {
                            type: 'Interface',
                            properties: [
                                {
                                    id: 0,
                                    name: 'content',
                                    type: {
                                        type: 'String'
                                    }
                                },
                                {
                                    id: 1,
                                    name: 'time',
                                    type: {
                                        type: 'Date'
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        }
    }
}
