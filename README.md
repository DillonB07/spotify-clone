
# Spotify Clone

This is a basic clone of Spotify that lists the first 100 songs of your playlists and allows you to play songs from them.

It has basic music player functionality: Play, pause, skip, previous, shuffle, repeat(context and track) as well as a volume control.

Due to how Spotify works, you'll need to go over to https://developer.spotify.com/dashboard/applications to create an app and get the client id and secret.
Once you have these you can deploy to Vercel below.

## Deploy with Vercel

Deploy it with the button below!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/DillonB07/spotify-clone/&project-name=spotify-clone&repository-name=spotify-clone)

When setting the environmental variables, you need the following:

* `NEXT_PUBLIC_CLIENT_ID` - The client ID you got from the developer dashboard
* `NEXT_PUBLIC_CLIENT_SECRET` - The client secret you got from the developer dashboard
* `NEXTAUTH_URL` - The URL of your deployed website - For example, https://spotify.dillonb07.studio
* `JWT_SECRET` - A random, secure string used to keep the client ID and client secret secure

Now, go over to https://developer.spotify.com/dashboard/applications, go back to your application and add a redirect URI in Edit Settings. This URI will be the deployed address + `/api/auth/callback/spotify`. For example: `https://spotify.dillonb07.studio/api/auth/callback/spotify`.