// import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import Blog from '@/views/Blog.vue';
import BlogDetails from '@/views/BlogDetails.vue';
import Contact from '@/views/Contact.vue';
import EditorAccount from '@/views/Editor/EditorAccount.vue';
import EditorDashboard from '@/views/Editor/EditorDashboard.vue';
import GetInvolved from '@/views/GetInvolved.vue';
import NewsAdvocacy from '@/views/NewsAdvocacy.vue';
import Programs from '@/views/Programs.vue';
import Resources from '@/views/Resources.vue';

import EditorPages from '@/views/Editor/EditorPages.vue';
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
import SuperAdminManager from '@/views/SuperAdmin/SuperAdminManager.vue';
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
import UserCourses from '@/views/User/UserCourses.vue';
import UserDashboard from '@/views/User/UserDashboard.vue';
import ArticleDetail from '@/views/User/ArticleDetail.vue';
import UserSubscription from '@/views/User/UserSubscription.vue';

import Publications from '@/views/Publications.vue';

import LearnerMyAccount from '@/views/Learner/MyAccount.vue';
import MyLearningLearner from '@/views/Learner/MyLearning.vue';
import LearnerSupport from '@/views/Learner/Support.vue';
import LearnerCourseDetails from '@/views/Learner/CourseDetails.vue';
import LearnerCourses from '@/views/Learner/UserCourses.vue';


import AdminAccount from '@/views/Admin/AdminAccount.vue';
import AdminCourseList from '@/views/Admin/AdminCourseList.vue';
import AdminCreateCourse from '@/views/Admin/AdminCreateCourse.vue';
import AdminDashboard from '@/views/Admin/AdminDashboard.vue';
import AdminManager from '@/views/Admin/AdminManager.vue';
import AdminMembers from '@/views/Admin/AdminMembers.vue';
import AdminMessages from '@/views/Admin/AdminMessages.vue';
import AdminPayments from '@/views/Admin/AdminPayments.vue';
import Events from '@/views/Events.vue';
import Gallery from '@/views/Gallery.vue';
import { createRouter, createWebHistory } from 'vue-router';
import About from '../views/About.vue';
import Homepage from '../views/Homepage.vue';

const routes = [
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
  { path: '/events', name: 'Events', component: Events },
  { path: '/gallery', name: 'Gallery', component: Gallery },
    { path: '/publication', name: 'Publications', component: Publications },


  { path: '/get-involved', name: 'GetInvolved', component: GetInvolved },
  { path: '/programs', name: 'Programs', component: Programs },
  { path: '/news', name: 'NewsAdvocacy', component: NewsAdvocacy },

  { path: '/resources', name: 'Resources', component: Resources },

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
    path: '/user/courses',
    name: 'UserCourses',
    component: UserCourses,
  },
  {
    path: '/course/:id',
    name: 'CourseDetails',
    component: CourseDetails,
  },
  {
    path: '/news/:slug',
    name: 'ArticleDetail',
    component: ArticleDetail,
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

  //tutor
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
    path: '/tutor/courses/:slug/edit',
    name: 'TutorEditCourse',
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

  //superadmin
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
    props: { mode: 'create' },
  },
  {
    path: '/superadmin/courses/:slug/edit',
    name: 'SuperAdminEditCourse',
    component: SuperAdminCreateCourse,
    props: { mode: 'edit' },
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

  //for learners

  {
    path: '/learner/dashboard',
    name: 'MyLearningLearner',
    component: MyLearning,
  },

  {
    path: '/learner/courses',
    name: 'LearnerCourses',
    component: UserCourses,
  },
  {
    path: '/course/:id',
    name: 'LearnerCourseDetails',
    component: CourseDetails,
  },

  {
    path: '/learner/account',
    name: 'LearnerMyAccount',
    component: MyAccount,
  },
  {
    path: '/learner/support',
    name: 'LearnerSupport',
    component: Support,
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
