use anchor_lang::error_code;

#[error_code]
pub enum TodoErrors {
    #[msg("Data not found")]
    DataNotFound
}
