export async function api(path, options = {}) {
  const { body, headers, ...rest } = options
  const res = await fetch(path, {
    credentials: 'include',
    headers: {
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...rest,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const error = new Error(data.error || 'Something went wrong.')
    error.status = res.status
    throw error
  }
  return data
}
