import childProcess from "child_process";
import fs from "fs";
import http from "http";

/**
 * @function rollup-plugin-openapi-to-ts
 * @param {({schema: string, name: string})[]} apis
 * @return {({name: "rollup-plugin-openapi-to-ts", enforce: "pre", Promise<resolveId>})}
 */
export default function openAPIToTs(apis) {
  if (!apis?.length) {
    return null;
  }

  return {
    name: "rollup-plugin-openapi-to-ts",
    enforce: "pre",
    /**
     * @param {InputOptions} _options
     */
    async buildStart(_options) {
      apis.forEach((api) => {
        try {
          http.get(api.schema, (res) => {
            let data = [];

            res.on("data", (chunk) => {
              data.push(chunk);
            });

            res.on("end", () => {
              const schema = JSON.parse(Buffer.concat(data).toString());

              const tempFileName = `temp-${api.name}.json`;
              fs.writeFileSync(tempFileName, JSON.stringify(schema));

              childProcess.execSync(
                `npx openapi-typescript ./${tempFileName} --output ./src/types/openapi/${api.name}.ts`
              );

              fs.unlinkSync(`./${tempFileName}`);
            });
          });
        } catch (error) {
          console.error(error);
        }
      });
    },
  };
}
