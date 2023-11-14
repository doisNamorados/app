import { json, type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// ./app/routes/location.tsx

import { useLoaderData } from "@remix-run/react";
import Location from "~/components/Location";
import Locations from "~/components/Locations";
import Posts from "~/components/Posts";
import { locationsQuery } from "~/lib/queries";
import { getClient } from "~/lib/sanity";

export const loader = async () => {
  const locations = await getClient().fetch(locationsQuery);

  return { locations };
};

export default function Index() {
  
  const { locations } = useLoaderData();

 return (
  < Locations locations = {locations} />
)
}

