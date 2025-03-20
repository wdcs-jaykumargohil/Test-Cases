# 🚀 Test Cases Repository

Welcome to the **Test Cases Repository**! This repository contains detailed documentation and scripts for **automated testing** using Playwright and E2E (End-to-End) testing.

---

## 📂 Available Test Case Files

### 1️⃣ **Playwright Test Cases**

📄 **[`playwright-test-cases.md`](./playwright-test-cases.md)**  
Contains test cases written using **Playwright** for UI automation and functional testing.

### 2️⃣ **E2E Test Cases**

📄 **[`e2e-test-cases.md`](./e2e-test-cases.md)**  
Includes **End-to-End (E2E) test scenarios** to ensure complete workflow testing.

---

## 🚀 How to Run Tests?

### **Playwright Tests**

Run the following command to execute Playwright test cases:

```sh
npx playwright test
```

To run tests sequentially (one by one):

```sh
npx playwright test --workers=1
```

To debug test cases:

```sh
npx playwright test --debug
```

### **E2E Tests**

For running E2E test cases, follow the steps in `e2e-test-cases.md`.

```sh
yarn run test:e2e
```

or

```sh
npm run test:e2e
```

---

## 📌 Project Structure

```bash
📦 project-root
 ┣ 📂 test/                # Test files directory
 ┃ ┣ 📜 suprascan.playwright.e2e-spec.ts   # Sample Playwright test
 ┃ ┣ 📜 rest-api.functional.e2e-spec.ts   # Sample Rest API test
 ┣ 📜 playwright-test-cases.md  # Playwright test documentation
 ┣ 📜 e2e-test-cases.md         # E2E test documentation
 ┣ 📜 playwright.config.ts      # Playwright configuration file
 ┣ 📜 package.json              # Project dependencies & scripts
 ┗ 📜 README.md                 # This file
```

---

## 📌 Project Structure

✔️ Write clear and maintainable test cases.

✔️ Use meaningful assertions to validate results.

✔️ Implement error handling and screenshots for debugging.

✔️ Run tests in headless mode for faster execution.

✔️ Keep tests independent to avoid failures affecting others.

---

### 🔹 **Why is this a good README?**

- **Clear structure** with sections for quick navigation.
- **Easy-to-follow commands** for running tests.
- **Project structure visualization** for better understanding.
- **Best practices section** for maintaining high-quality tests.
