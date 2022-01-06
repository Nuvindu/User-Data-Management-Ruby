class Link < ApplicationRecord
    after_save :notify_subscriber_of_addition
  
    private
  
    def notify_subscriber_of_addition
      GraphqlRailsApiSchema.subscriptions.trigger("user_created", {}, self)
    end
end