
export function getLocation() {
    try {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        var latitude = position.coords.latitude;
                        var longitude = position.coords.longitude;

                        resolve({ latitude: latitude, longitude: longitude });
                    },
                    function (error) {
                        showError(error);
                        reject(error);
                    }
                );
            } else {
                reject(new Error('Geolocation is not supported'));
            }
        });
    } catch (error) {
        throw new Error(error.message)
    }
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            console.log('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            console.log('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            console.log('An unknown error occurred.');
            break;
    }
}
