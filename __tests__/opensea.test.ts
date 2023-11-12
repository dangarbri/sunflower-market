import { Opensea } from "../src/opensea.js";

describe('Opensea', () => {
    it('Can get listings', async () => {
        const listings = await Opensea.GetListings('0x22d5f9b75c524fec1d6619787e582644cd4d7422', 210);
        expect(listings).toHaveProperty('orders');
    });

    it('Can get the lowest price of a listing', async () => {
        const price = await Opensea.GetPrice('0x22d5f9b75c524fec1d6619787e582644cd4d7422', 210);
        expect(price).toBeGreaterThan(0.01);
        const price2 = await Opensea.GetPrice('0x22d5f9b75c524fec1d6619787e582644cd4d7422', 202);
        expect(price2).toBeLessThan(0.001)
    });
})