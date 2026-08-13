# LMS Application — End-to-End Workflow Test Checklist

## 0. Test Accounts / Test Data

Prepare these accounts before testing:

- [ ] Regular user A — new user with no enrollments
- [ ] Regular user B — existing user with at least one enrollment
- [ ] Admin user
- [ ] Non-admin user
- [ ] User with incomplete course progress
- [ ] User with completed course progress
- [ ] Course with multiple chapters
- [ ] Chapter with multiple lessons
- [ ] Lesson containing rich text
- [ ] Lesson containing an uploaded file/video/image if supported
- [ ] Course with zero lessons
- [ ] Course with zero chapters
- [ ] Published course
- [ ] Unpublished/draft course
- [ ] Deleted/invalid course ID
- [ ] Deleted/invalid lesson ID

---

# 1. Application / Navigation

### TC-001 — Open homepage

- [ ] Open `/`
- [ ] Page loads without server/client errors
- [ ] Navbar is displayed
- [ ] Public navigation works
- [ ] Login/user links are displayed correctly
- [ ] No unauthorized admin/dashboard content is visible

### TC-002 — Refresh homepage

- [ ] Refresh the page
- [ ] Session state remains correct
- [ ] No hydration errors
- [ ] No console errors

### TC-003 — Navigate using browser Back/Forward

- [ ] Navigate between multiple pages
- [ ] Use browser Back
- [ ] Use browser Forward
- [ ] Verify authentication/session state remains correct

### TC-004 — Direct URL access

Test direct navigation to:

- [ ] `/`
- [ ] `/courses`
- [ ] `/login`
- [ ] `/dashboard`
- [ ] `/admin`
- [ ] `/admin/courses`
- [ ] `/not-admin`
- [ ] `/payments/success`
- [ ] `/payments/cancel`

Verify every route behaves correctly according to authentication/authorization.

---

# 2. Authentication

## Login

### TC-010 — Open login page

- [ ] Open `/login`
- [ ] Login form renders
- [ ] Email/phone input renders correctly
- [ ] OTP/login controls render correctly
- [ ] Validation messages work

### TC-011 — Empty login submission

- [ ] Submit without entering credentials
- [ ] Validation prevents submission
- [ ] Correct error is displayed

### TC-012 — Invalid email/credential format

- [ ] Enter invalid value
- [ ] Submit
- [ ] Validation error appears
- [ ] No unexpected server error

### TC-013 — Valid login

- [ ] Enter valid credentials
- [ ] Submit
- [ ] OTP verification flow starts
- [ ] User receives OTP if applicable

### TC-014 — Wrong OTP

- [ ] Enter incorrect OTP
- [ ] Verify
- [ ] Login is rejected
- [ ] User remains unauthenticated

### TC-015 — Expired OTP

- [ ] Request OTP
- [ ] Wait until expiration or simulate expiration
- [ ] Enter OTP
- [ ] Verify it is rejected

### TC-016 — Correct OTP

- [ ] Enter valid OTP
- [ ] Verify
- [ ] User becomes authenticated
- [ ] User is redirected to the expected page

### TC-017 — Logout

Using `use-signout.tsx`:

- [ ] Login
- [ ] Logout
- [ ] Session is removed
- [ ] Protected pages cannot be accessed
- [ ] Navbar changes to logged-out state

### TC-018 — Access protected page while logged out

Attempt:

- [ ] `/dashboard`
- [ ] `/dashboard/[slug]`
- [ ] `/dashboard/[slug]/[lessonId]`
- [ ] `/admin`
- [ ] `/admin/courses`

Expected:

- [ ] User is rejected or redirected appropriately
- [ ] No protected data is returned

---

# 3. Public Courses

## Course listing

### TC-020 — Open `/courses`

- [ ] Courses load
- [ ] Course cards render
- [ ] Correct course title appears
- [ ] Course description appears
- [ ] Course links work

### TC-021 — Empty course database

