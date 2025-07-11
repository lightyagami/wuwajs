"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorActorsLocation extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.KeyActorA = "";
    this.KeyActorB = "";
    this.DistanceRange = undefined;
    this.AngleRange = undefined;
    this.HeightRange = undefined;
    this.IsInitTsVariables = false;
    this.TsKeyActorA = "";
    this.TsKeyActorB = "";
    this.TsDistanceRange = undefined;
    this.TsAngleRange = undefined;
    this.TsHeightRange = undefined;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsKeyActorA = "";
    this.TsKeyActorB = "";
    this.TsDistanceRange = undefined;
    this.TsAngleRange = undefined;
    this.TsHeightRange = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsKeyActorA = this.KeyActorA;
      this.TsKeyActorB = this.KeyActorB;
      this.TsDistanceRange = new MathUtils_1.FastUeFloatRange(this.DistanceRange);
      this.TsAngleRange = new MathUtils_1.FastUeFloatRange(this.AngleRange);
      this.TsHeightRange = new MathUtils_1.FastUeFloatRange(this.HeightRange);
    }
  }
  PerformConditionCheckAI(t, i) {
    var e = t.AiController;
    if (!e) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      return false;
    }
    this.InitTsVariables();
    var r = e.CharActorComp;
    var o = r.Entity.Id;
    let s = r;
    if (this.TsKeyActorA) {
      r = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(o, this.TsKeyActorA);
      if (!r) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("BehaviorTree", 6, "不存在BlackboardKey", ["Key", this.TsKeyActorA], ["AI", t.GetName()]);
        }
        return false;
      }
      var h = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(r);
      if (!h) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("BehaviorTree", 6, "不存在Entity", ["Id", r]);
        }
        return false;
      }
      s = h;
    }
    let n = e.AiHateList.GetCurrentTarget()?.Entity?.GetComponent(2);
    if (this.TsKeyActorB) {
      r = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(o, this.TsKeyActorB);
      if (!r) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("BehaviorTree", 6, "不存在BlackboardKey", ["Key", this.TsKeyActorB], ["AI", t.GetName()]);
        }
        return false;
      }
      h = EntitySystem_1.EntitySystem.GetComponent(r, 2);
      if (!h) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("BehaviorTree", 6, "不存在Entity", ["Id", r]);
        }
        return false;
      }
      n = h;
    }
    if (!n) {
      return false;
    }
    let l = undefined;
    l = (0, RegisterComponent_1.isComponentInstance)(n, 3) ? n.FloorLocation : n.ActorLocationProxy;
    return MathUtils_1.MathUtils.LocationInFastUeRange(s.FloorLocation, s.ActorRotationProxy, l, s.ScaledRadius + n.ScaledRadius, this.TsDistanceRange, this.TsAngleRange, this.TsHeightRange);
  }
}
exports.default = TsDecoratorActorsLocation;
//# sourceMappingURL=TsDecoratorActorsLocation.js.map