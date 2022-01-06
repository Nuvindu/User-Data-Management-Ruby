class GraphqlFunDemoSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
  subscription(Types::SubscriptionType)
  # Opt in to the new runtime (default in future graphql-ruby versions)
  use GraphQL::Execution::Interpreter
  use GraphQL::Analysis::AST

  # Add built-in connections for pagination
  use GraphQL::Pagination::Connections
  GraphqlFunDemoSchema = GraphQL::Schema.define do
    use GraphQL::Subscriptions::ActionCableSubscriptions,redis: Redis.new
  end
end
