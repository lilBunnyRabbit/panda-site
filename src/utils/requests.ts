const BASE_URL = process.env.REACT_APP_API_URL;
const USER_URL = BASE_URL + "/user";
const PERMISSIONS_URL = BASE_URL + "/permissions";
const HOUSEHOLDS_URL = BASE_URL + "/households";
const GROCERYLIST_URL = BASE_URL + "/grocery-list";
const WISHLIST_URL = BASE_URL + "/wishlist";

export const userRequests = {
  ALL: async () =>
    fetch(USER_URL + "/all").then((res) =>
      res.status == 400 ? undefined : res.json()
    ),
  GET: async (id: any) =>
    fetch(USER_URL + "/get/" + id).then((res) =>
      res.status == 400 ? undefined : res.json()
    ),
  GET_BY_HOUSEHOLD: async (household_id: any) =>
    fetch(USER_URL + "/get/household/" + household_id).then((res) =>
      res.status == 400 ? undefined : res.json()
    ),
  UPDATE: async (id: any, data: any) =>
    fetch(USER_URL + "/update/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),
  ADD: async (data: { id: string; name: string; email: string }) =>
    fetch(USER_URL + "/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),
};

export const permissionsRequests = {
  ALL: async () =>
    fetch(PERMISSIONS_URL + "/all").then((res) =>
      res.status == 400 ? undefined : res.json()
    ),
  ADD: async (data: { name: string }) =>
    fetch(PERMISSIONS_URL + "/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),
  DELETE: async (id: any) =>
    fetch(PERMISSIONS_URL + "/remove", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    }),
};

export const householdsRequests = {
  ALL: async () =>
    fetch(HOUSEHOLDS_URL + "/all").then((res) =>
      res.status == 400 ? undefined : res.json()
    ),
  ALL_WITH_USERS_COUNT: async () =>
    fetch(HOUSEHOLDS_URL + "/allWithUserCount").then((res) =>
      res.status == 400 ? undefined : res.json()
    ),
  ADD: async (data: { name: string }) =>
    fetch(HOUSEHOLDS_URL + "/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),
  DELETE: async (id: any) =>
    fetch(HOUSEHOLDS_URL + "/remove", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    }),
};

export const groceryListRequests = {
  LIST: async (household: any) =>
    fetch(GROCERYLIST_URL + "/list/" + household).then((res) => res.json()),
  DELETE: async (item: any) =>
    fetch(GROCERYLIST_URL + "/remove", {
      method: "DELETE",
      body: JSON.stringify({
        id: item._id,
      }),
      headers: { "Content-Type": "application/json" },
    }),
  ADD: async (item: any) =>
    fetch(GROCERYLIST_URL + "/add", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    }),
};

export const wishlistRequests = {
  LIST: async (user_id: any) =>
    fetch(WISHLIST_URL + "/list/" + user_id).then((res) => res.json()),
  DELETE: async (id: any) =>
    fetch(WISHLIST_URL + "/remove", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    }),
  ADD: async (item: any) =>
    fetch(WISHLIST_URL + "/add", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    }),
  UPDATE: async (id: any, data: any) =>
    fetch(WISHLIST_URL + "/update/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),
};
