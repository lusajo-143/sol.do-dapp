mod errors;

use anchor_lang::prelude::*;
use crate::errors::TodoErrors;

declare_id!("BU8nAiw1qPvbipixuTcF6APc7PP7SYbhZBSVFjvWVf2h");

#[program]
pub mod todo_app {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let todo_list = &mut ctx.accounts.todo_list;

        todo_list.owner = ctx.accounts.pda.key();
        todo_list.todo_tasks = Vec::new();

        Ok(())
    }

    pub fn create_todo(ctx: Context<CreateTodo>, description: String) -> Result<()> {
        let todo_list = &mut ctx.accounts.todo_list;

        let clock = Clock::get()?;
        let id = clock.unix_timestamp as u64;

        todo_list.count = todo_list.count + 1;

        todo_list.todo_tasks.push(TodoTask {
            id,
            description,
            is_completed: false,
        });
        Ok(())
    }

    pub fn change_todo_status(ctx: Context<ChangeTodoStatus>, task_id: u64, is_completed: bool) -> Result<()> {

        let todo_list = &mut ctx.accounts.todo_list;
        let todo_list = &mut ctx.accounts.todo_list;

        if let Some(task_index) = todo_list.todo_tasks.clone().iter().position(|task| task.id == task_id) {
            todo_list.todo_tasks[task_index].is_completed = is_completed;
        } else {
            return Err(TodoErrors::DataNotFound.into());
        }

        Ok(())
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct TodoTask {
    pub id: u64,             // 8
    pub description: String, // 4 * len(description)
    pub is_completed: bool,  // 1
}

#[account]
pub struct TodoList {
    owner: Pubkey,             // 32
    count: u8,                 // 1
    todo_tasks: Vec<TodoTask>, // 100 task per account
}

#[account]
pub struct CreateTodoAcc {
    pub description: String,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + 32 + 1 + 4 + (50 * (8 + 1 + (4 + 100))),
        seeds = [b"todo_list", payer.key().as_ref()],
        bump
    )]
    pub todo_list: Account<'info, TodoList>,
    /// CHECK
    #[account(seeds = [b"todo_list", payer.key().as_ref()], bump)]
    pub pda: AccountInfo<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateTodo<'info> {
    #[account(mut, seeds = [b"todo_list", payer.key().as_ref()], bump)]
    pub todo_list: Account<'info, TodoList>,
    #[account(mut)]
    pub payer: Signer<'info>,
}

#[derive(Accounts)]
pub struct ChangeTodoStatus<'info> {
    #[account(mut, seeds= [b"todo_list", payer.key().as_ref()], bump)]
    todo_list: Account<'info, TodoList>,
    #[account(mut)]
    pub payer: Signer<'info>,
}
