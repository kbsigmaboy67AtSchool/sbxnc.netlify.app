import { getStore } from "@netlify/blobs"

export async function handler(event) {

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "POST required" }
  }

  const store = getStore("sbxnc")

  const id = crypto.randomUUID()

  await store.set(id, event.body)

  const url = `https://sbxnc.netlify.app/.netlify/functions/serveBlob?id=${id}`

  return {
    statusCode: 200,
    body: JSON.stringify({ url })
  }
}
