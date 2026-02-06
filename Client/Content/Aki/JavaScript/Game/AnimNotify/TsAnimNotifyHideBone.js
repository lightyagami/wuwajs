"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const MeshComponentUtils_1 = require("../NewWorld/Character/Common/Component/MeshHelper/MeshComponentUtils");
class TsAnimNotifyHideBone extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.BoneName = "";
    this.Hide = false;
    this.IgnoreTsBaseCharacter = false;
  }
  Constructor() {}
  K2_Notify(e, t) {
    if (this.IgnoreTsBaseCharacter) {
      MeshComponentUtils_1.MeshComponentUtils.HideBone(e, this.BoneName, this.Hide);
    } else if ((e = e.GetOwner()) instanceof TsBaseCharacter_1.default && e.CharacterActorComponent) {
      e.CharacterActorComponent.Entity.GetComponent(188)?.HideBone(FNameUtil_1.FNameUtil.GetDynamicFName(this.BoneName), this.Hide);
    }
    return true;
  }
  GetNotifyName() {
    return "隐藏骨骼";
  }
}
exports.default = TsAnimNotifyHideBone;
//# sourceMappingURL=TsAnimNotifyHideBone.js.map