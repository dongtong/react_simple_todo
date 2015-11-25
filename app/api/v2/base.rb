#encoding: utf-8
module V2
	class Base < Grape::API
	  version  'v2', using: :path
	  # Mount the APIs' implementations
	  mount Todos
	end
end
