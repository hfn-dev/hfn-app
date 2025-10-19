import Blog from '@/views/Blog.vue';
import Contact from '@/views/Contact.vue';
import Membership from '@/views/Membership.vue';
import Register from '@/views/RegistrationSignIn/Register.vue';
import SignIn from '@/views/RegistrationSignIn/SignIn.vue';
import SigninVerification from '@/views/RegistrationSignIn/SigninVerification.vue';
import CourseDetails from '@/views/User/CourseDetails.vue';
import MessageNotification from '@/views/User/MessageNotification.vue';
import MyLearning from '@/views/User/MyLearning.vue';
import UserDashboard from '@/views/User/UserDashboard.vue';
import { createRouter, createWebHistory } from 'vue-router';
import About from '../views/About.vue';
import Homepage from '../views/Homepage.vue';
import MyAccount from '@/views/User/MyAccount.vue';

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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
