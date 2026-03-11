import React, { useState, useEffect } from 'react';

const S = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 5%', height: 72,
    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
    borderBottom: '1px solid #e2e8f0',
    transition: 'box-shadow 0.3s',
  },
  navScrolled: { boxShadow: '0 2px 20px rgba(0,0,0,0.08)' },
  logo: { fontFamily: "'DM Serif Display', serif", fontSize: 22, color: '#0f172a', letterSpacing: '-0.3px' },
  logoSpan: { color: '#0ea5e9' },
  navLinks: { display: 'flex', gap: 32, listStyle: 'none' },
  navLink: { fontSize: 14, fontWeight: 500, color: '#334155', transition: 'color 0.2s' },
  navBtn: {
    background: '#0ea5e9', color: '#fff', padding: '10px 22px',
    borderRadius: 8, fontSize: 14, fontWeight: 600,
    transition: 'background 0.2s, transform 0.15s',
  },
  hero: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    padding: '120px 5% 80px',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #f0fdf4 100%)',
    position: 'relative', overflow: 'hidden',
  },
  heroContent: { maxWidth: 560, position: 'relative', zIndex: 2 },
  heroBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: '#e0f2fe', color: '#0284c7',
    padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 500,
    marginBottom: 24,
  },
  heroH1: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(42px, 6vw, 68px)', lineHeight: 1.1,
    color: '#0f172a', marginBottom: 20, letterSpacing: '-1px',
  },
  heroHighlight: { color: '#0ea5e9', fontStyle: 'italic' },
  heroSub: { fontSize: 18, color: '#64748b', lineHeight: 1.7, marginBottom: 36, maxWidth: 460 },
  heroActions: { display: 'flex', gap: 14, flexWrap: 'wrap' },
  btnPrimary: {
    background: '#0ea5e9', color: '#fff', padding: '14px 28px',
    borderRadius: 10, fontSize: 15, fontWeight: 600,
    boxShadow: '0 4px 20px rgba(14,165,233,0.35)',
    transition: 'all 0.2s',
  },
  btnOutline: {
    background: 'transparent', color: '#0ea5e9',
    border: '2px solid #0ea5e9', padding: '12px 26px',
    borderRadius: 10, fontSize: 15, fontWeight: 600,
    transition: 'all 0.2s',
  },
  heroStats: {
    display: 'flex', gap: 32, marginTop: 48,
    paddingTop: 40, borderTop: '1px solid #e2e8f0',
  },
  statNum: { fontFamily: "'DM Serif Display', serif", fontSize: 32, color: '#0f172a', lineHeight: 1 },
  statLabel: { fontSize: 13, color: '#64748b', marginTop: 4 },
  heroVisual: {
    position: 'absolute', right: '5%', top: '50%',
    transform: 'translateY(-50%)',
    width: 'min(480px, 42vw)',
    background: 'linear-gradient(145deg, #0ea5e9 0%, #0284c7 100%)',
    borderRadius: 32, padding: 48, color: '#fff',
    boxShadow: '0 40px 80px rgba(14,165,233,0.3)',
  },
  section: { padding: '96px 5%' },
  sectionLight: { padding: '96px 5%', background: '#f8fafc' },
  sectionCenter: { textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' },
  sectionTag: {
    display: 'inline-block', background: '#e0f2fe', color: '#0284c7',
    padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
    letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 12,
  },
  sectionH2: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15,
    color: '#0f172a', marginBottom: 14, letterSpacing: '-0.5px',
  },
  sectionSub: { fontSize: 16, color: '#64748b', lineHeight: 1.7 },
  servicesGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24,
    maxWidth: 1100, margin: '0 auto',
  },
  serviceCard: {
    background: '#fff', borderRadius: 16, padding: 32,
    border: '1px solid #e2e8f0',
    transition: 'transform 0.25s, box-shadow 0.25s',
    cursor: 'default',
  },
  serviceIcon: {
    width: 52, height: 52, borderRadius: 14,
    background: '#e0f2fe', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: 24, marginBottom: 20,
  },
  serviceTitle: { fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 8 },
  serviceDesc: { fontSize: 14, color: '#64748b', lineHeight: 1.7 },
  whyGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 32, maxWidth: 1000, margin: '0 auto',
  },
  whyItem: { textAlign: 'center', padding: '24px 16px' },
  whyNum: {
    fontFamily: "'DM Serif Display', serif", fontSize: 48,
    color: '#0ea5e9', lineHeight: 1, marginBottom: 8,
  },
  whyTitle: { fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 6 },
  whyDesc: { fontSize: 14, color: '#64748b', lineHeight: 1.6 },
  testimonialsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 24, maxWidth: 1100, margin: '0 auto',
  },
  testimonialCard: {
    background: '#fff', borderRadius: 16, padding: 28,
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
  },
  testimonialStars: { color: '#f59e0b', fontSize: 16, marginBottom: 14, letterSpacing: 2 },
  testimonialText: { fontSize: 15, color: '#334155', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' },
  testimonialAuthor: { display: 'flex', alignItems: 'center', gap: 12 },
  testimonialAvatar: {
    width: 42, height: 42, borderRadius: '50%',
    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: 700, fontSize: 16,
  },
  testimonialName: { fontWeight: 600, fontSize: 14, color: '#0f172a' },
  testimonialRole: { fontSize: 12, color: '#64748b', marginTop: 2 },
  teamGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 28, maxWidth: 900, margin: '0 auto',
  },
  teamCard: {
    background: '#fff', borderRadius: 16, overflow: 'hidden',
    border: '1px solid #e2e8f0', textAlign: 'center',
    transition: 'transform 0.25s, box-shadow 0.25s',
  },
  teamImgBox: {
    height: 200,
    background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 64,
  },
  teamBody: { padding: '20px 16px 24px' },
  teamName: { fontSize: 17, fontWeight: 600, color: '#0f172a', marginBottom: 4 },
  teamRole: { fontSize: 13, color: '#0ea5e9', fontWeight: 500 },
  apptSection: {
    padding: '96px 5%',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
    color: '#fff',
  },
  apptInner: {
    maxWidth: 1100, margin: '0 auto',
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center',
  },
  apptH2: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15,
    marginBottom: 16, letterSpacing: '-0.5px',
  },
  apptSub: { fontSize: 16, color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 },
  apptList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 },
  apptListItem: { display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#cbd5e1' },
  apptCheck: {
    width: 22, height: 22, borderRadius: '50%',
    background: '#0ea5e9', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: 12, flexShrink: 0,
  },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  input: {
    padding: '14px 16px', borderRadius: 10, border: '1px solid #334155',
    background: 'rgba(255,255,255,0.07)', color: '#fff',
    fontSize: 15, outline: 'none', fontFamily: "'DM Sans', sans-serif",
    transition: 'border-color 0.2s',
  },
  select: {
    padding: '14px 16px', borderRadius: 10, border: '1px solid #334155',
    background: 'rgba(255,255,255,0.07)', color: '#94a3b8',
    fontSize: 15, outline: 'none', fontFamily: "'DM Sans', sans-serif",
    width: '100%',
  },
  submitBtn: {
    background: '#0ea5e9', color: '#fff', padding: '15px',
    borderRadius: 10, fontSize: 16, fontWeight: 600,
    boxShadow: '0 4px 20px rgba(14,165,233,0.4)',
    transition: 'all 0.2s', marginTop: 4,
  },
  footer: {
    background: '#0f172a', color: '#94a3b8',
    padding: '64px 5% 32px',
  },
  footerGrid: {
    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: 48, maxWidth: 1100, margin: '0 auto 48px',
  },
  footerLogo: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 20, color: '#fff', marginBottom: 14,
  },
  footerDesc: { fontSize: 14, lineHeight: 1.7, marginBottom: 20 },
  footerH4: { fontSize: 13, fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 16 },
  footerLinks: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 },
  footerLink: { fontSize: 14, transition: 'color 0.2s' },
  footerDivider: { borderColor: '#1e293b', margin: '0 auto 24px', maxWidth: 1100 },
  footerBottom: { textAlign: 'center', fontSize: 13, maxWidth: 1100, margin: '0 auto' },
};

