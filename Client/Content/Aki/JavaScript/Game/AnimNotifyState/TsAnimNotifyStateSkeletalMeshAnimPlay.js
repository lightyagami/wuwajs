"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
class TsAnimNotifyStateSkeletalMeshAnimPlay extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Tag = undefined;
    this.动画资产 = undefined;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, s) {
    var t = t.GetOwner().GetComponentsByTag(UE.SkeletalMeshComponent.StaticClass(), this.Tag);
    return t.Num() !== 0 && !!(t = t.Get(0))?.IsValid() && (t.SetHiddenInGame(false, false), t.PlayAnimation(this.动画资产, false), true);
  }
  K2_NotifyEnd(t, e) {
    var t = t.GetOwner().GetComponentsByTag(UE.SkeletalMeshComponent.StaticClass(), this.Tag);
    return t.Num() !== 0 && !!(t = t.Get(0))?.IsValid() && (t.SetHiddenInGame(true, false), t.Stop(), true);
  }
  GetNotifyName() {
    return "临时播放特定Mesh的动画";
  }
}
exports.default = TsAnimNotifyStateSkeletalMeshAnimPlay;
//# sourceMappingURL=TsAnimNotifyStateSkeletalMeshAnimPlay.js.map