import {
  VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline'
import {
  RewindIcon,
  SwitchHorizontalIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  VolumeUpIcon,
  ReplyIcon as RepeatIcon,
} from '@heroicons/react/solid'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import {
  currentTrackIdState,
  isPlayingState,
  repeatState,
  shuffleState,
  volumeState,
} from '../atoms/songAtom'
import useSongInfo from '../hooks/useSongInfo'
import useSpotify from '../hooks/useSpotify'

function Player() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [isRepeatingState, setRepeatState] = useRecoilState(repeatState)
  const [isShuffled, setIsShuffled] = useRecoilState(shuffleState)
  const [volume, setVolume] = useRecoilState(volumeState)

  const songInfo = useSongInfo()

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentIdTrack(data.body?.item?.id)
      })

      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        setIsPlaying(data.body?.is_playing)
        setIsShuffled(data.body?.shuffle_state)
        setRepeatState(data.body?.repeat_state)
        setVolume(data.body?.device?.volume_percent)
      })
    }
  }

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  const handleRepeat = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.repeat_state === 'off') {
        setRepeatState('context')
        spotifyApi.setRepeat('context')
      } else if (data.body.repeat_state === 'context') {
        setRepeatState('track')
        spotifyApi.setRepeat('track')
      } else {
        setRepeatState('off')
        spotifyApi.setRepeat('off')
      }
    })
  }

  const handleShuffle = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.shuffle_state) {
        spotifyApi.setShuffle('false')
        setIsShuffled(false)
      } else {
        spotifyApi.setShuffle('true')
        setIsShuffled(true)
      }
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (spotifyApi.getAccessToken && !currentTrackId) {
        fetchCurrentSong()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((error) => {})
    }, 500)
  )

  return (
    <>
      <Head>
        <title>
          {songInfo?.name} - {songInfo?.artists[0]?.name} | Spotify 2.0
        </title>
      </Head>
      <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-8 md:text-base">
        {/* left */}
        <div className="flex items-center space-x-4">
          <img
            className="hidden h-10 w-10 md:inline"
            src={songInfo?.album.images?.[0]?.url}
            alt=""
          />
          <div>
            <h3>{songInfo?.name}</h3>
            <p>{songInfo?.artists[0]?.name}</p>
          </div>
        </div>
        {/* Center */}
        <div className="flex items-center justify-evenly">
          {isShuffled === false ? (
            <SwitchHorizontalIcon onClick={handleShuffle} className="button" />
          ) : (
            <SwitchHorizontalIcon
              onClick={handleShuffle}
              className="button text-green-500"
            />
          )}
          <RewindIcon
            className="button"
            onClick={() => spotifyApi.skipToPrevious()}
          />
          {isPlaying ? (
            <PauseIcon onClick={handlePlayPause} className="button h-10 w-10" />
          ) : (
            <PlayIcon onClick={handlePlayPause} className="button h-10 w-10" />
          )}
          <FastForwardIcon
            className="button"
            onClick={() => spotifyApi.skipToNext()}
          />
          {isRepeatingState === 'off' ? (
            <RepeatIcon onClick={handleRepeat} className="button" />
          ) : isRepeatingState === 'context' ? (
            <RepeatIcon
              onClick={handleRepeat}
              className="button text-green-500"
            />
          ) : (
            <RepeatIcon
              onClick={handleRepeat}
              className="button text-red-500"
            />
          )}
        </div>
        {/* Right */}
        <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
          <VolumeDownIcon
            onClick={() => volume > 0 && setVolume(volume - 10)}
            className="button"
          />
          <input
            className="w-14 md:w-28"
            type="range"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            min={0}
            max={100}
          />
          <VolumeUpIcon
            onClick={() => volume < 100 && setVolume(volume + 10)}
            className="button"
          />
        </div>
      </div>
    </>
  )
}

export default Player
