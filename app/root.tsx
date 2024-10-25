import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";
import { Hydrate, QueryClient, QueryClientProvider} from 'react-query';
import styles from "./tailwind.css";
import { ReactQueryDevtools } from 'react-query/devtools'
import { useState } from "react";
import { useDehydratedState } from "use-dehydrated-state";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
        queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
        },
    },
  }));

  const dehydratedState = useDehydratedState();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <Meta />
            <Links />
          </head>
          <body className="bg-gray-300">
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            {process.env.NODE_ENV === "development" && <LiveReload />}
            <ReactQueryDevtools initialIsOpen={false} />
          </body>
        </html>
      </Hydrate>
    </QueryClientProvider>
  );
}
