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
import { tripsQuery } from "~/lib/queries";
import { getClient } from "~/lib/sanity";

export const loader = async () => {
  const trips = await getClient().fetch(tripsQuery);

  return { trips };
};

export default function Index() {
  
  const { trips } = useLoaderData();

 return (
    <p>lets make a trip</p>
)
}

