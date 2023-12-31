import type { LinksFunction, LoaderArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Location from "~/components/Location";

import { ClientOnly } from "~/components/map/client-only";
import { Map } from "~/components/map/Map.client";
import { locationQuery } from "~/lib/queries";
import { getClient } from "~/lib/sanity";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css",
  },
];

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const location = await getClient().fetch(locationQuery, params);

  return { location };
};

export default function Index() {
  const mapHeight = "400px";
  const { location } = useLoaderData();

  return (
    <Location location = {location} />
  );
}
