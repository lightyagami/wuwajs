"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowSphereRangeCondition = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowConditionBase_1 = require("./LevelFlowConditionBase");
class LevelFlowSphereRangeCondition extends LevelFlowConditionBase_1.LevelFlowConditionBase {
  constructor() {
    super(...arguments);
    this.Tq_ = 0;
    this.bG = Vector_1.Vector.ZeroVectorProxy;
    this.Xoi = undefined;
  }
  Init(e, o) {
    var t;
    if (Global_1.Global.BaseCharacter) {
      if ((t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId))?.Valid) {
        this.Xoi = t.Entity.CheckGetComponent(1);
        if (this.Xoi) {
          this.Tq_ = e * e;
          this.bG = o;
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "Invalid EntityId", ["targetEntityId", Global_1.Global.BaseCharacter.EntityId]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelFlow", 58, "Invalid BaseCharacter");
    }
    return this;
  }
  OnTick(e) {
    if (this.Xoi?.Valid) {
      if (Vector_1.Vector.DistSquared(this.Xoi.ActorLocationProxy, this.bG) <= this.Tq_) {
        this.FinishExecute(true);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "TargetActorComponent is invalid");
      }
      this.FinishExecute(false);
    }
  }
}
exports.LevelFlowSphereRangeCondition = LevelFlowSphereRangeCondition;
//# sourceMappingURL=LevelFlowSphereRangeCondition.js.map