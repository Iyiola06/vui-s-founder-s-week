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
          background: 'linear-gradient(135deg, #101828 0%, #172554 100%)',
          color: '#FAFAF7',
          border: '18px solid #D9AE52',
          borderRadius: 80,
        }}
      >
        <div
          style={{
            fontSize: 148,
            fontWeight: 800,
            lineHeight: 1,
            fontFamily: 'serif',
            color: '#D9AE52',
            letterSpacing: 4,
          }}
        >
          SPRF
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#FFFFFF',
          }}
        >
          Venite University
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 20,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#D9AE52',
          }}
        >
          Students • Voice • Progress
        </div>
      </div>
    ),
    size
  );
}
