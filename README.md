# XeDB

Cross-runtime embedded database for JavaScript.

## Usage

### Import

#### From [Deno](https://deno.land)

```js
import {
    createDatastore,
    denoRuntime
} from 'https://git.kaki87.net/KaKi87/xedb/raw/branch/master/mod.js';
const datastore = createDatastore({
    runtime: denoRuntime
});
```

#### From [Node](https://nodejs.org/)

```js
import {
    createDatastore,
    nodeRuntime
} from 'xedb.js';
const datastore = createDatastore({
    runtime: nodeRuntime
});
```

#### From browser

```html
<script type="module">
    import {
        createDatastore,
        browserRuntime
    } from 'https://raw.githack.com/KaKi87-2/xedb/master/mod.js';
    const datastore = createDatastore({
        runtime: browserRuntime
    });
</script>
```

### In-memory

Replace the `runtime` import with :
- `inMemoryDenoOrBrowserRuntime` for Deno or browser ;
- `inMemoryNodeRuntime` for Node.

## Related projects

- [`louischatriot/nedb`](https://github.com/louischatriot/nedb)
- [`seald/nedb`](https://github.com/seald/nedb) (maintained fork of `louischatriot/nedb`)
- [`denyncrawford/dndb`](https://github.com/denyncrawford/dndb) (Deno port of `louischatriot/nedb`)
- [`AmateurPotion/dndb`](https://github.com/AmateurPotion/dndb) (maintained fork of `denyncrawford/dndb`)