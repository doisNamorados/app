// ./app/components/Locations.tsx

import { Link } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";

export default function Locations({ locations }: { locations: SanityDocument[] }) {
  return (
    <main className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
      {locations?.length > 0 ? (
        locations.map((location) => (
          <Link
            key={location._id}
            to={location.slug.current}
            className="p-4 hover:bg-blue-50"
          >
            <h2>{location.name}</h2>
          </Link>
        ))
      ) : (
        <div className="p-4 text-red-500">No locations found</div>
      )}
    </main>
  );
}