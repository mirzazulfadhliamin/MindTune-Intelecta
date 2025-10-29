import { createRouter, createWebHistory } from 'vue-router';


import UserLayout from '@/views/layouts/UserLayout.vue';

import HomeView from '@/views/HomeView.vue';
import MoodSlider from '@/views/MoodSliderView.vue';
import PageNotFound from '@/views/error/PageNotFound.vue';
import QuestionnaireView from "@/views/QuestionnaireView.vue";
import ProfessionalConsultationView from "@/views/ProfessionalConsultationView.vue";
import PlaylistResult from "@/views/playlistResultView.vue";
import FeedbackView from '@/views/FeedbackView.vue';

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
        path: '/questionnaire',
        name: 'questionnaire',
        component: QuestionnaireView,
        meta: { title: 'Questionnaire' }
      },
      {
        path: '/professional-consultation',
        name: 'professionalconsultation',
        component: ProfessionalConsultationView,
        meta: { title: 'ProfessionalConsultation' }
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
