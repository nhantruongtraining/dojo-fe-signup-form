import httpClient from "../http-common";

const getAll = (path) => {
    return httpClient.get(path);
}

const create = (data) => {
    return httpClient.post("auth/signup", data);
}

export default { getAll, create };