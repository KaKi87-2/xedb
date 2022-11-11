# XeDB

Cross-runtime embedded database for JavaScript.

## Usage

### Import

#### From [Deno](https://deno.land)

```js
import {
    createDatastore
} from 'https://git.kaki87.net/KaKi87/xedb/raw/branch/master/mod.js';
import deno from 'https://git.kaki87.net/KaKi87/xedb/raw/branch/master/lib/deno.js';
const datastore = createDatastore({
    runtime: deno
});
```

#### From [Node](https://nodejs.org/)

```js
import {
    createDatastore
} from 'xedb.js';
import node from 'xedb.js/lib/node.js';
const datastore = createDatastore({
    runtime: node
});
```

#### From browser

```html
<script type="module">
    import {
        createDatastore
    } from 'https://rawcdn.githack.com/KaKi87-2/xedb/4302ba53ca055b01a4f6b7c993dd18c0aa26e1a7/mod.js';
    import browser from 'https://rawcdn.githack.com/KaKi87-2/xedb/4302ba53ca055b01a4f6b7c993dd18c0aa26e1a7/lib/browser.js';
    const datastore = createDatastore({
        runtime: browser
    });
</script>
```

### In-memory

Replace the `runtime` import with :
- `inMemory.denoOrBrowser.js` for Deno or browser ;
- `inMemory.node.js` for Node.

## Related projects

- [`louischatriot/nedb`](https://github.com/louischatriot/nedb)
- [`seald/nedb`](https://github.com/seald/nedb) (maintained fork of `louischatriot/nedb`)
- [`denyncrawford/dndb`](https://github.com/denyncrawford/dndb) (Deno port of `louischatriot/nedb`)
- [`AmateurPotion/dndb`](https://github.com/AmateurPotion/dndb) (maintained fork of `denyncrawford/dndb`)