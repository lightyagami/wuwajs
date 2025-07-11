"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiNode = undefined;
const Log_1 = require("../../../Core/Common/Log");
const LevelAiDefines_1 = require("./LevelAiDefines");
class LevelAiNode {
  constructor() {
    this._A = ++LevelAiNode.MIe;
    this.EIe = undefined;
    this.SIe = undefined;
    this.Description = "";
  }
  Serialize(e, i, t) {
    this.SIe = e;
    this.EIe = i;
    this.Description = t;
  }
  get CreatureDataComponent() {
    return this.EIe;
  }
  get CharacterPlanComponent() {
    return this.SIe;
  }
  PrintDescription(e, ...i) {
    if (LevelAiDefines_1.LEVEL_AI_DEBUG_MODE && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelAi", 29, e, ["Uid", this._A], ["Node", this.constructor.name], ["Owner", this.EIe?.GetPbDataId()], ["Description", this.Description], ...i);
    }
  }
}
(exports.LevelAiNode = LevelAiNode).MIe = 0;
//# sourceMappingURL=LevelAiNode.js.map