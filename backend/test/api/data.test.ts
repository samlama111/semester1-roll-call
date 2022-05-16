import assert from 'assert';
import {  WsClient } from 'tsrpc';
import { serviceProto } from '../../src/shared/protocols/serviceProto';

// 1. EXECUTE `npm run dev` TO START A LOCAL DEV SERVER
// 2. EXECUTE `npm test` TO START UNIT TEST

describe('ApiGetData', function () {
    // Create the Server
    const client = new WsClient(serviceProto, {
        server: 'ws://127.0.0.1:3000',
        // Remove this to use binary mode (remove from the server too)
        json: true
    })
    // establish WS connection
    before(async function() {
        await client.connect()
    })

    it('AddData & GetData', async function () {
        // Get data before add
        let ret1 = await client.callApi('campuses/CreateCampus', {
            address: "Guldbergsgade 29N",
            name: "Sams KEA"
        });
        console.log(ret1)
        assert.strictEqual(ret1.isSucc, true);
    });
})