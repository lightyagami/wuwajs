"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyDisableEntity extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(e, r) {
    var e = e.GetOwner();
    return !!e && !!(e instanceof TsBaseCharacter_1.default) && !!(e = e?.CharacterActorComponent?.Entity)?.Valid && (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e, false, "TsAnimNotifyDisableEntity", true), true);
  }
  GetNotifyName() {
    return "关闭自身实体";
  }
}
exports.default = TsAnimNotifyDisableEntity;
//# sourceMappingURL=TsAnimNotifyDisableEntity.js.map