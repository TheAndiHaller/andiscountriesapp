import axios from "axios";

export const GET_ALL_COUNTRIES = "GET_COUNTRIES";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const GET_COUNTRY_DETAILS = "GET_COUNTRY_DETAILS";
export const CLEAR_COUNTRY_DETAILS = "CLEAR_COUNTRY_DETAILS";
export const CREATE_STATUS = "CREATE_STATUS";
export const CLEAR_STATUS = "CLEAR_STATUS";
export const FILTER_BY_LANGUAGE = "FILTER_BY_LANGUAGE";
export const GET_ALL_LANGUAGES = "GET_ALL_LANGUAGES";

// Fixing main branch
export function getAllCountries() {
  return async (dispatch) => {
    const api = await axios.get("/countries");
    dispatch({ type: GET_ALL_COUNTRIES, payload: api.data });
  };
}

export function searchCountry(country) {
  return async (dispatch) => {
    const api = await axios.get(
      `/countries/?name=${country}`
    );
    dispatch({ type: GET_ALL_COUNTRIES, payload: api.data });
  };
}

export function setContinentFilter(filter) {
  return async (dispatch) => {
    dispatch({ type: FILTER_BY_CONTINENT, payload: filter });
  };
}

export function setActivityFilter(filter) {
  return async (dispatch) => {
    dispatch({ type: FILTER_BY_ACTIVITY, payload: filter });
  };
}

export function getAllActivities() {
  return async (dispatch) => {
    const api = await axios.get("/activities");
    dispatch({ type: GET_ALL_ACTIVITIES, payload: api.data });
  };
}

export function sortByName(order) {
  return async (dispatch) => {
    dispatch({ type: ORDER_BY_NAME, payload: order });
  };
}

export function sortByPopulation(order) {
  return async (dispatch) => {
    dispatch({ type: ORDER_BY_POPULATION, payload: order });
  };
}

export const getCountryDetails = (id) => {
  return async (dispatch) => {
    let api = await axios.get(`/countries/${id}`);
    dispatch({ type: GET_COUNTRY_DETAILS, payload: api.data });
  };
};

export const clearCountryDetails = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_COUNTRY_DETAILS });
  };
};

export function createActivity(activity) {
  return async (dispatch) => {
    try {
      const api = await axios.post(
        "/activities",
        activity
      );
      dispatch({ type: CREATE_STATUS, payload: api.data });
    } catch (e) {
      dispatch({
        type: CREATE_STATUS,
        payload: e.code + " " + e.response.data,
      });
    }
  };
}

export function clearStatus() {
  return (dispatch) => {
    dispatch({ type: CLEAR_STATUS });
  };
}

export function setLanguageFilter(filter) {
  return async (dispatch) => {
    dispatch({ type: FILTER_BY_LANGUAGE, payload: filter });
  };
}

export function getAllLanguages() {
  return async (dispatch) => {
    const api = await axios.get("/countries");
    let languages = [];
    for (let i = 0; i < api.data.length; i++) {
      for (let j = 0; j < api.data[i].languages.length; j++) {
        languages.push(api.data[i].languages[j]);
      }
    }

    const filtered = [...new Set(languages)];

    const ordered_languages = filtered.sort((a, b) => {
      const nameA = a.toLowerCase();
      const nameB = b.toLowerCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;

      return 0;
    });
    dispatch({ type: GET_ALL_LANGUAGES, payload: ordered_languages });
  };
}
