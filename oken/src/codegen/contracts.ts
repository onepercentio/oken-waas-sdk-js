import { values } from 'lodash'
import {
  Contract,
  FunctionDeclaration,
  FunctionDocumentation,
  getSignatureForFn,
  isConstant,
  isConstantFn,
} from 'typechain'

import { codegenInputTypes, codegenOutputTypes } from './types'

export function codegenContract(contract: Contract) {
  return `
import BN from "bn.js";

export type TxID = { transactionId: string }

${codegenContractInterface(contract)}
  `
}

function codegenContractInterface(c: Contract): string {
  const functionsCode = values(c.functions)
    .filter((v) => v.length === 1) // no overloaded functions
    .map((v) => v[0])
    .map((fn) => generateFunction(fn))
    .join('\n')

  return `
export interface ${c.name} {
    ${functionsCode}
    ${values(c.functions)
      .filter((v) => v.length > 1) // has overloaded functions
      .map(generateOverloadedFunctions)
      .join('\n')}
  }
  `
}

function generateFunction(fn: FunctionDeclaration, overloadedName?: string): string {
  if (isConstant(fn) || isConstantFn(fn)) {
    return generateConstantFunction(fn, overloadedName)
  }

  return `
  ${generateFunctionDocumentation(fn.documentation)}
  ${overloadedName ?? fn.name}: {
    (${codegenInputTypes(fn.inputs)}): Promise<TxID>;
  }
`
}

function generateConstantFunction(fn: FunctionDeclaration, overloadedName?: string): string {
  return `
  ${generateFunctionDocumentation(fn.documentation)}
  ${overloadedName ?? fn.name}(${codegenInputTypes(fn.inputs)}): Promise<${codegenOutputTypes(fn.outputs)}>;
`
}

function generateFunctionDocumentation(doc?: FunctionDocumentation): string {
  if (!doc) return ''

  let docString = '/**'
  if (doc.details) docString += `\n * ${doc.details}`
  if (doc.notice) docString += `\n * ${doc.notice}`

  const params = Object.entries(doc.params || {})
  if (params.length) {
    params.forEach(([key, value]) => {
      docString += `\n * @param ${key} ${value}`
    })
  }

  if (doc.return) docString += `\n * @returns ${doc.return}`

  docString += '\n */'

  return docString
}

export function generateOverloadedFunctions(fns: FunctionDeclaration[]): string {
  return fns.map((fn) => generateFunction(fn, `"${getSignatureForFn(fn)}"`)).join('\n')
}
