import { useRecoilValue } from 'recoil'
import { playlistTracksState } from '../atoms/playlistAtom'
import Song from './Song'

function Songs() {
  const playlist = useRecoilValue(playlistTracksState)
  return (
    <div className="flex flex-col space-y-1 px-8 pb-5 text-white">
      {playlist?.map((track, i) => (
        <div>
          <Song key={track.track.id} track={track} order={i} />
        </div>
      ))}
    </div>
  )
}

export default Songs