- [ ] Remove/hide all published courses
- [ ] Open `/courses`
- [ ] Empty state is displayed
- [ ] No crash occurs

### TC-022 — Course with missing/invalid data

- [ ] Course has missing optional data
- [ ] Course card still renders
- [ ] UI does not crash

---

# 4. Public Course Details

Route:

`/courses/[slug]`

### TC-030 — Open valid course

- [ ] Course page loads
- [ ] Correct title
- [ ] Description
- [ ] Chapters
- [ ] Lessons
- [ ] Enrollment button
- [ ] Course structure is correct

### TC-031 — Invalid course slug

Open:

`/courses/does-not-exist`

- [ ] Correct 404/not-found behavior
- [ ] No database error exposed
- [ ] No stack trace shown to user

### TC-032 — Course with no chapters

- [ ] Page loads
- [ ] Empty chapter state works
- [ ] Enrollment still works

### TC-033 — Course with empty chapter

- [ ] Chapter displays
- [ ] No lesson crash occurs

### TC-034 — Collapsible chapters

Using `CollapsibleChapter.tsx`:

- [ ] Open chapter
- [ ] Lessons appear
- [ ] Close chapter
- [ ] Lessons disappear
- [ ] Open another chapter
- [ ] Verify expected collapse/expand behavior

---

# 5. Enrollment

Route/action:

`/courses/[slug]/action.ts`

Component:

`EnrollmentButton.tsx`

### TC-040 — Logged-out user attempts enrollment

- [ ] Open course
- [ ] Click Enroll
- [ ] User is asked to authenticate or redirected appropriately
- [ ] No enrollment is created accidentally

### TC-041 — Logged-in user enrolls

- [ ] Login
- [ ] Open course
- [ ] Click Enroll
- [ ] Enrollment process starts
- [ ] Correct course is associated with user

### TC-042 — Double enrollment

- [ ] Enroll in course
- [ ] Click Enroll again
- [ ] Verify duplicate enrollment is prevented

### TC-043 — Already enrolled user

- [ ] Login as enrolled user
- [ ] Open course
- [ ] Verify button/state reflects enrollment
- [ ] User can access the course

### TC-044 — Enrollment against invalid course

- [ ] Manipulate course ID/slug
- [ ] Submit enrollment
- [ ] Request is rejected
- [ ] No invalid enrollment is created

---

# 6. Payments / Stripe

Relevant routes:

- `/payments/success`
- `/payments/cancel`
- `/api/webhook/stripe`

### TC-050 — Start paid enrollment

- [ ] Login
- [ ] Select paid course
- [ ] Start checkout
- [ ] Verify correct course/product/price
- [ ] Verify correct user is associated

### TC-051 — Successful payment

- [ ] Complete Stripe test payment
- [ ] Return to `/payments/success`
- [ ] Verify payment status
- [ ] Verify enrollment
- [ ] Verify course becomes accessible

### TC-052 — Cancel payment

- [ ] Start checkout
- [ ] Cancel payment
- [ ] Return to `/payments/cancel`
- [ ] Verify user is not incorrectly marked as paid/enrolled

### TC-053 — Failed payment

- [ ] Use Stripe test failure scenario
- [ ] Verify failure is handled
- [ ] Verify no successful enrollment is created

### TC-054 — Stripe webhook

Test:

`POST /api/webhook/stripe`

- [ ] Valid Stripe webhook is accepted
- [ ] Signature is verified
- [ ] Correct event is processed
- [ ] Enrollment/payment record is updated
- [ ] Duplicate webhook does not duplicate records

### TC-055 — Invalid Stripe signature

- [ ] Send webhook with invalid signature
- [ ] Request is rejected
- [ ] Database is unchanged

### TC-056 — Unknown Stripe event

- [ ] Send unsupported event
- [ ] API does not crash
- [ ] Event is safely ignored/logged

### TC-057 — Duplicate webhook

