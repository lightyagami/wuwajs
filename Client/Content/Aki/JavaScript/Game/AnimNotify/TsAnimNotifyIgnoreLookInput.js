"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Global_1 = require("../Global");
class TsAnimNotifyIgnoreLookInput extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.bIgnoreLookInput = false;
  }
  Constructor() {}
  K2_Notify(t, e) {
    var o = Global_1.Global.CharacterController;
    if (o?.IsValid() && o.IsLookInputIgnored() !== this.bIgnoreLookInput) {
      o.SetIgnoreLookInput(this.bIgnoreLookInput);
    }
    return true;
  }
  GetNotifyName() {
    return "设置禁用镜头输入";
  }
}
exports.default = TsAnimNotifyIgnoreLookInput;
//# sourceMappingURL=TsAnimNotifyIgnoreLookInput.js.map