/**
 * ServiceScopeHQ - Google Apps Script Webhook Backend
 *
 * Paste this code into your Google Apps Script editor connected to your Google Sheet:
 * 1. Open your Google Sheet -> Extensions -> Apps Script
 * 2. Replace the code in Code.gs with this implementation
 * 3. Click Deploy -> New Deployment -> Select type: Web app
 * 4. Execute as: Me
 * 5. Who has access: Anyone
 * 6. Deploy and copy the Web App URL into Netlify environment variables (GOOGLE_SHEET_WEBHOOK_URL)
 */

function doGet(e) {
  // Handle GET requests & redirects gracefully
  var output = {
    result: 'success',
    message: 'ServiceScopeHQ Webhook endpoint is active and listening.'
  };
  
  if (e && e.parameter && e.parameter.email) {
    recordSubmission(e.parameter);
  }

  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    if (!data.email) {
      return ContentService.createTextOutput(JSON.stringify({
        result: 'error',
        error: 'Email parameter missing'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    recordSubmission(data);

    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Submission successfully logged to spreadsheet.'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function recordSubmission(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Ensure headers exist on Row 1
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Company Name',
      'Email',
      'Niche / Service',
      'City',
      'ZIP',
      'Status',
      'Phone',
      'Budget',
      'Timeline',
      'Certifications'
    ]);
  }

  var timestamp = new Date();
  var companyName = data.companyName || data.name || '';
  var email = data.email || '';
  var niche = data.niche || '';
  var city = data.city || data.City || '';
  var zip = data.zip || data.ZIP || data.zipcode || '';
  var status = data.status || 'FREE ADD';
  var phone = data.phone || '';
  var budget = data.budget || '';
  var timeline = data.timeline || '';
  var certs = data.certs || '';

  sheet.appendRow([
    timestamp,
    companyName,
    email,
    niche,
    city,
    zip,
    status,
    phone,
    budget,
    timeline,
    certs
  ]);
}
