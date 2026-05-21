'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface PageProps {
  params: { slug: string };  // not a Promise anymore
}

export default function VersionPage({ params }: PageProps) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const isExpired = searchParams.get('expired') === 'true';

  // State to manage multiple accordion states natively
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const currentVersion = process.env.NEXT_PUBLIC_CURRENT_VERSION || '2026-05-21';
  const systemIsCurrentLink = slug === currentVersion;

  // Custom inline style mapping containing your exact branding color configurations
  const customStyles = {
    '--red': '#99130E',
    '--dark-red': '#60070F',
    '--near-black': '#0A0101',
    '--off-white': '#FBFFF1',
    '--gray': '#6A6968',
    '--accent': '#F4F4F4',
  } as React.CSSProperties;

  // Block renders if the middleware caught a link past its 60-day lifecycle limit
  if (isExpired) {
    return (
      <div style={customStyles} className="expired-wrapper">
        <style jsx global>{`
          body { background-color: #FBFFF1; font-family: Georgia, serif; color: #0A0101; }
          .expired-wrapper { max-width: 600px; margin: 100px auto; padding: 40px 24px; text-align: center; background: #fff; border-top: 4px solid #99130E; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border-radius: 4px; }
          h1 { font-family: 'Montserrat', sans-serif; font-weight: 800; color: #99130E; margin-bottom: 16px; }
          p { font-size: 16px; line-height: 1.6; color: #6A6968; }
        `}</style>
        <h1>Link Expired</h1>
        <p>
          This onboarding version update ({slug}) is older than 60 days and has been phased out
          systematically. Please request the latest document access link from your coordinator.
        </p>
      </div>
    );
  }

  // Your FAQ data matrix abstracted cleanly inside standard structured JSON
  const faqItems = [
    {
      q: 'What is Discretionary Leave?',
      a: 'Discretionary Leave is a temporary leave standard variant provided flexibly upon case assessments.',
    },
    {
      q: 'How early must I file for a planned leave request allocation?',
      a: 'Planned requests require formal submission protocols handled at least <strong>5 business days</strong> prior.',
    },
  ];

  return (
    <div style={customStyles}>
      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: var(--off-white); color: var(--near-black); font-family: Georgia, 'Times New Roman', serif; -webkit-font-smoothing: antialiased; }

        header { background-color: #ffffff; border-bottom: 3px solid var(--red); padding: 16px 48px; display: flex; align-items: center; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 12px rgba(10,1,1,0.07); }
        .header-logo { height: 44px; width: auto; font-family: 'Montserrat', sans-serif; font-weight: 800; color: var(--near-black); display: flex; align-items: center; }
        .header-logo span { color: var(--red); }

        .version-banner { background: #fff8f8; border-bottom: 1px solid rgba(153,19,14,0.2); padding: 8px 48px; text-align: center; font-size: 13px; font-family: sans-serif; color: var(--red); }

        .hero { background: linear-gradient(135deg, #0A0101 0%, #1a0202 60%, #60070F 100%); padding: 60px 48px 52px; text-align: center; }
        .hero-tag { display: inline-block; background: var(--red); color: #ffffff; font-family: sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; padding: 5px 14px; border-radius: 2px; margin-bottom: 20px; }
        .hero h1 { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: clamp(24px, 5vw, 44px); color: var(--off-white); line-height: 1.15; max-width: 700px; margin: 0 auto 16px; }
        .hero h1 span { color: var(--red); }
        .hero p { color: rgba(251,255,241,0.72); font-size: 16px; max-width: 560px; margin: 0 auto; line-height: 1.7; }

        .intro-section { padding: 40px 48px 0; max-width: 920px; margin: 0 auto; }
        .intro-card { background: #ffffff; border-left: 5px solid var(--red); padding: 24px 28px; box-shadow: 0 2px 16px rgba(10,1,1,0.06); }

        .faq-section { padding: 36px 48px 72px; max-width: 920px; margin: 0 auto; }
        .section-label { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--red); margin-bottom: 24px; display: flex; align-items: center; gap: 12px; }
        .section-label::after { content: ''; flex: 1; height: 1px; background: rgba(153,19,14,0.2); }

        .faq-item { border-bottom: 1px solid rgba(106,105,104,0.18); overflow: hidden; }
        .faq-item:first-child { border-top: 1px solid rgba(106,105,104,0.18); }
        .faq-question { width: 100%; background: none; border: none; cursor: pointer; padding: 20px 0; display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; text-align: left; min-height: 44px; }
        .faq-question-text { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 14px; color: var(--near-black); line-height: 1.5; flex: 1; }

        .faq-icon { flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; transition: background 0.2s ease; margin-top: 2px; }
        .faq-icon svg { width: 13px; height: 13px; stroke: var(--red); transition: transform 0.3s ease; }

        .faq-item.open .faq-icon { background: var(--red); }
        .faq-item.open .faq-icon svg { stroke: #ffffff; transform: rotate(45deg); }

        .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1); }
        .faq-item.open .faq-answer { max-height: 600px; }
        .faq-answer-inner { padding: 0 0 22px 0; font-size: 15px; line-height: 1.82; color: #2a1a1a; }

        .contact-section { background: #ffffff; border-top: 1px solid rgba(106,105,104,0.15); border-bottom: 1px solid rgba(106,105,104,0.15); padding: 52px 48px; }
        .contact-inner { max-width: 920px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .contact-email { display: inline-flex; align-items: center; gap: 10px; background: var(--red); color: #ffffff; font-weight: 600; padding: 13px 22px; border-radius: 4px; text-decoration: none; }

        footer { background: var(--near-black); padding: 24px 48px; text-align: center; color: rgba(251,255,241,0.45); font-size: 13px; }
        footer span { color: var(--red); }

        @media (max-width: 640px) {
          header, .hero, .intro-section, .faq-section, .contact-section, .version-banner { padding-left: 16px; padding-right: 16px; }
          .contact-inner { flex-direction: column; text-align: center; }
        }
      `}</style>

      {/* Header Notification Status Banner */}
      <div className="version-banner">
        {systemIsCurrentLink ? (
          <span>🟢 Viewing latest master version content deployed for: <strong>{slug}</strong></span>
        ) : (
          <span>🕒 Viewing archived historical record version ({slug}). Active status window expires 60 days from deployment.</span>
        )}
      </div>

      <header>
        <div className="header-logo">
          NightOwl<span>Consulting</span>
        </div>
      </header>

      <section className="hero">
        <div className="hero-tag">Internal Guide</div>
        <h1>Discretionary Leave <span>FAQs</span></h1>
        <p>Operational directives regarding documentation lifecycles at NightOwl Consulting Philippines Inc.</p>
      </section>

      <main className="intro-section">
        <div className="intro-card">
          <p>This dynamic onboarding policy map runs on high-efficiency automation templates. This active version slice was brought live on {slug}.</p>
        </div>
      </main>

      <section className="faq-section">
        <div className="section-label">General Questions</div>

        {faqItems.map((item, idx) => (
          <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
            <button className="faq-question" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
              <span className="faq-question-text">{item.q}</span>
              <div className="faq-icon">
                <svg viewBox="0 0 12 12" fill="none" strokeWidth="2" strokeLinecap="round">
                  <line x1="6" y1="2" x2="6" y2="10" />
                  <line x1="2" y1="6" x2="10" y2="6" />
                </svg>
              </div>
            </button>
            <div className="faq-answer">
              <div className="faq-answer-inner" dangerouslySetInnerHTML={{ __html: item.a }} />
            </div>
          </div>
        ))}
      </section>

      <section className="contact-section">
        <div className="contact-inner">
          <div>
            <div className="section-label">Need clarity?</div>
            <p>Our global operations and technical onboarding specialists remain active around the clock.</p>
          </div>
          <a href="mailto:onboarding@hirenightowl.com" className="contact-email">
            Contact Support
          </a>
        </div>
      </section>

      <footer>
        <p>&copy; 2026 <span>NightOwl</span> Consulting Philippines Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
