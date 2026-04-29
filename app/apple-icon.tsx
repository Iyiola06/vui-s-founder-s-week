import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
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
          background: '#0F5132',
          color: '#FDFCF8',
          borderRadius: 36,
          border: '8px solid #E5C76B',
        }}
      >
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1,
            fontFamily: 'Georgia, serif',
          }}
        >
          VU
        </div>
      </div>
    ),
    size
  );
}
