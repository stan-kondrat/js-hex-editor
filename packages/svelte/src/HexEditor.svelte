<script lang="ts">
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import Glyph from "./Glyph.svelte";
  import { NumberBase } from "./NumberBase";
  import { enumKeys, numDigits, range } from "./utils";


  export let data: ArrayBuffer = new ArrayBuffer(0);
  export let readonly: boolean = false;
  export let showHeader: boolean = true;
  export let showFooter: boolean = true;
  export let height: string = "auto";
  export let width: string = "auto";
  export let offsetBase: NumberBase = NumberBase.Hexadecimal;
  export let dataBase: NumberBase = NumberBase.Hexadecimal;
  export let bytesPerLine: number = 8;
  let start: number = 0;
  let end: number = 0;

  const numberBases = enumKeys(NumberBase).map((item) => NumberBase[item]);


  let mouseOverPosition = undefined;

  const u8arr = new Uint8Array(data);

  $: items = [
    ...Array(Math.max(4, Math.ceil(u8arr.length / bytesPerLine))).keys(),
  ];

  const offsetWidth = numDigits(u8arr.length);
  const dataWidth = bytesPerLine * numDigits(offsetBase);

  function handleMouseOver(event) {
    const position = event.target.dataset.position;
    if (position !== undefined && position !== "undefined") {
      mouseOverPosition = position;
    }
  }

  function handleMouseOut(event) {
    const position = event.target.dataset.position;
    if ((mouseOverPosition = position)) {
      mouseOverPosition = undefined;
    }
  }
</script>

<main
  style="--width: {width}; --height: {height}"
  on:mouseover={handleMouseOver}
  on:mouseout={handleMouseOut}
  class:readonly
>
  {#if showHeader}
    <header>
      <div class="header-offset" style="--offsetWidth: {offsetWidth}">
        <select bind:value={offsetBase}>
          {#each numberBases as item}
            <option value={item}>
              {NumberBase[item]}
            </option>
          {/each}
        </select>
      </div>
      <div class="header-data" style="--width: {dataWidth}">
        <select bind:value={dataBase}>
          {#each numberBases as item}
            <option value={item}>
              {NumberBase[item]}
            </option>
          {/each}
        </select>
        <select bind:value={bytesPerLine} title="Bytes per line">
          {#each [1, 2, 4, 8, 16] as item}
            <option value={item}>
              {item}
              {item === 1 ? "Byte" : "Bytes"}
            </option>
          {/each}
        </select>
      </div>
      <div class="header-ascii" style="--width: {dataWidth}" />
    </header>
  {/if}

  <VirtualList {items} let:item {height} bind:start bind:end>
    <div class="hex-row">
      <div class="hex-row-offset" style="--width: {offsetWidth}">
        <Glyph
          value={item * bytesPerLine}
          type={offsetBase}
          maxItems={items.length}
        />
      </div>
      <div class="hex-row-data" style="--width: {dataWidth}">
        {#each range(0, bytesPerLine, 1) as i}
          <Glyph
            value={u8arr[item * bytesPerLine + i]}
            type={dataBase}
            position={item * bytesPerLine + i}
            selected={+mouseOverPosition === item * bytesPerLine + i}
          />
        {/each}
      </div>
      <div class="hex-row-ascii" style="--width: {dataWidth}">
        {#each range(0, bytesPerLine, 1) as i}
          <Glyph
            value={u8arr[item * bytesPerLine + i]}
            type={0}
            position={item * bytesPerLine + i}
            selected={+mouseOverPosition === item * bytesPerLine + i}
          />
        {/each}
      </div>
    </div>
  </VirtualList>

  {#if showFooter}
    <footer>
      Showing
      <Glyph
        value={start * bytesPerLine}
        type={offsetBase}
        maxItems={items.length}
      />
      -
      <Glyph
        value={end * bytesPerLine}
        type={offsetBase}
        maxItems={items.length}
      />
      of
      <Glyph
        value={items.length * bytesPerLine}
        type={offsetBase}
        maxItems={items.length}
      />
    </footer>
  {/if}
</main>

<style>
  main {
    height: var(--height);
    min-height: 96px;
    width: var(--width);
    box-sizing: content-box;

    display: inline-flex;
    flex-direction: column;

    font-family: monospace;
    font-variant-numeric: slashed-zero;

    border: 1px solid gray;

    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }
  main > header {
    display: flex;
    box-shadow: 0px 1px 0 rgba(0, 0, 0, 0.2), 0px 1px 4px rgba(0, 0, 0, 0.2);
  }
  main > header .header-offset {
    background-color: rgba(0, 0, 0, 0.1);
    min-width: 110px;
    text-align: center;
  }
  main > header .header-data {
    margin-left: 20px;
  }
  :global(svelte-virtual-list-viewport) {
    flex-grow: 1;
  }
  main > footer {
    background-color: rgba(0, 0, 0, 0.08);
    box-shadow: 0px -1px 0 rgba(0, 0, 0, 0.2), 0px -1px 4px rgba(0, 0, 0, 0.2);
    padding: 2px 1em;
    display: flex;
    font-size: 12px;
    justify-content: center;
  }
  main .hex-row {
    display: flex;
    flex-wrap: nowrap;
  }
  main .hex-row-offset {
    background-color: rgba(0, 0, 0, 0.1);
    min-width: 100px;
    padding-right: 10px;
    margin-right: 2em;
    justify-content: flex-end;
    display: flex;
    flex-wrap: nowrap;
  }
  main .hex-row-offset > main {
    padding: 0 1em;
  }
  main .hex-row-data {
    margin-right: 1em;
    display: flex;
    flex-wrap: nowrap;
  }
  main .hex-row-ascii {
    margin: 0 1em;
    display: flex;
    flex-wrap: nowrap;
  }
</style>