- [ ] Send same webhook twice
- [ ] Verify operation is idempotent

---

# 7. Student Dashboard

Routes:

`/dashboard`

`/dashboard/[slug]`

`/dashboard/[slug]/[lessonId]`

### TC-060 — Open dashboard while logged out

- [ ] Access `/dashboard`
- [ ] Request is rejected/redirected

### TC-061 — Open dashboard as logged-in user

- [ ] Login
- [ ] Open `/dashboard`
- [ ] Dashboard loads
- [ ] Enrolled courses appear
- [ ] Non-enrolled courses do not appear

### TC-062 — User with zero enrollments

- [ ] Login with user having no courses
- [ ] Open dashboard
- [ ] Empty state is displayed

### TC-063 — Dashboard course

Open:

`/dashboard/[slug]`

- [ ] Course loads
- [ ] Sidebar loads
- [ ] Chapters appear
- [ ] Lessons appear
- [ ] Correct progress is displayed

### TC-064 — Non-enrolled user accesses course directly

- [ ] Login as user not enrolled
- [ ] Manually navigate to `/dashboard/course-slug`
- [ ] Access is denied

### TC-065 — Invalid dashboard course

- [ ] Open invalid slug
- [ ] Correct not-found/authorization behavior

---

# 8. Course Sidebar

Component:

`CourseSidebar.tsx`

### TC-070

- [ ] All chapters appear
- [ ] All lessons appear
- [ ] Current lesson is highlighted
- [ ] Completed lessons have correct state
- [ ] Incomplete lessons have correct state
- [ ] Clicking lesson navigates correctly

### TC-071 — Large course

- [ ] Course contains many chapters/lessons
- [ ] Sidebar remains usable
- [ ] Scrolling works
- [ ] No layout overflow

---

# 9. Lesson Access

Route:

`/dashboard/[slug]/[lessonId]`

### TC-080 — Valid lesson

- [ ] Open enrolled course
- [ ] Open lesson
- [ ] Lesson content loads
- [ ] Rich text renders correctly
- [ ] Lesson navigation works

### TC-081 — Invalid lesson ID

- [ ] Use nonexistent lesson ID
- [ ] Correct error/not-found behavior

### TC-082 — Lesson from another course

- [ ] Take lesson ID belonging to Course B
- [ ] Put it into Course A URL
- [ ] Verify access is rejected

### TC-083 — Unauthorized lesson access

- [ ] Logout
- [ ] Open lesson URL directly
- [ ] Verify access is rejected

### TC-084 — Non-enrolled lesson access

- [ ] Login as another user
- [ ] Manually open lesson URL
- [ ] Verify access is rejected

---

# 10. Lesson Progress

Relevant:

`use-progress-course.ts`

`/dashboard/[slug]/[lessonId]/action.ts`

### TC-090 — Complete lesson

- [ ] Open lesson
- [ ] Trigger completion/progress action
- [ ] Progress is saved
- [ ] Lesson changes to completed state

### TC-091 — Refresh after completion

- [ ] Complete lesson
- [ ] Refresh page
- [ ] Completion remains

### TC-092 — Navigate away and return

- [ ] Complete lesson
- [ ] Navigate away
- [ ] Return
- [ ] Lesson remains completed

### TC-093 — Complete lessons in sequence

- [ ] Complete lesson 1
- [ ] Complete lesson 2
- [ ] Complete lesson 3
- [ ] Verify course progress increases correctly

### TC-094 — Complete same lesson twice

- [ ] Complete lesson
- [ ] Submit completion again
- [ ] Verify progress is not counted twice

### TC-095 — Course completion

- [ ] Complete every lesson
- [ ] Verify progress reaches 100%
- [ ] Verify course completion state

### TC-096 — Progress boundary

Test:

- [ ] 0%
- [ ] 1%
- [ ] 50%
- [ ] 99%
- [ ] 100%

Verify calculations and UI.

---

# 11. Admin Authorization

