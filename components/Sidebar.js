import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { playlistIdState, playlistOffsetState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'

function Sidebar() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  const [playlistOffset, setPlaylistOffset] =
    useRecoilState(playlistOffsetState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  return (
    <div className="lg:max-w[15rem] hidden h-screen overflow-y-scroll border-gray-900 p-5 pb-6 text-xs text-gray-500 scrollbar-hide sm:max-w-[12rem] md:inline-flex lg:text-sm">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white ">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white ">
          <PlusCircleIcon className="h-5 w-5 " />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <p>Like Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <RssIcon className="h-5 w-5 text-green-500" />
          <p>Search</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlists */}
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            className="cursor-pointer hover:text-white"
            onClick={() => {
              setPlaylistOffset(0)
              setPlaylistId(playlist.id)
            }}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
