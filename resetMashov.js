const puppeteer = require('puppeteer');

const teacherId = '324215474'; // Teacher ID received from bot
const schoolName = 'אולפנת להב'; // School name to select

(async () => {
  try {
    // Step 1: Launch browser and open login page
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    console.log('🔹 Navigating to login page...');
    await page.goto('https://web.mashov.info/teachers/login');

    // Step 2: Select school from autocomplete dropdown
    try {
      console.log('🔹 Selecting school...');
      await page.click('#schoolSelector');
      await page.waitForSelector('mat-option');
      await page.click('#schoolSelector');
      await page.waitForSelector('mat-option');
      await page.type('#schoolSelector', schoolName);
      await page.waitForSelector('mat-option');
      await page.click('mat-option');
      console.log('✅ School selected');
    } catch (err) {
      console.error('❌ Failed to select school:', err.message);
      return;
    }

    // Step 3: Fill in login credentials
    try {
      console.log('🔹 Typing credentials...');
      await page.type('#usernameInput', 'batel22');
      await page.type('#passwordInput', 'botel22m1');
      await page.click('#submitButton');
      console.log('✅ Login submitted');
    } catch (err) {
      console.error('❌ Failed to submit login:', err.message);
      return;
    }

    // Step 4: Navigate to admin page
    try {
      console.log('🔹 Navigating to admin page...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      await page.goto('https://web.mashov.info/teachers/main/admin/schoolSettings/userCredentials');
      console.log('✅ Admin page loaded');
    } catch (err) {
      console.error('❌ Failed to load admin page:', err.message);
      return;
    }

    // Step 5: Select teacher by ID
    try {
      console.log('🔹 Selecting teacher...');
      await page.waitForSelector('input[aria-label="בחירת מורה"]');
      await page.type('input[aria-label="בחירת מורה"]', teacherId);
      await page.waitForSelector('mat-option');
      await page.click('mat-option');
      console.log('✅ Teacher selected');
    } catch (err) {
      console.error('❌ Failed to select teacher:', err.message);
      return;
    }

    // Step 6: Click "Reset Username" button
    try {
      console.log('🔹 Clicking reset button...');
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const target = buttons.find(btn => btn.textContent.includes('איפוס שם משתמש'));
        if (target) target.click();
      });
      console.log('✅ Reset button clicked');
    } catch (err) {
      console.error('❌ Failed to click reset button:', err.message);
      return;
    }

    // Step 7: Confirm reset in dialog
    try {
      console.log('🔹 Waiting for confirmation dialog...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      await page.waitForSelector('mat-dialog-actions');

      await page.evaluate(() => {
        const dialog = document.querySelector('mat-dialog-actions');
        if (!dialog) return;
        const buttons = Array.from(dialog.querySelectorAll('button'));
        const confirmButton = buttons.find(btn => btn.textContent.includes('אישור'));
        if (confirmButton) confirmButton.click();
      });

      console.log('✅ Username reset confirmed');
    } catch (err) {
      console.error('❌ Failed to confirm reset:', err.message);
      return;
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
})();