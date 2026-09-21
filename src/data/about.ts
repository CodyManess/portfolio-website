import { SiLetterboxd, SiGoodreads, SiYoutubemusic } from 'react-icons/si'
import { FaGamepad } from 'react-icons/fa6'
import { TechInterest, PersonalInterest, MediaLink } from '@/types/about'

export const techInterests: TechInterest[] = [
  { name: 'Web Development', emoji: '💻' },
  { name: 'Native & Cross-Platform Mobile', emoji: '📱' },
  { name: 'Accessibility (a11y)', emoji: '♿' },
  { name: 'GenAI-Assisted Dev', emoji: '🤖' },
  { name: 'Code Quality & Testing', emoji: '✨' },
  { name: 'Open Source', emoji: '🌐' },
]

export const personalInterests: PersonalInterest[] = [
  { name: 'Pet Care', emoji: '🐕 🐈' },
  { name: 'Politics & News', emoji: '📰' },
  { name: 'Exploring Food', emoji: '🍜' },
  { name: 'Local Events', emoji: '🎟️' },
  { name: 'Prioritizing Self-Care', emoji: '🧘' },
  { name: 'Traveling', emoji: '🌎' },
  { name: 'Notion Knowledge Systems', emoji: '📓' },
]

export const mediaLinks: MediaLink[] = [
  {
    name: 'Letterboxd',
    category: 'Film Diary & Reviews',
    url: 'https://letterboxd.com/codyness/',
    icon: SiLetterboxd,
  },
  {
    name: 'Goodreads',
    category: 'Books & Reading',
    url: 'https://www.goodreads.com/codyness',
    icon: SiGoodreads,
  },
  {
    name: 'Backloggd',
    category: 'Video Game Backlog',
    url: 'https://www.backloggd.com/u/codyness/',
    icon: FaGamepad,
  },
  {
    name: 'YouTube Music',
    category: 'Playlists & Tunes',
    url: 'https://music.youtube.com/channel/UC6zBwn_RPU5-MfYKbkg6BBA?si=syL9spZjwEp_v0cK',
    icon: SiYoutubemusic,
  },
]
