# חברותא — PWA prototype

Responsive Hebrew RTL installable web app prototype.

## Live URL
https://efi770.github.io/chavruta/

## Current capabilities
- Hebrew RTL responsive interface
- Local sample requests and filtering
- Create and delete demo requests
- Export local requests as JSON
- PWA manifest and service worker for home-screen use and offline shell

## Important limitation
This is a front-end prototype only. Requests are stored in the current browser localStorage and are not shared between users or devices. There is no real account registration, email verification, shared database, or secure mutual-consent flow. Do not enter sensitive information and do not use this as a public matching service until a backend with authentication, authorization/RLS, moderation, and privacy controls is implemented and tested.

## Add to iPhone Home Screen
1. Open the live HTTPS URL in Safari.
2. Tap Share.
3. Choose Add to Home Screen.
4. Confirm Add.

## Production backend next steps
1. Create a Supabase project.
2. Add SQL migrations and RLS policies for profiles, study requests, matches, partnerships, blocks, and reports.
3. Connect Supabase Auth and require verified email for account actions.
4. Enforce mutual consent and contact visibility in database policies/server-side logic.
5. Test access with two separate accounts before public launch.

## Hosting
This project lives in a subdirectory of the existing EFI770.github.io repository. Existing root files are not overwritten by this addition.