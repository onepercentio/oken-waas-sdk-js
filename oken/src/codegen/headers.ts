import { Contract } from 'typechain'

export function codegenArtifactHeaders(contracts: Contract[]): string {
  return `
  ${contracts.map((c) => `import {${c.name}} from "./${c.name}";`).join('\n')}
  `
}
