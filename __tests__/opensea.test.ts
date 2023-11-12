import { Opensea } from "../src/opensea.js";

describe('Opensea', () => {
    it('Can get listings', async () => {
        const listings = await Opensea.GetListings('0x22d5f9b75c524fec1d6619787e582644cd4d7422', 210);
        expect(listings).toHaveProperty('orders');
    });
})