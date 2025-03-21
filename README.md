# 🚀 Test Cases Repository

Welcome to the **Test Cases Repository**! This repository contains detailed documentation and scripts for **automated testing** using Playwright and E2E (End-to-End) testing.

---

## 📂 Available Test Case Files

### 1️⃣ **JEST Test Cases (Default)** (**[`jest-test-cases.md`](./jest-test-cases.md)**)

Use for **unit tests** and **component-level logic testing**. Ideal for testing individual functions, services, or modules in isolation.

### 2️⃣ **E2E Test Cases** (**[`e2e-test-cases.md`](./e2e-test-cases.md))**

Use for **full workflow validation** from start to end. Ideal when you want to test how different parts of the system interact together.

### 3️⃣ **Playwright Test Cases** (**[`playwright-test-cases.md`](./playwright-test-cases.md)**)

Use for **UI automation and functional testing** in a real browser environment. Best for validating user interactions and front-end behavior.

---

## 📌 Project Structure

```bash
📦 project-root
 ┣ 📂 test/                                 # Test files directory
 ┃ ┣ 📜 rest-api.functional.e2e-spec.ts     # Sample E2E API Flow test
 ┃ ┣ 📜 rest-api.functional.spec.ts         # Sample JEST test
 ┃ ┣ 📜 rest-api.mock.spec.ts               # Sample JEST test
 ┃ ┣ 📜 suprascan.playwright.e2e-spec.ts    # Sample Frontend Flow test
 ┣ 📜 playwright.config.ts                  # Playwright configuration file
 ┣ 📜 jest-e2e.json                         # E2E configuration file
 ┗ 📜 package.json                          # Project dependencies & scripts
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

<!-- ## 📹 Demo Video

Click the link below to watch the demo:

[🎥 Watch Demo Video](./demo-video.mp4) -->
