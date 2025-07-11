"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyUiTimeDilation extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(e, t) {
    return e.GetOwner() instanceof TsBaseCharacter_1.default;
  }
}
exports.default = TsAnimNotifyUiTimeDilation;
//# sourceMappingURL=TsAnimNotifyUiTimeDilation.js.map