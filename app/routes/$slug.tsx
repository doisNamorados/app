// ./app/routes/location.$slug.tsx

import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Location from "~/components/Location";
import Post from "~/components/Post";
import { locationQuery, postQuery } from "~/lib/queries";
import { getClient } from "~/lib/sanity";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const post = await getClient().fetch(postQuery, params);

  return { post };
};

export default function PostRoute() {
  const { post } = useLoaderData();
  return <div>
    <Post post={post} />
    {JSON.stringify(post)}
    </div>;
}