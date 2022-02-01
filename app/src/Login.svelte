<script>
  import Card from '@smui/card'
	import Button from '@smui/button'
  import Textfield from '@smui/textfield'
  import { user } from './user'

  let username = null
  let password = null

  function login() {
    user.auth(username, password, ({err}) => err && alert(err))
  }

  function signup() {
    user.create(username, password, ({err}) => {
      if (err) {
        alert(err)
      } else {
        login()
      }
    })
  }
</script>


<style>
  .login-card {
    margin: 0px 500px 0px 500px;
  }
</style>


<Card padded>
  <Textfield
    label="username"
    type="email"
    bind:value={username}
    input$emptyValueUndefined
  >
  </Textfield>

  <Textfield
    label="password"
    type="password"
    bind:value={password}
    input$emptyValueUndefined
  >
  </Textfield>

  <Button on:click={login}>Login</Button>
  <Button on:click={signup}>Signup</Button>
</Card>