Relevant:

`data/admin/required-admin.ts`

`/not-admin`

### TC-100 — Admin accesses `/admin`

- [ ] Login as admin
- [ ] Open `/admin`
- [ ] Admin dashboard loads

### TC-101 — Regular user accesses `/admin`

- [ ] Login as normal user
- [ ] Open `/admin`
- [ ] Access is denied
- [ ] User is redirected to `/not-admin` or appropriate location

### TC-102 — Logged-out user accesses `/admin`

- [ ] Open `/admin`
- [ ] Access is denied/redirected

### TC-103 — Direct admin API/action access

Do not only test UI.

Attempt to call admin actions directly.

- [ ] Create course action
- [ ] Delete course action
- [ ] Update course action
- [ ] Lesson action
- [ ] Position update
- [ ] Delete lesson/chapter

Verify every server action independently checks authorization.

---

# 12. Admin Dashboard

### TC-110

Login as admin:

- [ ] Open `/admin`
- [ ] Dashboard loads
- [ ] Statistics are correct
- [ ] Enrollment information is correct
- [ ] No unauthorized data appears

Test:

`admin-get-dashboard.ts`

`admin-get-enrollments-status.ts`

---

# 13. Admin Course Listing

Route:

`/admin/courses`

### TC-120

- [ ] Courses load
- [ ] Course cards render
- [ ] Edit links work
- [ ] Delete controls work
- [ ] Create course link works

### TC-121 — No courses

- [ ] Delete all test courses
- [ ] Admin course page shows correct empty state

---

# 14. Create Course

Route:

`/admin/courses/create`

### TC-130 — Create valid course

- [ ] Open create page
- [ ] Enter valid title
- [ ] Enter slug
- [ ] Enter description
- [ ] Add required information
- [ ] Submit
- [ ] Course is created
- [ ] Course appears in admin list

### TC-131 — Empty course

- [ ] Create course with minimum allowed data
- [ ] Verify whether creation is allowed

### TC-132 — Missing required fields

- [ ] Leave title empty
- [ ] Submit
- [ ] Validation appears

Repeat for every required field.

### TC-133 — Duplicate slug

- [ ] Create course with existing slug
- [ ] Verify duplicate is rejected

### TC-134 — Special characters

Test title/slug with:

- [ ] Arabic
- [ ] Spaces
- [ ] Hyphens
- [ ] Underscores
- [ ] Symbols
- [ ] Unicode characters

### TC-135 — Very long title

- [ ] Enter extremely long title
- [ ] Verify validation/database/UI behavior

---

# 15. Course Builder

Components:

- `course-builder.tsx`
- `chapter-card.tsx`
- `lesson-row.tsx`
- `use-course-builder.ts`

### TC-140 — Add chapter

- [ ] Open course editor
- [ ] Add chapter
- [ ] Chapter appears
- [ ] Refresh
- [ ] Chapter persists

### TC-141 — Add multiple chapters

- [ ] Add 2+
- [ ] Verify order
- [ ] Verify no duplication

### TC-142 — Add lesson

- [ ] Add lesson to chapter
- [ ] Lesson appears
- [ ] Correct chapter owns lesson

### TC-143 — Multiple lessons

- [ ] Add several lessons
- [ ] Verify ordering
- [ ] Verify each lesson belongs to correct chapter

### TC-144 — Empty chapter

- [ ] Create chapter with no lessons
- [ ] Save
- [ ] Refresh
- [ ] Verify it remains stable

---

# 16. Course Reordering

Action:

`update-course-position.ts`

### TC-150

- [ ] Create multiple courses
- [ ] Change course position
- [ ] Save
- [ ] Refresh
- [ ] Verify order

### TC-151 — Boundary positions

Test:

- [ ] Move first course down
- [ ] Move last course up
- [ ] Move to first
- [ ] Move to last
- [ ] Use invalid position

---

# 17. Edit Course

Route:

