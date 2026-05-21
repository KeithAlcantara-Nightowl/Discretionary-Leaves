'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#99130E' }}>An error occurred accessing this version instance.</h2>
      <button
        onClick={() => reset()}
        style={{
          marginTop: '16px',
          background: '#99130E',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Retry Window Loading
      </button>
    </div>
  );
}
