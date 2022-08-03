import iGenre from "@/interfaces/iGenre";
import {InjectionKey} from "vue";
import {createStore, Store, useStore as vuexUseStore} from 'vuex';
import {LIST_GENRES, LIST_GENRES_FROM_API, ADD_GENRE, GET_GENRE_BY_ID} from "@/store/movies_actions";
import {getMovieGenres} from "@/service/MoviesService";

interface Estado {
    genres: iGenre[],
    genre: iGenre|undefined
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        genres: [],
        genre: undefined
    },
    mutations: {
        [LIST_GENRES](state, genres: iGenre[]) {
            state.genres = genres
        },
        [ADD_GENRE](state, genre: iGenre) {
            state.genre = genre
        },
    },
    actions: {
        [LIST_GENRES_FROM_API]({commit}) {
            getMovieGenres()
                .then(resposta => commit(LIST_GENRES, resposta.data.genres))
        },
        [GET_GENRE_BY_ID]({commit}, id: number) {
            const genreId = Number(id)
            getMovieGenres()
                .then(resposta => {
                    commit(ADD_GENRE, resposta.data.genres.find((g: iGenre) => g.id === genreId))
                })
        },
    },
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}
