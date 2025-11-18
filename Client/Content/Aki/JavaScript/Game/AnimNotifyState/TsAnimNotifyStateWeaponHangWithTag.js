"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateWeaponHangWithTag extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Id = 10;
    this.新的挂载点名 = undefined;
    this.挂载相对位置 = undefined;
    this.结束后状态 = 1;
    this.缓冲时间 = -0;
    this.ActivateTag = new UE.GameplayTag();
  }
  Constructor() {}
  K2_NotifyBegin(t, s, e) {
    var i;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(i = t?.CharacterActorComponent?.Entity?.GetComponent(209)) && !!i.HasTag(this.ActivateTag.TagId) && !(t?.CharacterActorComponent?.Entity?.GetComponent(81)?.ChangeWeaponHangState(this.Id, this.新的挂载点名, this.挂载相对位置, this.缓冲时间), 0);
  }
  K2_NotifyEnd(t, s) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      var e = t?.CharacterActorComponent?.Entity?.GetComponent(209);
      if (!e || !e.HasTag(this.ActivateTag.TagId)) {
        return false;
      }
      e = t?.CharacterActorComponent?.Entity?.GetComponent(81);
      if (!e?.Valid) {
        return false;
      }
      if (e._Pr === this.Id) {
        return (this.结束后状态 === 0 || this.结束后状态 === 1) && (e.ChangeWeaponHangState(this.结束后状态, UE.NewArray(UE.BuiltinName), UE.NewArray(UE.Transform), this.缓冲时间), true);
      }
    }
    return false;
  }
  GetNotifyName() {
    return "切换武器到挂点";
  }
}
exports.default = TsAnimNotifyStateWeaponHangWithTag;
//# sourceMappingURL=TsAnimNotifyStateWeaponHangWithTag.js.map