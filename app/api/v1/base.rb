#encoding: utf-8
module V1
	class Base < Grape::API
	  version  'v1', using: :path
	  # Mount the APIs' implementations
	  mount Todos
	end
end