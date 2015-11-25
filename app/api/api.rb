#encoding: utf-8
class API < Grape::API
  format         :json
	default_format :json

	rescue_from :all, backtrace: true
  error_formatter :json, ErrorFormatter

  helpers do
		def logger
		  API.logger
		end
	end
  # Mount the different versions api
  mount V1::Base
  mount V2::Base
end
