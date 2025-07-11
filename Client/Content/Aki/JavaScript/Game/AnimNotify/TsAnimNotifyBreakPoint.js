"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyBreakPoint extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(e, r) {
    var e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default && (e = e.CharacterActorComponent.Entity.GetComponent(62))) {
      e.AnimBreakPoint();
    }
    return true;
  }
  GetNotifyName() {
    return "打断点（强制执行一次按键缓存检测）";
  }
}
exports.default = TsAnimNotifyBreakPoint;
//# sourceMappingURL=TsAnimNotifyBreakPoint.js.map