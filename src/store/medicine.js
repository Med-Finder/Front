import Vue from 'vue'

export default {
  state: {
		medicines: []
	},
  mutations: {
		setMedicines(state, val) {
			Vue.set(state, 'medicines', val);
		},
		addMedicine(state, val) {
			state.medicines.push(val);
		}
	},
	actions: {
    createMedicine (context, medicine) {
			return new Promise((resolve, reject) => {
				let med_add_url = "/medicine/save";
				let add_to_pharma_url = "/pharmacy/addmedicine";

				// send to server
				Vue.axios.post(med_add_url, medicine).then((res) => {
					// Medicine is ready.
					// Add medicine to state
					context.commit('addMedicine', res.data);

					// Now add it to the pharmacy
					let data = {
						medicineId: res.data._id,
						pharmacyId: context.getters['user']._id
					}
					Vue.axios.post(add_to_pharma_url, data).then((res) => {
						return resolve(res.data);
					}).catch( err => reject(err) );
				}).catch( err => reject(err) )

			});
    }
  },
  getters: {
		medicines(state) {
			return state.medicines;
		}
	}
}