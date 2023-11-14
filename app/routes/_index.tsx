import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// ./app/routes/_index.tsx

import { useLoaderData } from "@remix-run/react";
import Posts from "~/components/Posts";
import { getClient } from "~/lib/sanity";
import { postsQuery } from "~/lib/queries";

export const loader = async () => {
  const posts = await getClient().fetch(postsQuery);
  if (!posts) {
    return { status: 404 };
  }
  return { posts };
};

export default function Index() {
  const { posts } = useLoaderData();

  return <Posts posts={posts} />;
}

