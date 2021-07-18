<script lang="ts">
  import { getBaseLog } from "./utils";

  export let position: string = "";
  export let value: number;
  export let type: number;
  export let selected: boolean = false;
  export let maxItems = 0;

  $: digits = Math.max(
    0,
    Math.ceil(getBaseLog(type, maxItems)) -
      (value ?? 0).toString(type || 2).length,
    Math.ceil(getBaseLog(type, 256)) - (value ?? 0).toString(type || 2).length
  );
</script>

<main class:selected>
  {#if value === undefined}
    <span class="empty">{".".repeat(digits + 1)}</span>
  {:else if type === 0}
    <span class="ascii" tabindex="0" data-position={position}
      >{String.fromCharCode(value)}</span
    >
  {:else}
    <span
      class="number"
      tabindex="0"
      data-position={position}
      data-digits={"0".repeat(digits)}
      >{value.toString(type).toUpperCase()}</span
    >
  {/if}
</main>

<style>
  span {
    display: inline-block;
    background-color: var(--color);
    min-width: 1ch;
    min-height: 1em;
    padding: 0 4px;
  }
  main.selected span {
    box-shadow: inset 0px 0px 0px 1px red;
  }
  main span:focus {
    background-color: wheat;
    outline: none;
  }
  span.empty {
    color: #aaa;
  }
  span.ascii {
    margin-left: 0.2ch;
    padding: 0 1px;
  }
  span.number::before {
    content: attr(data-digits);
    display: inline;
    color: #aaa;
  }
</style>
