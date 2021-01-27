const BASE_URL = process.env.REACT_APP_API_URL + "/user";

export async function fetchUser(id: any) {
    return fetch(BASE_URL + "/get/" + id)
           .then(res => res.status == 400 ? undefined : res.json());
}

export async function addUser(id: string, email: string) {
    return fetch(BASE_URL + "/add", {
        method: 'POST',
        body: JSON.stringify({
            id: id,
            email: email
        }),
        headers: { 'Content-Type': 'application/json' }
    })
}