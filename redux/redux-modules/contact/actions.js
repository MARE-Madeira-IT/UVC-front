import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";

import api from "../api/contact";

export const createContact = (data) => ({
    type: types.CREATE_CONTACT,
    payload: api.createContact(data),
});
