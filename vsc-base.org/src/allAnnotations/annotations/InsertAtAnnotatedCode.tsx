import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const InsertAtAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'insertAt'}
         title={'insertAt'}
         open={open}
         annotation={
            <>
               <p>
                  
Insert content at position (start and optional end position)
Return true on success, false if the document or textEditor was not open/correct
               </p>
            </>
         }
         
         codeOneLineEx={`const success = vsc.insertAt(content, start, end)`}
         codeEx={``}
         code={`/**
 * @param content,range,editor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns boolean
 */
export const insertAt = (
   content: string,
   start: number,
   end: number = start,
   editor?: vscode.TextEditor,
   trimSpaces = false
): boolean => \{
   if (editor === undefined) \{
      editor = vsc.getActiveEditor()
   }
   if (editor === undefined) \{
      return false
   }
   const source = editor.document.getText();
   const pos = vsc.createVscodeRangeAndPosition(source, start, end, trimSpaces)
   vsc.insertAtRange(content, pos.range, editor)
   return true
}`}
      />
   )
}

export default InsertAtAnnotatedCode

