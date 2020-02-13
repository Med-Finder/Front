import Vue from 'vue'

export default {
  state: {
		pharmacies: []
	},
  mutations: {
		setPharmacies(state, val) {
			Vue.set(state, 'pharmacies', val);
		}
	},
	actions: {
    search (context, {query, pos}) {
			let api    = '/medicine/searchForPharmacyLocation';
			let headers= {
				headers: { 'user-coordinates': JSON.stringify(pos)}};
			let data = {
				query: query
			}
			Vue.axios.post(api, data, headers).then((res) => {
				console.log('new data: ', res.data)
				context.commit('setPharmacies', res.data);
			}).catch( err => console.log(err) )
    }
  },
  getters: {
		pharmacies(state) {
			return state.pharmacies;
		}
	}
}