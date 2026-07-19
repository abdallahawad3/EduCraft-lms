# LMS Platform

A modern Learning Management System built with Next.js, TypeScript, Prisma, and PostgreSQL.

This project includes a public course storefront, secure authentication, and a full admin experience for building and managing courses, chapters, and lessons with drag-and-drop reordering.

## Highlights

- Public landing page and browseable course catalog
- Course details page with rich description and chapter/lesson preview
- Email OTP authentication flow
- GitHub social login
- Role-based admin access control
- Admin dashboard with analytics UI components
- Course creation and editing workflows
- Course status lifecycle: Draft, Published, Archived
- Chapter and lesson management
- Drag-and-drop chapter and lesson sorting
- Presigned S3 uploads for media
- S3 delete endpoint for media cleanup
- Arcjet bot detection and rate limiting on sensitive routes
- Prisma-powered data layer with PostgreSQL

## Core Features

### Public Experience

- Home page with platform overview
- Course listing page showing published courses
- Course details page with:
  - Course hero image
  - Level, category, and duration badges
  - Rich text course description
  - Expandable chapter and lesson structure
  - Pricing and enrollment call-to-action

### Authentication and Authorization

- Better Auth integration
- Email OTP sign-in (verification code sent by email)
- GitHub OAuth sign-in
- Session management with Prisma adapter
- Admin-only route protection for admin area
- Non-admin redirect flow

### Admin Experience

- Sidebar-based admin layout
- Dashboard widgets and table components
- Course management list
- Create course form with validation
- Auto slug generation from title
- Rich text editor for long description
- Thumbnail upload flow via presigned S3 URL
- Edit course details
- Add chapters
- Add lessons to chapters
- Delete chapters and lessons
- Reorder chapters and lessons with drag and drop

### Security and Resilience

- Arcjet middleware on admin routes
- Arcjet rate limiting and bot protection on upload/delete endpoints
- Request validation with Zod
- Server-side admin session checks for protected actions

## Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- UI: Tailwind CSS v4, shadcn/ui, Radix primitives
- Forms and Validation: React Hook Form, Zod
- Auth: better-auth
- Database ORM: Prisma
- Database: PostgreSQL
- Storage: S3-compatible object storage
- Email: Resend
- Security and Rate Limiting: Arcjet
- Editor: Tiptap
- Drag and Drop: dnd-kit

## Data Model Overview

Main entities:

- User
- Session
- Account
- Verification
- Course
- Chapter
- Lesson

Course relationships:

- One user can create many courses
- One course has many chapters
- One chapter has many lessons

Course metadata includes:

- title, slug, category, level, status
- price and duration
- thumbnail storage key
- rich description JSON

## Environment Variables

Set these variables before running the app:

### Required

- DATABASE_URL
- BETTER_AUTH_SECRET
- BETTER_AUTH_URL
- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- RESEND_API_KEY
- ARCJET_KEY
- AWS_REGION
- AWS_ENDPOINT_URL_S3
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- NEXT_PUBLIC_S3_BUCKET_NAME_IMAGE

### Notes

- S3 values can target AWS S3 or any S3-compatible provider.
- Google OAuth variables are validated by the environment layer.

## Getting Started

### 1. Install dependencies

This repository includes a pnpm lockfile, so pnpm is recommended.

```bash
pnpm install
```

### 2. Configure environment

Create your environment file and add the variables listed above.

### 3. Run database migrations

```bash
pnpm prisma migrate dev
```

### 4. Start development server

```bash
pnpm dev
```

Open http://localhost:3000

## Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build production app
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Admin Access Setup

The admin area requires a signed-in user with role set to admin.

Typical setup flow:

1. Create an account by logging in.
2. Update that user record in the database and set role to admin.
3. Access admin routes.

## Upload Flow Summary

1. Admin requests a presigned upload URL from the upload API.
2. Client uploads file directly to object storage.
3. Stored key is saved on course or lesson data.
4. Delete API removes files when requested.

## API Surface (High-Level)

- Auth API endpoints through better-auth
- S3 upload endpoint for presigned URLs
- S3 delete endpoint for deleting uploaded files

## Project Structure (High-Level)

- App routes for public, auth, and admin sections
- Server actions for admin workflows and data mutations
- Shared components for UI, editor, uploader, and builder
- Data utilities for fetching public/admin course data
- Prisma schema and generated client

## Deployment Notes

Before production deployment:

- Set all environment variables in your hosting platform
- Provision PostgreSQL database
- Provision S3-compatible bucket and credentials
- Configure Resend API key and sender
- Configure OAuth credentials and callback URLs
- Run Prisma migrations on production database

## Future Improvements

- Student enrollment and checkout flow
- Lesson video streaming enhancements
- Progress tracking persistence per user
- Quizzes, assignments, and certificates
- Advanced admin analytics and reporting

## License

Add your preferred license in this repository.
