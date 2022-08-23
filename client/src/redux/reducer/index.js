import {
  GET_ALL_COUNTRIES,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  GET_ALL_ACTIVITIES,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  GET_COUNTRY_DETAILS,
  CLEAR_COUNTRY_DETAILS,
  CREATE_STATUS,
  CLEAR_STATUS,
  FILTER_BY_LANGUAGE,
  GET_ALL_LANGUAGES,
} from "../actions/index";

const initialState = {
  countries: [],
  activities: [],
  continentFilter: "NOFILTER",
  activityFilter: "NOFILTER",
  orderByName: "OFF",
  orderByPopulation: "OFF",
  countryDetails: {},
  creationStatus: "",
  languageFilter: "NOFILTER",
  languages: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return { ...state, countries: action.payload };

    case GET_ALL_ACTIVITIES:
      return { ...state, activities: action.payload };

    case FILTER_BY_CONTINENT:
      return { ...state, continentFilter: action.payload };

    case FILTER_BY_ACTIVITY:
      return { ...state, activityFilter: action.payload };

    case ORDER_BY_NAME:
      return { ...state, orderByName: action.payload };

    case ORDER_BY_POPULATION:
      return { ...state, orderByPopulation: action.payload };

    case GET_COUNTRY_DETAILS:
      return { ...state, countryDetails: action.payload };

    case CLEAR_COUNTRY_DETAILS:
      return { ...state, countryDetails: {} };

    case CREATE_STATUS:
      return { ...state, creationStatus: action.payload };

    case CLEAR_STATUS:
      return { ...state, creationStatus: "" };

    case FILTER_BY_LANGUAGE:
      return { ...state, languageFilter: action.payload };

    case GET_ALL_LANGUAGES:
      return { ...state, languages: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
