import { NFT } from "./opensea.js";

interface Item {
    nft: NFT;
    quantity: number;
}

/**
 * Represents a farm's inventory
 */
class Inventory {
    public readonly items: Array<Item>;
    constructor(items: Array<Item>) {
        this.items = items;
    }

    get length(): number {
        return this.items.length;
    }

    /**
     * Prints this inventory to the console.
     */
    print(): void {
        this.items.forEach((item) => {
            console.log(`${item.quantity}x ${item.nft.name}`);
        });
    }
}

export { Inventory }