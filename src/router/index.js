import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import Blog from '@/views/Blog.vue';
import BlogDetails from '@/views/BlogDetails.vue';
import Contact from '@/views/Contact.vue';
import EditorCourseList from '@/views/Editor/EditorCourseList.vue';
import EditorCreateCourse from '@/views/Editor/EditorCreateCourse.vue';
import EditorDashboard from '@/views/Editor/EditorDashboard.vue';
import EditorReviews from '@/views/Editor/EditorReviews.vue';
import Signin from '@/views/Editor/Signin.vue';
import Membership from '@/views/Membership.vue';
import Interests from '@/views/RegistrationSignIn/Interests.vue';
import Register from '@/views/RegistrationSignIn/Register.vue';
import SignIn from '@/views/RegistrationSignIn/SignIn.vue';
import SigninVerification from '@/views/RegistrationSignIn/SigninVerification.vue';
import SuperAdminAccount from '@/views/SuperAdmin/SuperAdminAccount.vue';
import SuperAdminCourseList from '@/views/SuperAdmin/SuperAdminCourseList.vue';
import SuperAdminCreateCourse from '@/views/SuperAdmin/SuperAdminCreateCourse.vue';
import SuperAdminDashboard from '@/views/SuperAdmin/SuperAdminDashboard.vue';
import SuperAdminMembers from '@/views/SuperAdmin/SuperAdminMembers.vue';
import SuperAdminPayments from '@/views/SuperAdmin/SuperAdminPayments.vue';
import CourseDetails from '@/views/User/CourseDetails.vue';
import MessageNotification from '@/views/User/MessageNotification.vue';
import MyAccount from '@/views/User/MyAccount.vue';
import MyLearning from '@/views/User/MyLearning.vue';
import Support from '@/views/User/Support.vue';
import UserDashboard from '@/views/User/UserDashboard.vue';
import UserSubscription from '@/views/User/UserSubscription.vue';
import { createRouter, createWebHistory } from 'vue-router';
import About from '../views/About.vue';
import Homepage from '../views/Homepage.vue';

const routes = [
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      { path: 'editor', component: EditorDashboard },
      { path: 'admin', component: UserDashboard },
      { path: 'superadmin', component: SuperAdminDashboard },
    ],
  },
  {
    path: '/',
    name: 'Home',
    component: Homepage,
  },
  { path: '/about', name: 'About', component: About },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/membership', name: 'Membership', component: Membership },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/register', name: 'Register', component: Register },
  { path: '/signin', name: 'Signin', component: SignIn },
  {
    path: '/blog/:id',
    name: 'BlogDetails',
    component: BlogDetails,
    props: true,
  },
  {
    path: '/signinverification',
    name: 'SigninVerification',
    component: SigninVerification,
  },
  {
    path: '/admin/messages',
    name: 'UserMessage',
    component: MessageNotification,
  },
  {
    path: '/admin/mylearning',
    name: 'MyLearning',
    component: MyLearning,
  },
  {
    path: '/admin/dashboard',
    name: 'UserDasboard',
    component: UserDashboard,
  },
  {
    path: '/course/:id',
    name: 'CourseDetails',
    component: CourseDetails,
  },
  {
    path: '/admin/account',
    name: 'UserAccount',
    component: MyAccount,
  },
  {
    path: '/admin/support',
    name: 'UserSupport',
    component: Support,
  },
  {
    path: '/admin/subscription',
    name: 'UserSubscription',
    component: UserSubscription,
  },
  {
    path: '/admin/interests',
    name: 'Interest',
    component: Interests,
  },
  {
    path: '/editor/signin',
    name: 'EditorSignin',
    component: Signin,
  },
  {
    path: '/editor/dashboard',
    name: 'EditorDashboard',
    component: EditorDashboard,
  },
  {
    path: '/editor/mycourses',
    name: 'EditorCourseList',
    component: EditorCourseList,
  },
  {
    path: '/editor/create-course',
    name: 'EditorCreateCourse',
    component: EditorCreateCourse,
  },
  {
    path: '/editor/reviews',
    name: 'EditorReviews',
    component: EditorReviews,
  },
  {
    path: '/superadmin/dashboard',
    name: 'SuperAdminDashboard',
    component: SuperAdminDashboard,
  },
  {
    path: '/superadmin/courses',
    name: 'SuperAdminCourseList',
    component: SuperAdminCourseList,
  },
  {
    path: '/superadmin/create-course',
    name: 'SuperAdminCreateCourse',
    component: SuperAdminCreateCourse,
  },
  {
    path: '/superadmin/members',
    name: 'SuperAdminMembers',
    component: SuperAdminMembers,
  },
  {
    path: '/superadmin/account',
    name: 'SuperAdminAccount',
    component: SuperAdminAccount,
  },
  {
    path: '/superadmin/payments',
    name: 'SuperAdminPayments',
    component: SuperAdminPayments,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
