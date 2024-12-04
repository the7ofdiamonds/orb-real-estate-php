import { getLocation } from "./Location";

export const addHeaders = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("User-Agent", navigator.userAgent);

    const coordinates = await getLocation();
    console.log(coordinates);
    headers.append("X-Longitude", coordinates.longitude);
    headers.append("X-Latitude", coordinates.latitude);

    return headers;
}

export const addSecureHeaders = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    const headers = new Headers();
    headers.append("Authorization", "Bearer " + accessToken);
    headers.append("Refresh-Token", refreshToken);
    headers.append("Content-Type", "application/json");
    headers.append("User-Agent", navigator.userAgent);

    const coordinates = await getLocation();
    headers.append("X-Longitude", coordinates.longitude);
    headers.append("X-Latitude", coordinates.latitude);

    return headers;
}