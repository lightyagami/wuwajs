"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateWeaponHang extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Id = 10;
    this.新的挂载点名 = undefined;
    this.挂载相对位置 = undefined;
    this.结束后状态 = 1;
    this.缓冲时间 = -0;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, s) {
    t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (t?.CharacterActorComponent?.Entity?.GetComponent(84)?.ChangeWeaponHangState(this.Id, this.新的挂载点名, this.挂载相对位置, this.缓冲时间), true);
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      t = t?.CharacterActorComponent?.Entity?.GetComponent(84);
      if (!t?.Valid) {
        return false;
      }
      if (t._Pr === this.Id) {
        return (this.结束后状态 === 0 || this.结束后状态 === 1) && (t.ChangeWeaponHangState(this.结束后状态, UE.NewArray(UE.BuiltinName), UE.NewArray(UE.Transform), this.缓冲时间), true);
      }
    }
    return false;
  }
  GetNotifyName() {
    return "切换武器到挂点";
  }
}
exports.default = TsAnimNotifyStateWeaponHang;
//# sourceMappingURL=TsAnimNotifyStateWeaponHang.js.map