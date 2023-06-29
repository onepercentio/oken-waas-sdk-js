import { Config, FileDescription, TypeChainTarget } from 'typechain';
export interface IOkenCfg {
    outDir?: string;
}
export default class OkenWaas extends TypeChainTarget {
    name: string;
    private readonly outDirAbs;
    private contracts;
    constructor(config: Config);
    transformFile(file: FileDescription): FileDescription | void;
    afterRun(): FileDescription[];
}
