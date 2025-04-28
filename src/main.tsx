import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./i18n.js";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/ThemeProvider.js";
import { store } from "./store/store.js";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={true } /> */}
    </QueryClientProvider>
  </BrowserRouter>
);
