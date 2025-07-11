"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManipulaterModel = undefined;
const UE = require("ue");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
class ManipulaterModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.PYo = 0;
    this.xYo = Vector_1.Vector.ZeroVectorProxy;
    this.ExitHoldingStateCameraLocation = undefined;
    this.wYo = 0;
    this.BYo = new Set();
    this.k0a = undefined;
    this.G0a = undefined;
    this.N0a = undefined;
  }
  SetManipulateMode(t) {
    this.PYo = t;
  }
  GetManipulateMode() {
    return this.PYo;
  }
  SetTargetPartLocation(t) {
    this.xYo = t;
  }
  GetTargetPartLocation() {
    return this.xYo;
  }
  NeedShowLandTips() {
    return this.wYo > 0;
  }
  AddShowLandTipsCount(t) {
    if (!this.BYo.has(t)) {
      if (this.wYo === 0) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnManipulateShowLandTips, true);
      }
      this.wYo++;
      this.BYo.add(t);
    }
  }
  RemoveShowLandTipsCount(t) {
    if (this.BYo.has(t) && this.wYo !== 0 && (this.BYo.delete(t), this.wYo--, this.wYo === 0)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnManipulateShowLandTips, false);
    }
  }
  GetProjectilePath() {
    if (this.k0a === undefined) {
      this.k0a = UE.NewArray(UE.VectorDouble);
    }
    return this.k0a;
  }
  SetProjectilePath(t) {
    this.k0a = t;
  }
  GetAfterPortalProjectilePath() {
    if (this.G0a === undefined) {
      this.G0a = UE.NewArray(UE.VectorDouble);
    }
    return this.G0a;
  }
  SetAfterPortalProjectilePath(t) {
    this.G0a = t;
  }
  GetAfterPortalStartPosition() {
    return this.N0a;
  }
  SetAfterPortalStartPosition(t) {
    this.N0a = t;
  }
}
exports.ManipulaterModel = ManipulaterModel;
//# sourceMappingURL=CharacterManipulaterModel.js.map