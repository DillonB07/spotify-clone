import Center from '../components/Center'
import Sidebar from '../components/Sidebar'
import { getSession } from 'next-auth/react'
import Player from '../components/Player'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Spotify 2.0</title>
      </Head>
      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
