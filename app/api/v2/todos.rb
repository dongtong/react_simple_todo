#encoding: utf-8
require 'rack/contrib'
module V2
	class Todos < Grape::API
    use Rack::JSONP
    format :json

		resources :todos do
			desc "获取所有待办事项"
			get '/' do
				begin
					todos = Todo.all.map do |todo|
						{
							id: todo.id,
							content: todo.content
						}
					end
					status 200
					{data: todos}
				rescue => ex
					puts "--------#{ex.inspect}"
					status 500
					error!({code: "1000", message: "系统异常!"})
				end
			end

			desc "创建待办事项"
			post '/' do
				todo = Todo.new(content: params[:content])
				if todo.save
					{success: true}
				else
					status 500
					{success: false}
				end
			end

			desc "更新待办事项"
			patch '/:id' do
				todo = Todo.find(params[:id])
				if todo.update_attributes({content: params[:content]})
					{success: true, id: todo.id, content: todo.content}
				else
					status 500
					{success: false}
				end
			end

			desc "删除待办事项"
			delete '/:id' do
				todo = Todo.find(params[:id])
				if todo.destroy
					{success: true}
				else
					status 500
					{success: false}
				end
			end

      desc "JSONP GET"
      get '/:id/update' do
        todo = Todo.find(params[:id])
				if todo.update_attributes({content: params[:content]})
					{success: true, id: todo.id, content: todo.content}
				else
					status 500
					{success: false}
				end
      end

      desc "JSONP DELETE"
      get '/:id/delete' do
        todo = Todo.find(params[:id])
				if todo.destroy
					{success: true}
				else
					status 500
					{success: false}
				end
      end

      desc "JSONP POST"
      get '/add' do
        todo = Todo.new(content: params[:content])
				if todo.save
					{success: true, id: todo.id, content: todo.content}
				else
					status 500
					{success: false}
				end
      end

		end

	end
end
