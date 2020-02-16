import Store from "../store";

export const connectedOnly = function(to, from, next) {
	if(!Store.getters['user']) return next('/');
	return next();
}

export const waitLocalData = async (to, from, next) => {
  await Store.restored;
  return next();
}