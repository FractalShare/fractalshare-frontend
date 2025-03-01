import { cookies } from "next/headers";

const TOKEN_AGE = 3600;
const TOKEN_NAME = "auth-token";
const TOKEN_REFRESH_NAME = "auth-refresh-token";

export async function getToken() {
    const myAuthToken = (await cookies()).get(TOKEN_NAME);
    return myAuthToken?.value
}

export async function getRefreshToken() {
    const myAuthToken = (await cookies()).get(TOKEN_REFRESH_NAME);
    return myAuthToken?.value
}

export async function setToken(authToken: string) {
    return (await cookies()).set({
        name: TOKEN_NAME,
        value: authToken,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_AGE,
   })
}

export async function setRefreshToken(authRefreshToken: string) {
    return (await cookies()).set({
        name: TOKEN_REFRESH_NAME,
        value: authRefreshToken,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_AGE,
   })
}

export async function deleteTokens  () {
    (await cookies()).delete(TOKEN_REFRESH_NAME);
    return (await cookies()).delete(TOKEN_NAME);
}