<script lang="typescript">
  import Card from '@smui/card'
  import Button from '@smui/button'
  import Textfield from '@smui/textfield'
  import MenuSurface from '@smui/menu-surface'
  import LayoutGrid, { Cell } from '@smui/layout-grid'
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

  function keydownHandler(event: CustomEvent | KeyboardEvent) {
    event = event as KeyboardEvent
    if (event.key === "Enter") {
      login()
    }
  }
</script>

<style>
</style>


<Card padded style="margin: auto;">
  <LayoutGrid
  >

{#if !$loggedIn}
  <Cell
    spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}
    >
      <Textfield
        label="username"
        type="email"
        bind:value={_username}
        on:keydown={keydownHandler}
        input$emptyValueUndefined
      >
      </Textfield>
  </Cell>

  <Cell
    spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}
    >
      <Textfield
        label="password"
        type="password"
        bind:value={_password}
        on:keydown={keydownHandler}
        input$emptyValueUndefined
      >
      </Textfield>
  </Cell>

  <Cell
    spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}
    >
      <Button on:click={login}>Login</Button>
  </Cell>
  <Cell
    >
      <Button on:click={signup}>Signup</Button>
  </Cell>
{/if}

{#if $loggedIn}
  <Cell>
    <h1>{$username}</h1>
  </Cell>
  <Cell style="display: flex; justify-content: center; flex-direction: column;">
    <Button on:click={logout}>Logout</Button>
  </Cell>
{/if}

  </LayoutGrid>

</Card>
