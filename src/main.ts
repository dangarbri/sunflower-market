import { Farm } from "./farm.js";

async function Appraise(farmAddress: string): Promise<number> {
    const farm = new Farm(farmAddress);
    return await farm.Appraise();
}

export { Appraise, Farm }