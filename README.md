# XeDB

Cross-runtime embedded database for JavaScript.

## Usage

### Storage runtimes

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
    } from 'https://raw.githack.com/KaKi87-2/xedb/master/mod.js';
    import browser from 'https://raw.githack.com/KaKi87-2/xedb/master/lib/browser.js';
    const datastore = createDatastore({
        runtime: browser
    });
</script>
```

### In-memory runtimes

Using *[storage runtimes](#storage-runtimes)* examples, replace the `runtime` import with :
- `inMemory.deno.js` for Deno ;
- `inMemory.node.js` for Node ;
- `inMemory.browser.js` for browser.

### API

Most MongoDB [methods](https://www.mongodb.com/docs/manual/reference/method/js-collection/) as well as [query operators](https://www.mongodb.com/docs/manual/reference/operator/query/) (thanks to [`crcn/sift.js`](https://github.com/crcn/sift.js)) and [update operators](https://www.mongodb.com/docs/manual/reference/operator/update/) (thanks to [`seald/nedb/lib/model`](https://github.com/seald/nedb/blob/master/lib/model.js#L310)) are supported.

### [Serializers](https://en.wikipedia.org/wiki/Serialization)

The `createDatastore` method takes a `serializer` parameter containing `serialize` and `deserialize` methods ([JSON](https://en.wikipedia.org/wiki/JSON) by default).

[DSV](https://en.wikipedia.org/wiki/Delimiter-separated_values) support is planned.

## Related projects

- [`louischatriot/nedb`](https://github.com/louischatriot/nedb)
- [`seald/nedb`](https://github.com/seald/nedb) (maintained fork of `louischatriot/nedb`)
- [`denyncrawford/dndb`](https://github.com/denyncrawford/dndb) (Deno port of `louischatriot/nedb`)
- [`AmateurPotion/dndb`](https://github.com/AmateurPotion/dndb) (maintained fork of `denyncrawford/dndb`)