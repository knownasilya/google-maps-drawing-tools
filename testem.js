module.exports = {
  "framework": "qunit",
  "test_page": "index.html?hidepassed",

  "browser_args": {
    "Chrome": [
      "--headless",
      "--disable-gpu",
      "--remote-debugging-port=9222"
    ]
  },

  "disable_watching": true,
  "launch_in_dev": ["Chrome"],
  "launch_in_ci": ["Chrome"]
}
