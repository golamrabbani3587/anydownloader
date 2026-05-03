/**
 * Download redirect API
 *
 * Uses standard Google Drive preview links because Google Drive
 * now requires dynamic confirmation tokens to bypass the antivirus
 * warning on files larger than 100MB or executables.
 */
const URLS = {
  "mac-arm64":   "https://drive.google.com/file/d/1wExpCwwrCrQJDC6OBs2v3zIVeOa1aufC/view",
  "mac-x64":     "https://drive.google.com/file/d/1EnyIDx-kGwy_jbK-Ehd0Yc6k9x9h_abm/view",
  "windows":     "https://drive.google.com/file/d/1ffawXlhHAelPBEwQNo0amn6GAMe1pQME/view",
  "linux-x64":   "https://drive.google.com/file/d/1HnkhP_EgWhFvn0GtyvOcHagp8EavxzuU/view",
  "linux-arm64": "https://drive.google.com/file/d/1CPVK-pcAY3A6_LDMrsRzhxYHTExg2HdT/view",
};

export default function handler(req, res) {
  const os = req.query.os || "windows";
  const url = URLS[os] || URLS["windows"];

  res.setHeader("Cache-Control", "no-store");
  res.redirect(302, url);
}
