"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateModifyMeshLocation extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.RelativeLocation = undefined;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, s) {
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = t.GetEntityNoBlueprint()?.GetComponent(186))?.Valid && !!t.Actor?.Mesh?.IsValid() && !(MathUtils_1.MathUtils.CommonTempVector.FromUeVector(this.RelativeLocation), t.AddModelLocation(MathUtils_1.MathUtils.CommonTempVector), 0);
  }
  K2_NotifyEnd(t, e) {
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = t.GetEntityNoBlueprint()?.GetComponent(186))?.Valid && !!t.Actor?.Mesh?.IsValid() && !(MathUtils_1.MathUtils.CommonTempVector.FromUeVector(this.RelativeLocation), MathUtils_1.MathUtils.CommonTempVector.UnaryNegation(MathUtils_1.MathUtils.CommonTempVector), t.AddModelLocation(MathUtils_1.MathUtils.CommonTempVector), 0);
  }
  GetNotifyName() {
    return "调整Mesh相对位置";
  }
}
exports.default = TsAnimNotifyStateModifyMeshLocation;
//# sourceMappingURL=TsAnimNotifyStateModifyMeshLocation.js.map