`/admin/courses/[courseId]/edit`

### TC-160

- [ ] Open course editor
- [ ] Modify title
- [ ] Modify description
- [ ] Modify slug if supported
- [ ] Save
- [ ] Verify public course reflects changes

### TC-161 — Invalid course ID

- [ ] Open `/admin/courses/invalid/edit`
- [ ] Verify correct error/not-found behavior

### TC-162 — Unauthorized edit

- [ ] Login as normal user
- [ ] Open admin edit URL
- [ ] Verify access denied

---

# 18. Delete Course

Relevant:

- `delete-course.ts`
- `/admin/courses/delete/action.ts`

### TC-170 — Delete course

- [ ] Select course
- [ ] Click delete
- [ ] Confirm
- [ ] Course disappears
- [ ] Public course no longer appears
- [ ] Dashboard access is handled correctly

### TC-171 — Cancel delete

- [ ] Click delete
- [ ] Cancel confirmation
- [ ] Course remains

### TC-172 — Delete course with enrollments

- [ ] Create enrollment
- [ ] Delete course
- [ ] Verify referential integrity
- [ ] Verify enrollment/payment/progress records are handled correctly

### TC-173 — Delete invalid course

- [ ] Send invalid course ID
- [ ] Verify no unrelated course is deleted

---

# 19. Delete Chapter

Component:

`DeleteChapter.tsx`

### TC-180

- [ ] Delete empty chapter
- [ ] Verify deletion

### TC-181

- [ ] Delete chapter containing lessons
- [ ] Verify expected cascade/restriction behavior
- [ ] Verify lessons are not orphaned

### TC-182

- [ ] Cancel deletion
- [ ] Chapter remains

---

# 20. Delete Lesson

Component:

`DeleteLeeson.tsx`

### TC-190

- [ ] Delete lesson
- [ ] Lesson disappears
- [ ] Refresh
- [ ] Lesson remains deleted

### TC-191 — Delete lesson with progress

- [ ] User completes lesson
- [ ] Admin deletes lesson
- [ ] Verify progress record does not break course progress

### TC-192 — Invalid lesson deletion

- [ ] Send invalid lesson ID
- [ ] Verify nothing else is deleted

---

# 21. Lesson Editor

Route:

`/admin/courses/[courseId]/edit/lessons/[lessonId]`

### TC-200 — Open lesson editor

- [ ] Lesson data loads
- [ ] Form fields contain correct values

### TC-201 — Edit lesson title

- [ ] Change title
- [ ] Save
- [ ] Verify dashboard displays new title

### TC-202 — Edit lesson content

- [ ] Modify rich text
- [ ] Save
- [ ] Open student view
- [ ] Verify content

### TC-203 — Empty lesson content

- [ ] Remove content
- [ ] Save
- [ ] Verify expected validation

### TC-204 — Rich text formatting

Test:

- [ ] Bold
- [ ] Italic
- [ ] Headings
- [ ] Lists
- [ ] Links
- [ ] Quotes
- [ ] Code if supported
- [ ] Empty paragraphs
- [ ] Very long content

---

# 22. File Upload / S3

Routes:

`/api/s3/upload`

`/api/s3/delete`

Components:

`Uploader.tsx`

`RenderState.tsx`

### TC-210 — Valid upload

- [ ] Upload supported file
- [ ] Upload succeeds
- [ ] Correct URL/key is returned
- [ ] File can be rendered/accessed

### TC-211 — Invalid file type

Test unsupported:

- [ ] File extension
- [ ] MIME type
- [ ] Executable file
- [ ] Unexpected content type

Expected:

- [ ] Upload rejected

### TC-212 — Large file

- [ ] Upload file near maximum size
- [ ] Upload file above maximum size
- [ ] Verify correct handling

### TC-213 — Upload failure

- [ ] Simulate S3 failure
- [ ] Verify UI displays failure
- [ ] Retry works if implemented

### TC-214 — Delete uploaded file

