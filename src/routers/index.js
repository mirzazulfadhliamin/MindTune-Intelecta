import { createRouter, createWebHistory } from 'vue-router';


import UserLayout from '@/views/layouts/UserLayout.vue';

import HomeView from '@/views/layouts/HomeLayout.vue';
import MoodSlider from '@/views/Healing/MoodSliderView.vue';
import PageNotFound from '@/views/error/PageNotFound.vue';
import QuestionnaireView from "@/views/Healing/QuestionnaireView.vue";
import ProfessionalConsultationView from "@/views/Healing/ProfessionalConsultationView.vue";
import PlaylistDetailView from "@/views/Healing/PlaylistDetailView.vue";
import DashboardView from "@/views/Healing/dashboard/DashboardView.vue";
import PlaylistResult from "@/views/Healing/PlaylistResultView.vue";
import FeedbackView from '@/views/Healing/FeedbackView.vue';
import CallbackView from '@/views/Healing/CallbackView.vue';
import LoadingAnimationView from '@/views/Healing/LoadingAnimationView.vue';

const routes = [
  {
    path: '/',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: { title: 'Home' }
      },
      {
        path: '/callback',
        name: 'callback',
        component: CallbackView,
        meta: { title: 'Login Callback' }
      },
      {
        path: '/questionnaire',
        name: 'questionnaire',
        component: QuestionnaireView,
        meta: { title: 'Questionnaire' }
      },
      {
        path: '/professional-consultation',
        name: 'professional-consultation',
        component: ProfessionalConsultationView,
        meta: { title: 'ProfessionalConsultation' }
      },
      {
        path: '/loading-animation',
        name: 'loading-animation',
        component: LoadingAnimationView,
        meta: { title: 'Loading Animation' }
      },
      {        
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: { title: 'DashboardView' }
      },
      {
        path: '/playlist-detail',
        name: 'playlist-detail',
        component: PlaylistDetailView,
        meta: { title: 'PlaylistDetailView' }
      },
       {
        path: '/mood-slider',
        name: 'moodslider',
        component: MoodSlider,
        meta: { title: 'MoodSlider' }
      },
       {
        path: '/playlist-result',
        name: 'playlistresult',
        component: PlaylistResult,
        meta: { title: 'playlistresult' }
      },
       {
        path: '/Feedback',
        name: 'Feedback',
        component: FeedbackView,
        meta: { title: 'Feedback' }
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: PageNotFound,
    meta: { title: 'Page Not Found' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach((to) => {
  document.title = to.meta.title || 'Vue App';
});

export { routes };
export default router;
