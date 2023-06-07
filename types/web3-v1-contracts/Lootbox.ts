/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */

import type BN from "bn.js";
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type LootBoxOpened = ContractEventLog<{
  optionId: string;
  buyer: string;
  boxesPurchased: string;
  itemsMinted: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;
export type RoleAdminChanged = ContractEventLog<{
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
  0: string;
  1: string;
  2: string;
}>;
export type RoleGranted = ContractEventLog<{
  role: string;
  account: string;
  sender: string;
  0: string;
  1: string;
  2: string;
}>;
export type RoleRevoked = ContractEventLog<{
  role: string;
  account: string;
  sender: string;
  0: string;
  1: string;
  2: string;
}>;
export type Warning = ContractEventLog<{
  message: string;
  account: string;
  0: string;
  1: string;
}>;

export interface Lootbox extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): Lootbox;
  clone(): Lootbox;
  methods: {
    DEFAULT_ADMIN_ROLE(): NonPayableTransactionObject<string>;

    MINTER_ROLE(): NonPayableTransactionObject<string>;

    OPERATOR_ROLE(): NonPayableTransactionObject<string>;

    classIsPreminted(
      arg0: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    classToTokenIds(
      arg0: number | string | BN,
      arg1: number | string | BN
    ): NonPayableTransactionObject<string>;

    getRoleAdmin(role: string | number[]): NonPayableTransactionObject<string>;

    getRoleMember(
      role: string | number[],
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    getRoleMemberCount(
      role: string | number[]
    ): NonPayableTransactionObject<string>;

    grantRole(
      role: string | number[],
      account: string
    ): NonPayableTransactionObject<void>;

    hasRole(
      role: string | number[],
      account: string
    ): NonPayableTransactionObject<boolean>;

    name(): NonPayableTransactionObject<string>;

    nftAddress(): NonPayableTransactionObject<string>;

    open(
      _optionId: number | string | BN,
      _toAddress: string,
      _amount: number | string | BN
    ): NonPayableTransactionObject<void>;

    optionToSettings(arg0: number | string | BN): NonPayableTransactionObject<{
      maxQuantityPerOpen: string;
      hasGuaranteedClasses: boolean;
      0: string;
      1: boolean;
    }>;

    renounceRole(
      role: string | number[],
      account: string
    ): NonPayableTransactionObject<void>;

    resetClass(
      _classId: number | string | BN
    ): NonPayableTransactionObject<void>;

    revokeRole(
      role: string | number[],
      account: string
    ): NonPayableTransactionObject<void>;

    setClassForTokenId(
      _tokenId: number | string | BN,
      _classId: number | string | BN
    ): NonPayableTransactionObject<void>;

    setOptionSettings(
      _option: number | string | BN,
      _maxQuantityPerOpen: number | string | BN,
      _classProbabilities: (number | string | BN)[],
      _guarantees: (number | string | BN)[]
    ): NonPayableTransactionObject<void>;

    setSeed(_newSeed: number | string | BN): NonPayableTransactionObject<void>;

    setTokenIdsForClass(
      _class: number | string | BN,
      _tokenIds: (number | string | BN)[]
    ): NonPayableTransactionObject<void>;

    setTokenIdsForClasses(
      _tokenIds: (number | string | BN)[]
    ): NonPayableTransactionObject<void>;

    supportsInterface(
      interfaceId: string | number[]
    ): NonPayableTransactionObject<boolean>;

    symbol(): NonPayableTransactionObject<string>;

    uri(_optionId: number | string | BN): NonPayableTransactionObject<string>;
  };
  events: {
    LootBoxOpened(cb?: Callback<LootBoxOpened>): EventEmitter;
    LootBoxOpened(
      options?: EventOptions,
      cb?: Callback<LootBoxOpened>
    ): EventEmitter;

    RoleAdminChanged(cb?: Callback<RoleAdminChanged>): EventEmitter;
    RoleAdminChanged(
      options?: EventOptions,
      cb?: Callback<RoleAdminChanged>
    ): EventEmitter;

    RoleGranted(cb?: Callback<RoleGranted>): EventEmitter;
    RoleGranted(
      options?: EventOptions,
      cb?: Callback<RoleGranted>
    ): EventEmitter;

    RoleRevoked(cb?: Callback<RoleRevoked>): EventEmitter;
    RoleRevoked(
      options?: EventOptions,
      cb?: Callback<RoleRevoked>
    ): EventEmitter;

    Warning(cb?: Callback<Warning>): EventEmitter;
    Warning(options?: EventOptions, cb?: Callback<Warning>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "LootBoxOpened", cb: Callback<LootBoxOpened>): void;
  once(
    event: "LootBoxOpened",
    options: EventOptions,
    cb: Callback<LootBoxOpened>
  ): void;

  once(event: "RoleAdminChanged", cb: Callback<RoleAdminChanged>): void;
  once(
    event: "RoleAdminChanged",
    options: EventOptions,
    cb: Callback<RoleAdminChanged>
  ): void;

  once(event: "RoleGranted", cb: Callback<RoleGranted>): void;
  once(
    event: "RoleGranted",
    options: EventOptions,
    cb: Callback<RoleGranted>
  ): void;

  once(event: "RoleRevoked", cb: Callback<RoleRevoked>): void;
  once(
    event: "RoleRevoked",
    options: EventOptions,
    cb: Callback<RoleRevoked>
  ): void;

  once(event: "Warning", cb: Callback<Warning>): void;
  once(event: "Warning", options: EventOptions, cb: Callback<Warning>): void;
}
