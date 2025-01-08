'use client';

import {getTodoProgram, TODO_PROGRAM_ID as programId} from '@project/anchor'
import * as anchor from "@coral-xyz/anchor";
import {useConnection} from '@solana/wallet-adapter-react'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'

import toast from 'react-hot-toast'
import {useCluster} from '../cluster/cluster-data-access'
import {useAnchorProvider} from '../solana/solana-provider'
import {useTransactionToast} from '../ui/ui-layout'
import {useState} from "react";
import BN from "bn.js";

export const getAccountPDA = (provider: any, program: any)=> {
  const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('todo_list'), provider.wallet?.publicKey?.toBuffer()],
      program.programId
  );
  return pda
}

export function useTodoProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const program = getTodoProgram(provider);

  const [todoDescription, setTodoDescription] = useState("");
  const queryClient = useQueryClient();


  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const createTodo = useMutation({

    mutationKey: ['todo_app', 'create_todo', { cluster }],
    mutationFn: (description: string) => program.methods.createTodo(description, "02 Jan 2025").accounts({
      todoList: getAccountPDA(provider, program),
      payer: provider.wallet.publicKey
    }).rpc(),
    onSuccess: (signature) => {
      queryClient.invalidateQueries(['get-user-todo-list', {cluster}]);
      setTodoDescription('')
      transactionToast(signature);
    },
    onError: () => toast.error('Failed to run program'),
  });

  const initializeTodo = useMutation({
    mutationKey: ['todo_app', 'initialize', { cluster }],
    mutationFn: () => {


      return program.methods.initialize()
      .accounts({
        todoList: getAccountPDA(provider, program),
        payer: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }).rpc()
    },
    onSuccess: (signature) => {
      transactionToast(signature);
    },
    onError: () => toast.error('Failed to run program'),
  });

  const changeTodoStatus = useMutation({
    mutationKey: ['todo_app', 'changeTodoStatus', {cluster}],
    mutationFn: (taskId: number) => {
      return program.methods.changeTodoStatus(new BN(taskId))
          .accounts({
            todoList: getAccountPDA(provider, program),
            payer: provider.wallet.publicKey
          })
          .rpc()
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      queryClient.invalidateQueries(['get-user-todo-list', {cluster}]);
    },
    onError: (e) => toast.error('Failed to run program'),
  });

  const getUserTodoList = useQuery({
    queryKey: ['get-user-todo-list', { cluster }],
    queryFn: async () => program.account.todoList.fetch(getAccountPDA(provider, program)),
  });

  return {
    program,
    programId,
    getProgramAccount,
    createTodo,
    initializeTodo,
    changeTodoStatus,
    getUserTodoList,
    todoDescription,
    setTodoDescription
  };
}
