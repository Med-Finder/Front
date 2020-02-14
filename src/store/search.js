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
			//encode pos and query
			let pos_arr   = JSON.stringify([pos.lng, pos.lat]);
			let url_pos   = encodeURIComponent(pos_arr);
			let url_query = query ? encodeURIComponent(query) : "%22%22";

			// add pos and query to params
			let api    = `/medicine/search/${url_query}/${url_pos}`;

			// add pos to headers
			let config= {
				headers: { 'user-coordinates': pos_arr}
			};

			// add query to req body
			// let data = {
			// 	query: query
			// }

			// send to server
			Vue.axios.post(api, config).then((res) => {
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