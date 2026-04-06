# GenUI

`GenUI` is a React library that renders Kotlin-style `renderable` trees in
TypeScript.

It mirrors the `renderable` payload shape, focuses on rendering only, and
reports interaction through:

```ts
onAction(value, renderable)
```

Supported interaction patterns:

- action buttons
- toggle/select controls
- text and textarea input via `valueText`

