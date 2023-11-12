import { Farm } from "./farm.js";

const farm = new Farm(process.env.FARM_ADDRESS);
const inventory = await farm.Inventory();
inventory.print();