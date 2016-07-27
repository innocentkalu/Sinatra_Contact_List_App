require 'ffaker'
require 'faker'
10.times do
     first_name = Faker::Name.first_name
     last_name = Faker::Name.last_name
     phone = Faker::PhoneNumber
     Contact.create(
        first_name :first_name
        last_name :last_name
        phone :phone
        email :Faker::Internet.email(first_name + "." + last_name)
      )
end 