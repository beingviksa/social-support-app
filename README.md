# 🌐 Social Supprot Assistance Portal

A responsive multi-step social support application built with React for government benefit programs. The form supports English & Arabic (RTL) with accessibility features and integrates **OpenAI GPT API** to help users write their hardship descriptions.

🔗 **Live Demo:** [https://social-support-app.netlify.app](https://social-support-app.netlify.app)

---

## 🚀 Features

- 🌍 Language switcher with RTL (Arabic) and LTR (English) support
- 🧾 Multi-step form wizard with progress bar
- 📞 International phone input with validation
- 📅 Date of Birth picker using dropdowns
- 🧠 Smart input validations using `react-hook-form`
- 💾 Auto-saves progress locally using `localStorage`
- 🤖 **"Help Me Write" button (Step 3)** — uses **OpenAI GPT API** to suggest hardship descriptions with editable suggestions
- 📤 Submits form data via mock API call
- 📱 Fully responsive and mobile-optimized
- 🎨 Styled using Tailwind CSS
- ♿ Accessibility-friendly (keyboard navigation, ARIA labels)

---

## 🛠 Tech Stack

- React
- React Router DOM
- Tailwind CSS
- React Hook Form
- React-i18next
- react-phone-input-2
- Axios
- OpenAI GPT API (gpt-4o-mini)

---

## 🧪 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/beingviksa/social-support-app
cd social-support-app

# 2. Install dependencies
npm install

# 3. Add your OpenAI API Key
touch .env
```

Create a `.env` file and add:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

> You can get your API key from: https://platform.openai.com/account/api-keys

```bash
# 4. Run the development server
npm run dev

# 5. Build for production
npm run build
```

---

## 🧪 Test Credentials (Mock Data)

To proceed past **Step 1** of the form, use any of the following **valid National ID and OTP combinations**:

| National ID    | OTP    |
| -------------- | ------ |
| 1111-2222-3333 | 123456 |
| 4444-5555-6666 | 456789 |
| 7777-8888-9999 | 654321 |

> ⚠️ These credentials are part of mock data and used only for testing/demo purposes.

---

## 🤖 GPT Integration (Step 3)

In Step 3, users must describe:

1. Current Financial Situation
2. Employment Circumstances
3. Reason for Applying

Each textarea includes a **"Help Me Write"** button:

- Sends a prompt to OpenAI's `gpt-4o-mini` model
- Shows suggestions in a modal
- Users can **Accept**, **Edit**, or **Discard** the suggestion
- Handles loading & error states (e.g. network issues, API timeouts)

---

## 📁 Save Progress

User inputs are saved in **localStorage** and restored automatically if the page reloads or the user comes back later.

---

## 🙋‍♂️ Author

**Vikram Singh Rajpurohit**  
Senior Software Engineer  
[LinkedIn](https://linkedin.com/in/beingviksa) • [GitHub](https://github.com/beingviksa)

---

## 🪪 License

This project is licensed under the MIT License.
