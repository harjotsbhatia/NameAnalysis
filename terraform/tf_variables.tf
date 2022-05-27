# ----------------------------------------------------------------------
# Default AWS Region used to deploy resources
# ----------------------------------------------------------------------
variable "aws_region" {
  default = "us-west-1"
}

# ----------------------------------------------------------------------
# Application name used for naming resources
# ----------------------------------------------------------------------
variable "app_name" {
  default = "name-api"
}

# ----------------------------------------------------------------------
# Lambda functions, used to retrieve function ARN CFN exports
# ----------------------------------------------------------------------
variable "api_lambda_functions" {
  default = [
    "get-data"
  ]
}

# ----------------------------------------------------------------------
# Lambda invoke URI prefix used in openAPI specification
# ----------------------------------------------------------------------
variable "lambda_invoke_uri_prefix" {
  default = "arn:aws:apigateway:us-west-1:lambda:path/2015-03-31/functions"
}

# ----------------------------------------------------------------------
# S3 bucket for converted SAM templates
# ----------------------------------------------------------------------
variable "sam_code_bucket" {
  default = "first-name-bucket"
}
