// import { InterfaceAbi } from "ethers";
// export type ABI = InterfaceAbi;

import { JsonFragment } from "ethers";
export type ABI = JsonFragment[];

// export interface AbiInput {
//   name: string;
//   type: string;
//   indexed?: boolean;
// }


// export interface AbiOutput {
//   name: string;
//   type: string;
// }

// export interface AbiItem {
//   anonymous?: boolean;
//   constant?: boolean;
//   inputs: AbiInput[];
//   name: string;
//   outputs: AbiOutput[];
//   payable: boolean;
//   stateMutability: "pure" | "view" | "nonpayable" | "payable";
//   type: "function" | "constructor" | "event" | "fallback" | "receive";
//   gas?: number;
// }

// // export type ABI = AbiItem[];