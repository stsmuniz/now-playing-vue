import http from "@/http";

const apiKey = '9c28ee74e788ea111e9f4bb3ff985c76';

export const getPopularMovies = ( page = 1) => http.get('movie/popular', {
    params: {
        api_key: apiKey,
        language: 'pt-BR',
        page
    }
})

export const searchMovies = (term: string, page = 1) => http.get('search/movie', {
    params: {
        query: term,
        include_adult: false,
        api_key: apiKey,
        language: 'pt-BR',
        page
    }
})

export const getUpcomingMovies = () => http.get('movie/upcoming', {
    params: {
        api_key: apiKey,
        language: 'pt-BR',
        page: 1
    }
})

export const getTopRatedMovies = ( page = 1) => http.get('movie/top_rated', {
    params: {
        api_key: apiKey,
        language: 'pt-BR',
        page
    }
})

export const getNowPlayingMovies = ( page = 1) => http.get('movie/now_playing', {
    params: {
        api_key: apiKey,
        language: 'pt-BR',
        page
    }
})

export const getMovieDetails = (idMovie: number) => http.get('movie/' + idMovie, {
    params: {
        api_key: apiKey,
        language: 'pt-BR',
        append_to_response: 'videos'
    }
})
export const getMoviesByGenre = (idGenre: string,  page = 1) => http.get('movie/popular', {
    params: {
        api_key: apiKey,
        language: 'pt-BR',
        with_genres: idGenre,
        page
    }
})

export const getMovieGenres = () => http.get('genre/movie/list', {
    params: {
        api_key: apiKey,
        language: 'pt-BR'
    }
})

export const imgUrl = (imgPath: string, quality = 'w780') => {
    return imgPath ? `https://image.tmdb.org/t/p/${quality}${imgPath}`
        :  `/img/image_unavailable.png`
};

export const imdbUrl = (id: string) => `https://www.imdb.com/title/${id}/`;

export const youtubeUrl = (key: string) => `https://www.youtube.com/embed/${key}?showinfo=0&autoplay=1&rel=0&modestbranding=1&autohide=1&controls=0`



