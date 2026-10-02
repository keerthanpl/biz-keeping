import { useEffect, useRef, useState } from 'react'
import { api } from '../api.js'
import { useShop } from './ShopContext.jsx'

export default function Bizi() {
  const { shop } = useShop()
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [messages, setMessages] = useState([])
  const scroller = useRef(null)

  const toggle = () => {
    if (!open && messages.length === 0 && shop.alerts.length) {
      setMessages([{
        role: 'model',
        text: `Low stock right now: ${shop.alerts.map((alert) => alert.message).join(' ')} Ask me what to reorder, or how billing uses the GST rate saved on an item.`,
      }])
    }
    setOpen((value) => !value)
  }

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight })
  }, [messages, open])

  const send = async (event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text || busy) return
    const next = [...messages, { role: 'user', text }]
    setMessages(next)
    setDraft('')
    setBusy(true)
    const payload = []
    for (const message of next) {
      if (!payload.length && message.role === 'model') continue
      payload.push(message)
    }
    try {
      const data = await api('/api/chat', { method: 'POST', body: { messages: payload } })
      setMessages([...next, { role: 'model', text: data.reply }])
    } catch (err) {
      setMessages([...next, { role: 'model', text: err.message }])
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <button type="button" className="bizi-toggle btn btn--primary" onClick={toggle}>
        {open ? 'Close Bizi' : 'Bizi'}
      </button>
      {open && (
        <section className="bizi-panel" aria-label="Bizi help">
          <header className="bizi-panel__head">
            <strong>Bizi</strong>
            <span>Help for this shop</span>
          </header>
          <div className="bizi-panel__log" ref={scroller}>
            {messages.length === 0 && (
              <p>Ask about billing, inventory, a stored GST rate, or this month’s report.</p>
            )}
            {messages.map((message, index) => (
              <p key={index} className={message.role === 'user' ? 'bizi-msg bizi-msg--user' : 'bizi-msg'}>
                {message.text}
              </p>
            ))}
            {busy && <p className="bizi-msg">Bizi is thinking…</p>}
          </div>
          <form className="bizi-panel__form" onSubmit={send}>
            <label className="visually-hidden" htmlFor="bizi-q">Message Bizi</label>
            <input
              id="bizi-q"
              className="field"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask Bizi"
              maxLength={800}
            />
            <button className="btn btn--primary btn--small" type="submit" disabled={busy}>Send</button>
          </form>
        </section>
      )}
    </>
  )
}
