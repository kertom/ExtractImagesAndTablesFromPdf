console.log("Installing BrowserFS!");
window["BrowserFS"] = BrowserFS;

BrowserFS.install(window);
BrowserFS.configure({
  fs: "InMemory",
  options: {}
}, function(error) { if (error) console.error(error) });

module.exports = BrowserFS.BFSRequire('fs');
