import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetVscDefaultModuleMapAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getVscDefaultModuleMap'}
         title={'getVscDefaultModuleMap'}
         open={open}
         annotation={
            <>
               <p>
                  
Return the default module map of vsc-base 
               </p>
               <p>
               (Used for ts compiling, module load ect)
               </p>
            </>
         }
         
         codeOneLineEx={`const moduleMap = vsc.getVscDefaultModuleMap()`}
         codeEx={``}
         code={`/**
 * @internal this method is primary used by vsc.loadTsModule
 * @vscType System
 * @returns \\\{ [key: string]: \\\{ key: string, name: string, module: any \\} \\}
 */
export const getVscDefaultModuleMap = (): \{
   key: string
   name: string
   module: any
}[] => \{
   return [
      \{ key: 'vsc', name: 'vsc-base', module: vsc },
      \{ key: 'ts', name: 'typescript', module: ts },
      \{ key: 'fs', name: 'fs-extra', module: fs },
      \{ key: 'vscode', name: 'vscode', module: vscode },
      \{ key: 'cp', name: 'child-process-promise', module: cp }
   ]
}`}
      />
   )
}

export default GetVscDefaultModuleMapAnnotatedCode

