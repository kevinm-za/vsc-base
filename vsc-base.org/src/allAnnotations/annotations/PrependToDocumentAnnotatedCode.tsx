import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const PrependToDocumentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'prependToDocument'}
         title={'prependToDocument'}
         open={open}
         annotation={
            <>
               <p>
                  
 Prepend new content in the end of the open document.
 Return true on success, false if the document or textEditor was not open/correct
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.prependToDocument(editor, document, content)`}
         codeEx={``}
         code={`/**
 * @param content, editor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns Promise<boolean>
 */
export const prependToDocument = async (
   content: string,
   editor?: vscode.TextEditor
): Promise<boolean> => \{
   const startPosition = new vscode.Position(0, 0)
   const endPosition = new vscode.Position(0, 0)
   const startRange = new vscode.Range(startPosition, endPosition)
   return await insertAtRange(content, startRange, editor);
}


`}
      />
   )
}

export default PrependToDocumentAnnotatedCode
