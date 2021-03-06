import Vue from 'vue';
import Vuex from 'vuex';
import { UserState } from '../services/interfaces/UserState';

Vue.use(Vuex);

export interface RootState {
  user: UserState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({});
