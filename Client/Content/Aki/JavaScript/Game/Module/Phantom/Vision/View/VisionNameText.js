"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionNameText = undefined;
const UE = require("ue");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionNameText {
  constructor(i) {
    this.jsi = undefined;
    this.jsi = i;
  }
  Update(i) {
    var t = i.GetMonsterName();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.jsi, t);
    this.jsi.SetColor(UE.Color.FromHex(i.GetNameColor()));
  }
}
exports.VisionNameText = VisionNameText;
//# sourceMappingURL=VisionNameText.js.map