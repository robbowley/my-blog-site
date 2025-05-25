# Pragmatic Partners Website

A modern website for Pragmatic Partners, built with Directus CMS and Next.js.

## Local Development

### Prerequisites

- Docker and Docker Compose
- Node.js (v18 or later)
- npm or yarn

### Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd pragmatic-partners-website
   ```

2. Start the development environment:
   ```bash
   docker-compose up -d
   ```

3. Access the services:
   - Directus CMS: http://localhost:8055
   - Admin credentials:
     - Email: admin@example.com
     - Password: admin

### Development Workflow

1. Content Management:
   - Use Directus admin interface to manage content
   - Content types are defined in the CMS
   - Media files are stored in the uploads directory

2. Website Development:
   - Next.js application for the main website
   - TypeScript for type safety
   - Tailwind CSS for styling
   - Content fetched from Directus CMS

### Project Structure

```
pragmatic-partners-website/
├── docs/               # Project documentation
│   ├── adr/           # Architecture Decision Records
│   └── ...            # Additional documentation
├── directus/          # Directus CMS configuration
│   └── uploads/       # Media uploads
├── website/           # Next.js website application
└── docker-compose.yml # Local development setup
```

## Documentation

- [Project Overview](docs/project-overview.md)
- [Architecture Decisions](docs/adr/)
- [Content Architecture](docs/content-architecture.md)

## Project Status

Currently in initial setup phase:
- ✅ Development standards established
- ✅ Basic project structure created
- ✅ Documentation framework set up
- ✅ Technology stack selection (Directus + Next.js)
- 📋 Core features implementation (pending)

## Getting Started

(Development setup instructions will be added as the project evolves)

## Contributing

Please read our [Development Standards](.cursor/rules/development-standards.mdc) before contributing to the project.

### 4. **Run the Frontend Dev Server**

```bash
npm run dev
```

- The website will be available at [http://localhost:3000](http://localhost:3000).

### 5. **Access Directus Admin**

- Go to [http://localhost:8055/admin](http://localhost:8055/admin) to manage content.
- Create collections (e.g., hero, articles, testimonials) as needed.

## Running Tests

### **Unit/Integration Tests (Jest)**

```bash
cd website
npm test
```

### **End-to-End (E2E) Tests (Playwright)**

- Make sure both the backend and frontend are running.
- From the project root:

```bash
npm run test:e2e
```

- E2E tests are located in `e2e-tests/`. 