- [ ] Upload file
- [ ] Delete file
- [ ] Verify object is removed
- [ ] Verify UI updates

### TC-215 — Unauthorized S3 upload

- [ ] Logout
- [ ] Directly call `/api/s3/upload`
- [ ] Verify request is rejected

### TC-216 — Unauthorized S3 delete

- [ ] Attempt deleting another user's/admin resource
- [ ] Verify authorization is enforced

---

# 23. Admin / Student Data Isolation

This is especially important.

### TC-220

Normal user must NOT be able to:

- [ ] Read admin dashboard
- [ ] Read admin course data
- [ ] Create courses
- [ ] Delete courses
- [ ] Edit courses
- [ ] Delete lessons
- [ ] Change course ordering
- [ ] Access another user's enrollment
- [ ] Modify another user's progress
- [ ] Access another user's private data

### TC-221 — ID manipulation

Change URL IDs manually:

```text
/course/123
/course/124
/course/125
```

and:

```text
/dashboard/course-a/lesson-1
/dashboard/course-a/lesson-2
```

Verify authorization is checked server-side and not only by hiding UI controls.

---

# 24. Authentication / Authorization Edge Cases

### TC-230

Test:

- [ ] Expired session
- [ ] Missing session
- [ ] Malformed session
- [ ] Deleted user
- [ ] User whose role changes from admin → user
- [ ] User whose role changes from user → admin
- [ ] Session after logout
- [ ] Two browser sessions
- [ ] Multiple tabs
- [ ] Admin opening student URL
- [ ] Student opening admin URL

---

# 25. Server Action Testing

Every server action should be tested directly, not only through its UI.

Identify all actions:

- [ ] Course creation
- [ ] Course deletion
- [ ] Course update
- [ ] Course position update
- [ ] Chapter creation
- [ ] Chapter deletion
- [ ] Lesson creation
- [ ] Lesson update
- [ ] Lesson deletion
- [ ] Enrollment
- [ ] Progress update
- [ ] Payment-related actions

For every action test:

- [ ] Valid request
- [ ] Missing parameters
- [ ] Invalid parameter
- [ ] Wrong ID
- [ ] Unauthorized user
- [ ] Unauthenticated user
- [ ] Duplicate request
- [ ] Concurrent request
- [ ] Database failure
- [ ] Unexpected exception

---

# 26. API Testing

## `/api/auth/[...all]`

- [ ] Valid authentication request
- [ ] Invalid authentication request
- [ ] Missing fields
- [ ] Invalid OTP
- [ ] Expired OTP
- [ ] Repeated OTP attempts
- [ ] Logout
- [ ] Session retrieval

## `/api/s3/upload`

- [ ] Valid upload
- [ ] Invalid upload
- [ ] Missing file
- [ ] Oversized file
- [ ] Unauthorized request
- [ ] S3 failure

## `/api/s3/delete`

- [ ] Valid deletion
- [ ] Missing key
- [ ] Invalid key
- [ ] Unauthorized deletion
- [ ] Delete nonexistent object

## `/api/webhook/stripe`

- [ ] Valid signature
- [ ] Invalid signature
- [ ] Missing signature
- [ ] Valid event
- [ ] Unknown event
- [ ] Duplicate event
- [ ] Malformed payload
- [ ] Database failure

---

# 27. Error Handling

Force failures wherever possible.

### TC-250

Test:

- [ ] Database unavailable
- [ ] Database query returns null
- [ ] Database query throws
- [ ] S3 unavailable
- [ ] Stripe unavailable
- [ ] Authentication provider unavailable
- [ ] Invalid URL parameter
- [ ] Invalid UUID/ID
- [ ] Missing required object
- [ ] Network timeout

Verify:

- [ ] User sees a useful error
- [ ] No stack trace is exposed
- [ ] No secret/environment variable is exposed
- [ ] Application does not enter a broken state

---

# 28. Loading States

