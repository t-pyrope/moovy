const baseUrl = `https://www.omdbapi.com/`
 
export const titleSearchURL = (title, page = 1) => `${baseUrl}?apikey=${process.env.REACT_APP_API_KEY}&s=${title}&page=${page}/`

export const yearSearchURL = (year, page = 1) => `${baseUrl}?apikey=${process.env.REACT_APP_API_KEY}&y=${year}&page=${page}/`;

export const titleYearSearchURL = (title, year, page = 1) => `${baseUrl}?apikey=${process.env.REACT_APP_API_KEY}&s=${title}&y=${year}&page=${page}/`;

export const movieDetailURL = id => `${baseUrl}?apikey=${process.env.REACT_APP_API_KEY}&i=${id}/`;
