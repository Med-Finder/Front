import Vue from 'vue'

export default {
  state: {
		pharma: [],
		submitted: false,
	},
  mutations: {
		setPharma(state, val) {
			Vue.set(state, 'pharma', val);
		},
		setSubmitted(state, val) {
			state.submitted = val;
		},
	},
	actions: {
		submit_pharma_profile (context, profile) {
			let api = "/pharmacy/create";
			let data = profile;

			// send to server
			Vue.axios.post(api, data).then((res) => {
				if(res.data.err) {
					console.log(res.data);
				}else {
					context.commit('setPharma', res.data);
					context.commit('setSubmitted', true);
				}
			}).catch( err => console.log(err) )
		},
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
				context.commit('setPharmacies', res.data);
			}).catch( err => console.log(err) )
    }
  },
  getters: {
		// pharmacies(state) {
		// 	return state.pharmacies;
		// },
		submitted(state) {
			return state.submitted;
		}
	}
}