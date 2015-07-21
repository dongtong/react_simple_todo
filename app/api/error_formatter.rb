#encoding: utf-8
module ErrorFormatter
  def self.call message, backtrace, options, env
  	info =  if message.class == Hash
  		[message[:message], message[:code]]
  	else
  		message.split(',').map{|e| e.strip}
  	end
  	{
  	    code: info[1],
  	 message: info[0]
  	}.to_json
  end
end