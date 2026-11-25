import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { siteConfig } from '@/config/site'

// Image metadata
export const alt = `Profile of ${siteConfig.name}`

const OG_AVATAR_PATH = 'src/app/_assets/opengraph-avatar.jpg'

export const size = {
  width: 1200,
  height: 630,
}

// ImageResponse always renders a PNG, regardless of the embedded source image
export const contentType = 'image/png'

const iconCircleStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '56px',
  height: '56px',
  borderRadius: '9999px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#ffffff',
} as const

// No dynamic APIs are used, so the image is generated once at build time and
// served statically instead of being re-rendered on every request.
export default async function Image() {
  let imageDataUrl: string | null = null
  try {
    const base64Image = await readFile(
      join(process.cwd(), OG_AVATAR_PATH),
      'base64'
    )
    imageDataUrl = `data:image/jpeg;base64,${base64Image}`
  } catch (err) {
    console.warn(`Unable to load ${OG_AVATAR_PATH}:`, err)
  }

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#020617',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          alignItems: 'center',
          justifyContent: 'center',
          width: '448px',
          padding: '36px 40px',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Decorative colored glow blob behind profile picture */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            width: '192px',
            height: '192px',
            borderRadius: '9999px',
            backgroundImage:
              'radial-gradient(circle, rgba(95, 181, 246, 0.18) 0%, rgba(95, 181, 246, 0) 70%)',
          }}
        />

        {imageDataUrl ? (
          <div
            style={{
              display: 'flex',
              padding: '4px',
              borderRadius: '9999px',
              backgroundImage: 'linear-gradient(45deg, #007ab8, #5fb5f6)',
              boxShadow: '0 4px 20px rgba(25, 109, 178, 0.4)',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '152px',
                height: '152px',
                borderRadius: '9999px',
                overflow: 'hidden',
                border: '2px solid #0f172a',
                backgroundColor: '#0f172a',
              }}
            >
              <img
                src={imageDataUrl}
                alt={siteConfig.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '9999px',
                }}
              />
            </div>
          </div>
        ) : null}

        <h1
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '22px auto 0',
            fontSize: '44px',
            lineHeight: '1.1',
            letterSpacing: '-1px',
            textAlign: 'center',
            alignItems: 'center',
            fontWeight: 700,
            color: '#f8fafc',
          }}
        >
          {siteConfig.name}
          <span
            style={{
              display: 'block',
              marginTop: '10px',
              fontSize: '14px',
              lineHeight: '1.4',
              textAlign: 'center',
              color: '#5fb5f6',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
            }}
          >
            {siteConfig.role}
          </span>
        </h1>

        <p
          style={{
            maxWidth: '320px',
            margin: '12px auto 22px',
            textAlign: 'center',
            color: '#e2e8f0',
            fontSize: '16px',
            lineHeight: '1.6',
          }}
        >
          {siteConfig.shortDescription}
        </p>

        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            gap: '28px',
            paddingTop: '22px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          {/* GitHub */}
          <div style={iconCircleStyle}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </div>
          {/* LinkedIn */}
          <div style={iconCircleStyle}>
            <svg width="24" height="24" viewBox="0 0 448 512" fill="#ffffff">
              <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
            </svg>
          </div>
          {/* Email */}
          <div style={iconCircleStyle}>
            <svg width="24" height="24" viewBox="0 0 512 512" fill="#ffffff">
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg>
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  )
}
