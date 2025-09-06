const puppeteer = require('puppeteer');
const teacherId = '324215474'; // תעודת זהות שהתקבלה מהבוט
(async () => {
  const browser = await puppeteer.launch({ headless: false }); // הדפדפן ייפתח בפועל
  const page = await browser.newPage();

  await page.goto('https://web.mashov.info/teachers/login'); // החלף לכתובת האתר שלך

// לחיצה על השדה כדי לפתוח את הרשימה
await page.click('#schoolSelector');

// המתנה שהאפשרויות יופיעו
await page.waitForSelector('mat-option');

// לחיצה על השדה כדי לפתוח את הרשימה
await page.click('#schoolSelector');

// המתנה שהאפשרויות יופיעו
await page.waitForSelector('mat-option');
await page.type('#schoolSelector', 'אולפנת להב');
await page.waitForSelector('mat-option'); // מוודא שהתוצאה נטענה
await page.click('mat-option'); // לוחץ על האפשרות הראשונה

await page.type('#usernameInput', 'batel22');
await page.type('#passwordInput', 'botel22m1'); // אם זה קוד קבוע או ידוע מראש

await page.click('#submitButton');
  console.log('הגענו לאתר!');


// await page.waitForTimeout(2000); // המתנה של שנייה אחת
await new Promise(resolve => setTimeout(resolve, 2000));
  // ניווט לעמוד הגדרות סיסמאות
await page.goto('https://web.mashov.info/teachers/main/admin/schoolSettings/userCredentials');

//המתנה ששדה יופיע
await page.waitForSelector('input[aria-label="בחירת מורה"]');
// הקלדת תעודת זהות לשדה בחירת מורה
await page.type('input[aria-label="בחירת מורה"]', teacherId);
// המתנה שהאפשרויות יופיעו
await page.waitForSelector('mat-option');

// לחיצה על האפשרות הראשונה (בהנחה שיש רק אחת)
await page.click('mat-option');

await page.evaluate(() => {
  const buttons = Array.from(document.querySelectorAll('button'));
  const target = buttons.find(btn => btn.textContent.includes('איפוס שם משתמש'));
  if (target) {
    target.click();
  }
});
await new Promise(resolve => setTimeout(resolve, 2000));
  console.log('2000 over');

await page.waitForSelector('mat-dialog-actions');

await page.evaluate(() => {
  const dialog = document.querySelector('mat-dialog-actions');
  if (!dialog) return;

  const buttons = Array.from(dialog.querySelectorAll('button'));
  const confirmButton = buttons.find(btn => btn.textContent.includes('אישור'));
  if (confirmButton) {
    confirmButton.click();
  }
});

})();