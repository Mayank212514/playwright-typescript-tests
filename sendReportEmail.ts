import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

async function countTestResults(allureResultsPath: string) {
  const files = fs.readdirSync(allureResultsPath);
  let passed = 0, failed = 0, flaky = 0, skipped = 0;

  for (const file of files) {
    if (file.endsWith('-result.json')) {
      const data = JSON.parse(fs.readFileSync(path.join(allureResultsPath, file), 'utf-8'));
      const status = data.status;
      if (status === 'passed') passed++;
      else if (status === 'failed') failed++;
      else if (status === 'flaky') flaky++;
      else if (status === 'skipped') skipped++;
    }
  }

  return { passed, failed, flaky, skipped };
}

async function sendEmail() {
  const reportPath = path.join(__dirname, 'allure-report');
  const resultsPath = path.join(__dirname, 'allure-results');
  const zipPath = path.join(__dirname, 'allure-report.zip');

  // Count test results
  const { passed, failed, flaky, skipped } = await countTestResults(resultsPath);

  // Zip the report folder
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.pipe(output);
  archive.directory(reportPath, false);
  await archive.finalize();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password',
    },
  });

  const subject = `Playwright - Allure Test Report`;
  const body = `
    <p><strong>Playwright Allure Report Summary:</strong></p>
    <ul>
      <li>✅ Passed: ${passed}</li>
      <li>❌ Failed: ${failed}</li>
      <li>💥 Flaky: ${flaky}</li>
      <li>⏭️ Skipped: ${skipped}</li>
    </ul>
    <p>📎 Attached is the full HTML report as a ZIP file.</p>
  `;

  const info = await transporter.sendMail({
    from: '"QA Bot" <your-email@gmail.com>',
    to: 'recipient@example.com',
    subject,
    html: body,
    attachments: [
      {
        filename: 'allure-report.zip',
        path: zipPath,
      },
    ],
  });

  console.log('📧 Email sent:', info.messageId);
}

sendEmail().catch(console.error);
