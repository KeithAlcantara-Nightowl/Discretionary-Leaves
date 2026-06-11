'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string };
}

function checkValidity(slug: string): boolean | null {
  // Expected format after URL decode: 2026-05-21T15:45:30Z
  const decoded = decodeURIComponent(slug);
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
  if (!isoRegex.test(decoded)) return null;

  const slugDate = new Date(decoded);
  if (isNaN(slugDate.getTime())) return null;

  const now = new Date();
  const diffMs = now.getTime() - slugDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays <= 60;
}

export default function VersionPage({ params }: PageProps) {
  const { slug } = params;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const validity = checkValidity(slug);

  // Not a valid ISO 8601 format → 404
  if (validity === null) {
    notFound();
  }

  const isExpired = validity === false;

  const customStyles = {
    '--red': '#99130E',
    '--dark-red': '#60070F',
    '--near-black': '#0A0101',
    '--off-white': '#FBFFF1',
    '--gray': '#6A6968',
    '--accent': '#F4F4F4',
  } as React.CSSProperties;

if (isExpired) {
    notFound();
  }

  const faqItems = [
    {
      q: 'What are Discretionary Leaves?',
      a: 'Discretionary Leaves are extra paid leave days that the employee <strong>may</strong> be entitled to on top of the standard <strong>(5 days)</strong> leave entitlements provided by NightOwl. These additional leave benefits are <strong>CLIENT-BASED</strong>. This means that the number of Discretionary Leaves, and the rules for using them, may differ depending on the client you are assigned to.',
    },
    {
      q: 'Why does Discretionary Leave entitlement vary per client?',
      a: "Each client has different business needs, operational structures, and benefit programs. Because of this, additional leave or time-off arrangements available to employees may differ from one client assignment to another. This flexible setup allows NightOwl to align certain employee benefits and time-off arrangements with each client partnership, while maintaining the company's standard leave entitlements for all employees.",
    },
    {
      q: 'Are Discretionary Leaves guaranteed?',
      a: 'Discretionary Leaves are <strong>NOT GUARANTEED</strong>. If an employee is assigned to a client that offers additional leave, he/she may receive extra paid leave days on top of his/her Service Incentive Leave.',
    },
    {
      q: 'Can Discretionary Leave benefits change?',
      a: 'Yes, they can change. Because these benefits are <strong>CLIENT-BASED</strong>, the number of Discretionary Leaves and the rules for using them may change if:<ul class="faq-bullets"><li>The client changes its policy;</li><li>Business and operational needs change; or</li><li>The employee is transferred or reassigned to another client.</li></ul>Any applicable changes will be communicated by NightOwl as needed. When there are changes that affect an employee, NightOwl will provide appropriate updates.',
    },
    {
      q: 'Does this affect my standard leave benefits?',
      a: "No. Your standard leave entitlements provided by NightOwl (the <strong>5-day SIL</strong>) remain separate and unchanged. Any Discretionary Leaves offered through a client assignment are considered an additional benefit on top of the company's standard leave program.",
    },
    {
      q: 'What other days off may apply while assigned to a client?',
      a: "In addition to the standard leave entitlements and applicable discretionary leave benefits, employees generally follow the <strong>holiday schedule of their assigned client</strong>. Depending on the client assignment, employees may also observe additional holidays, shutdown periods, or rest days throughout the year. These may differ from Philippine national holidays or NightOwl's general holiday calendar, as they are aligned with the client's operations.",
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
        .faq-answer-inner strong { color: var(--red); font-family: sans-serif; font-weight: 700; }
        .faq-bullets { margin: 10px 0 10px 22px; padding: 0; }
        .faq-bullets li { margin-bottom: 6px; line-height: 1.7; }

        .intro-card p { font-size: 15px; line-height: 1.82; }
        .intro-card p + p { margin-top: 12px; }

        .notice-box { background: #fff8f8; border: 1.5px solid rgba(153,19,14,0.3); border-radius: 8px; padding: 24px 28px; margin-top: 36px; }
        .notice-box h3 { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--red); margin-bottom: 8px; }
        .notice-box p { font-size: 14px; line-height: 1.75; color: var(--near-black); }
        .notice-box p + p { margin-top: 10px; }
        .notice-box strong { color: var(--red); font-family: sans-serif; font-weight: 700; }
        .notice-bullets { margin: 10px 0 10px 22px; padding: 0; }
        .notice-bullets li { font-size: 14px; line-height: 1.75; color: var(--near-black); margin-bottom: 6px; }

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

      <header>
        <div className="header-logo">
          NightOwl<span>Consulting</span>
        </div>
      </header>

      <div className="version-banner">
        This document is active and valid. It will automatically expire 60 days from its issuance date.
      </div>

      <section className="hero">
        <div className="hero-tag">People &amp; Culture</div>
        <h1>Discretionary Leave Benefits <span>FAQs</span></h1>
        <p>Everything you need to know about Discretionary Leaves at NightOwl: how they work, why they vary per client, and what they mean for you.</p>
      </section>

      <main className="intro-section">
        <div className="intro-card">
          <p>At NightOwl, we understand that paid time off is an important part of every employee&rsquo;s overall experience and work-life balance.</p>
          <p>All employees receive the standard leave entitlements provided under company policy and applicable labor laws and regulations, including the five (5) days Service Incentive Leave (&ldquo;SIL&rdquo;) required by law for eligible employees.</p>
          <p>In some cases, employees assigned to certain clients may also receive additional leave benefits (&ldquo;Discretionary Leaves&rdquo;), depending on their client assignments.</p>
          <p>This FAQ explains how these Discretionary Leaves work.</p>
        </div>
      </main>

      <section className="faq-section">
        <div className="section-label">Frequently Asked Questions</div>

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

        <div className="notice-box" role="note">
          <h3>Important Note</h3>
          <p>Discretionary Leave benefits are supplemental and client-based in nature. This means:</p>
          <ul className="notice-bullets">
            <li>Availability and allocation may vary depending on the employee&rsquo;s assigned client;</li>
            <li>These benefits <strong>MAY CHANGE IF THERE IS REASSIGNMENT, CLIENT POLICY UPDATE, or CHANGE IN BUSINESS REQUIREMENTS</strong>; and</li>
            <li>These are <strong>NOT PERMANENT OR GUARANTEED BENEFITS</strong> and may be adjusted or withdrawn, subject to applicable laws and company policies.</li>
          </ul>
          <p>An employee&rsquo;s standard leave entitlements under Philippine law and NightOwl policy remain in place and are not affected by any changes to client-based Discretionary Leaves.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-inner">
          <div>
            <div className="section-label">Still have questions?</div>
            <p>Please feel free to reach out to your Human Resources Department for further queries.</p>
          </div>
          <a href="mailto:onboarding@hirenightowl.com" className="contact-email">
            Contact HR
          </a>
        </div>
      </section>

      <footer>
        <p>&copy; 2026 <span>NightOwl</span> Consulting Philippines Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
