import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'
import './globals.css'

// Image metadata
export const alt = 'Profile of Cody Maness'

export const contentType = 'image/jpg'

export const dynamic = 'force-dynamic'

export default async function Image() {
  const imageBuffer = readFileSync(
    join(process.cwd(), 'public/opengraph-image.jpg')
  )
  const base64Image = imageBuffer.toString('base64')
  const imageDataUrl = `data:image/jpeg;base64,${base64Image}`

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#020617',
        backgroundImage:
          'radial-gradient(circle, rgba(0,122,184,0.15) 0%, #020617 70%)',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          alignItems: 'center',
          justifyContent: 'center',
          width: '450px',
          padding: '40px',
          borderRadius: '24px',
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div
          style={{
            display: 'flex',
            margin: '16px auto',
            width: '160px',
            height: '160px',
            position: 'relative',
            borderRadius: '9999px',
            overflow: 'hidden',
            border: '4px solid #007AB8',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageDataUrl}
            alt="Cody Maness"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '9999px',
            }}
          />
        </div>
        <h1
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '16px auto',
            fontSize: '36px',
            textAlign: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            color: '#ffffff',
          }}
        >
          Cody Maness
          <span
            style={{
              display: 'block',
              marginTop: '8px',
              fontSize: '14px',
              textAlign: 'center',
              color: '#5fb5f6',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
            }}
          >
            Web & Mobile Developer
          </span>
        </h1>
        <p
          style={{
            maxWidth: '380px',
            marginTop: '16px',
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
        >
          Creating accessible, scalable, and premium web & mobile applications.
        </p>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
}
