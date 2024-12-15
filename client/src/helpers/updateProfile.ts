export default async function updateProfile(url: string | URL | Request, bio: string, token: string | null) {
    try {
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({bio}),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            },
        })
        const data = await response.json()
        return data;
    } catch (error: unknown) {
        console.log(error, 'error occurred during fetch')
        return error;
    }
}