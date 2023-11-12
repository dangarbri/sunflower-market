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

    private static get(path: string): Promise<Response> {
        return fetch(`${this.baseUrl}${path}`, {
            headers: {
                'x-api-key': this.apiKey
            }
        });
    }

    /**
     * Get all active, valid listings for a single collection.
     */
    static async GetListings(address: string, id: number): Promise<object> {
        const response = await this.get(`/orders/matic/seaport/listings?asset_contract_address=${address}&order_by=eth_price&order_direction=asc&token_ids=${id}`);
        return await response.json() as object;
    }
}

export { Opensea }