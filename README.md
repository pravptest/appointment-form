# Lumora Dental Clinic Appointment Booking Portal

A production-ready, highly aesthetic, responsive, and accessible appointment booking application built with **Next.js 15**, **TypeScript**, **Tailwind CSS (v4)**, **React Hook Form**, and **Zod validation**.

---

## 🚀 Features

- **Premium Dental Clinic UI**: Elegant hero landing page and styling inspired by top-tier modern clinic portals.
- **RHF + Zod Integration**: Low-latency validation checks on user input with robust inline error feedback.
- **Strict Indian Phone Validation**: Filters and formats Indian mobile numbers starting with valid prefixes and routing numbers (`6, 7, 8, 9`).
- **Dynamic Date Restrictions**: Custom validation logic + HTML5 restrictions preventing selection of past dates.
- **Micro-Animations**: Smooth visual transitions for field focus, loading spinners, and successful submission cards.
- **Accessibility Compliant**: Clear semantic structure, unique focus states, ARIA validation states (`aria-invalid`), and label mappings.
- **Make.com Webhook Ready**: Built-in payload parser routing details straight to an automated webhook integration.

---

## 🛠️ Complete Setup Instructions

### 1. Prerequisite
Ensure you have **Node.js 18.x or above** (v20.x recommended) installed.

### 2. Installation
Clone or navigate to the directory and install all dependencies:
```bash
npm install
```

### 3. Environment Configuration
Duplicate the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```
Open `.env.local` and replace the placeholder URL with your real Make Webhook URL:
```env
NEXT_PUBLIC_MAKE_WEBHOOK_URL="https://hook.eu1.make.com/your_webhook_id"
```

### 4. Running the Development Server
Start the Turbopack Next.js hot-reloaded local environment:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to test.

### 5. Production Compilation
Verify there are no TypeScript or compilation errors by compiling the production build:
```bash
npm run build
```

---

## 🔗 Example Make.com Webhook Configuration

Follow these steps to link this form to Make.com:

1. **Log in to Make.com** and click **Create a new scenario**.
2. **Add a Webhook**:
   - Add a module and search for **Webhooks**.
   - Select **Custom Webhook** as the trigger.
   - Click **Add** to create a new webhook, give it a name, and click **Save**.
3. **Configure Trigger**:
   - **Copy the Webhook URL** (e.g. `https://hook.eu1.make.com/tdmlinsxmoodprjbjrw8o5oy295b1dst`).
4. **Link to Code**:
   - Open your project `.env.local` file and paste the copied URL into the `NEXT_PUBLIC_MAKE_WEBHOOK_URL` field.
   - Restart the dev server (`npm run dev`).
5. **Test Webhook**:
   - Click **Redetermine data structure** or **Run once** in Make.
   - Fill out the form in your browser and submit it.
   - You should see the successfully caught request in Make.com.

### Submitted Payload Schema:
```json
{
  "fullName": "Rahul Sharma",
  "phone": "+919876543210",
  "service": "Root Canal Treatment",
  "preferredDate": "2026-06-25",
  "preferredTime": "Morning (9AM–12PM)",
  "submittedAt": "2026-06-18T18:32:00.000Z"
}
```

---

## 📊 Example Google Sheets Column Mapping

After capturing the webhook trigger, add an action step to append the row to a Google Sheet.

### Step 1: Create a Google Sheet
Create a new spreadsheet with the following header names in **Row 1**:

| Column A | Column B | Column C | Column D | Column E | Column F |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Submission Timestamp** | **Patient Full Name** | **Contact Number** | **Requested Service** | **Appointment Date** | **Preferred Time Slot** |

### Step 2: Configure Make.com Action
- **App**: `Google Sheets`
- **Event/Action**: `Add a Row`
- Choose your Google Account and select the spreadsheet you created in Step 1.
- Set up the **Action Data Fields** by mapping Make Webhook keys to Google Sheet Columns:

| Google Sheet Column | Map to Make Webhook Field | Sample Value |
| :--- | :--- | :--- |
| **Submission Timestamp** | `submittedAt` | `2026-06-18T18:32:00.000Z` |
| **Patient Full Name** | `fullName` | `Rahul Sharma` |
| **Contact Number** | `phone` | `9876543210` |
| **Requested Service** | `service` | `Root Canal Treatment` |
| **Appointment Date** | `preferredDate` | `2026-06-25` |
| **Preferred Time Slot** | `preferredTime` | `Morning (9AM–12PM)` |

- Run the scenario once to test the insertion. Save the scenario and turn it **ON**, and you are live!
