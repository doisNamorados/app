// ./components/Location.tsx

import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "~/lib/sanity";
import { Map } from "./map/Map.client";
import { ClientOnly } from "./map/client-only";

const builder = imageUrlBuilder({ projectId, dataset });

type Location = Sanity.Default.Schema.Location
export default function Location({ location }: { location: Location }) {
const mapHeight = "400px";

  return (
    <>
    <main className="container mx-auto prose prose-lg p-4">
      {location?.name ? <h1>{location.name}</h1> : null}
      {location?.image ? (
        <img
          className="float-left m-0 w-1/3 mr-4 rounded-lg"
          src={builder.image(location.image).width(300).height(300).quality(80).url()}
          width={300}
          height={300}
          alt={location.name}
        />
      ) : null}
      <p>{location?.blurb}</p>
      
      <ClientOnly
      fallback={
        <div
          id="skeleton"
          style={{ height: mapHeight, background: "#d1d1d1" }}
        />
      }
    >
      {() => <Map position = {[location?.gps.lat, location?.gps.lng]}height={mapHeight} />}
    </ClientOnly>
    </main>
    </>
  );
}