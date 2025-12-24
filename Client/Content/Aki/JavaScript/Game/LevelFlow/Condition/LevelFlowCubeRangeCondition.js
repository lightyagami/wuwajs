"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowCubeRangeCondition = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const ColorUtils_1 = require("../../Utils/ColorUtils");
const LevelFlowConditionBase_1 = require("./LevelFlowConditionBase");
class LevelFlowCubeRangeCondition extends LevelFlowConditionBase_1.LevelFlowConditionBase {
  constructor() {
    super(...arguments);
    this.bG = Vector_1.Vector.ZeroVectorProxy;
    this.Hme = Vector_1.Vector.ZeroVectorProxy;
    this.mC = Rotator_1.Rotator.Create();
    this.Xoi = undefined;
    this.Trm = Vector_1.Vector.Create(0, 0, 0);
    this.cz = Vector_1.Vector.Create();
    this.gme = Vector_1.Vector.Create();
    this.e7o = Quat_1.Quat.Create();
  }
  Init(t, e, i) {
    var o;
    if (Global_1.Global.BaseCharacter) {
      if ((o = ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId))?.Valid) {
        this.Xoi = o.Entity.CheckGetComponent(1);
        if (this.Xoi) {
          this.bG = t;
          this.Hme = e;
          this.mC = i;
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "Invalid EntityId", ["targetEntityId", Global_1.Global.BaseCharacter.EntityId]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelFlow", 58, "Invalid BaseCharacter");
    }
    return this;
  }
  OnTick(t) {
    var e;
    if (this.Xoi?.Valid) {
      e = this.Xoi.ActorLocationProxy;
      if (this.Trm.Equals(Vector_1.Vector.ZeroVectorProxy)) {
        this.brm(e, this.Trm);
        if (this.Rrm(this.Trm)) {
          this.Trm.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
          this.FinishExecute(true);
        }
      } else {
        this.brm(e, this.cz);
        if (this.wrm(this.Trm, this.cz)) {
          this.Trm.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
          this.FinishExecute(true);
        } else {
          this.Trm.DeepCopy(this.cz);
        }
      }
      if (ModelManager_1.ModelManager.LevelFlowModel.IsDebug) {
        UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.World, this.bG.ToUeVector(), this.Hme.ToUeVector(), ColorUtils_1.ColorUtils.LinearRed, this.mC.ToUeRotator(), 1, 10);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "TargetActorComponent is invalid");
      }
      this.FinishExecute(false);
    }
  }
  Rrm(t) {
    return Math.abs(t.X) <= this.Hme.X && Math.abs(t.Y) <= this.Hme.Y && Math.abs(t.Z) <= this.Hme.Z;
  }
  brm(t, e) {
    t = t.Subtraction(this.bG, e);
    this.mC.Quaternion(this.e7o);
    this.e7o.Inverse(this.e7o);
    this.e7o.RotateVector(t, e);
  }
  wrm(t, e) {
    e.Subtraction(t, this.gme);
    let h = 0;
    let a = 1;
    e = (i, o, s, r) => {
      if (Math.abs(o) < MathCommon_1.MathCommon.KindaSmallNumber) {
        if (i < s || r < i) {
          return false;
        }
      } else {
        let t = (s - i) / o;
        let e = (r - i) / o;
        if (t > e) {
          s = t;
          t = e;
          e = s;
        }
        h = Math.max(t, h);
        a = Math.min(e, a);
        if (h > a) {
          return false;
        }
      }
      return true;
    };
    return !!e(t.X, this.gme.X, -this.Hme.X, this.Hme.X) && !!e(t.Y, this.gme.Y, -this.Hme.Y, this.Hme.Y) && !!e(t.Z, this.gme.Z, -this.Hme.Z, this.Hme.Z);
  }
}
exports.LevelFlowCubeRangeCondition = LevelFlowCubeRangeCondition;
//# sourceMappingURL=LevelFlowCubeRangeCondition.js.map