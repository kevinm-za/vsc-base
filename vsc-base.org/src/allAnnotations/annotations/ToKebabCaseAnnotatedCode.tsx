import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const ToKebabCaseAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'toKebabCase'}
         title={'toKebabCase'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Format a string from camel-case to kebab-case \
 Commonly used to define css class names. \
 Ex: 'SomeName' => 'some-name', 'Some_Other.name' => 'some-other-name'
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={
{
   str: 'SomeName'
}}
            onClickCall={(args, printResult) => {
   const result = vsc.toKebabCase(args.str)
   printResult(result)
 }}
         />
      }
      
         codeOneLineEx={`const cssName = vsc.toKebabCase(inputName)`}
         codeEx={``}
         code={`/**
 * @description 
 * Format a string from camel-case to kebab-case \\
 * Commonly used to define css class names. \\
 * Ex: 'SomeName' => 'some-name', 'Some_Other.name' => 'some-other-name'
 * @see http://vsc-base.org/#toKebabCase
 * @param str
 * @vscType Raw
 * @testPrinterArgument 
\{
   str: 'SomeName'
}
 * @testPrinter (args, printResult) => \{
   const result = vsc.toKebabCase(args.str)
   printResult(result)
 }
 * @oneLineEx const cssName = vsc.toKebabCase(inputName)
 * @returns string
 */
export const toKebabCase = (str: string): string =>
   str[0].toLowerCase() +
   str.substr(1)
      .replace(/([A-Z])/g, (_match, chr) => \`-\$\{chr.toLowerCase()}\`)
      .replace(/[^a-zA-Z]+(.)/g, (_match, chr) => \`-\$\{chr.toLowerCase()}\`)
`}
      />
   )
}

export default ToKebabCaseAnnotatedCode

