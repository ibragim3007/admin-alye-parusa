type IdType = number;

export const apiConfig = {
  card: {
    get: {
      cards: '/cards',
      balance: (id: IdType) => `/cards/${id}/balance`,
      bonusExpectation: (id: IdType) => `/cards/${id}/bonus-expectation`,
      bonusSpendingAllowed: (id: IdType) => `/cards/${id}/bonus-spending-allowed`,
    },
    post: {
      cards: '/cards',
      changeStatus: (id: IdType) => `/cards/${id}/change-status`,
      updateBonusPercentage: (id: IdType) => `/cards/${id}/update-bonus-percentage`,
    },
    delete: {
      cards: '/cards',
      cardsId: (id: IdType) => `/cards/${id}`,
    },
  },
  client: {
    get: {
      clients: '/clients',
      clientId: (id: IdType) => `/clients/${id}`,
    },
    post: {
      clients: '/clients',
    },
    delete: {
      clients: '/clients',
      clientId: (id: IdType) => `/clients/${id}`,
    },
    put: {
      clientId: (id: IdType) => `/clients/${id}`,
    },
  },
  dictionary: {
    get: {
      cardStatuses: '/card-statuses',
      contactTypes: '/contact-types',
      sortOrders: '/sort-orders',
      tourStates: '/tour-states',
    },
  },
  tour: {
    get: {
      tours: '/api/tours',
      tour: (id: IdType) => `/api/tours/${id}`,
    },
    post: {
      tours: '/api/tours',
    },
    delete: {
      tours: '/api/tours',
    },
    put: {
      changeState: (id: IdType) => `/api/tours/${id}/change-state`,
    },
  },
};
