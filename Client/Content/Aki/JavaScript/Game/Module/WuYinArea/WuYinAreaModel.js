"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WuYinAreaModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const RenderModuleController_1 = require("../../Render/Manager/RenderModuleController");
class WuYinAreaModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.g5o = new Map();
  }
  OnInit() {
    return true;
  }
  OnClear() {
    this.g5o.clear();
    return true;
  }
  GetWuYinLevelSequenceState(e) {
    if (this.g5o.has(e)) {
      return this.g5o.get(e);
    }
  }
  PlayWuYinSequence(e, r) {
    r = r === "Play" ? 1 : 0;
    RenderModuleController_1.RenderModuleController.SetBattleState(e, r);
  }
}
exports.WuYinAreaModel = WuYinAreaModel;
//# sourceMappingURL=WuYinAreaModel.js.map