const services = [
  { icon: '🦷', title: 'General Dentistry', desc: 'Comprehensive check-ups, cleanings, and preventive care to keep your smile healthy year-round.' },
  { icon: '✨', title: 'Teeth Whitening', desc: 'Professional-grade whitening treatments that deliver noticeably brighter results in a single visit.' },
  { icon: '🔧', title: 'Dental Implants', desc: 'Permanent tooth replacement solutions that look, feel, and function just like natural teeth.' },
  { icon: '😁', title: 'Orthodontics', desc: 'Invisible aligners and traditional braces to straighten teeth at any age, discreetly and comfortably.' },
  { icon: '🛡️', title: 'Cosmetic Dentistry', desc: 'Veneers, bonding, and smile makeovers tailored to enhance the aesthetics of your unique smile.' },
  { icon: '🚨', title: 'Emergency Care', desc: 'Same-day appointments for dental emergencies — pain relief and care when you need it most.' },
];

const testimonials = [
  { text: 'Luma Dental completely transformed my smile. The team is incredibly professional and the results exceeded every expectation I had.', name: 'Sarah M.', role: 'Patient since 2021', initial: 'S' },
  { text: 'I was terrified of dentists before coming here. The staff made me feel completely at ease. My teeth have never looked better!', name: 'James K.', role: 'Patient since 2022', initial: 'J' },
  { text: "The whitening treatment was painless and the results were amazing. I can't stop smiling. Absolutely recommend Luma Dental!", name: 'Priya R.', role: 'Patient since 2023', initial: 'P' },
];

