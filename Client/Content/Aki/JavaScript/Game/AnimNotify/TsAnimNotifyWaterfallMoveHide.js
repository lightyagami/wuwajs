"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
class TsAnimNotifyWaterfallMoveHide extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.Hide = true;
  }
  Constructor() {}
  K2_Notify(e, t) {
    return true;
  }
  GetNotifyName() {
    return "攀瀑进入二阶段(已废弃)";
  }
}
exports.default = TsAnimNotifyWaterfallMoveHide;
//# sourceMappingURL=TsAnimNotifyWaterfallMoveHide.js.map