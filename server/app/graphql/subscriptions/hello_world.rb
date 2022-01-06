module Subscriptions
    class HelloWorld < Subscriptions::BaseSubscription
        field :hello_world, String, null: false, description: "testing.."
  
        def hello_world
            "Hello Worlds"
        end


    end