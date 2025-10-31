// import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import Blog from '@/views/Blog.vue';
import BlogDetails from '@/views/BlogDetails.vue';
import Contact from '@/views/Contact.vue';
import EditorAccount from '@/views/Editor/EditorAccount.vue';
import EditorDashboard from '@/views/Editor/EditorDashboard.vue';
import EditorPages from '@/views/Editor/EditorPages.vue';
import Signin from '@/views/Editor/Signin.vue';
import Membership from '@/views/Membership.vue';
import Interests from '@/views/RegistrationSignIn/Interests.vue';
import Register from '@/views/RegistrationSignIn/Register.vue';
import SignIn from '@/views/RegistrationSignIn/SignIn.vue';
import SigninVerification from '@/views/RegistrationSignIn/SigninVerification.vue';
import SuperAdminAccount from '@/views/SuperAdmin/SuperAdminAccount.vue';
import SuperAdminManager from '@/views/SuperAdmin/SuperAdminManager.vue';

import SuperAdminCourseList from '@/views/SuperAdmin/SuperAdminCourseList.vue';
import SuperAdminCreateCourse from '@/views/SuperAdmin/SuperAdminCreateCourse.vue';
import SuperAdminDashboard from '@/views/SuperAdmin/SuperAdminDashboard.vue';
import SuperAdminMembers from '@/views/SuperAdmin/SuperAdminMembers.vue';
import SuperAdminMessages from '@/views/SuperAdmin/SuperAdminMessages.vue';
import SuperAdminPayments from '@/views/SuperAdmin/SuperAdminPayments.vue';
import TutorCourseList from '@/views/Tutor/TutorCourseList.vue';
import TutorCreateCourse from '@/views/Tutor/TutorCreateCourse.vue';
import TutorDashboard from '@/views/Tutor/TutorDashboard.vue';
import TutorReviews from '@/views/Tutor/TutorReviews.vue';
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
import AdminAccount from '@/views/Admin/AdminAccount.vue';
import AdminCourseList from '@/views/Admin/AdminCourseList.vue';
import AdminCreateCourse from '@/views/Admin/AdminCreateCourse.vue';
import AdminDashboard from '@/views/Admin/AdminDashboard.vue';
import AdminMessages from '@/views/Admin/AdminMessages.vue';
import AdminPayments from '@/views/Admin/AdminPayments.vue';
import AdminMembers from '@/views/Admin/AdminMembers.vue';
import AdminManager from '@/views/Admin/AdminManager.vue';

const routes = [
  // {
  //   path: '/dashboard',
  //   component: DashboardLayout,
  //   children: [
  //     { path: 'editor', component: EditorDashboard },
  //     { path: 'user', component: UserDashboard },
  //     { path: 'superadmin', component: SuperAdminDashboard },
  //     { path: 'tutor', component: TutorDashboard },
  //   ],
  // },
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
    path: '/user/messages',
    name: 'UserMessage',
    component: MessageNotification,
  },
  {
    path: '/user/mylearning',
    name: 'MyLearning',
    component: MyLearning,
  },
  {
    path: '/user/dashboard',
    name: 'UserDasboard',
    component: UserDashboard,
  },
  {
    path: '/course/:id',
    name: 'CourseDetails',
    component: CourseDetails,
  },
  {
    path: '/user/account',
    name: 'UserAccount',
    component: MyAccount,
  },
  {
    path: '/user/support',
    name: 'UserSupport',
    component: Support,
  },
  {
    path: '/user/subscription',
    name: 'UserSubscription',
    component: UserSubscription,
  },
  {
    path: '/user/interests',
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
    path: '/editor/pages',
    name: 'EditorPages',
    component: EditorPages,
  },
  {
    path: '/editor/account',
    name: 'EditorAccount',
    component: EditorAccount,
  },
  {
    path: '/tutor/mycourses',
    name: 'TutorCourseList',
    component: TutorCourseList,
  },
  {
    path: '/tutor/create-course',
    name: 'TutorCreateCourse',
    component: TutorCreateCourse,
  },
  {
    path: '/tutor/dashboard',
    name: 'TutorDashboard',
    component: TutorDashboard,
  },
  {
    path: '/tutor/reviews',
    name: 'TutorReviews',
    component: TutorReviews,
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
    path: '/superadmin/access',
    name: 'SuperAdminManager',
    component: SuperAdminManager,
  },
  {
    path: '/superadmin/payments',
    name: 'SuperAdminPayments',
    component: SuperAdminPayments,
  },
  {
    path: '/superadmin/messages',
    name: 'SuperAdminMessages',
    component: SuperAdminMessages,
  },

  //For Admin
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
  },
  {
    path: '/admin/courses',
    name: 'AdminCourseList',
    component: AdminCourseList,
  },
  {
    path: '/admin/create-course',
    name: 'AdminCreateCourse',
    component: AdminCreateCourse,
  },
  
  {
    path: '/admin/account',
    name: 'AdminAccount',
    component: AdminAccount,
  },
  
  {
    path: '/admin/payments',
    name: 'AdminPayments',
    component: AdminPayments,
  },
  {
    path: '/admin/messages',
    name: 'AdminMessages',
    component: AdminMessages,
  },
  {
    path: '/admin/members',
    name: 'AdminMembers',
    component: AdminMembers,
  },
  {
    path: '/admin/access',
    name: 'AdminManager',
    component: AdminManager,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
