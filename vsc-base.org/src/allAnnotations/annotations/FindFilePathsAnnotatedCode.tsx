import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const FindFilePathsAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'findFilePaths'}
         title={'findFilePaths'}
         open={open}
         annotation={
            <>
               <p>
                  
Get a list off all filePaths in project the matches a glob pattern
               </p>
            </>
         }
         
         codeOneLineEx={`const files = await vsc.findFilePaths(includePattern)`}
         codeEx={`
const allTestFiles = await vsc.findFilePaths('**\\/*.test.\{ts,jsx,ts,tsx}')
for (const filePath of allTestFiles)\{
  const source = await vsc.getFileContent()
  // do something with the files...
}`}
         code={`/**
 * @param include glob,exclude glob,maxResults
 * @dependencyExternal vscode
 * @dependencyInternal pathAsUnix
 * @vscType Vscode
 * @returns Promise<string[]>
 */
export const findFilePaths = async (
   include: vscode.GlobPattern = '**/*.\{js,jsx,ts,tsx}',
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => \{
   const uriFiles = await vscode.workspace.findFiles(
      include,
      exclude,
      maxResults
   )
   const files = uriFiles.map((uri: vscode.Uri) => vsc.pathAsUnix(uri.fsPath))
   return files
}`}
      />
   )
}

export default FindFilePathsAnnotatedCode

