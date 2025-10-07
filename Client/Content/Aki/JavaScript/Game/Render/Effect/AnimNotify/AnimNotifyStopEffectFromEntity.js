"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cpp_1 = require("cpp");
const UE = require("ue");
const Stats_1 = require("../../../../Core/Common/Stats");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
class AnimNotifyStopEffectFromEntity extends UE.KuroEffectMakerAN {
  constructor() {
    super(...arguments);
    this.EffectDataAssetRef = undefined;
    this.Immediately = false;
  }
  Constructor() {}
  K2_Notify(t, e) {
    AnimNotifyStopEffectFromEntity.NotifyStat.Start();
    var t = t.GetOwner();
    let r = 0;
    if (t instanceof TsBaseCharacter_1.default && t.CharacterActorComponent?.Entity) {
      r = t.CharacterActorComponent?.Entity.Id;
    } else if (t.IsA(UE.TsEffectActor_C.StaticClass())) {
      r = t.OwnerEntityId;
    } else if (t.IsA(UE.EffectSystemActor.StaticClass())) {
      r = t.GetOwnerEntityId();
    }
    if (r !== 0 && (t = this.EffectDataAssetRef.ToAssetPathName())) {
      cpp_1.FEffectSystem.StopEffectFromEntity(r, t, this.Immediately);
      AnimNotifyStopEffectFromEntity.NotifyStat.Stop();
    }
    return true;
  }
}
AnimNotifyStopEffectFromEntity.NotifyStat = Stats_1.Stat.Create("AnimNotifyStopEffectFromEntity_K2_Notify");
exports.default = AnimNotifyStopEffectFromEntity; //# sourceMappingURL=AnimNotifyStopEffectFromEntity.js.map