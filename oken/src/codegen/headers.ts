import { Contract } from 'typechain'

export function codegenArtifactHeaders(contracts: Contract[]): string {
  return `
  ${contracts.map((c) => `export {${c.name}} from "./${c.name}";`).join('\n')}
  `
}
