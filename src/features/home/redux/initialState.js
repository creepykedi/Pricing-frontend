const initialState = {
  inquiriesList: [],
  payments: [],
  getInquiriesListPending: false,
  getInquiriesListError: null,
  contractorsList: [],
  getContractorsListPending: false,
  getContractorsListError: null,
  showFilter: false,
  getPaymentDetailsPending: false,
  getPaymentDetailsError: null,
  status: {
    created: false,
    received: true,
    paymentFormed: false,
    returned: false,
    takenDown: false,
    overdue: false
  },
};

export default initialState;
