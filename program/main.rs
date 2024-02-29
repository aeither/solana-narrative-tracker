use anchor_lang::prelude::*;

declare_id!("CfqCT3ojotQKHizmE73CBo95LT6MLCKQCEm3dnztJPUk");

#[program]
pub mod narrative_list {
    use super::*;

    pub fn init_user(ctx: Context<InitUser>) -> Result<()> {
        let user_account = &mut ctx.accounts.new_user_account;
        user_account.authority = *ctx.accounts.authority.key;
        user_account.last_id = 0;

        Ok(())
    }

    pub fn add_item(ctx: Context<InitItem>, _content: String) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        let item_account = &mut ctx.accounts.new_item_account;

        // item account
        item_account.authority = ctx.accounts.authority.key();
        item_account.id = 0;
        item_account.content = _content;

        // user account
        user_account.last_id += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitUser<'info> {
    #[account(init, payer = authority, space = 8 + std::mem::size_of::<UserAccount>(), seeds = [b"user", authority.key().as_ref()], bump)]
    pub new_user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitItem<'info> {
    #[account(mut, seeds = [b"user", authority.key().as_ref()], bump)]
    pub user_account: Account<'info, UserAccount>,

    #[account(init, payer = authority, space = 8 + std::mem::size_of::<ItemAccount>(), seeds = [b"item", authority.key().as_ref(), &[user_account.last_id as u8].as_ref()], bump)]
    pub new_item_account: Account<'info, ItemAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct UserAccount {
    authority: Pubkey,
    last_id: u8,
}

#[account]
pub struct ItemAccount {
    authority: Pubkey,
    id: u8,
    content: String,
}
