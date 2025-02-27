type IdType = number;

export const apiConfig = {
  me: {
    get: '/api/Me',
  },
  card: {
    get: {
      cards: '/api/cards',
      balance: (id: IdType) => `/api/cards/${id}/balance`,
      bonusExpectation: (id: IdType) => `/api/cards/${id}/bonus-expectation`,
    },
    post: {
      cards: '/api/cards',
      changeStatus: (id: IdType) => `/api/cards/${id}/change-status`,
      updateBonusPercentage: (id: IdType) => `/api/cards/${id}/update-bonus-percentage`,
    },
    delete: {
      cards: '/api/cards',
      cardsId: (id: IdType) => `/api/cards/${id}`,
    },
  },
  client: {
    get: {
      clients: '/api/clients',
      clientId: (id: IdType) => `/api/clients/${id}`,
    },
    post: {
      clients: '/api/clients',
    },
    delete: {
      clients: '/api/clients',
      clientId: (id: IdType) => `/api/clients/${id}`,
    },
    put: {
      clientId: (id: IdType) => `/api/clients/${id}`,
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
      tourId: (id: IdType) => `/api/tours/${id}`,
      toursByClientId: (id: number) => `/api/tours/client/${id}`,
    },
    post: {
      tours: '/api/tours',
    },
    delete: {
      tour: (id: number) => `/api/tours/${id}/delete`,
    },
    put: {
      changeState: (id: IdType) => `/api/tours/${id}/change-state`,
      tour: (id: IdType) => `/api/tours/${id}`,
    },
  },
};
