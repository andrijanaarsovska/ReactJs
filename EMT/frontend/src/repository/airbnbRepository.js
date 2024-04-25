import axios from '../custom-axios/axios';

const AirbnbService = {
    fetchHosts: () => {
        return axios.get("/hosts");
    },
    fetchCountries: () => {
        return axios.get("/countries");
    },
    fetchCategories: () => {
        return axios.get("/accommodations/categories");
    },
    fetchAccommodations: () => {
        return axios.get("/accommodations");
    },
    deleteAccommodation: (id) => {
        return axios.delete(`/accommodations/delete-accommodation/${id}`);
    },
    addAccommodation: (name, category, host, numRooms) => {
        return axios.post("/accommodations/add-accommodation", {
            "name": name,
            "category": category,
            "host": host,
            "numRooms": numRooms
        });
    },
    editAccommodation: (id, name, category, host, numRooms) => {
        return axios.post(`/accommodations/edit/${id}`, {
            "name": name,
            "category": category,
            "host": host,
            "numRooms": numRooms
        });
    },
    getAccommodation: (id) => {
        return axios.get(`/accommodations/${id}`);
    },
    getHosts: (id) => {
        return axios.get(`/hosts/${id}`)
    },
    bookAccommodation: (id) => {
        return axios.post(`/accommodations/book/${id}`)
    }

}
export default AirbnbService;

