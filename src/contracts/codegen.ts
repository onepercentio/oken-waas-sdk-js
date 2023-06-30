import fs from 'fs'
import path from 'path'

const abiDir = path.join(__dirname, '..', 'abis');
const files = fs.readdirSync(abiDir);

const typesPath = path.join(__dirname, '../../', 'oken-types')

const exported = files.map((file) => {
  const contractId = path.basename(file, '.json');
  const contractReference = contractId.charAt(0).toLowerCase() + contractId.slice(1)
  return `${contractReference}: ({ address }: { address: string }): ${contractId} => contract('${contractId}', api, network, address)`
  ;
})

const contents = `
import { API } from '../components/api'
import {contract} from './helpers'
import {
 ${
    files.map(file => path.basename(file, '.json')).join(',\n')
  }
} from '${typesPath}'

export default (api: API, network: string) => ({
  ${exported.join(',\n  ')}
})`

fs.writeFileSync(path.join(__dirname, 'index.ts'), contents)