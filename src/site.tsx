import { FormEvent, useEffect, useRef, useState } from 'react'
import { invitation } from './invitation'

function daysUntilEvent() {
  const [year, month, day] = invitation.eventDate.split('-').map(Number)
  const eventDay = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.ceil((eventDay.getTime() - today.getTime()) / 86_400_000)
}

function escapeCalendarText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

function toCalendarUtc(value: Date) {
  return value.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function HollyBranch({ className = '' }: { className?: string }) {
  return <svg className={`holly-branch ${className}`} viewBox="0 0 260 300" fill="none" aria-hidden="true"><path d="M20 276C89 213 157 136 232 21" stroke="#52684A" strokeWidth="3" strokeLinecap="round"/><g fill="#718267" stroke="#536A51" strokeWidth="1.5"><path d="M48 253c-30 3-43-9-39-31 18 4 29 12 39 31Zm20-20c3-28 17-39 38-34-6 18-17 28-38 34Zm24-22c-27-3-38-16-34-37 18 5 28 15 34 37Zm20-23c5-27 20-37 40-30-7 18-19 26-40 30Zm24-27c-25-7-34-22-27-42 17 8 25 19 27 42Zm21-27c8-26 24-33 43-24-10 17-22 23-43 24Zm22-28c-22-11-28-27-17-45 15 10 21 23 17 45Z"/></g><g fill="#762D2D"><circle cx="65" cy="238" r="7"/><circle cx="99" cy="207" r="6"/><circle cx="126" cy="178" r="7"/><circle cx="153" cy="145" r="6"/><circle cx="180" cy="108" r="7"/></g><path d="M51 258c-7-12-10-22-8-32m29 9c9-9 17-15 27-17m-6-20c-7-11-11-22-10-32m30 10c10-8 19-12 29-13m-5-18c-5-12-6-23-3-33m26 4c11-5 21-8 31-7m-2-20c-1-13 2-23 8-31" stroke="#91A184" strokeWidth="1.5" strokeLinecap="round"/></svg>
}

function Ornaments({ className = '' }: { className?: string }) {
  return <svg className={`ornament-illustration ${className}`} viewBox="0 0 300 380" fill="none" aria-hidden="true"><path d="M110 0v71m84-71v112m-56 0v143" stroke="#9C7F50" strokeWidth="2"/><path d="M95 65h30v12H95zM180 104h29v13h-29zM124 321h28v12h-28z" fill="#B69A60"/><circle cx="110" cy="126" r="53" fill="#9D342F"/><path d="M60 115c31-20 66-19 101 2m-98 20c32-20 63-19 98 2" stroke="#F0DDB8" strokeWidth="11"/><circle cx="194" cy="189" r="43" fill="#244635"/><g fill="#D4B779"><circle cx="178" cy="177" r="4"/><circle cx="206" cy="171" r="4"/><circle cx="188" cy="198" r="4"/><circle cx="215" cy="202" r="4"/></g><path d="M138 248c29 0 51 23 51 52v20c0 23-18 42-40 42h-21c-22 0-40-19-40-42v-20c0-29 22-52 50-52Z" fill="#C87862"/><path d="M101 281c24 19 52 19 76 0m-75 18c24 19 51 19 75 0m-75 19c23 17 50 17 74 0" stroke="#F0DDB8" strokeWidth="5"/></svg>
}

function PortraitFrame({ src, alt, className }: { src: string; alt: string; className: string }) {
  return <figure className={`portrait-frame ${className}`}>
    <div className="portrait-mat"><img src={src} alt={alt} loading="eager" decoding="async"/></div>
    <svg className="portrait-frame-ornament" viewBox="0 0 300 410" fill="none" aria-hidden="true">
      <defs><linearGradient id="portrait-gold" x1="25" y1="20" x2="278" y2="390" gradientUnits="userSpaceOnUse"><stop stopColor="#fff0b5"/><stop offset=".2" stopColor="#b17d27"/><stop offset=".42" stopColor="#f5d982"/><stop offset=".68" stopColor="#98651c"/><stop offset="1" stopColor="#f4d98e"/></linearGradient></defs>
      <rect x="18" y="18" width="264" height="374" rx="5" stroke="url(#portrait-gold)" strokeWidth="11"/><rect x="31" y="31" width="238" height="348" rx="2" stroke="#fff0b5" strokeWidth="2"/><rect x="37" y="37" width="226" height="336" rx="1" stroke="#93651f" strokeWidth="1.5"/>
      <g stroke="url(#portrait-gold)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 81c-17-5-20-21-10-32 9-10 24-9 31 0 8 10 1 24-10 24-7 0-11-8-6-13 3-3 8-2 9 1M278 81c17-5 20-21 10-32-9-10-24-9-31 0-8 10-1 24 10 24 7 0 11-8 6-13-3-3-8-2-9 1M22 329c-17 5-20 21-10 32 9 10 24 9 31 0 8-10 1-24-10-24-7 0-11 8-6 13 3 3 8 2 9-1M278 329c17 5 20 21 10 32-9 10-24 9-31 0-8-10-1-24 10-24 7 0 11 8 6 13-3 3-8 2-9-1"/><path d="M112 20c7-15 17-18 23-7 6-11 16-8 23 7m-46 370c7 15 17 18 23 7 6 11 16 8 23-7M18 181c-15 7-18 17-7 24-11 6-8 16 7 23m264-47c15 7 18 17 7 24 11 6 8 16-7 23"/></g>
      <g fill="#d5ad58" stroke="#fff0b5" strokeWidth="1.5"><path d="m150 8 6 10-6 10-6-10zM150 382l6 10-6 10-6-10zM8 205l10-6 10 6-10 6zM272 205l10-6 10 6-10 6z"/><circle cx="29" cy="29" r="3"/><circle cx="271" cy="29" r="3"/><circle cx="29" cy="381" r="3"/><circle cx="271" cy="381" r="3"/></g>
    </svg>
    <svg className="portrait-greenery" viewBox="0 -12 230 78" fill="none" aria-hidden="true"><path d="M4 50C48 8 132 8 224 40" stroke="#53664b" strokeWidth="2.5" strokeLinecap="round"/><g fill="#768367" stroke="#53664b" strokeWidth="1.2"><path d="M24 37C8 20 8 11 18 6c12 9 15 19 6 31Zm19-15C39 6 44 0 56 1c5 12 1 19-13 21Zm25-11C63-1 69-5 81-2c2 12-4 18-13 13Zm27-4C91-5 97-9 109-4c1 12-5 17-14 11Zm28 1c-1-13 5-17 17-13 2 12-4 18-17 13Zm28 5c2-12 9-15 19-9-1 12-8 16-19 9Z"/></g><g stroke="#9ba686" strokeWidth="1.2" strokeLinecap="round"><path d="m28 39-9-24m25 8L48 5m20 7L73 2m23 8 4-13m22 17 7-15m17 18 10-13m16 23 13-10"/></g></svg>
  </figure>
}

function Stars() {
  return <div className="star-dust" aria-hidden="true"><span>✧</span><span>✦</span><span>✧</span></div>
}

function FloatingStars() {
  return <div className="floating-stars" aria-hidden="true">{Array.from({ length: 34 }, (_, index) => <span key={index}>{index % 3 === 0 ? '✧' : '✦'}</span>)}</div>
}

type RsvpStatus = { kind: 'success' | 'error' | 'info'; message: string } | null

export default function App() {
  const [opened, setOpened] = useState(false)
  const [entered, setEntered] = useState(false)
  const [status, setStatus] = useState<RsvpStatus>(null)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const musicRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!entered) return
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('in-view')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })
    revealItems.forEach((item) => observer.observe(item))

    let frame = 0
    const updateScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const range = document.documentElement.scrollHeight - window.innerHeight
        const progress = range > 0 ? window.scrollY / range : 0
        document.documentElement.style.setProperty('--scroll-progress', String(progress))
        document.documentElement.style.setProperty('--leaf-drift', `${Math.round(window.scrollY * -0.11)}px`)
        document.documentElement.style.setProperty('--leaf-drift-reverse', `${Math.round(window.scrollY * 0.08)}px`)
        frame = 0
      })
    }
    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [entered])

  const openInvitation = () => {
    if (opened) return
    setOpened(true)
    window.setTimeout(() => {
      setEntered(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 900)
  }

  function sendRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    const attending = data.attendance === 'yes' ? 'Yes, I’ll be there' : 'Sorry, I can’t make it'
    const count = Number(data.guestCount || 1)
    const message = [
      `Christmas RSVP — ${invitation.eventTitle}`,
      `Name: ${data.guestName}`,
      `Attendance: ${attending}`,
      `Guests: ${count}`,
      `Dietary notes / message: ${data.note || 'None'}`,
    ].join('\n')
    const whatsappUrl = `https://wa.me/${invitation.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setStatus({ kind: 'info', message: 'WhatsApp will open with your RSVP ready. Tap Send in WhatsApp to deliver it to the hosts.' })
  }

  function downloadCalendarInvite() {
    const start = new Date(invitation.calendarStart)
    const end = new Date(start.getTime() + invitation.calendarDurationMinutes * 60_000)
    const description = `${invitation.eventTitle} with ${invitation.host}. Please reply via WhatsApp to ${invitation.whatsappNumber}.`
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Williams Family//Christmas Invitation//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'BEGIN:VEVENT', `UID:williams-christmas-${invitation.eventDate}@invitation`, `DTSTAMP:${toCalendarUtc(new Date())}`,
      `DTSTART:${toCalendarUtc(start)}`, `DTEND:${toCalendarUtc(end)}`, `SUMMARY:${escapeCalendarText(`${invitation.eventTitle} with ${invitation.host}`)}`,
      `DESCRIPTION:${escapeCalendarText(description)}`, `LOCATION:${escapeCalendarText(`${invitation.venue}, ${invitation.address}`)}`, 'END:VEVENT', 'END:VCALENDAR', '',
    ].join('\r\n')
    const file = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = 'williams-family-christmas-lunch.ics'
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  async function toggleMusic() {
    const audio = musicRef.current
    if (!audio) return
    if (musicPlaying) {
      audio.pause()
      setMusicPlaying(false)
      return
    }
    try {
      await audio.play()
      setMusicPlaying(true)
    } catch {
      setStatus({ kind: 'error', message: 'The background music could not start. Please try again.' })
    }
  }

  const mapsHref = invitation.mapsDestination.trim()
    ? invitation.mapsDestination
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invitation.address)}`
  const days = daysUntilEvent()
  const countdown = days < 0 ? 'The celebration has passed' : days === 0 ? 'Today is the day' : `${days} days to go`

  return <>
    <FloatingStars />
    {!entered && <section className={`envelope-gate ${opened ? 'is-opening' : ''}`} aria-label="Open your Christmas invitation">
      <div className="gate-glow"/><Ornaments className="gate-ornaments"/><Ornaments className="gate-ornaments gate-ornaments-bottom"/><HollyBranch className="gate-sprig gate-sprig-left"/><HollyBranch className="gate-sprig gate-sprig-right"/>
      <div className="gate-copy"><span className="gate-kicker">A LITTLE CHRISTMAS POST</span><h1>You’re<br/><em>invited.</em></h1><p>A little something lovely is waiting inside.</p></div>
      <button className="envelope-trigger" onClick={openInvitation} disabled={opened} aria-label={opened ? 'Opening your Christmas invitation' : 'Open your Christmas invitation'}>
        <div className={`envelope ${opened ? 'envelope-open' : ''}`}><div className="envelope-letter"><span className="letter-mini">WITH LOVE FROM</span><span className="letter-name">{invitation.host}</span></div><div className="envelope-back"/><div className="envelope-pocket"/><div className="envelope-flap"><div className="flap-inner"/></div><div className="wax-seal" aria-hidden="true"><span>✦</span></div><span className="envelope-address">{invitation.host}</span></div>
      </button><p className="envelope-hint">{opened ? 'Your invitation is opening…' : 'Tap the envelope to open'}</p>
      <span className="gate-footer">A CHRISTMAS GATHERING · {invitation.date.toUpperCase()}</span>
    </section>}

    <div className={`invitation-page ${entered ? 'is-visible' : ''}`}>
      <div className="scroll-progress" aria-hidden="true"/>
      <audio ref={musicRef} src="/audio/soft-christmas.wav" loop preload="none" aria-label="Soft instrumental Christmas music"/>
      <button className="music-toggle" type="button" onClick={toggleMusic} aria-pressed={musicPlaying} aria-label={musicPlaying ? 'Turn background music off' : 'Turn background music on'}><span aria-hidden="true">♫</span>{musicPlaying ? 'Music on' : 'Music off'}</button>
      <header className="page-nav"><a className="nav-monogram" href="#top" aria-label="Back to the invitation">W</a><span className="nav-season">A CHRISTMAS GATHERING · 2026</span><a className="nav-rsvp" href="#rsvp">RSVP <span>↓</span></a></header>
      <main id="top">
        <section className="invitation-hero" data-reveal>
          <PortraitFrame className="portrait-frame-left" src="https://images.unsplash.com/photo-1724124620385-4a3dfa322c8f?auto=format&fit=crop&w=900&q=82" alt="A couple enjoying a relaxed Christmas portrait"/><PortraitFrame className="portrait-frame-right" src="https://images.unsplash.com/photo-1724124620406-540107f179fb?auto=format&fit=crop&w=900&q=82" alt="The same couple sharing a warm holiday embrace"/>
          <div className="invitation-paper"><div className="paper-border"><span className="paper-corner corner-tl">✧</span><span className="paper-corner corner-tr">✧</span><span className="paper-corner corner-bl">✧</span><span className="paper-corner corner-br">✧</span>
            <p className="paper-overline">WITH THE WARMEST WELCOME</p><p className="paper-invite">You’re invited to</p><h2>Christmas</h2><p className="paper-event">{invitation.eventTitle}</p><span className="paper-rule"><i>✦</i></span><p className="paper-host">Hosted with love by<br/><strong>{invitation.host}</strong></p><p className="paper-message">{invitation.invitationMessage}</p><a className="paper-rsvp" href="#rsvp">WE HOPE YOU’LL JOIN US <span>↓</span></a>
          </div></div>
          <span className="hero-caption">A day for good food, familiar faces & being together.</span><span className="hero-side-note">A NOTE FROM OUR HOME TO YOURS</span>
        </section>

        <section className="details-section" id="details" data-reveal><div className="section-label"><span>01</span><i/></div><div className="details-heading"><p className="eyebrow">PLEASE SAVE THE DATE</p><h2>The lovely<br/><em>little details.</em></h2><p className="details-intro">We’ve saved you a place at the table.</p><p className="countdown-line"><span aria-hidden="true">✦</span> {countdown}</p></div><div className="detail-grid">
          <article className="detail-item"><p className="detail-label">THE DAY</p><h3>{invitation.date}</h3><span className="detail-foot">A day to gather</span></article>
          <article className="detail-item"><span className="detail-icon">◷</span><p className="detail-label">THE TIME</p><h3>{invitation.time}</h3><span className="detail-foot">Come as you are</span></article>
          <article className="detail-item detail-location"><span className="detail-icon">⌖</span><p className="detail-label">THE PLACE</p><h3>{invitation.venue}</h3><p className="detail-address">{invitation.address}</p><a className="map-link" href={mapsHref} target="_blank" rel="noreferrer">Get directions <span>↗</span></a></article>
          {invitation.dressCode && <article className="detail-item"><span className="detail-icon">✧</span><p className="detail-label">DRESS CODE</p><h3>{invitation.dressCode}</h3><span className="detail-foot">The festive sort</span></article>}
        </div><div className="details-bottom"><span>WE CAN’T WAIT TO SEE YOU</span><span>✦</span><span>WITH LOVE, {invitation.host.toUpperCase()}</span></div></section>

        <section className="host-message" data-reveal><div className="message-ornament"><i/></div><p className="eyebrow">A LITTLE NOTE FROM YOUR HOST</p><h2>Christmas is for<br/><em>being together.</em></h2><p className="host-copy">{invitation.hostMessage}</p><span className="host-signature">With love, {invitation.host}</span><HollyBranch className="message-sprig"/></section>

        <section className="rsvp-section" id="rsvp" data-reveal><div className="rsvp-intro"><p className="eyebrow">KINDLY REPLY</p><h2>Will you be<br/><em>joining us?</em></h2><p>Please let us know if you can make it. We’d love to celebrate with you.</p><span className="rsvp-note">A little note helps us set the table.</span></div><form className="rsvp-form" onSubmit={sendRsvp}>
          <label className="field"><span>Your name</span><input name="guestName" type="text" autoComplete="name" placeholder="How shall we put your place card?" required/></label>
          <label className="field"><span>Will you be there?</span><select name="attendance" required defaultValue=""><option value="" disabled>Please choose one</option><option value="yes">Yes, I’ll be there</option><option value="no">Sorry, I can’t make it</option></select></label>
          <label className="field"><span>How many in your party?</span><select name="guestCount" defaultValue="1"><option value="1">Just me</option><option value="2">Two guests</option><option value="3">Three guests</option><option value="4">Four guests</option><option value="5">Five guests</option><option value="6">Six guests</option></select></label>
          <label className="field"><span>Dietary notes or a little message <i>optional</i></span><textarea name="note" rows={3} placeholder="Anything we should know?"/></label>
          <button className="send-rsvp" type="submit"><span>Continue to WhatsApp</span><span>↗</span></button>
          <button className="calendar-link" type="button" onClick={downloadCalendarInvite}>Add to calendar <span>↓</span></button>
          {status && <p className={`form-feedback ${status.kind}`} role="status" aria-live="polite">{status.message}</p>}
          <p className="privacy-note">Your reply opens in WhatsApp and is sent only when you tap Send there. Calendar invite includes the address and a two-hour time block.</p>
        </form></section>

        <section className="closing" data-reveal><HollyBranch className="closing-sprig closing-left"/><Ornaments className="closing-sprig closing-right"/><Stars/><span className="closing-kicker">UNTIL THEN, DEAR FRIENDS</span><h2>Looking forward to<br/><em>celebrating with you.</em></h2><p>{invitation.closingMessage}</p><span className="closing-heart">With love, {invitation.host}</span></section>
      </main>
      <footer className="page-footer"><span>A CHRISTMAS INVITATION, MADE WITH LOVE</span><a href="#top">Back to the top ↑</a><span>25 · 12 · 2026</span></footer>
    </div>
  </>
}
