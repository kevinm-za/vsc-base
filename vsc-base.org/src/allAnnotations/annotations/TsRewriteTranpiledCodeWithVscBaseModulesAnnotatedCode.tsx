import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsRewriteTranpiledCodeWithVscBaseModulesAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsRewriteTranpiledCodeWithVscBaseModules'}
         title={'tsRewriteTranpiledCodeWithVscBaseModules'}
         open={open}
         annotation={
            <>
               <p>
                  
 Replace ts transpiled code's require for vsc, ts, fs and vscode.
               </p>
            </>
         }
         
         codeOneLineEx={`const sourceJs = vsc.tsRewriteTranpiledCodeWithVscBaseModules(sourceJs)`}
         codeEx={``}
         code={`/**
 * @internal this method is primary used by vsc.tsLoadModule
 * @notes  * ts.transpile as follows:
 * const vsc_base_1 = require("vsc-base");
 * const fs = require("fs-extra");
 * const typescript_1 = require("typescript");
 * const vscode = require("vscode");
 * @vscType System
 * @param sourceJs
 * @returns string
 */
export const tsRewriteTranpiledCodeWithVscBaseModules = (
   sourceJs: string,
): string => \{
   const modulesMap = vsc.getVscDefaultModuleMap()
   modulesMap.forEach(obj => \{
      const reg = new RegExp(\`\\\\bconst (\\\\w+) = require\\\\(\\\\"\$\{obj.name}\\\\"\\\\)\`, 'g')
      sourceJs = sourceJs.replace(reg, (str: string) =>
         \`/* \$\{str} // vsc-base has change the ts transpiled code here. */\`
      )
   })
   return sourceJs
}
`}
      />
   )
}

export default TsRewriteTranpiledCodeWithVscBaseModulesAnnotatedCode

