import { ImageResponse } from 'next/og'
import IntroCard from './components/Intro/introCard'
import './globals.css'

export const runtime = 'edge'

// Image metadata
export const alt = 'Profile of Cody Maness'

export const contentType = 'image/jpg'

const image = fetch(`https://codymaness.com/opengraph-image.jpg`).then((res) =>
  res.arrayBuffer()
)

export default async function Image() {
  return new ImageResponse(
    (
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
          <IntroCard imageData={await image} />
        </div>
      </div>
    ),
    {
      width: 800,
      height: 600,
    }
  )
}
