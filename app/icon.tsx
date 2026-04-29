import { ImageResponse } from 'next/og';

export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0F5132 0%, #143D2E 100%)',
          color: '#FDFCF8',
          border: '20px solid #E5C76B',
        }}
      >
        <div
          style={{
            fontSize: 176,
            fontWeight: 700,
            lineHeight: 1,
            fontFamily: 'Georgia, serif',
          }}
        >
          VU
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 42,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#E5C76B',
          }}
        >
          FW 2026
        </div>
      </div>
    ),
    size
  );
}
