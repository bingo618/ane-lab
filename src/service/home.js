import httpProvider from "../utils/http";

export async function getMenu() {
    return httpProvider.get('cp/user/app')
}
