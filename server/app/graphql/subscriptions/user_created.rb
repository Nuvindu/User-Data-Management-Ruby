class Subscriptions::UserCreated < Subscriptions::BaseSubscription
    field :user, Types::UserType, null: false


    # def resol(id:)
    #     User.find(id)
    # end

end