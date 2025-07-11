"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSetPartCollision extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.CompName = "";
    this.CompNames = undefined;
    this.IsBlockPawn = false;
    this.IsBulletDetect = false;
    this.IsBlockCamera = false;
  }
  Constructor() {}
  K2_NotifyBegin(t, s, i) {
    var e = t.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      if (this.CompName) {
        this.SetPartCollisionSwitch(e, this.CompName, this.IsBlockPawn, this.IsBulletDetect, this.IsBlockCamera);
      }
      for (let t = 0; t < this.CompNames.Num(); t++) {
        var r = this.CompNames.Get(t);
        if (r) {
          this.SetPartCollisionSwitch(e, r, this.IsBlockPawn, this.IsBulletDetect, this.IsBlockCamera);
        }
      }
      return true;
    }
    return false;
  }
  K2_NotifyEnd(t, s) {
    var i = t.GetOwner();
    if (i instanceof TsBaseCharacter_1.default) {
      t = i.CharacterActorComponent.GetPartConf(this.CompName);
      if (t) {
        this.SetPartCollisionSwitch(i, this.CompName, t.IsBlockPawn, t.IsBulletDetect, t.IsBlockCamera);
      }
      for (let t = 0; t < this.CompNames.Num(); t++) {
        var e = this.CompNames.Get(t);
        var r = i.CharacterActorComponent.GetPartConf(e);
        if (r) {
          this.SetPartCollisionSwitch(i, e, r.IsBlockPawn, r.IsBulletDetect, r.IsBlockCamera);
        }
      }
      return true;
    }
    return false;
  }
  GetNotifyName() {
    return "设置部位碰撞";
  }
  SetPartCollisionSwitch(t, s, i, e, r) {
    t.CharacterActorComponent.SetPartCollisionSwitch(s, i, e, r);
  }
}
exports.default = TsAnimNotifyStateSetPartCollision;
//# sourceMappingURL=TsAnimNotifyStateSetPartCollision.js.map