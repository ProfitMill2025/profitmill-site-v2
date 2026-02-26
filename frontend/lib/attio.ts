import 'server-only'

/**
 * Attio CRM API Client
 * Server-only module for interacting with Attio API
 */

const ATTIO_BASE_URL = 'https://api.attio.com/v2'

// Validate environment variables at import time
function getConfig() {
  const apiKey = process.env.ATTIO_TOKEN
  const newsletterListId = process.env.ATTIO_NEWSLETTER_LIST_ID

  if (!apiKey) {
    throw new Error('ATTIO_TOKEN is not configured in environment variables')
  }

  if (!newsletterListId) {
    throw new Error('ATTIO_NEWSLETTER_LIST_ID is not configured in environment variables')
  }

  return { apiKey, newsletterListId }
}

interface AttioRecordId {
  workspace_id: string
  object_id: string
  record_id: string
}

interface AttioRecordResponse {
  id: AttioRecordId
  created_at: string
  values: Record<string, unknown>
}

interface AttioListEntryResponse {
  id: {
    workspace_id: string
    list_id: string
    entry_id: string
  }
  record_id: string
  created_at: string
}

interface AttioErrorResponse {
  code: string
  message: string
}

class AttioError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message)
    this.name = 'AttioError'
  }
}

async function attioFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { apiKey } = getConfig()

  const response = await fetch(`${ATTIO_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    let errorData: AttioErrorResponse
    try {
      errorData = JSON.parse(errorText)
    } catch {
      errorData = { code: 'unknown', message: response.statusText }
    }

    console.error('Attio API error:', {
      endpoint,
      status: response.status,
      error: errorData,
      rawResponse: errorText.substring(0, 500),
    })

    throw new AttioError(
      errorData.message || `Attio API error: ${response.status}`,
      response.status,
      errorData.code
    )
  }

  return response.json()
}

/**
 * Assert (upsert) a person record in Attio
 * Creates a new record if not found, updates if found based on email
 */
async function assertPerson(email: string): Promise<AttioRecordResponse> {
  const response = await attioFetch<{ data: AttioRecordResponse }>(
    '/objects/people/records?matching_attribute=email_addresses',
    {
      method: 'PUT',
      body: JSON.stringify({
        data: {
          values: {
            email_addresses: [email],
          },
        },
      }),
    }
  )

  return response.data
}

/**
 * Add a record to a list
 * Attio expects parent_object, parent_record_id, and entry_values
 */
async function addToList(
  listId: string,
  recordId: AttioRecordId
): Promise<AttioListEntryResponse> {
  const response = await attioFetch<{ data: AttioListEntryResponse }>(
    `/lists/${listId}/entries`,
    {
      method: 'POST',
      body: JSON.stringify({
        data: {
          parent_object: 'people',
          parent_record_id: recordId.record_id,
          entry_values: {},
        },
      }),
    }
  )

  return response.data
}

/**
 * Subscribe an email to the newsletter
 * Creates/updates a Person record and adds them to the Newsletter list
 */
export async function subscribeToNewsletter(email: string): Promise<void> {
  const { newsletterListId } = getConfig()

  // Create or update the person record
  const person = await assertPerson(email)

  // Add to the newsletter list
  // Note: Attio may return an error if already on the list, which is fine
  try {
    await addToList(newsletterListId, person.id)
  } catch (error) {
    // If already on list, that's okay - silently succeed
    if (error instanceof AttioError && error.code === 'already_exists') {
      return
    }
    throw error
  }
}
