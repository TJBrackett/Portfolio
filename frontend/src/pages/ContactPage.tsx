import { useState, type FormEvent } from 'react'
import { submitContact } from '../api/client'

// Strip HTML tags to prevent XSS in form fields
function sanitize(s: string): string {
  return s.replace(/<[^>]*>/g, '').trim()
}

function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
}

interface FormState {
  name: string
  email: string
  phone: string
  message: string
  prefCall: boolean
  prefText: boolean
  prefEmail: boolean
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
  prefs?: string
}

const INITIAL: FormState = {
  name: '', email: '', phone: '', message: '',
  prefCall: false, prefText: false, prefEmail: false,
}

export default function ContactPage() {
  const [form, setForm]           = useState<FormState>(INITIAL)
  const [errors, setErrors]       = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!isValidEmail(form.email)) errs.email = 'Enter a valid email address'
    if (!form.message.trim()) errs.message = 'Message is required'
    if (!form.prefCall && !form.prefText && !form.prefEmail)
      errs.prefs = 'Select at least one preferred response method'
    return errs
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setServerError(null)
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSubmitting(true)
    try {
      const res = await submitContact({
        name:               sanitize(form.name),
        email:              sanitize(form.email),
        phone_number:       sanitize(form.phone),
        message_body:       sanitize(form.message),
        response_pref_call:  form.prefCall,
        response_pref_text:  form.prefText,
        response_pref_email: form.prefEmail,
      })
      setSuccessMsg(res.message)
      setForm(INITIAL)
    } catch {
      setServerError('Something went wrong. Please try again or reach out directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-content">
      <div className="contact-wrap">
        {/* ── Connect on top ── */}
        <div className="contact-social-top">
          <h2 className="page-title">Connect</h2>
          <div className="contact-social-row">
            <a
              href="https://www.linkedin.com/in/tjbrackett"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-card"
            >
              <div className="contact-social-icon">in</div>
              <div>
                <div className="contact-social-name">LinkedIn</div>
                <div className="contact-social-handle">tjbrackett</div>
              </div>
              <span className="contact-social-arrow">↗</span>
            </a>
            <a
              href="https://www.github.com/TJBrackett"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-card"
            >
              <div className="contact-social-icon contact-social-icon--gh">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                </svg>
              </div>
              <div>
                <div className="contact-social-name">GitHub</div>
                <div className="contact-social-handle">TJBrackett</div>
              </div>
              <span className="contact-social-arrow">↗</span>
            </a>
          </div>
        </div>

        {/* ── Get in Touch form ── */}
        <h1 className="page-title">Get in Touch</h1>
        <p className="page-sub" style={{ marginBottom: '32px' }}>
          Have a question, an opportunity, or just want to say hello?
        </p>

        {successMsg && (
          <div className="contact-success">
            <span className="contact-success-icon">✓</span>
            <div>
              <div className="contact-success-title">Message sent!</div>
              <div className="contact-success-body">{successMsg}</div>
            </div>
            <button className="contact-success-dismiss" onClick={() => setSuccessMsg(null)}>×</button>
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="cf-row cf-row-2">
            <div className="cf-field">
              <label className="cf-label">Name</label>
              <input
                className={`fi${errors.name ? ' fi-error' : ''}`}
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                maxLength={120}
                autoComplete="name"
              />
              {errors.name && <div className="fi-error-msg">{errors.name}</div>}
            </div>
            <div className="cf-field">
              <label className="cf-label">Email</label>
              <input
                className={`fi${errors.email ? ' fi-error' : ''}`}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                maxLength={254}
                autoComplete="email"
              />
              {errors.email && <div className="fi-error-msg">{errors.email}</div>}
            </div>
          </div>

          <div className="cf-field">
            <label className="cf-label">Phone <span className="cf-optional">(optional)</span></label>
            <input
              className="fi"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              maxLength={30}
              autoComplete="tel"
            />
          </div>

          <div className="cf-field">
            <label className="cf-label">Message</label>
            <textarea
              className={`fi cf-textarea${errors.message ? ' fi-error' : ''}`}
              placeholder="What's on your mind?"
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              maxLength={2000}
              rows={5}
            />
            {errors.message && <div className="fi-error-msg">{errors.message}</div>}
          </div>

          <div className="cf-field">
            <label className="cf-label">Preferred response method</label>
            <div className="cf-check-row">
              {([
                ['prefCall',  'Call'  ] as const,
                ['prefText',  'Text'  ] as const,
                ['prefEmail', 'Email' ] as const,
              ]).map(([key, label]) => (
                <label key={key} className="cf-check-label">
                  <input
                    type="checkbox"
                    checked={form[key]}
                    onChange={(e) => {
                      set(key, e.target.checked)
                      setErrors((er) => ({ ...er, prefs: undefined }))
                    }}
                  />
                  {label}
                </label>
              ))}
            </div>
            {errors.prefs && <div className="fi-error-msg">{errors.prefs}</div>}
          </div>

          {serverError && <div className="contact-server-error">{serverError}</div>}

          <button
            type="submit"
            className="gb-submit cf-submit"
            disabled={submitting}
          >
            {submitting ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}
