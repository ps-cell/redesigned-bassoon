<script>
  import Card from '@smui/card'
	import Button from '@smui/button'
  import Textfield from '@smui/textfield'
  import { user, username, loggedIn } from './user'

  let _username = $username
  let _password = null

  function logout() {
    user.leave()
    username.set("")
    loggedIn.set(false)
  }

  function login() {
    user.auth(_username, _password, ({err}) => err && alert(err))
  }

  function signup() {
    user.create(_username, _password, ({err}) => {
      if (err) {
        alert(err)
      } else {
        login()
      }
    })
  }
</script>


<Card padded style="margin: 0px 500px 0px 500px;">

{#if !$loggedIn}
  <Textfield
    label="username"
    type="email"
    bind:value={_username}
    input$emptyValueUndefined
  >
  </Textfield>

  <Textfield
    label="password"
    type="password"
    bind:value={_password}
    input$emptyValueUndefined
  >
  </Textfield>

  <Button on:click={login}>Login</Button>
  <Button on:click={signup}>Signup</Button>
{/if}

{#if $loggedIn}
  <h1>{$username}</h1>
  <Button on:click={logout}>Logout</Button>
{/if}

</Card>
