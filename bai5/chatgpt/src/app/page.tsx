"use client";

import HomeLayout from "@/layouts/homeLayout";
import SideBar from "@/modules/sideBar";
import ContentBox from "@/modules/contentBox";
import { Provider } from "react-redux";
import store from "@/store";

export default function Home() {
  return (
    <Provider store={store}>
      <HomeLayout>
        <SideBar className="w-1/5 h-full" />
        <ContentBox className="w-4/5 h-full" />
      </HomeLayout>
    </Provider>
  );
}
