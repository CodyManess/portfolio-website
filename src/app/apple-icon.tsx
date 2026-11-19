import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 84,
        fontWeight: 700,
        letterSpacing: '-3px',
        background: 'linear-gradient(135deg, #196db2 0%, #007ab8 100%)',
        width: '100%',
        height: '100%',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '40px',
      }}
    >
      CM
    </div>,
    {
      ...size,
    }
  )
}
