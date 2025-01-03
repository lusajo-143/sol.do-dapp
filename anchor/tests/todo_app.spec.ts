import * as anchor from "@coral-xyz/anchor";
import {Program} from "@coral-xyz/anchor";
import {TodoApp} from "../target/types/todo_app";
import BN from "bn.js";

describe("todo_app", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());

    const program = anchor.workspace.TodoApp as Program<TodoApp>;

    let taskId = 0

    const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("todo_list"), anchor.AnchorProvider.env().wallet.publicKey.toBuffer()],
        program.programId);

    it("Is initialized!", async () => {

        console.log('PDA, ', pda)
        // Add your test here.
        const tx = await program.methods.initialize()
            .accounts({
                todoList: pda,
                payer: anchor.AnchorProvider.env().wallet.publicKey
            })
            .rpc();
        console.log("Your transaction signature", tx);
    });

    // it("Create todo 01!", async () => {
    //     // Add your test here.
    //     const tx = await program.methods.createTodo("Task 01")
    //         .accounts({
    //             todoList: pda,
    //             payer: anchor.AnchorProvider.env().wallet.publicKey
    //         })
    //         .rpc();
    //     console.log("Your transaction signature", tx);
    // });
    //
    // it("Create todo 02!", async () => {
    //     // Add your test here.
    //     const tx = await program.methods.createTodo("Task 02")
    //         .accounts({
    //             todoList: pda,
    //             payer: anchor.AnchorProvider.env().wallet.publicKey
    //         })
    //         .rpc();
    //     console.log("Your transaction signature", tx);
    // });
    //
    // it("Get todo list", async () => {
    //     let data = await program.account.todoList.fetch(pda);
    //     taskId = data.todoTasks[0].id.toNumber();
    //
    //     console.log("Data: ", data);
    // })
    //
    // it("Complete todo!", async () => {
    //     // Add your test here.
    //     const tx = await program.methods.changeTodoStatus(new BN(taskId), true)
    //         .accounts({
    //             todoList: pda,
    //             payer: anchor.AnchorProvider.env().wallet.publicKey
    //         })
    //         .rpc();
    //     console.log("Your transaction signature", tx);
    // });

    // it("Get todo list", async () => {
    //     let data = await program.account.todoList.fetch(pda);
    //     console.log("Data: ", data);
    // })

});