Relevant files include:

`loading.tsx`

`CourseContentSkeleton.tsx`

Test:

- [ ] Slow course request
- [ ] Slow lesson request
- [ ] Slow dashboard request
- [ ] Slow admin request
- [ ] Slow upload

Verify:

- [ ] Skeleton appears
- [ ] No layout jumping where possible
- [ ] Loading state disappears after completion
- [ ] Error state works after failed request

---

# 29. UI / Responsive Testing

Test at:

- [ ] Mobile ~320px
- [ ] Mobile ~375px
- [ ] Mobile ~430px
- [ ] Tablet ~768px
- [ ] Laptop ~1024px
- [ ] Desktop ~1440px
- [ ] Large desktop ~1920px

Check:

- [ ] Navbar
- [ ] Admin sidebar
- [ ] Dashboard sidebar
- [ ] Course builder
- [ ] Course cards
- [ ] Lesson editor
- [ ] Rich text editor
- [ ] Dialogs
- [ ] File uploader
- [ ] Tables
- [ ] Forms

---

# 30. Browser / Session Testing

Test using:

- [ ] Chrome
- [ ] Firefox
- [ ] Safari if available
- [ ] Mobile browser

Test:

- [ ] Refresh during login
- [ ] Refresh during checkout
- [ ] Refresh during course editing
- [ ] Refresh during lesson editing
- [ ] Open two tabs
- [ ] Logout from one tab
- [ ] Continue using another tab
- [ ] Back button after logout
- [ ] Back button after payment

---

# 31. Security Testing

### TC-300 — XSS

Try HTML/script content in:

- [ ] Course title
- [ ] Course description
- [ ] Chapter title
- [ ] Lesson title
- [ ] Lesson rich text
- [ ] User-controlled fields

Verify scripts cannot execute unexpectedly.

### TC-301 — IDOR

Try changing:

- [ ] Course IDs
- [ ] Lesson IDs
- [ ] User IDs
- [ ] Enrollment IDs
- [ ] S3 object keys

Verify authorization.

### TC-302 — CSRF / forged requests

- [ ] Attempt requests without expected authentication context
- [ ] Verify protected mutations are rejected

### TC-303 — Privilege escalation

- [ ] Normal user attempts admin action
- [ ] Modify request payload to claim admin
- [ ] Verify server ignores client-provided role

### TC-304 — Sensitive information

Check responses/logs for:

- [ ] Database credentials
- [ ] Stripe secret
- [ ] S3 credentials
- [ ] Auth secrets
- [ ] Internal stack traces
- [ ] Other users' private information

---

# 32. Complete Happy-Path E2E Test

Run this entire workflow from beginning to end:

### Student

- [ ] Open homepage
- [ ] Open courses
- [ ] Open course
- [ ] Register/login
- [ ] Verify OTP
- [ ] Enroll
- [ ] Complete payment if required
- [ ] Open dashboard
- [ ] Open course
- [ ] Open lesson 1
- [ ] Complete lesson 1
- [ ] Open lesson 2
- [ ] Complete lesson 2
- [ ] Continue through all lessons
- [ ] Reach 100%
- [ ] Refresh
- [ ] Verify progress remains 100%
- [ ] Logout

### Admin

- [ ] Login as admin
- [ ] Open admin dashboard
- [ ] Create course
- [ ] Add chapters
- [ ] Add lessons
- [ ] Edit lesson content
- [ ] Upload required files
- [ ] Reorder course
- [ ] Publish/configure course
- [ ] Open public course
- [ ] Verify changes are visible
- [ ] Delete test lesson
- [ ] Delete test chapter
- [ ] Delete test course

---

# 33. Complete Negative E2E Test

Run the opposite workflow:

