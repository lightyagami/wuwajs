"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnCiacconaChapterRestart = exports.LevelConditionOnCiacconaChapterFirstStart = exports.LevelConditionOnCiacconaAvgInspirationChoiceShow = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnCiacconaAvgInspirationChoiceShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...t) {
    var [t] = t;
    return t;
  }
}
exports.LevelConditionOnCiacconaAvgInspirationChoiceShow = LevelConditionOnCiacconaAvgInspirationChoiceShow;
class LevelConditionOnCiacconaChapterFirstStart extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    return true;
  }
}
exports.LevelConditionOnCiacconaChapterFirstStart = LevelConditionOnCiacconaChapterFirstStart;
class LevelConditionOnCiacconaChapterRestart extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    return true;
  }
}
exports.LevelConditionOnCiacconaChapterRestart = LevelConditionOnCiacconaChapterRestart;
//# sourceMappingURL=LevelConditionCiacconaAvgGuide.js.map