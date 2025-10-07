"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const EffectRuntimeGhostEffectContext_1 = require("../../../Effect/EffectContext/EffectRuntimeGhostEffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
class AnimNotifyStateGhost extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.EffectDataAssetRef = undefined;
    this.SpawnRate = -0;
    this.UseSpawnRate = true;
    this.SpawnInterval = -0;
    this.GhostLifeTime = -0;
    this.EffectHandleMap = undefined;
  }
  Constructor() {
    this.EffectHandleMap = undefined;
  }
  GetNotifyName() {
    return "角色残影";
  }
  K2_ValidateAssets() {
    return true;
  }
  K2_NotifyBegin(t, e, s) {
    this.EffectHandleMap ||= new Map();
    EffectSystem_1.EffectSystem.InitializeWithPreview(false);
    var i = t.GetOwner();
    var f = new EffectRuntimeGhostEffectContext_1.EffectRuntimeGhostEffectContext(undefined);
    let r = this.EffectDataAssetRef.ToAssetPathName();
    if (i instanceof TsBaseCharacter_1.default && i.CharacterActorComponent?.Entity) {
      f.EntityId = i.CharacterActorComponent?.Entity.Id;
      r = i.CharacterActorComponent?.GetReplaceEffect(r) ?? r;
    }
    f.SkeletalMeshComp = t;
    f.SpawnRate = this.SpawnRate;
    f.UseSpawnRate = this.UseSpawnRate;
    f.SpawnInterval = this.SpawnInterval;
    f.GhostLifeTime = this.GhostLifeTime;
    f.SourceObject = i;
    f = EffectSystem_1.EffectSystem.SpawnEffect(i, new UE.TransformDouble(new UE.Rotator(), i.D_K2_GetActorLocation(), new UE.VectorDouble(1, 1, 1)), r, "[AnimNotifyStateGhost.K2_NotifyBegin]", f, 0);
    if (i instanceof TsBaseCharacter_1.default && (i = i.CharacterActorComponent?.Entity?.GetComponent(289))?.Valid) {
      i.AddEffect(f);
    }
    if (f && EffectSystem_1.EffectSystem.IsValid(f)) {
      EffectSystem_1.EffectSystem.SetEffectNotRecord(f, true);
      this.EffectHandleMap.set(t, f);
    }
    return false;
  }
  K2_NotifyEnd(t, e) {
    var s = this.EffectHandleMap.get(t);
    if (s && EffectSystem_1.EffectSystem.IsValid(s)) {
      EffectSystem_1.EffectSystem.StopEffectById(s, "[AnimNotifyStateGhost.K2_NotifyEnd]", false);
    }
    this.EffectHandleMap.delete(t);
    return true;
  }
}
exports.default = AnimNotifyStateGhost;
//# sourceMappingURL=AnimNotifyStateGhost.js.map