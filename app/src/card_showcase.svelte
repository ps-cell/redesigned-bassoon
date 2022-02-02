<script lang="ts">
  import Checkbox from '@smui/checkbox';
  import FormField from '@smui/form-field';
  import Button from '@smui/button';
  import Select, { Option } from '@smui/select';
  import Icon from '@smui/select/icon';
  import Card from '@smui/card';
 
  let options = [
    {
      name: 'Hidden Card',
      function: hidecheck,
      disabled: false,
    },
    {
      name: 'Selected Card',
      function: selcheck,
      disabled: false,
    },
  ];

  let selected = ['Selected Card'];

  function selcheck(event) {
    let card = document.getElementById('play_card');
    if (card.classList.contains('rainbow')){
      card.classList.remove('rainbow');
    } else {
      card.classList.add('rainbow');
    }
  }
  //placeholder
  function hidecheck(event) {
    return;
  }

  let symbols = ['Ace', 'King', 'Queen', 'Jack', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
  let suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
 
  let value = '';
  let valueSuit = '';

</script>

<div style="display: flex; flex-direction: row;">
  <Card padded style="margin: 50px; width: 300px; display: flex; justify-content: center;">
    <div>
      {#each options as option}
        <FormField>
          <Checkbox
            bind:group={selected}
            on:change={option.function}
            value={option.name}
            disabled={option.disabled}
          />
          <span slot="label"
            >{option.name}{option.disabled ? ' (disabled)' : ''}</span
          >
        </FormField>
      {/each}
    </div>

    <pre class="status">Selected: {selected.join(', ')}</pre>

    <div class="columns margins">
      <div>
        <Select variant="filled" bind:value label="Symbols">
          <Option value="" />
          {#each symbols as symbol}
            <Option value={symbol}>{symbol}</Option>
          {/each}
        </Select>
     
        <pre class="status">Selected: {value}</pre>
      </div>
     
      <div>
        <Select variant="filled" bind:value={valueSuit} label="Symbols">
          <Option value="" />
          {#each suits as suit}
            <Option value={suit}>{suit}</Option>
          {/each}
        </Select>
     
        <pre class="status">Selected: {valueSuit}</pre>
      </div>
    </div>
  </Card>

  <Card padded style="margin: 50px; display: flex; align-content: space-around;">
    <div id="play_card" class="rainbow" style="display: flex; margin: -10px;">
      <img src="/resources/deck/{value.toLowerCase() || '2'}_of_{valueSuit.toLowerCase() || 'hearts'}.png" alt="hidden webcam footage of antons appartement" style="height: 300px; width:200px ">
    </div>
  </Card>

</div>

<style type="text/css">

@keyframes rainbow {
    from {background-position: -50vh 0}
    to {background-position: 50vh 0}
} 
 .rainbow {
  border: double 0.5em transparent;
  border-radius: 10px;
  background: linear-gradient(white, white), 
  repeating-linear-gradient(to right, rgb(82, 82, 209),rgb(235, 50, 235), rgb(82, 82, 209));
  background-origin: border-box;
  background-clip: content-box, border-box;


            animation-name: rainbow;
            animation-duration:  5s;

            animation-iteration-count: infinite;
            animation-timing-function: linear;
}
</style>
