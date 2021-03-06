//vsc-script-name: tsReplaceTest.vsc-script
//import * as vsc from '../src/vsc-base-development/vsc-base'

import * as ts from 'typescript'
import * as vsc from 'vsc-base'

export async function run(path: string) {
   vsc.showMessage("Start finding node... ")


   let source = `
		const method2 = () => {
			const moduleNumber1Path = '/module/area/file1'
			return moduleNumber1Path
		}
		`
   source = vsc.tsReplace(source, "'/file'", node => vsc.tsMatchValueNode(node, /file1/, {
      hasAncestors: [
         ancestor => vsc.tsIsFunction(ancestor, { name: /^method/ }),
         //ancestor => vsc.tsIsVariable(ancestor, { name: /^module.*Path/ })
      ]
   }))

   // Find a constant with name starting with 'module' witin a function but not in an if statement
   source = vsc.tsReplaceAll(source, 'A', node => vsc.tsMatchIdentifier(node, {
      name: 'moduleNumber1Path'
   }))


   source = vsc.tsReplaceAll(source, 'MM', node => vsc.tsMatchIdentifier(node, {
      name: /method/,
      hasAncestor: ancestor => vsc.tsIsVariable(ancestor, {
         hasGrandChild: child => vsc.tsIsFunction(child)
      })
   }))

   vsc.appendLineToDocument(source);

}
