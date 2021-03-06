import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsLoadModuleAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsLoadModule'}
         title={'tsLoadModule'}
         open={open}
         annotation={
            <>
               <p>
                  
Load a ts file. 
               </p>
               <p>
               Transpile it to js (run time) add wrap code and execute it (using eval)! 
               </p>
               <p>
               Returning an plainObject with the scripts exports. 
               </p>
               <p>
               export default xxx transpile to export.default 
               </p>
               <p>
               IMPORTANT Don&#039;t just run code you don&#039;t now, this can cause injection! 
               </p>
               <p>
               IMPORTANT Be careful when running scripts that also uses tsLoadModule, this can break down entire systems! 
               </p>
               <p>
               (If you start a recursive change that don&#039;t stop..) 
               </p>
               <p>
               IMPORTANT: It does not check for circular imports, which will create infinity loops! 
               </p>
               <p>
               (Its recommended to only use imports from your local project that don&#039;t have other imports)
               </p>
            </>
         }
         
         codeOneLineEx={`const moduleObj = await vsc.tsLoadModule(path)`}
         codeEx={`
let moduleObj
try \{
  moduleObj = await vsc.tsLoadModule(path)
} catch (e)\{
  vsc.showErrorMessage(\`Loading module coursed an error: \$\{e}\`)
  return
}
const verifiedModule = vsc.verifyModuleMethods(
  moduleObj,
  ['run']
)
if (!verifiedModule) \{
  vsc.showErrorMessage(\`Module didn't have 'run' :: \$\{JSON.stringify(moduleObj)}\`)
  return
}
try \{
  const result = verifiedModule.run()
  await vsc.awaitResult(result)
  vsc.showMessage(\`Loaded Run resulted with value: \$\{result}\`)
} catch (e) \{
  vsc.showErrorMessage('Error: ' + e)
}`}
         code={`/**
 * @param path
 * @dependencyExternal ts
 * @dependencyInternal getFileContent, showErrorMessage
 * @vscType System
 * @returns Promise<\{ [key: string]: unknown; }>
 */
export const tsLoadModule = async (
   path: string,
   compilerOptions: ts.CompilerOptions = vsc.TsDefaultCompilerOptions
): Promise<\{ [key: string]: unknown }> => \{
   const sourceJs = await vsc.tsLoadModuleSourceCode(path, compilerOptions)
   const renamedRequire = '__vsc__import__exports'
   const [baseDir] = vsc.splitPath(path)
   const [sourceJsRenamed, importExports] = await tsGetLocalModules(
      baseDir,
      sourceJs,
      renamedRequire
   )

   let _exports: \{ [key: string]: unknown } = \{}
   try \{
      _exports = loadTsModule_Eval(sourceJsRenamed, importExports, renamedRequire)
   } catch (e) \{
      if (e instanceof TSLoadModuleError) \{
         throw e
      } else \{
         throw new TSLoadModuleError(e, sourceJsRenamed)
      }
   }
   return _exports
}

export class TSLoadModuleError extends Error \{
   constructor(message: string, public transpiledCode: string) \{
      super(message)
   }
}

const loadTsModule_Eval = (
   sourceJs: string,
   importExports: \{ [key: string]: any },
   renamedRequire: string
): \{ [key: string]: unknown } => \{
   //Wrap code in enclosed function. Add vsc as only dependency.
   const wrapExports = \`let \$\{renamedRequire} = importExports;\\n_exports = (function()\{var exports = \{};\\n\$\{sourceJs}\\nreturn exports})()\`
   let _exports: \{ [key: string]: unknown } = \{}
   try \{
      eval(wrapExports)
   } catch (e) \{
      throw new TSLoadModuleError(e, wrapExports)
   }
   return _exports
}`}
      />
   )
}

export default TsLoadModuleAnnotatedCode

