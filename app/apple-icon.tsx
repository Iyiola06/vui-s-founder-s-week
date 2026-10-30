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
          background: '#101828',
          color: '#FAFAF7',
          borderRadius: 36,
          border: '8px solid #D9AE52',
        }}
      >
        <div
          style={{
            fontSize: 54,
            fontWeight: 800,
            lineHeight: 1,
            fontFamily: 'serif',
            color: '#D9AE52',
            letterSpacing: 2,
          }}
        >
          SPRF
        </div>
      </div>
    ),
    size
  );
}
