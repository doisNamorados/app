// ./components/Location.tsx

import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "@sanity/client";
import { projectId, dataset } from "~/lib/sanity";
import { ClientOnly } from "./map/client-only";
import { MyMapComponent } from "./othermap/Map";
import { MapContainer, TileLayer } from "react-leaflet";
import { Map } from "./map/Map.client";

const builder = imageUrlBuilder({ projectId, dataset });

export default function Location({ location }: { location: SanityDocument }) {
  const { name, image, blurb, gps } = location;
console.log(gps)
const mapHeight = "400px";

  return (
    <>
    <main className="container mx-auto prose prose-lg p-4">
      {name ? <h1>{name}</h1> : null}
      {image ? (
        <img
          className="float-left m-0 w-1/3 mr-4 rounded-lg"
          src={builder.image(image).width(300).height(300).quality(80).url()}
          width={300}
          height={300}
          alt={name}
        />
      ) : null}
      <p>{blurb}</p>
      
      <ClientOnly
      fallback={
        <div
          id="skeleton"
          style={{ height: mapHeight, background: "#d1d1d1" }}
        />
      }
    >
      {() => <Map position = {[gps.lat, gps.lng]}height={mapHeight} />}
    </ClientOnly>
    </main>
    </>
  );
}