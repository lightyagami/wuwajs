"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ObjectUtils_1 = require("../../Core/Utils/ObjectUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const SkeletalMeshEffectContext_1 = require("../Effect/EffectContext/SkeletalMeshEffectContext");
const EffectSystem_1 = require("../Effect/EffectSystem");
const GlobalData_1 = require("../GlobalData");
const entityEffectMap = new Map();
class TsAnimNotifyStateAttackWindUp extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Info = undefined;
  }
  Constructor() {}
  K2_NotifyBegin(e, i, f) {
    if (!this.Info) {
      return false;
    }
    var r = e.GetOwner();
    var s = r?.CharacterActorComponent;
    if (!s?.Valid) {
      return false;
    }
    var a = s.Entity;
    var n = a.GetComponent(61);
    var c = a.GetComponent(210);
    if (!n?.Valid) {
      return false;
    }
    c = c?.CreateAnimNotifyContent(i.GetName(), this.exportIndex);
    n.SetWindupAttackInfo(this.Info, c ?? 0n);
    n.SetCounterAttackEndTime(f);
    i = this.Info.Effect;
    if (ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(i)) {
      let t = undefined;
      (t = r instanceof TsBaseCharacter_1.default && r.CharacterActorComponent?.Entity ? new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(r.CharacterActorComponent?.Entity.Id) : new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(undefined)).SkeletalMeshComp = e;
      t.SourceObject = r;
      t.CreateFromType = 1;
      c = i.ToAssetPathName();
      n = s.GetSocketTransform(this.Info.SocketName);
      f = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, n, c, "[TsAnimNotifyStateAttackWindUp.K2_NotifyBegin]", t, 0);
      entityEffectMap.set(a.Id, f);
      if (this.Info.EffectAttach) {
        this.SetupEffectTransform(EffectSystem_1.EffectSystem.GetEffectActor(f), s.SkeletalMesh);
      }
    }
    return true;
  }
  SetupEffectTransform(t, e) {
    t.K2_AttachToComponent(e, this.Info.SocketName, 0, 0, 0, false);
    e = UE.KismetMathLibrary.Conv_TransformToTransformDouble(this.Info.RelativeTransform);
    t.D_K2_SetActorRelativeTransform(e, false, undefined, true);
  }
  K2_NotifyEnd(t, e) {
    if (!this.Info) {
      return false;
    }
    t = t.GetOwner()?.CharacterActorComponent;
    if (!t?.Valid) {
      return false;
    }
    var t = t.Entity;
    var i = t.GetComponent(61);
    if (!t.GetComponent(40)?.Valid || !i?.Valid) {
      return false;
    }
    i.WindupAttackEnd();
    i = entityEffectMap.get(t.Id);
    if (i) {
      EffectSystem_1.EffectSystem.StopEffectById(i, "[TsAnimNotifyStateAttackWindUp.K2_NotifyEnd]", false);
      entityEffectMap.delete(t.Id);
    }
    return true;
  }
  GetNotifyName() {
    return "前摇配置";
  }
}
exports.default = TsAnimNotifyStateAttackWindUp;
//# sourceMappingURL=TsAnimNotifyStateAttackWindUp.js.map