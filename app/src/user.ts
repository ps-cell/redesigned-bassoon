import GUN from 'gun'
import 'gun/sea'
import { writable } from 'svelte/store'

// connect to db
export const db = GUN(["http://localhost:8765/gun"])

// get reference for user; recall user, if previous session is cached
export const user = db.user().recall({sessionStorage: true})

// prepare writable for username and login-flag
export const username = writable('')
export const loggedIn = writable(false)

// listener for username-changes
user.get('alias').on( (data) => username.set(data) )

// listener for auth-event
db.on('auth', async() => {
	const _alias = await user.get('alias')
	username.set(_alias as unknown as string)
	loggedIn.set(true)
})
