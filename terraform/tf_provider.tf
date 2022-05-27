# ----------------------------------------------------------------------
# AWS Provider
# ----------------------------------------------------------------------
provider "aws" {
  region = var.aws_region
}

# ----------------------------------------------------------------------
# Terraform S3 backend with DynamoDB Lock table
# ----------------------------------------------------------------------
terraform {
  backend "s3" {
    bucket         = "name-state-bucket"
    key            = "name-api.tfstate"
    dynamodb_table = "my-terraform-lock"
    region         = "us-west-1"
    encrypt        = "true"
  }
}
