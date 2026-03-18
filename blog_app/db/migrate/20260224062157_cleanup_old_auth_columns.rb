class CleanupOldAuthColumns < ActiveRecord::Migration[8.1]
  def change
    remove_column :users, :email_address, :string if column_exists?(:users, :email_address)
    remove_column :users, :password_digest, :string if column_exists?(:users, :password_digest)
  end
end
