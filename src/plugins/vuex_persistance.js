import VuexPersistence from 'vuex-persist'

export const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	modules: ['auth'], //only save auth module
})