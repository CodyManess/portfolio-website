import { ImageResponse } from 'next/og'
import IntroCard from '@/components/Intro/introCard'
import { readFileSync } from 'fs'
import { join } from 'path'
import './globals.css'

// Image metadata
export const alt = 'Profile of Cody Maness'

export const contentType = 'image/jpg'

export const dynamic = 'force-dynamic'

export default async function Image() {
  const imageBuffer = readFileSync(
    join(process.cwd(), 'public/intro/portfolio-picture.webp')
  )
  const arrayBuffer = imageBuffer.buffer.slice(
    imageBuffer.byteOffset,
    imageBuffer.byteOffset + imageBuffer.byteLength
  )
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#171717',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          borderRadius: '4px',
          boxShadow: '0 0 30px 30px #007AB8',
        }}
      >
        <IntroCard imageData={arrayBuffer} />
      </div>
    </div>,
    {
      width: 800,
      height: 600,
    }
  )
}