const team = [
  { emoji: '👨‍⚕️', name: 'Dr. Nathan Luma', role: 'Lead Dentist & Founder' },
  { emoji: '👩‍⚕️', name: 'Dr. Sarah Chen', role: 'Cosmetic Specialist' },
  { emoji: '👨‍⚕️', name: 'Dr. Omar Khalid', role: 'Orthodontist' },
];

const whyUs = [
  { num: '12+', title: 'Years Experience', desc: 'Over a decade of trusted dental care in the community.' },
  { num: '8K+', title: 'Happy Patients', desc: 'Thousands of smiles transformed and maintained.' },
  { num: '99%', title: 'Satisfaction Rate', desc: 'Our patients love their results and keep coming back.' },
  { num: '15+', title: 'Services Offered', desc: 'From routine care to full smile makeovers.' },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', date: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const navStyle = { ...S.nav, ...(scrolled ? S.navScrolled : {}) };

  return (
    <div>

      {/* NAV */}
      <nav style={navStyle}>
        <div style={S.logo}>Luma<span style={S.logoSpan}>.</span>Dental</div>
        <ul style={S.navLinks}>
          {['Services', 'About', 'Team', 'Testimonials', 'Contact'].map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} style={S.navLink}
                onMouseEnter={e => e.target.style.color = '#0ea5e9'}
                onMouseLeave={e => e.target.style.color = '#334155'}>{l}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" style={S.navBtn}
          onMouseEnter={e => e.currentTarget.style.background = '#0284c7'}
          onMouseLeave={e => e.currentTarget.style.background = '#0ea5e9'}>
          Book Appointment
        </a>
      </nav>

      {/* HERO */}
      <section style={S.hero} id="home">
        <div style={S.heroContent}>
          <div style={S.heroBadge}><span>⭐</span> Rated #1 Dental Studio in the City</div>
          <h1 style={S.heroH1}>
            Your Perfect<br />
            <span style={S.heroHighlight}>Smile</span> Starts<br />
            Here
          </h1>
          <p style={S.heroSub}>
            Experience world-class dental care in a warm, welcoming environment.
            From routine check-ups to complete smile makeovers — we've got you covered.
          </p>
          <div style={S.heroActions}>
            <a href="#contact" style={S.btnPrimary}
              onMouseEnter={e => { e.currentTarget.style.background = '#0284c7'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0ea5e9'; e.currentTarget.style.transform = 'none'; }}>
              Book Free Consultation
            </a>
            <a href="#services" style={S.btnOutline}
              onMouseEnter={e => { e.currentTarget.style.background = '#0ea5e9'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0ea5e9'; }}>
              Our Services
            </a>
          </div>
          <div style={S.heroStats}>
            {whyUs.slice(0, 3).map(w => (
              <div key={w.num}>
                <div style={S.statNum}>{w.num}</div>
                <div style={S.statLabel}>{w.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={S.heroVisual}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🦷</div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, marginBottom: 10 }}>
            Healthy Smiles, Happy Lives
          </div>
          <div style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.7, marginBottom: 24 }}>
            State-of-the-art technology meets compassionate care at Luma Dental Studio.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['✓ Same-day emergency appointments', '✓ Flexible payment plans', '✓ Anxiety-free dental care'].map(t => (
              <div key={t} style={{ fontSize: 14 }}>{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={S.sectionLight} id="services">
        <div style={S.sectionCenter}>
          <span style={S.sectionTag}>What We Offer</span>
          <h2 style={S.sectionH2}>Comprehensive Dental Services</h2>
          <p style={S.sectionSub}>From preventive care to cosmetic transformations, our expert team provides the full spectrum of dental treatments.</p>
        </div>
        <div style={S.servicesGrid}>
          {services.map(s => (
            <div key={s.title} style={S.serviceCard}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={S.serviceIcon}>{s.icon}</div>
              <div style={S.serviceTitle}>{s.title}</div>
              <div style={S.serviceDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section style={S.section} id="about">
        <div style={S.sectionCenter}>
          <span style={S.sectionTag}>Why Choose Us</span>
          <h2 style={S.sectionH2}>Trusted by Thousands of Patients</h2>
          <p style={S.sectionSub}>Our numbers speak for themselves. We are committed to delivering exceptional dental care every single day.</p>
        </div>
        <div style={S.whyGrid}>
          {whyUs.map(w => (
            <div key={w.num} style={S.whyItem}>
              <div style={S.whyNum}>{w.num}</div>
              <div style={S.whyTitle}>{w.title}</div>
              <div style={S.whyDesc}>{w.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section style={S.sectionLight} id="team">
        <div style={S.sectionCenter}>
          <span style={S.sectionTag}>Our Experts</span>
          <h2 style={S.sectionH2}>Meet the Team</h2>
          <p style={S.sectionSub}>Our experienced dentists combine clinical excellence with a passion for creating beautiful, healthy smiles.</p>
        </div>
        <div style={S.teamGrid}>
          {team.map(t => (
            <div key={t.name} style={S.teamCard}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={S.teamImgBox}>{t.emoji}</div>
              <div style={S.teamBody}>
                <div style={S.teamName}>{t.name}</div>
                <div style={S.teamRole}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={S.section} id="testimonials">
        <div style={S.sectionCenter}>
          <span style={S.sectionTag}>Patient Stories</span>
          <h2 style={S.sectionH2}>What Our Patients Say</h2>
          <p style={S.sectionSub}>Real stories from real patients who trusted us with their smiles.</p>
        </div>
        <div style={S.testimonialsGrid}>
          {testimonials.map(t => (
            <div key={t.name} style={S.testimonialCard}>
              <div style={S.testimonialStars}>★★★★★</div>
              <p style={S.testimonialText}>"{t.text}"</p>
              <div style={S.testimonialAuthor}>
                <div style={S.testimonialAvatar}>{t.initial}</div>
                <div>
                  <div style={S.testimonialName}>{t.name}</div>
                  <div style={S.testimonialRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* APPOINTMENT */}
      <section style={S.apptSection} id="contact">
        <div style={S.apptInner}>
          <div>
            <span style={{ ...S.sectionTag, background: 'rgba(14,165,233,0.2)', color: '#38bdf8' }}>Book Now</span>
            <h2 style={S.apptH2}>Ready for a Brighter Smile?</h2>
            <p style={S.apptSub}>Schedule your appointment today and take the first step towards the smile you've always wanted. First consultation is completely free.</p>
            <ul style={S.apptList}>
              {['Free initial consultation', 'Flexible morning & evening slots', 'Same-day emergency bookings', 'Insurance accepted'].map(item => (
                <li key={item} style={S.apptListItem}>
                  <span style={S.apptCheck}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {submitted ? (
              <div style={{ background: 'rgba(14,165,233,0.15)', borderRadius: 16, padding: 40, textAlign: 'center', border: '1px solid rgba(14,165,233,0.3)' }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: '#fff', marginBottom: 10 }}>Appointment Requested!</h3>
                <p style={{ color: '#94a3b8', fontSize: 15 }}>We'll contact you within 24 hours to confirm your booking. See you soon!</p>
              </div>
            ) : (
              <form style={S.form} onSubmit={handleSubmit}>
                <div style={S.formRow}>
                  <input required style={S.input} placeholder="Full Name" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = '#334155'} />
                  <input required style={S.input} type="email" placeholder="Email Address" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = '#334155'} />
                </div>
                <div style={S.formRow}>
                  <input style={S.input} type="tel" placeholder="Phone Number" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = '#334155'} />
                  <input style={S.input} type="date" value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = '#334155'} />
                </div>
                <select style={S.select} value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}>
                  <option value="">Select a Service</option>
                  {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                </select>
                <textarea style={{ ...S.input, resize: 'vertical', minHeight: 90 }}
                  placeholder="Additional notes (optional)" value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                  onBlur={e => e.target.style.borderColor = '#334155'} />
                <button type="submit" style={S.submitBtn}
                  onMouseEnter={e => { e.currentTarget.style.background = '#0284c7'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#0ea5e9'; e.currentTarget.style.transform = 'none'; }}>
                  Request Appointment →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={S.footer}>
        <div style={S.footerGrid}>
          <div>
            <div style={S.footerLogo}>Luma<span style={{ color: '#0ea5e9' }}>.</span>Dental</div>
            <p style={S.footerDesc}>Modern dental care for a brighter, healthier smile. We combine the latest technology with a personal touch.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {['📘', '📸', '🐦'].map((icon, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 8, background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16 }}>{icon}</div>
              ))}
            </div>
          </div>
          <div>
            <div style={S.footerH4}>Services</div>
            <ul style={S.footerLinks}>
              {services.slice(0, 4).map(s => (
                <li key={s.title}><a href="#services" style={S.footerLink}
                  onMouseEnter={e => e.target.style.color = '#0ea5e9'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}>{s.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div style={S.footerH4}>Company</div>
            <ul style={S.footerLinks}>
              {['About Us', 'Our Team', 'Testimonials', 'Careers'].map(l => (
                <li key={l}><a href="#about" style={S.footerLink}
                  onMouseEnter={e => e.target.style.color = '#0ea5e9'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div style={S.footerH4}>Contact</div>
            <ul style={S.footerLinks}>
              <li style={{ fontSize: 14 }}>📍 123 Smile Street, City</li>
              <li style={{ fontSize: 14 }}>📞 (555) 123-4567</li>
              <li style={{ fontSize: 14 }}>✉️ hello@lumadental.com</li>
              <li style={{ fontSize: 14 }}>🕐 Mon–Sat: 9am – 7pm</li>
            </ul>
          </div>
        </div>
        <hr style={S.footerDivider} />
        <div style={S.footerBottom}>© 2026 Luma Dental Studio. All rights reserved.</div>
      </footer>

    </div>
  );
}
