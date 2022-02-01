import GUN from 'gun'
import 'gun/sea'
import { writable } from 'svelte/store'

// connect to db
export const db = Gun(["http://localhost:8765/gun"])

// get reference for user; recall user, if previous session is cached
export const user = db.user().recall({SessionStorage: true})

// prepare writable for username
export const username = writable('')

// listener for username-changes
user.get('alias').on( data => username.set(data) )

// listener for auth-event
db.on('auth', async(event) => {
	const _alias = await user.get('alias')
	username.set(_alias)
	console.log(`Logged in as ${_alias}`)
})
