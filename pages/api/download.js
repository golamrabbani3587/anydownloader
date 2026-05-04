/**
 * Download redirect API
 *
 * Redirects to the latest GitHub Release assets for Any Downloader.
 */
const URLS = {
  "mac-arm64":   "https://github.com/golamrabbani3587/anydownloader/releases/download/app/Any.Downloader-1.0.0-arm64.dmg",
  "mac-x64":     "https://github.com/golamrabbani3587/anydownloader/releases/download/app/Any.Downloader-1.0.0.dmg",
  "windows":     "https://github.com/golamrabbani3587/anydownloader/releases/download/app/Any.Downloader.Setup.1.0.0.exe",
  "linux-x64":   "https://github.com/golamrabbani3587/anydownloader/releases/download/app/any-downloader_1.0.0_amd64.deb",
  "linux-arm64": "https://github.com/golamrabbani3587/anydownloader/releases/download/app/any-downloader_1.0.0_arm64.deb",
};

export default function handler(req, res) {
  const os = req.query.os || "windows";
  const url = URLS[os] || URLS["windows"];

  res.setHeader("Cache-Control", "no-store");
  res.redirect(302, url);
}
