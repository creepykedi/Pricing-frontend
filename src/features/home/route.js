import { Admin, Payments, Contractor, Inquiries, Home, CreateInquiryForm } from './';

export default {
  path: '',
  childRoutes: [{ path: '/admin', component: Admin }, { path: 'payments', component: Payments }, { path: 'contractor', component: Contractor },
  { path: 'admin/createInquiry', component: CreateInquiryForm }, { path: 'Inquirie', component: Inquiries }, { path: '/', component: Home }],
};
