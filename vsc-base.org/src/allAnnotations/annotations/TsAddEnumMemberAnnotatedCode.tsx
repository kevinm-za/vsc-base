import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsAddEnumMemberAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsAddEnumMember'}
         title={'tsAddEnumMember'}
         open={open}
         annotation={
            <>
               <p>
                  
Insert/add a member in an enum. 
               </p>
               <p>
               'value' is optional. 
               </p>
               <p>
               For complex (calculated values) or number values, 
               </p>
               <p>
               set 'addValueQuotes' to false.
Intention will follow the members already defined. 
               </p>
               <p>
               If no members are defined it will use the 'newIntention'
LeadingComma will follow the members already defined. 
               </p>
               <p>
               If no members are defined it will use the 'addNewLeadingComma' (default false)
               </p>
            </>
         }
         
         codeOneLineEx={`source = vsc.tsAddEnumMember(source, enumName, memberName, value)`}
         codeEx={`
source = vsc.tsAddEnumMember(source, 'foodOptions', 'meat', 'MEAT')
// Add number as value
source = vsc.tsAddEnumMember(source, 'numberOptions', 'One', '1',  3, false)
// Add calculated number as value
source = vsc.tsAddEnumMember(source, 'numberOptions', 'Tree', 'One * 3',  3, false)`}
         code={`/**
 * @vscType ts
 * @returns string
 */
export const tsAddEnumMember = (source: string, enumName: string, memberName: string, value?: string, newIntention = 3, addNewLeadingComma = false, addValueQuotes = true, useDoubleQuotation = false): string => \{
   // Find variable list 
   const [_enum] = vsc.tsFindNodePositionFromContent(source, node =>
      vsc.tsMatchEnum(node, \{
         name: enumName
      })
   )
   if (!_enum) \{
      return source
   }
   // check that the property don't exist
   const hasMember = _enum.members.find(m => m.name.getText() === memberName)
   if (hasMember) \{
      return source
   }
   // Find insert position and intentions
   const sourceLines = source.split(/\\n/);
   const insertPoint = _enum.end - 1;
   const singleLine = /\{[^\\n]*}\$/.test(_enum.getText())
   const hasMembers = _enum.members.length > 0
   const leadingComma = _enum.members.hasTrailingComma
   // declare last prop end for optional comma insertion
   let lastMemberEnd = 0
   const newIntentionString = new Array(newIntention).fill(' ').join('')
   let propertyIntention = newIntentionString
   if (hasMembers) \{
      const lastMember = _enum.members.reduce((p, c) => (p.end > c.end) ? p : c)
      lastMemberEnd = lastMember.end
      const lastMemberPos = vsc.createVscodeRangeAndPosition(source, lastMember.pos, lastMember.end)
      const lastMemberIntention = sourceLines[lastMemberPos.startLineNumber].match(/^\\s*/);
      if (lastMemberIntention && lastMemberIntention[0] !== '') \{
         propertyIntention = lastMemberIntention[0]
      }
   }
   let contentBeforeNewMember = ''
   // If single line add newline
   if (singleLine) \{
      contentBeforeNewMember = '\\n'
   }
   if (hasMembers) \{
      contentBeforeNewMember += propertyIntention
   } else \{
      contentBeforeNewMember += newIntentionString
   }
   let contentAfterNewProp = '\\n';
   if (leadingComma || addNewLeadingComma) \{
      contentAfterNewProp = ',' + contentAfterNewProp
   }
   let newContent: string
   if (value) \{
      let val = value
      if (addValueQuotes) \{
         val = useDoubleQuotation ? \`"\$\{val}"\` : \`'\$\{val}'\`
      }
      newContent = \`\$\{contentBeforeNewMember}\$\{memberName} = \$\{val}\$\{contentAfterNewProp}\`
   } else \{
      newContent = \`\$\{contentBeforeNewMember}\$\{memberName}\$\{contentAfterNewProp}\`
   }
   // Add property
   source =
      source.substring(0, insertPoint) +
      newContent +
      source.substring(insertPoint)
   // Add comma after prev property
   if (hasMembers && !leadingComma) \{
      source =
         source.substring(0, lastMemberEnd) +
         \`,\` +
         source.substring(lastMemberEnd)
   }
   // return 
   return source
}`}
      />
   )
}

export default TsAddEnumMemberAnnotatedCode

