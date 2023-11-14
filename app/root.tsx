import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import stylesheet from "~/tailwind.css";


import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Suspense, lazy } from "react";
import { getSession } from "./sessions";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "stylesheet",
    href: "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css",
  },
];



const PreviewProvider = lazy(() => import("./components/PreviewProvider"));

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("preview");
  const preview = token ? { token } : undefined;

  return { preview };
};




export default function App() {
  const { preview } = useLoaderData();
  const children = <Outlet />

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script src="https://cdn.tailwindcss.com?plugins=typography" />
      </head>
      <body>
        {preview?.token ? (
          <PreviewProvider token={preview.token}>
            <Suspense fallback={children}>
              {children}
            </Suspense>
          </PreviewProvider>
        ) : (
          children
        )}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
