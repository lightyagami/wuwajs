"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToMapWithPhantomAreaChallenge = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const SkipTask_1 = require("./SkipTask");
class SkipToMapWithPhantomAreaChallenge extends SkipTask_1.SkipTask {
  OnRun(e) {
    ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaMapEntrance(e);
    this.Finish();
  }
}
exports.SkipToMapWithPhantomAreaChallenge = SkipToMapWithPhantomAreaChallenge;
//# sourceMappingURL=SkipToMapWithPhantomAreaChallenge.js.map