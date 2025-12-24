"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowReleaseLevelSequence = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const LevelFlowResourceManager_1 = require("../LevelFlowResourceManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowReleaseLevelSequence extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.ktr = StringUtils_1.EMPTY_STRING;
  }
  Init(e) {
    this.ktr = e;
    return this;
  }
  OnExecute() {
    LevelFlowResourceManager_1.LevelFlowResourceManager.ReleaseSequence(this.ktr);
    this.FinishExecute(true);
  }
}
exports.LevelFlowReleaseLevelSequence = LevelFlowReleaseLevelSequence;
//# sourceMappingURL=LevelFlowReleaseLevelSequence.js.map