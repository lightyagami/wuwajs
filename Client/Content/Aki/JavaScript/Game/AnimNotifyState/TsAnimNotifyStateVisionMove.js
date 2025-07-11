"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines");
class TsAnimNotifyStateVisionMove extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.移动速度 = undefined;
    this.Velocity = undefined;
    this.TmpVector = undefined;
  }
  Constructor() {
    this.Velocity = undefined;
    this.TmpVector = undefined;
  }
  K2_NotifyBegin(t, e, i) {
    this.Init();
    t = t.GetOwner();
    return !!UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.BP_BASEVISION) && (this.Velocity.FromUeVector(this.移动速度), true);
  }
  K2_NotifyTick(t, e, i) {
    var t = t.GetOwner();
    return !!UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.BP_BASEVISION) && !!(t = EntitySystem_1.EntitySystem.GetComponent(t.EntityId, 3))?.Valid && (t.AddActorLocalOffset(this.Velocity.Multiply(i, this.TmpVector).ToUeVector(), "TsAnimNotifyStateVisionMove", true), true);
  }
  Init() {
    this.Velocity = Vector_1.Vector.Create();
    this.TmpVector = Vector_1.Vector.Create();
  }
  GetNotifyName() {
    return "幻象移动";
  }
}
exports.default = TsAnimNotifyStateVisionMove;
//# sourceMappingURL=TsAnimNotifyStateVisionMove.js.map