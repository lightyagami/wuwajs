"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventVehicleWaterfallMove = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const GameSplineComponent_1 = require("../Common/GameSplineComponent");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventVehicleWaterfallMove extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
    this.nx = undefined;
    this.hic = undefined;
    this.lic = () => {
      EventSystem_1.EventSystem.RemoveWithTarget(this.hic, EventDefine_1.EEventName.OnWaterfallMoveEnd, this.lic);
      this.FinishExecute(true);
      this.hic = undefined;
    };
  }
  ExecuteNew(e, t) {
    this.OPt = e;
    this.nx = t;
    if (this.OPt) {
      this.n0l(this.OPt, this.nx);
    } else {
      this.FinishExecute(false);
    }
  }
  n0l(e, t) {
    var i;
    var s;
    var o;
    var r = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    var l = r?.Entity.GetComponent(229);
    var n = l?.VehicleEntity?.GetComponent(245);
    if (n) {
      if ((s = new GameSplineComponent_1.GameSplineComponent(e.SplineEntityId)).Initialize()) {
        if ((i = s.GetNumberOfSplinePoints()) < 2) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Vehicle", 50, "[LevelEventExecVehicleAction] 攀瀑样条点数量不合法", ["SplineId", e.SplineEntityId], ["PointNum", i]);
          }
          this.FinishExecute(false);
        } else {
          o = s.GetWorldLocationAtSplinePoint(i - 1);
          s = s.GetWorldLocationAtSplinePoint(i - 2);
          o.Subtraction(s, MathUtils_1.MathUtils.CommonTempVector);
          GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(r, MathUtils_1.MathUtils.CommonTempVector);
          if (MathUtils_1.MathUtils.CommonTempVector.Normalize()) {
            o = this._ic(e.ChangeGravity?.GravityDirection);
            if (n.TryEnterWaterfallMove({
              SplineId: e.SplineEntityId,
              Direct: Vector_1.Vector.Create(MathUtils_1.MathUtils.CommonTempVector),
              ChangeGravity: o
            })) {
              this.hic = l.VehicleEntity;
              EventSystem_1.EventSystem.AddWithTarget(this.hic, EventDefine_1.EEventName.OnWaterfallMoveEnd, this.lic);
            } else {
              this.FinishExecute(false);
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Vehicle", 50, "[LevelEventExecVehicleAction] 无法从计算得到攀瀑方向", ["SplineId", e.SplineEntityId], ["PointNum", i]);
            }
            this.FinishExecute(false);
          }
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Vehicle", 50, "[LevelEventExecVehicleAction] 攀瀑样条数据获取失败", ["SplineId", e.SplineEntityId]);
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "[LevelEventExecVehicleAction] 无法获取玩家角色，或玩家角色未乘坐载具", ["RolePbDataId", r?.CreatureData.GetPbDataId()], ["IsOnVehicle", !!l?.VehicleEntity]);
      }
      this.FinishExecute(false);
    }
  }
  _ic(e) {
    var t = Vector_1.Vector.Create();
    switch (e) {
      case "PositiveX":
        t.Set(1, 0, 0);
        break;
      case "NegativeX":
        t.Set(-1, 0, 0);
        break;
      case "PositiveY":
        t.Set(0, 1, 0);
        break;
      case "NegativeY":
        t.Set(0, -1, 0);
        break;
      case "PositiveZ":
        t.Set(0, 0, 1);
        break;
      case "NegativeZ":
        t.Set(0, 0, -1);
        break;
      default:
        return;
    }
    return t;
  }
}
exports.LevelEventVehicleWaterfallMove = LevelEventVehicleWaterfallMove;
//# sourceMappingURL=LevelEventVehicleWaterfallMove.js.map