const BASE_URL = process.env.REACT_APP_API_URL + "/user";

export async function fetchUser(id: any) {
    return fetch(BASE_URL + "/get/" + id)
           .then(res => res.status == 400 ? undefined : res.json());
}