terraform {
  backend "pg" {}

  required_providers {
    heroku = {
      source = "heroku/heroku"
      version = "~> 4.0"
    }
  }
}

resource "heroku_app" "graphql-chamber-deputies-br" {
  name = "graphql-chamber-deputies-br"
  region = "us"
  stack = "container"
}

output "graphapi_url" {
  value = "https://${heroku_app.graphql-chamber-deputies-br.name}.herokuapp.com"
}
