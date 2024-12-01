import { ImageResponse } from 'next/og'
import IntroCard from './components/Intro/introCard'
import './globals.css'

export const runtime = 'edge'
 
// Image metadata
export const alt = 'Profile of Cody Maness'
 
export const contentType = 'image/jpg'

const image = fetch(`https://codymaness.com/opengraph-image.jpg`).then(
    (res) => res.arrayBuffer()
  )

export default async function Image() {
  return new ImageResponse(
    (
        <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--dark-grey)",
                width: "100%",
                height: "100%"
        }}>
            <IntroCard imageData={ await image } />
        </div>
    ),
    {
        width: 800,
        height: 500
    }
  )
}