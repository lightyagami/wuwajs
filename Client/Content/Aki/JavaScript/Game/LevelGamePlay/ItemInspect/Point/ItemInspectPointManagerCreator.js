"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPointManager = undefined;
const SequenceUnlockPointManager_1 = require("./SequenceUnlockPointManager");
function createPointManager(e) {
  let n = undefined;
  if (n = e.Type === 0 ? new SequenceUnlockPointManager_1.SequenceUnlockPointManager() : n) {
    n.Init(e);
    return n;
  }
}
exports.createPointManager = createPointManager;
//# sourceMappingURL=ItemInspectPointManagerCreator.js.map