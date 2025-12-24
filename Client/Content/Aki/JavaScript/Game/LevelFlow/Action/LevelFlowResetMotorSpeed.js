"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowResetMotorSpeed = undefined;
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Global_1 = require("../../Global");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowResetMotorSpeed extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.Ist = 0;
  }
  Init(e) {
    this.Ist = e;
    return this;
  }
  OnExecute() {
    var e;
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if ((t = t && t.Entity.CheckGetComponent(242)) && t.VehicleEntity?.Valid && (t = t.VehicleEntity.CheckGetComponent(247))) {
      (e = Vector_1.Vector.Create(t.ActorForwardProxy)).Multiply(this.Ist, e);
      t.SetActorVelocity(e);
      this.FinishExecute(true);
    } else {
      this.FinishExecute(false);
    }
  }
}
exports.LevelFlowResetMotorSpeed = LevelFlowResetMotorSpeed;
//# sourceMappingURL=LevelFlowResetMotorSpeed.js.map