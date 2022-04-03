import { atom } from 'recoil'

export const currentTrackIdState = atom({
  key: 'currentTrackIdState',
  default: null,
})

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
})

export const repeatState = atom({
  key: 'repeatState',
  default: 'off',
})

export const shuffleState = atom({
  key: 'shuffleState',
  default: false,
})

export const volumeState = atom({
  key: 'volumeState',
  default: 50,
})
