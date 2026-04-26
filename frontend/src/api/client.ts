import type { GuestbookResponse, Pin, PinsResponse, TrackResponse } from '../types';

const BASE = '/api/v1';

export async function trackVisit(
  pagePath: string,
  visitId?: number,
  durationSeconds?: number,
): Promise<TrackResponse> {
  const res = await fetch(`${BASE}/visitor/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      page_path: pagePath,
      visit_id: visitId ?? null,
      duration_seconds: durationSeconds ?? null,
    }),
  });
  if (!res.ok) throw new Error('track failed');
  return res.json();
}

export async function getVisitorPins(): Promise<Pin[]> {
  const res = await fetch(`${BASE}/visitors/pins`);
  if (!res.ok) throw new Error('pins fetch failed');
  const data: PinsResponse = await res.json();
  return data.pins;
}

export async function signGuestbook(name: string, emoji: string): Promise<GuestbookResponse> {
  const res = await fetch(`${BASE}/guestbook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, emoji }),
  });
  if (!res.ok) throw new Error('guestbook submit failed');
  return res.json();
}

export interface ContactPayload {
  name: string
  email: string
  phone_number: string
  message_body: string
  response_pref_call: boolean
  response_pref_text: boolean
  response_pref_email: boolean
}

export async function submitContact(data: ContactPayload): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('contact submit failed');
  return res.json();
}

export const VISITOR_STREAM_URL = `${BASE}/visitors/stream`;
