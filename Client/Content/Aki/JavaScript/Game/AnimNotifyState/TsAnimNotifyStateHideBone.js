"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const MeshComponentUtils_1 = require("../NewWorld/Character/Common/Component/MeshHelper/MeshComponentUtils");
class TsAnimNotifyStateHideBone extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.BoneName = "";
    this.IgnoreTsBaseCharacter = "";
  }
  Constructor() {}
  K2_NotifyBegin(e, t, s) {
    if (this.IgnoreTsBaseCharacter) {
      MeshComponentUtils_1.MeshComponentUtils.HideBone(e, this.BoneName, true);
    } else if ((e = e.GetOwner()) instanceof TsBaseCharacter_1.default) {
      e.CharacterActorComponent.Entity.GetComponent(178)?.HideBone(FNameUtil_1.FNameUtil.GetDynamicFName(this.BoneName), true, false);
    }
    return true;
  }
  K2_NotifyEnd(e, t) {
    if (this.IgnoreTsBaseCharacter) {
      MeshComponentUtils_1.MeshComponentUtils.HideBone(e, this.BoneName, false);
    } else if ((e = e.GetOwner()) instanceof TsBaseCharacter_1.default) {
      e.CharacterActorComponent.Entity.GetComponent(178)?.HideBone(FNameUtil_1.FNameUtil.GetDynamicFName(this.BoneName), false, false);
    }
    return true;
  }
  GetNotifyName() {
    return "隐藏骨骼";
  }
}
exports.default = TsAnimNotifyStateHideBone;
//# sourceMappingURL=TsAnimNotifyStateHideBone.js.map