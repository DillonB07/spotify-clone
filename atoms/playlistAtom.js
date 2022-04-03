import { atom } from 'recoil'

export const playlistState = atom({
  key: 'playlistState',
  default: null,
})

export const playlistIdState = atom({
  key: 'playlistIdState',
  default: '5NGyq5n7MQiGn5zOrQ7niN',
})

export const playlistTracksState = atom({
  key: 'playlistTracksState',
  default: [],
})

export const playlistOffsetState = atom({
  key: 'playlistOffsetState',
  default: 0,
})
