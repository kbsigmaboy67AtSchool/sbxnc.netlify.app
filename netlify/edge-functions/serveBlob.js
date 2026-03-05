import { getStore } from "@netlify/blobs"

export async function handler(event) {

  const id = event.queryStringParameters.id

  const store = getStore("sbxnc")

  const blob = await store.get(id)

  if (!blob) {
    return {
      statusCode: 404,
      body: "Blob not found"
    }
  }

  return {
    statusCode: 200,
    body: blob
  }
}
