import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const listingApi = {
  getAll: (params = {}) => {
    const urlParams = new URLSearchParams();

    // Handle status array
    if (params.status && params.status.length > 0) {
      params.status.forEach((status) => {
        urlParams.append("status", status);
      });
    }
    if (params.property_status && params.property_status.length > 0) {
      params.property_status.forEach((status) => {
        urlParams.append("property_status", status);
      });
    }

    // Handle other filters
    if (params.source) urlParams.append("source", params.source);
    if (params.min_score) urlParams.append("min_score", params.min_score);
    if (params.max_score) urlParams.append("max_score", params.max_score);
    if (params.min_price) urlParams.append("min_price", params.min_price);
    if (params.max_price) urlParams.append("max_price", params.max_price);
    if (params.min_area) urlParams.append("min_area", params.min_area);
    if (params.max_area) urlParams.append("max_area", params.max_area);
    if (params.rooms) urlParams.append("rooms", params.rooms);
    if (params.ordering) urlParams.append("ordering", params.ordering);

    // Handle date range filters
    if (params.created_at_after)
      urlParams.append("created_at_after", params.created_at_after);
    if (params.created_at_before)
      urlParams.append("created_at_before", params.created_at_before);

    const queryString = urlParams.toString();
    const url = queryString ? `/listings/?${queryString}` : "/listings/";

    console.log("API Request URL:", url);

    return api.get(url);
  },
  //Get a single listing
  getById: (id) => api.get(`/listings/${id}/`),

  // Create a new listing
  create: (data) => api.post("/listings/", data),

  // Update and edit a single listing
  update: (id, data) => api.patch(`/listings/${id}/`, data),

  // delete a single listing
  delete: (id) => api.delete(`/listings/${id}/`),

  // delete a group of listings
  bulkDelete: (ids) => api.delete("/listings/bulk_delete/", { data: { ids } }),
};

export default api;
