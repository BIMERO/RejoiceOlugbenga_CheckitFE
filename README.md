SpaceX Capsules Dashboard

This project is a SpaceX Landing page, providing a streamlined way to view, search, and edit information about SpaceX capsules.

The landing page is built using Next.js and PrimeReact for a responsive, user-friendly interface.

Users can browse capsule data, search/filter by key capsule attributes, create new capsules, and manage capsule entries directly on the landing page.

Features:

1. Capsule List
   Displays a paginated table with all SpaceX capsules, allowing users to easily navigate and review capsule details. The table provides:

Pagination: View capsules 5 entries per page.
Dynamic Data: Capsule data updates automatically when new entries are added or existing ones are edited.

2. Search and Filter Capsules
   Users can filter capsule data based on specific attributes:
   Status: Search capsules by their status.
   Original Launch Date: Search capsules by launch date.
   Type: Filter capsules by type (e.g., "Dragon 1.0").
   Formik Integration: A Formik-powered search form manages inputs and updates the displayed list without a page reload.

3. Add New Capsules
   Form Submission: Users can add new capsule entries by filling out a form. New entries are added to the app’s state and appear immediately in the capsule list.
   Local State Management: Newly added capsules are stored locally.

4. Edit Existing Capsules
   Edit Modal: Each capsule entry has an edit option that opens a modal with prefilled form fields.
   Data Validation: Form fields are validated using Yup to ensure data integrity (e.g., required fields, correct date formats).
   Dynamic Updates: The capsule list updates automatically when edited entries are saved.

5. Responsive Design
   The app is fully responsive, optimized for both desktop and mobile devices.

Tech Stack
Next.js: For building Landing Page and server-side rendering.
PrimeReact: For building table.
Formik & Yup: For managing form state and validation.
TypeScript: Ensures type safety across components.
Redux/redux-toolkit: For state management.
Moment.js: Handles date formatting and parsing for capsule data.
