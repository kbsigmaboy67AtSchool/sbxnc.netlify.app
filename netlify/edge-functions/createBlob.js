import { getStore } from "@netlify/blobs"

export default async (req, context) => {

  if (req.method !== "POST") {
    return new Response("POST required", { status: 405 })
  }

  const store = getStore("sbxnc")

  const body = await req.arrayBuffer()

  const id = crypto.randomUUID()

  await store.set(id, body)

  const url = new URL(req.url)

  return new Response(JSON.stringify({
    url: `${url.origin}/blob/${id}`
  }), {
    headers: {
      "content-type": "application/json"
    }
  })

}

export const config = {
  path: "/api/blob/create"
}
