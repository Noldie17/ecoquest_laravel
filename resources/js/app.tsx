import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import AppLayout from "./Components/AppLayout";

type InertiaPage = React.ComponentType & {
  layout?: (page: React.ReactNode) => React.ReactNode;
};
const pages = import.meta.glob<{ default: InertiaPage }>("./Pages/**/*.tsx");

createInertiaApp({
  resolve: async (name) => {
    const page = await pages[`./Pages/${name}.tsx`]();
    page.default.layout = (content) => <AppLayout>{content}</AppLayout>;
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
  title: (title) => (title ? `${title} | EcoQuest` : "EcoQuest | Scan. Upcycle. Ascend."),
});
