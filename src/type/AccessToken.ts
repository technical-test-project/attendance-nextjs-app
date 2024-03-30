type AccessToken = {
    type: string;
    name: string | null;
    token: string;
    abilities: string[] | null;
    lastUsedAt: string | null;
    expiresAt: string;
}