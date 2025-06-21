**📖 About This Project**

This project is a comprehensive UI test automation framework built using Playwright and TypeScript, designed to validate the core user flows of SauceDemo — a demo e-commerce platform. It demonstrates best practices in test structure, modular design using the Page Object Model (POM), and integrates advanced features like Allure reporting, negative and positive test coverage, and CI/CD compatibility. The goal of this framework is to provide a solid foundation for scalable, maintainable, and readable UI automation that mirrors real-world testing strategies followed by modern QA teams. This project serves as a practical example for exploring Playwright, building a proof-of-concept, or evaluating tools for enterprise testing


🚀 **Playwright Automation Framework:**

    A robust end-to-end UI test automation framework built using Playwright + TypeScript, targeting saucedemo.com. This project follows best practices like Page Object Model, modular test structure, and rich reporting with Allure.

**Features:**

**TypeScript Support** ✅

    Strongly typed and modern code using TypeScript for better readability and developer tooling.

**Page Object Model (POM)** ✅

    Reusable and maintainable components for every page (LoginPage, InventoryPage, CartPage, CheckoutPage, etc.).

**Positive & Negative Test Coverage** ✅

  Includes tests for:

    Valid login & checkout

    Invalid login (e.g., wrong credentials, locked user)

    Product sort validation

    Product details validation

    Cart functionality (add/remove)

    Complete order flow

**Allure Reporting Integration** ✅

**Visual test reports with status, steps, screenshots, and logs** ✅

**Automatically captures screenshots on failure** ✅

**CI/CD Ready** ✅

    Easily integratable with GitHub Actions, GitLab CI, etc., for scheduled test execution and report publishing.

**GitHub Integration** ✅

    Fully version-controlled via Git, with support for both public and private repositories. Can be used in open-source demos or private automation pipelines.

**🛠 Tech Stack**

        Playwright Test Runner
        TypeScript
        Allure Reporter
        Nodemailer for emailing reports

**How to Run the Tests**

    Type "npx playwright test" in the terminal or "npm run test:allure" to run the test and generate the report
    All tests will start executing with 4 workers, which means 4 tests will execute in parallel.
    To open the report:  Type "npm run allure:open" in the terminal
    Reports will open in the browser
    To receive the reports in the email, make the changes in the "sendReportEmail.ts" file
    