- [ ] Logged-out user opens dashboard
- [ ] Logged-out user opens lesson
- [ ] Normal user opens admin
- [ ] Normal user creates course
- [ ] Normal user deletes course
- [ ] Normal user edits course
- [ ] Normal user deletes lesson
- [ ] User accesses another user's course
- [ ] User accesses another course's lesson
- [ ] User changes course ID
- [ ] User changes lesson ID
- [ ] Invalid payment webhook
- [ ] Invalid S3 request
- [ ] Invalid course ID
- [ ] Invalid lesson ID
- [ ] Duplicate enrollment
- [ ] Duplicate progress submission

Every one should fail safely.

---

# 34. Data Integrity Tests

After every mutation verify the database.

### Course

- [ ] Course created once
- [ ] Correct slug
- [ ] Correct position
- [ ] Correct chapters

### Chapter

- [ ] Correct course relationship
- [ ] Correct position
- [ ] Correct lessons

### Lesson

- [ ] Correct chapter
- [ ] Correct position
- [ ] Correct content

### Enrollment

- [ ] Correct user
- [ ] Correct course
- [ ] No duplicates
- [ ] Correct payment state

### Progress

- [ ] Correct user
- [ ] Correct lesson
- [ ] No duplicate completion
- [ ] Correct course percentage

---

# 35. Regression Test Suite

After fixing any bug, add a regression test for it.

At minimum, every deployment should automatically verify:

- [ ] Login
- [ ] OTP
- [ ] Logout
- [ ] Course listing
- [ ] Course details
- [ ] Enrollment
- [ ] Dashboard
- [ ] Lesson access
- [ ] Lesson completion
- [ ] Admin authorization
- [ ] Course creation
- [ ] Course editing
- [ ] Lesson creation/editing
- [ ] Course deletion
- [ ] Lesson deletion
- [ ] S3 upload
- [ ] S3 delete
- [ ] Stripe webhook
- [ ] Payment success
- [ ] Payment cancellation

---

# 37. Priority

Run the tests in this order.

## P0 — Must Pass

- [ ] Login
- [ ] OTP
- [ ] Logout
- [ ] Admin authorization
- [ ] Course creation
- [ ] Course editing
- [ ] Course deletion
- [ ] Enrollment
- [ ] Payment
- [ ] Dashboard
- [ ] Lesson access
- [ ] Progress
- [ ] Stripe webhook
- [ ] IDOR/authorization protection

## P1 — Important

- [ ] Lesson CRUD
- [ ] Chapter CRUD
- [ ] Course ordering
- [ ] S3 upload/delete
- [ ] Invalid IDs
- [ ] Duplicate operations
- [ ] Error states
- [ ] Loading states

## P2 — Quality

- [ ] Responsive UI
- [ ] Browser compatibility
- [ ] Accessibility
- [ ] Rich-text edge cases
- [ ] Large data sets
- [ ] Slow network behavior
- [ ] Concurrent sessions

# Final Acceptance Criteria

The application should not be considered fully tested until:

- [ ] A new user can authenticate successfully.
- [ ] An authenticated user can enroll in a course.
- [ ] Payment succeeds/fails/cancels correctly.
- [ ] Stripe webhook processing is secure and idempotent.
- [ ] An enrolled user can access only their enrolled courses.
- [ ] A user can complete lessons and retain progress after refresh/login.
- [ ] Course completion reaches the correct percentage.
- [ ] An admin can create, edit, reorder, and delete courses.
- [ ] An admin can create, edit, reorder, and delete chapters/lessons.
- [ ] Non-admin users cannot perform admin operations even by calling server actions directly.
- [ ] Users cannot access another user's course/lesson/progress by manipulating IDs.
- [ ] S3 upload/delete is authenticated and authorized.
- [ ] Invalid input does not crash the application.
- [ ] Database/API failures produce controlled errors.
- [ ] No secrets or sensitive data are exposed.
- [ ] Public, student, and admin data are correctly isolated.
- [ ] The complete student → payment → enrollment → learning → completion workflow passes.
- [ ] The complete admin → create course → publish → student enrollment → learning workflow passes.
