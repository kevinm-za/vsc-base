import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetFileContentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getFileContent'}
         title={'getFileContent'}
         open={open}
         annotation={
            <>
               <p>
                  
Get file source
               </p>
            </>
         }
         
         codeOneLineEx={`const source = vsc.getFileContent(path)`}
         codeEx={``}
         code={`/**
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @returns Promise<string>
 */
export const getFileContent = async (
   path: string,
   encoding = 'utf8'
): Promise<string> =>
   await fs.readFile(path, encoding)`}
      />
   )
}

export default GetFileContentAnnotatedCode

