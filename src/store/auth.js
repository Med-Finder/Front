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
						let login_payload = {
							type : data.type,
							infos: {
								email   : data.infos.email,
								password: data.infos.password,
							}
						}
						context.dispatch('login', login_payload).then(resolve(res.data));
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
						console.log('res.data',res.data);
						if(res.data.token)
						context.commit('setUser', res.data.user);
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
		token(state) {
			return state.token;
		},
		authenticated(state) {
			return state.authentication;
		},
	}
}