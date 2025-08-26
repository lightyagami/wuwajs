"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMarkItem = undefined;
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const TrapDefenseDefine_1 = require("../../TrapDefenseDefine");
class TrapDefenseMarkItem {
  constructor(t, e) {
    this.ODi = 0;
    this.WorldPositionVector = Vector_1.Vector.Create();
    this.FDi = Vector_1.Vector.Create();
    this.gql = undefined;
    this.EnableCachePosition = false;
    this.ODi = t;
    this.EnableCachePosition = true;
  }
  get MarkId() {
    return this.ODi;
  }
  set MarkId(t) {
    this.ODi = t;
  }
  get TrackTarget() {
    return this.gql;
  }
  set TrackTarget(t) {
    this.gql = t;
  }
  get WorldPosition() {
    if (!this.EnableCachePosition) {
      if (this.TrackTarget) {
        this.WorldPositionVector.FromUeVector(this.TrackTarget.D_K2_GetActorLocation());
      }
      this.FDi = this.j9c(this.WorldPositionVector, this.FDi);
    }
    return this.WorldPositionVector;
  }
  get UiPosition() {
    this.FDi = this.j9c(this.WorldPosition, this.FDi);
    return this.FDi;
  }
  j9c(t, e) {
    e = e ?? Vector_1.Vector.Create();
    t.Multiply(TrapDefenseDefine_1.worldToTrapDefenseUiUnit, e);
    return e;
  }
  Initialize(t) {
    this.gql = t;
    this.OnInitialize();
  }
}
exports.TrapDefenseMarkItem = TrapDefenseMarkItem;
//# sourceMappingURL=TrapDefenseMarkItem.js.map