import { HttpServer } from 'tsrpc'

export function enableAuthentication(server: HttpServer) {
    server.flows.preApiCallFlow.push((call) => {
        // NeedLogin
        if (!call.currentUserId && process.env.NODE_ENV === 'production') {
            call.error('You need login before do this', { code: 'NEED_LOGIN' })
            return undefined
        }

        // NeedRoles
        // if (conf?.needRoles?.length && !call.currentUser?.roles.some(v => conf!.needRoles!.indexOf(v) > -1)) {
        //     call.error('You do NOT have authority to do this', { code: 'NO_AUTHORITY' });
        //     return undefined;
        // }

        return call
    })
}
