// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import TodoIDL from '../target/idl/todo_app.json'
import type { TodoApp } from '../target/types/todo_app'

// Re-export the generated IDL and type
export { TodoApp, TodoIDL }

// The programId is imported from the program IDL.
export const TODO_PROGRAM_ID = new PublicKey(TodoIDL.address)

// This is a helper function to get the Todo Anchor program.
export function getTodoProgram(provider: AnchorProvider) {
  return new Program(TodoIDL as TodoApp, provider)
}
