import { Farm } from "../src/farm.js";

describe('Farm', () => {
    it('Should be able to read the smart contract', async () => {
        const farm = new Farm(process.env.FARM_ADDRESS);
        expect(farm).toBeDefined();
        const amount = await farm.Amount("210");
        expect(amount).toBeGreaterThan(0);
    });
    it('Can inventory the farm', async () => {
        const farm = new Farm(process.env.FARM_ADDRESS);
        const inventory = await farm.Inventory();
        expect(inventory).toBeDefined();
        expect(inventory.length).toBeGreaterThan(0);
    });
    it('Farm can be appraised', async () => {
        const farm = new Farm(process.env.FARM_ADDRESS);
        const appraisal = await farm.Appraise();
        console.log("Farm is worth: ", appraisal);
        expect(appraisal).toBeDefined();
        expect(appraisal).toBeGreaterThan(0);
    });
})