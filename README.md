## This is the most epic web app of all time

## Manufacturer Database
A Corporate Inventory Management System

## Project Overview
The Manufacturer Database is a distributed, cloud-hosted inventory management system designed for a manufacturer of computer componenets. The system we have built enables secure tracking and management of inventory across multuiple manufacturing plants while also enforcing authentication and role-based access controls. Our application is built using Node.js, containerized with Docker, Deployed with Microsoft Azure, and uses a fully automated CI/CD pipeline powered by GitHub Actions.

## Our Features for the Application
Authentication and Authorization:
  - Secure username and password login system
  - Passwords are hashed
  - Role-Based Access Control
  - Unauthorized users cannot access anu protected routes
  - Plant-level access restrictions enforeced server-side
    
Multi-Plant Inventory Management:
  - Tracks inventory across multiple manufacturing plants
  - Users may only view inventory associated with their assigned plant/role
  - Executive-level users can view all information
  - Managers can modify the inventory (part details, quantity, etc.)
    
Inventory Data:
  - Part Number
  - Display Name
  - Specs
  - Quantity
  - Vendor Info
    
Browser Compatibility:
  - The application is fully supported on multiple browers (Edge, Chrome, Firefox)
  - No mobile version was added

## Technology Stack
Backend:
  - Node.js for framework
  - Structured Architechture

Frontend:
  - Angular: Type script based
  - Single-page applications (SPAs)
    
Database:
  - Microsoft SQL Server hosted on Azure
  - Secure connection using environment variables
  - Role-based and plant-based relational schema design
    
Cloud and DevOps:
  - Cloud Provider: Microsoft Azure
  - Deployment Target: Azure App Service
  - Container Registry: Azure Container Registry
  - CI/CD: GitHub Actions
  - Source Control: GitHub
  - Containerization: Docker
  - Testing Framework: Jest

## System Architecture
Client Browser ---> Azure App Service (Docker) ---> Azure SQL Database (msSQL)
All major system components run inside Docker containers locally and in production

## Docker Configuration
The repository includes the following:
  - Dockerfile (frontend and backend) - Builds the Node.js app container
  - docker-compose.yml - Runs application + local SQL container
  - Environment variable support
  - Persistent database configuration for local deployment

## CI/CD Pipeline
The CI/CD is fully automated using GitHub Actions

Continuous Integration:
  - Install dependencies
  - Build application
  - Run jest unit tests
  - Validate Docker build
    
Continuous Deployment:
  - Build Docker image
  - Push image to Azure Container Registry
  - Deploy automatically to Azure App Services

## Branching
Production for the Manufacturer Database will be done in the "main" branch
  - Changes occur when doing Pull requests
  - All tests must pass before deployment
  - Deployment occurs from "main"
  - Five different branches in the repo:
      - main
      - two develops
      - hotfix
      - serverside

## Automated Testing
Testing framework: Jest
  - We have six different unit test (3 from backend and 3 from frontend)
- Test will run automatically in GitHub Actions

## Security
Our security for the application uses the following:
  - Password hashing
  - No plaintext password storage
  - No hard-coded secrets
  - GitHub Secrets for CI/CD credentials
  - Secure Azure configuration
  - Server-side authorization checks
  - Private container registry

## Team Responsibilities 
IT:
  - Azure infrastructure setup
  - Azure SQL configuration
  - CI/CD pipeline implementation
  - Docker containerization
  - Deployment automation
  - Authentication infrastructure
  - Secret management
  - Security configuration
    
SDP:
  - Application logic
  - Route/controller implementation
  - Business rule enforcement
  - Database interaction layer
  - Client-side validation
  - Integration testing





















