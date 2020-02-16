import Store from "../store";

export const connectedOnly = function(to, from, next) {
	if(!Store.getters['user']) return next('/');
	return next();
}