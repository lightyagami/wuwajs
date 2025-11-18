"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckIsUsingVehicle = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const TsBaseItem_1 = require("../../NewWorld/SceneItem/BaseItem/TsBaseItem");
const TsBaseVehicle_1 = require("../../NewWorld/Vehicle/TsBaseVehicle");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckIsUsingVehicle extends LevelGeneralBase_1.LevelConditionBase {
  constructor() {
    super(...arguments);
    this.az = Quat_1.Quat.Create();
    this.b6d = Vector_1.Vector.Create();
  }
  CheckNew(e, t, r) {
    var i = e?.Condition;
    if (i) {
      switch (i.Type) {
        case "UsingVehicle":
          return this.Pi_(i, t);
        case "PlayerInVehicle":
          return this.wi_(i, t);
        case "CheckVehicleSpeed":
          return this.R6d(i, r);
        case "CheckVehicleTriggerAngle":
          return this.Wgl(i, r);
      }
    }
    return false;
  }
  Pi_(e, t) {
    let r = undefined;
    if (e.TargetVehicle) {
      r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.TargetVehicle)?.Entity;
    } else if (t instanceof TsBaseVehicle_1.default) {
      r = t.VehicleActorComponent.Entity;
    } else if (t instanceof TsBaseCharacter_1.default) {
      r = t.CharacterActorComponent.Entity;
    } else if (t instanceof TsBaseItem_1.default) {
      r = ActorUtils_1.ActorUtils.GetEntityByActor(t)?.Entity;
    }
    t = r?.GetComponent(0);
    t = ModelManager_1.ModelManager.VehicleModel.GetVehiclePlayerData(t.GetCreatureDataId());
    if (t?.length > 0) {
      for (const i of t) {
        if (i.Seat === e.Seat) {
          return e.CheckIsBeingUsed;
        }
      }
    }
    var t = r?.GetComponent(237);
    return !!t && (t = t.IsVehicleInUse(e.Seat), e.CheckIsBeingUsed ? t : !t);
  }
  wi_(e, t) {
    var r = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    return !!r && !!(r = r.Entity.GetComponent(233)) && (r = e.VehicleType === undefined ? r.VehicleType !== undefined : r.VehicleType === e.VehicleType, e.CheckType ? r : !r);
  }
  R6d(e, t) {
    if (t) {
      if (t.Type !== 5) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 6, "只有Trigger类型才能承载这个检测的信息");
        }
        return false;
      } else if (t = EntitySystem_1.EntitySystem.GetComponent(t.OtherEntityId, 238)) {
        return t.ActorVelocityProxy.SizeSquared() >= e.Speed;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 6, "缺失目标单位");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 6, "没有context");
      }
      return false;
    }
  }
  Wgl(e, t) {
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 6, "没有context");
      }
      return false;
    }
    if (t.Type !== 5) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 6, "只有Trigger类型才能承载这个检测的信息");
      }
      return false;
    }
    var r = EntitySystem_1.EntitySystem.GetComponent(t.TriggerEntityId, 86)?.GetRangeActor();
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 6, "缺失TriggerActor");
      }
      return false;
    }
    this.az.FromUeQuat(r.K2_GetActorQuaternion());
    r = EntitySystem_1.EntitySystem.GetComponent(t.OtherEntityId, 238);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 6, "缺失目标单位");
      }
      return false;
    }
    this.az.UnRotateVector(r.ActorVelocityProxy, this.b6d);
    var t = this.b6d.Size();
    return !(t < MathUtils_1.MathUtils.SmallNumber) && (r = Math.acos(this.b6d.Z / t) * MathUtils_1.MathUtils.RadToDeg, t = Math.atan2(this.b6d.Y, this.b6d.X) * MathUtils_1.MathUtils.RadToDeg, MathUtils_1.MathUtils.Square(r / e.HorizontalAngle) + MathUtils_1.MathUtils.Square(t / e.VerticalAngle) < 1);
  }
}
exports.LevelConditionCheckIsUsingVehicle = LevelConditionCheckIsUsingVehicle;
//# sourceMappingURL=LevelConditionCheckIsUsingVehicle.js.map