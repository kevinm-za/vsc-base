import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsFindNodePositionFromContentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsFindNodePositionFromContent'}
         title={'tsFindNodePositionFromContent'}
         open={open}
         annotation={
            <>
               <p>
                  
Create a Ts Visitor Transformer for finding a node and it position.
               </p>
            </>
         }
         
         codeOneLineEx={`const [node, position] = vsc.tsFindNodePositionFromContent(source, findNodePositionCallback)`}
         codeEx={`
const source = \`
   const method2 = () => \{
      const moduleNumber1Path = '/module/area/file1'
      return moduleNumber1Path
   }
   function method1(doIt)\{
      if(doIt)\{
         const moduleNumber1Path = '/module/area/file1' // <-- Find this
         return moduleNumber1Path
      }
   }
\`
// Find a constant with name starting with 'module' within a function but not in an if statement
const [_node, position] = vsc.tsFindNodePositionFromContent(source, node =>
 vsc.tsMatchVariable(node, \{ 
      // test name of variable
      name: /^module/,
      // test if is in function
      hasAncestors: [
         ancestor => vsc.tsIsFunction(ancestor, \{ name: /^method/ }),
         ancestor => ts.isIfStatement(ancestor)
      ]
   })
)
if (position) \{
   const realText = source.substring(position.start, position.end);
   // Select the source (assuming the source is from the open document)
   vsc.setSelection(position.start, position.end)
}`}
         code={`/**
 * @vscType ts
 * @returns [ts.Node | undefined, vsc.VscodePosition | undefined]
 */
export const tsFindNodePositionFromContent = <TNode extends ts.Node = ts.Node>(source: string, callback: (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => TNode | undefined, program?: ts.Program, fromPosition = 0, trimSpaces = true): [TNode | undefined, vsc.VscodePosition | undefined] => \{
   let position: vsc.VscodePosition | undefined
   let foundNode: TNode | undefined
   let typeChecker: ts.TypeChecker | undefined
   if (program) \{
      typeChecker = program.getTypeChecker()
   }
   const visitor: ts.TransformerFactory<ts.SourceFile> = (context) => \{
      const visit: ts.Visitor = (node) => \{
         if (node.pos < fromPosition) \{
            return ts.visitEachChild(node, (child) => visit(child), context);
         }
         const _foundNode = callback(node, typeChecker, program);
         if (!_foundNode) \{
            return ts.visitEachChild(node, (child) => visit(child), context);
         }
         if (node === undefined) \{
            throw new Error('Node is undefined!!!')
         }
         position = vsc.createVscodeRangeAndPosition(source, node.pos, node.end, trimSpaces);
         foundNode = _foundNode
         return node
      }
      return (node) => ts.visitNode(node, visit);
   };
   vsc.tsVisitWithTransformers(source, [visitor]);
   return [foundNode, position];
}`}
      />
   )
}

export default TsFindNodePositionFromContentAnnotatedCode

