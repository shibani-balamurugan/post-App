module Api
  module V1
    class PostsController < ApplicationController

      include Rails.application.routes.url_helpers

      before_action :set_post, only: %i[show update destroy]

      def index
        posts = Post.includes(:author).all

        render json: posts.map { |post|
          post.as_json(include: :author).merge(
            image_url: post.image.attached? ? url_for(post.image) : nil
          )
        }
      end

      def show
        render json: @post.as_json(include: :author).merge(
          image_url: @post.image.attached? ? url_for(@post.image) : nil
        )
      end

      def create
        puts params[:post][:image]
        @post = Post.new(post_params)

        if params[:post][:author]
           @post.author_name = params[:post][:author][:name]
        end

        if params[:post][:image]
           @post.image.attach(params[:post][:image])
        end

       if @post.save
          render json: @post.as_json(include: :author).merge(
          image_url: @post.image.attached? ? url_for(@post.image) : nil
          ), status: :created
       else
         render json: { errors: @post.errors }, status: :unprocessable_entity
   end
end

      def update
       @post.author_name = params.dig(:post, :author, :name)
       if params[:remove_image].present?
          @post.image.purge
       end

      if params[:post][:image]
          @post.image.attach(params[:post][:image])
      end

      if @post.update(post_params)
         render json: @post.as_json(include: :author).merge(
         image_url: @post.image.attached? ? url_for(@post.image) : nil
         )
      else
       render json: { errors: @post.errors }, status: :unprocessable_entity
  end
end

      def destroy
        @post.destroy
        render json: { message: "Post deleted" }
      end

      private

      def set_post
        @post = Post.find(params[:id])
      end

      def post_params
        params.require(:post).permit(:title, :description, :image)
      end
     hiiiiiiiiiiiiii

    end
  end
end
