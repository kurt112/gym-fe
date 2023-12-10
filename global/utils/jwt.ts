export const getToken = () => {
    const token: string | null = window.sessionStorage.getItem('token');

    if (token === null) {
        alert('Please Login')

        return null;
    }


    return token;
}