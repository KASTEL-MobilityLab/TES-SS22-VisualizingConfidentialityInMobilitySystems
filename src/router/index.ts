import DefaultView from "@/views/DefaultView.vue";
import PaymentDataView from "@/views/PaymentDataView.vue";
import RiderDataView from "@/views/RiderDataView.vue";
import TripDataView from "@/views/TripDataView.vue";
import VehicleDataView from "@/views/VehicleDataView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "default",
      component: DefaultView,
      children: [
        {
          path: "rider",
          component: RiderDataView,
        },
        {
          path: "vehicle",
          component: VehicleDataView,
        },
        {
          path: "trip",
          component: TripDataView,
        },
        {
          path: "payment",
          component: PaymentDataView,
        },
      ],
    },
    {
      path: "/help",
      name: "help",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/HelpView.vue"),
    },
  ],
});

export default router;
