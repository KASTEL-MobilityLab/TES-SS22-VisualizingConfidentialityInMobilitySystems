import DataView from "@/views/DataView.vue";
import AggregatedDataView from "@/views/dataViewer/AggregatedDataView.vue";
import DefaultView from "@/views/dataViewer/DefaultView.vue";
import PaymentDataView from "@/views/dataViewer/PaymentDataView.vue";
import RiderDataView from "@/views/dataViewer/RiderDataView.vue";
import TripDataView from "@/views/dataViewer/TripDataView.vue";
import VehicleDataView from "@/views/dataViewer/VehicleDataView.vue";
import WelcomeView from "@/views/dataViewer/WelcomeView.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: DataView,
      children: [
        {
          // Display welcome message like in our Figma Prototype
          // This is displayed, when no vehicle is selected on the map.
          path: "",
          name: "Welcome",
          component: WelcomeView,
        },
        {
          // This is displayed, when no vehicle is selected on the map and the City role is selected.
          path: "",
          name: "AggregatedData",
          component: AggregatedDataView,
        },
        {
          // Display Router Links to RiderDataView etc.
          // This view should be displayed when the user clicks on a vehicle.
          path: "default",
          name: "Default",
          component: DefaultView,
        },
        // the rest of the nested data viewer views display the information of riders, trips etc..
        {
          path: "rider",
          name: "Rider Data",
          component: RiderDataView,
        },
        {
          path: "vehicle",
          name: "Vehicle Data",
          component: VehicleDataView,
        },
        {
          path: "trip",
          name: "Trip Data",
          component: TripDataView,
        },
        {
          path: "payment",
          name: "Payment Data",
          component: PaymentDataView,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      redirect: "/",
    },
  ],
});

export default router;
