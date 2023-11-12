interface NFT {
    identifier: string;
    contract: string;
    name: string;
}

/**
 * Official opensea sdk is out of date.
 * The example using 'api' is not working.
 * Generating typescript using npx api install <opensea api json> does not produce usable code.
 * The openapi generator also isn't working.
 * OpenAPI has failed me today. So here we are.
 */
class Opensea {
    private static baseUrl = "https://api.opensea.io/api/v2";
    private static apiKey = process.env.OPENSEA_API_KEY;

    private static get(path: string): Promise<object> {
        return fetch(`${this.baseUrl}${path}`, {
            headers: {
                'x-api-key': this.apiKey
            }
        }).then((response) => response.json() as Promise<object>);
    }

    /**
     * Lists all NFTs for a given address
     */
    static async ListNFTs(address: string): Promise<Array<NFT>> {
        const endpoint = `/chain/matic/account/${address}/nfts`;
        let nfts: Array<NFT> = [];
        let response = await this.get(endpoint);
        if (Object.hasOwn(response, 'nfts')) {
            nfts = nfts.concat(response['nfts']);
        }
        do {
            response = await this.get(`${endpoint}&next=${response['next']}`);
            if (Object.hasOwn(response, 'nfts')) {
                nfts = nfts.concat(response['nfts']);
            }
        } while (Object.hasOwn(response, 'next'));
        return nfts;
    }

    static async Price(address: string, id: number | string): Promise<number> {
        const listing = await this.GetListings(address, id);
        if (listing['orders'].length > 0) {
            const bundlePrice = parseInt(listing['orders'][0]['current_price']);
            const quantity = listing['orders'][0]['remaining_quantity'];
            return bundlePrice / quantity;
        } else {
            return 0;
        }
    }

    /**
     * Get all active, valid listings for a single collection.
     */
    static async GetListings(address: string, id: number | string, limit: number = 1): Promise<object> {
        return this.get(`/orders/matic/seaport/listings?asset_contract_address=${address}&order_by=eth_price&order_direction=asc&token_ids=${id}&limit=${limit}`);
    }
}

export { Opensea, NFT }