import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  playlistState,
  playlistIdState,
  playlistTracksState,
  playlistOffsetState,
} from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from './Songs'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

function Center() {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const [playlistTracks, setPlaylistTracks] =
    useRecoilState(playlistTracksState)
  const [playlistOffset, setPlaylistOffset] =
    useRecoilState(playlistOffsetState)

  const loadNextSongs = () => {
    setPlaylistOffset(playlistOffset + 100)
    spotifyApi.getPlaylistTracks(playlistId, { offset: playlistOffset }).then(
      function (data) {
        setPlaylistTracks(data.body?.items)
        console.log(playlistTracks)
      },
      function (error) {
        console.log(error)
      }
    )
  }

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then(
      function (data) {
        setPlaylist(data.body)
      },
      function (error) {
        console.log(error)
      }
    )
  }, [spotifyApi, playlistId])

  useEffect(() => {
    loadNextSongs()
  }, [playlistId, spotifyApi])

  return (
    <div className="h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80"
          onClick={signOut}
        >
          {session?.user.image ? (
            <img
              src={session?.user.image ? session?.user.image : ''}
              alt="user_image"
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <svg
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 18 20"
              xmlns="http://www.w3.org/2000/svg"
              data-testid="user-icon"
            >
              <path d="M15.216 13.717L12 11.869C11.823 11.768 11.772 11.607 11.757 11.521C11.742 11.435 11.737 11.267 11.869 11.111L13.18 9.57401C14.031 8.58001 14.5 7.31101 14.5 6.00001V5.50001C14.5 3.98501 13.866 2.52301 12.761 1.48601C11.64 0.435011 10.173 -0.0879888 8.636 0.0110112C5.756 0.198011 3.501 2.68401 3.501 5.67101V6.00001C3.501 7.31101 3.97 8.58001 4.82 9.57401L6.131 11.111C6.264 11.266 6.258 11.434 6.243 11.521C6.228 11.607 6.177 11.768 5.999 11.869L2.786 13.716C1.067 14.692 0 16.526 0 18.501V20H1V18.501C1 16.885 1.874 15.385 3.283 14.584L6.498 12.736C6.886 12.513 7.152 12.132 7.228 11.691C7.304 11.251 7.182 10.802 6.891 10.462L5.579 8.92501C4.883 8.11101 4.499 7.07201 4.499 6.00001V5.67101C4.499 3.21001 6.344 1.16201 8.699 1.00901C9.961 0.928011 11.159 1.35601 12.076 2.21501C12.994 3.07601 13.5 4.24301 13.5 5.50001V6.00001C13.5 7.07201 13.117 8.11101 12.42 8.92501L11.109 10.462C10.819 10.803 10.696 11.251 10.772 11.691C10.849 12.132 11.115 12.513 11.503 12.736L14.721 14.585C16.127 15.384 17.001 16.884 17.001 18.501V20H18.001V18.501C18 16.526 16.932 14.692 15.216 13.717Z"></path>
            </svg>
          )}
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b p-8 ${color} to-black text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt={playlist?.name}
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
        <p className="pb-28 text-center text-white">
          <span
            className="mt-5 cursor-pointer rounded-full bg-green-500 p-3"
            onClick={loadNextSongs}
          >
            Load More
          </span>
        </p>
      </div>
    </div>
  )
}

export default Center
