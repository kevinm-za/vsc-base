import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsInsertInterfaceMemberAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsInsertInterfaceMember'}
         title={'tsInsertInterfaceMember'}
         open={open}
         annotation={
            <>
               <p>
                  
Insert/add a member in an interface. 
               </p>
               <p>
               Intention will follow the members already defined. 
               </p>
               <p>
               If no members are defined it will use the &#039;newIntention&#039;
Use of semiColon will follow the members already defined. 
               </p>
               <p>
               If no members are defined it will use the &#039;addNewLeadingSemiColon&#039; (default false)
               </p>
            </>
         }
         
         codeOneLineEx={`source = vsc.tsAddInterfaceMember(source, interfaceName, memberName, type)`}
         codeEx={`
// Set type to an string
source = vsc.tsAddInterfaceMember(source, 'IFood', 'name', 'string')
// Set type to an number list
source = vsc.tsAddInterfaceMember(source, 'IFood', 'countTypes', 'number[]')
// Set type to an enum
source = vsc.tsAddInterfaceMember(source, 'IFood', 'type', 'FooType')`}
         code={`/**
 * @vscType ts
 * @returns string
 */
export const tsInsertInterfaceMember: (
   source: string,
   interfaceName: string,
   memberName: string,
   type: string,
   options?: \{
      newIntention?: number,
      addNewLeadingSemiColon?: boolean
   }
) => string = (source, interfaceName, memberName, type, options) => \{
   const \{ newIntention = 3, addNewLeadingSemiColon = false } = options || \{}
   // Find variable list 
   const [_interface] = vsc.tsFindNodePositionFromContent(source, node =>
      vsc.tsMatchInterface(node, \{
         name: interfaceName
      })
   )
   if (!_interface) \{
      return source
   }
   // check that the property don't exist
   const hasMember = _interface.members.find(m => !!m.name && m.name.getText() === memberName)
   if (hasMember) \{
      return source
   }
   // Find insert position and intentions
   const sourceLines = source.split(/\\n/);
   const insertPoint = _interface.end - 1;
   const singleLine = /\{[^\\n]*}\$/.test(_interface.getText())
   const hasMembers = _interface.members.length > 0
   let addSemiColon = addNewLeadingSemiColon
   const newIntentionString = new Array(newIntention).fill(' ').join('')
   let propertyIntention = newIntentionString
   if (hasMembers) \{
      const lastMember = _interface.members.reduce((p, c) => (p.end > c.end) ? p : c)
      if (/;\$/.test(lastMember.getText())) \{
         addSemiColon = true
      }
      const lastMemberPos = vsc.createVscodeRangeAndPosition(source, lastMember.pos, lastMember.end)
      const lastMemberIntention = sourceLines[lastMemberPos.startLineNumber].match(/^\\s*/)
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
   if (addSemiColon) \{
      contentAfterNewProp = ';' + contentAfterNewProp;
   }
   // Add property
   source =
      source.substring(0, insertPoint) +
      \`\$\{contentBeforeNewMember}\$\{memberName}: \$\{type}\$\{contentAfterNewProp}\` +
      source.substring(insertPoint)
   // return 
   return source
}`}
      />
   )
}

export default TsInsertInterfaceMemberAnnotatedCode

