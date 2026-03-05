import { getStore } from "@netlify/blobs"

export default async (req, context) => {

  const url = new URL(req.url)

  const id = url.pathname.replace("/blob/", "")

  const store = getStore("sbxnc")

  const blob = await store.get(id, { type: "arrayBuffer" })

  if (!blob) {
    return new Response("Blob not found", { status: 404 })
  }

  return new Response(blob)

}

export const config = {
  path: "/blob/*"
}
