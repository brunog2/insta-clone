import api from './api';

// Short duration JWT token (5-10 min)
export function getJwtToken() {
    return sessionStorage.getItem("jwt")
}

export function setJwtToken(token: string) {
    sessionStorage.setItem("jwt", token)
}

// Longer duration refresh token (30-60 min)
export function getRefreshToken() {
    return sessionStorage.getItem("refreshToken")
}

export function setRefreshToken(token: string) {
    sessionStorage.setItem("refreshToken", token)
}

export function getFingerprintHash() {
    return sessionStorage.getItem("fingerprintHash")
}

export function setfingerprintHash(fingerprintHash: string) {
    sessionStorage.setItem("refreshToken", fingerprintHash)
}

export async function handleLogin(email: string, phoneNumber: string, password: string) {
    // Call login method in API
    // The server handler is responsible for setting user fingerprint cookie during this as well

    await api.post("/login", {
        phone_number: phoneNumber,
        email: email,
        password: password
    }).then((response) => {
        const { jwtToken, refreshToken, fingerprintHash } = response.data;
        setJwtToken(jwtToken);
        setRefreshToken(refreshToken);
        setfingerprintHash(fingerprintHash);
    })
    // If you like, you may redirect the user now
}