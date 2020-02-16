import Vue from 'vue'

export default {
  state: {
		authenticated: false,
		token        : '',
		user         : null
	},
  mutations: {
		setUser(state, val) {
			Vue.set(state, 'user', val);
		},
		setToken(state, val) {
			state.token = val;
		},
		setAuthenticated(state, val) {
			state.authenticated = val;
		},
	},
	actions: {
		register(context, data) {
			return new Promise((resolve, reject) => {
				let url = "/auth/register";

				// add type to headers
				let config= {
					headers: { 'headerstype': data.type}
				};
				// add query to req body
				let req_body = data.infos;

				// send to server
				Vue.axios.post(url, req_body, config).then((res) => {
					if(res.data.err) {
						console.log(res.data.err);
					}else {
						context.commit('setUser', res.data);
						context.commit('authenticated', true);
						resolve(res.data);
					}
				}).catch( err => reject(err) )

			});
		},
		login(context, data) {
			return new Promise((resolve, reject) => {
				let url = "/auth/login";

				// add type to headers
				let config= {
					headers: { 'headerstype': data.type}
				};
				// add query to req body
				let req_body = data.infos;

				// send to server
				Vue.axios.post(url, req_body, config).then((res) => {
					if(res.data.err) {
						console.log(res.data.err);
					}else {
						if(res.data.token)
						context.commit('setToken', res.data.token);
						context.commit('setAuthenticated', true);
						resolve(res.data);
					}
				}).catch( err => reject(err) )

			});
		},
		logout(context) {
			context.commit('setToken', '');
			context.commit('setAuthenticated', false);
			context.commit('setUser', null);
		}
  },
  getters: {
		user(state) {
			return state.user;
		},
	}
}