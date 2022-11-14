# rollup-plugin-openapi-to-ts

This is an example on how to implement https://github.com/drwpow/openapi-typescript to convert a swagger openapi documentation to a typescript definition in vite/rollup

[Plugin Code](rollup-plugins/rollup-plugin-openapi-to-ts.js)

If you start the dev server with `npm run dev` or simply build using `npm run build`, the openapi schema will be fetched and converted on [buildStart](https://rollupjs.org/guide/en/#buildstart).