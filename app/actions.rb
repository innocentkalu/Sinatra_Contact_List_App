# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  Contact.all.to_json
end

post '/contacts' do
  fname = params[:first_name]
  lname = params[:last_name]
  email = params[:email]
  phone = params[:phone]
  results = {result: false}
  contact = Contact.new(first_name: fname, last_name:lname, email: email, phone: phone)
    if contact.save
      results[:result] = true
      results[:id] = contact.id
    end
    results.to_json
end
