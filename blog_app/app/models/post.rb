class Post < ApplicationRecord
  belongs_to :author 
  has_one_attached :image
  validates :title, presence: true
  validates :description, presence: true
  attr_accessor :author_name

  before_validation :process_author_callback

  private

  def process_author_callback
    return if author_name.blank?
    existing_author = Author.find_by(name: author_name)

    if existing_author
      self.author = existing_author
    else
      new_author = Author.create(name: author_name)
      self.author = new_author
    end
  end
end 