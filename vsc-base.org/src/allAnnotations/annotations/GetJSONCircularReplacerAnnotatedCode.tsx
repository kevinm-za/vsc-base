import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetJSONCircularReplacerAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getJSONCircularReplacer'}
         title={'getJSONCircularReplacer'}
         annotation={
            <>
               <p>
                  
 Provide a circular safe JSON.stringify replacer. 
               </p>
               <p>
                See <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#Examples'>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#Examples</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const objString = JSON.stringify(someObject, vsc.getJSONCircularReplacer(), 2);`}
         codeEx={``}
         code={`/**
 * @vscType Raw
 * @returns (_key: string, value: unknown) => unknown
 */
export const getJSONCircularReplacer = () => \{
   const seen = new WeakSet();
   return (_key: string, value: unknown) => \{
      if (typeof value === "object" && value !== null) \{
         if (seen.has(value)) \{
            return;
         }
         seen.add(value);
      }
      return value;
   };
};
`}
      />
   )
}

export default GetJSONCircularReplacerAnnotatedCode
