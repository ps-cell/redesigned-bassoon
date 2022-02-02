# redesigned-bassoon
## javascript-based decentralized repository for 3D models with [gun.js](https://github.com/amark/gun) 

### npm

- install packages:
`npm install`

- start server:
`npm run dev`

- start server w/ TLS:
`npm run start -- --http2 --cert [CERT] --key [PRIVKEY] --pass [KEY_PASSPHRASE] --host`


### docker

- build image

```
cd app/
sudo docker build -t svelte-app .
```

- run app
`sudo docker run -it --rm -p8080:8080 svelte-app`


### gun

- starting a relay
`sudo docker run -p 8765:8765 gundb/gun`

### links

- [development: docker-svelte-https](https://sam.elborai.me/blog/local-svelte-development-with-tls-support)
- [svelte: getting started](https://svelte.dev/blog/the-easiest-way-to-get-started)
- [svelte-material-ui: docs](https://sveltematerialui.com/?ref=madewithsvelte.com)
- [sveltekit: expose to network](https://www.ryanfiller.com/blog/tips/sveltekit-local-network)


# blackjack-gun-pun (working title)
- decentralized blackjack
- state-syncing with [gun.js](https://github.com/amark/gun)
- central dealers/tables
	

## state
- basic syncing with gun
- basic app for testing deployment
- material design scaffolding for app

## goals
- user interface
	- design for menu (account info, game selection)
	- design for game graphics 

- user management
	- card attribution
	- turn management
	- scorekeeping

- dealers with different card sets/rules
	- card sets:
		- infinite cards
		- 52 card fixed
		- 52 card scaling with players
		- low card counts
	- turn rules:
		- single-player
		- multi-player (timeouts, waiting times)

- security 
	- hide secret cards of dealer
	- permissions (only dealer can edit cards)

## timeline
**until 06.02.22** 

- prototype basic game
	- no menu
	- one card set, single-player
	- no security
	- local
	- no user management

## feature requests
- in-game chat
- account management
- more games
- profile avatars
- new rug




