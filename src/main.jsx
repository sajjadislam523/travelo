import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import Router from "./routes/router";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={new QueryClient()}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
