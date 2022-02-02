export default {
  imageUrl(state) {
    return state.imageUrl;
  },
  isUpdating(state) {
    return state.isUpdating;
  },
  hasUpdated(state) {
    return state.hasUpdated;
  },
  accountId(state) {
    return state.accountId;
  },
  userEmail(state) {
    return state.userEmail;
  },

  firstName(state) {
    return state.firstName;
  },
  lastName(state) {
    return state.lastName;
  },
  fullName(state) {
    return state.firstName + " " + state.lastName;
  },
  dob(state) {
    return state.dob;
  },
  address(state) {
    return state.address;
  },
  city(state) {
    return state.city;
  },
  county(state) {
    return state.county;
  },
  postalCode(state) {
    return state.postalCode;
  },
  businessName(state) {
    return state.businessName;
  },
  businessAddress(state) {
    return state.businessAddress;
  },
  businessCity(state) {
    return state.businessCity;
  },

  // coaches(state) {
  //   return state.coaches;
  // },
  // hasCoaches(state) {
  //   return state.coaches && state.coaches.length > 0;
  // },
  // isCoach(_, getters, _2, rootGetters) {
  //   const coaches = getters.coaches;
  //   const userId = rootGetters.userId;
  //   return coaches.some(coach => coach.id === userId);
  // },
  // shouldUpdate(state) {
  //   const lastFetch = state.lastFetch;
  //   if (!lastFetch) {
  //     return true;
  //   }
  //   const currentTimeStamp = new Date().getTime();
  //   return (currentTimeStamp - lastFetch) / 1000 > 60;
  // }
};
