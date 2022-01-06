module Types
    class SubscriptionType < BaseObject
      field :hello_world, [Types::UserType], null: false, description: "testing.."
  
        def hello_world
            User.all
        end

    end
end