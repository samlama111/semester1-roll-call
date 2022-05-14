import { WsServer } from "tsrpc";

export function enableAuthentication(server: WsServer) {
    server.flows.preApiCallFlow.push(call => {
        // NeedLogin
        if (!call.currentUserId) {
            call.error('You need login before do this', { code: 'NEED_LOGIN' });
            return undefined;
        }

        // NeedRoles
        // if (conf?.needRoles?.length && !call.currentUser?.roles.some(v => conf!.needRoles!.indexOf(v) > -1)) {
        //     call.error('You do NOT have authority to do this', { code: 'NO_AUTHORITY' });
        //     return undefined;
        // }

        return call;
    })
}