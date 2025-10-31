# E2E Test Plan

## Scenario ID: E2E-001
**Title:** User login and dashboard access
**Steps:**
1) Open signin page (/signin)
2) Fill username and password fields
3) Click submit button
4) Verify navigation to dashboard (/, /organizers-dashboard, or /admin-dashboard)
5) Verify user is no longer on signin page
**Expected:** User successfully logs in and redirects to appropriate dashboard

## Scenario ID: E2E-002
**Title:** User login failed
**Steps:**
1) Open signin page (/signin)
2) Fill incorrect username and password
3) Click submit button
4) Verify page stays on signin (/signin)
5) Check red error text appears with invalid/incorrect message
**Expected:** Login fails, shows red error text, stays on signin page

## Scenario ID: E2E-003
**Title:** User registration success
**Steps:**
1) Open register page (/register)
2) Fill full name, email, and password fields
3) Click submit button
4) Verify navigation to signin page (/signin)
**Expected:** User account created successfully and redirects to signin

## Scenario ID: E2E-004
**Title:** User registration failed - missing fields
**Steps:**
1) Open register page (/register)
2) Leave full name field empty
3) Fill email and password
4) Click submit button
5) Verify page stays on register (/register)
6) Check red error text appears about required fields
**Expected:** Registration fails with validation error for missing required fields

## Scenario ID: E2E-005
**Title:** User registration failed - duplicate email
**Steps:**
1) Open register page (/register)
2) Fill full name, existing email, and password
3) Click submit button
4) Verify page stays on register (/register)
5) Check red error text appears about duplicate/existing email
**Expected:** Registration fails with backend error for duplicate email

## Test Configuration
- **Browsers:** Chrome, Firefox (parallel execution)
- **Base URL:** http://localhost:3000
- **Unique Data:** Each test uses project name + timestamp for unique emails/usernames
- **Error Handling:** Tests check for red error text (p.text-red-500) instead of alerts