"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
class TsAnimNotifyStateWaterfallMove extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(e, t, o) {
    const r = e.GetOwner();
    if (!r) {
      return false;
    }
    if (!(r instanceof TsBaseVehicle_1.default)) {
      return false;
    }
    e = r.VehicleActorComponent?.Entity;
    const i = e?.GetComponent(260);
    if (!i?.IsWaterfallMove) {
      return false;
    }
    var a = e?.GetComponent(254);
    a?.RemoveTag(-1782915173);
    a?.AddTag(-360496329);
    e?.GetComponent(248)?.ConsumeRootMotion();
    i.WaterfallHideVehicleAndPassenger(true, "贡多拉攀瀑入水");
    a = Rotator_1.Rotator.Create();
    i.WaterfallDirect.Rotation(a);
    if (!i.IsWaterfallDynamicGravity) {
      (e?.GetComponent(247)).SetActorRotation(a.ToUeRotator(), "攀瀑进入二阶段设置旋转", false);
    }
    (e?.GetComponent(249)).MoveAlongPath({
      SplineId: i.WaterfallSplineId,
      SimulateRotation: false,
      NeedSync: false,
      DynamicGravity: i.IsWaterfallDynamicGravity,
      OnMoveEndHandle: e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 50, "贡多拉攀瀑样条移动结束", ["PbDataId", r.VehicleActorComponent?.CreatureData.GetPbDataId()], ["SplineId", i.WaterfallSplineId], ["Result", e]);
        }
        if (e) {
          i?.OnWaterfallMoveBeginEnd();
        } else {
          i?.ForceEndWaterfallMove();
        }
      }
    });
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "贡多拉攀瀑进入二阶段", ["PbDataId", r.VehicleActorComponent?.CreatureData.GetPbDataId()], ["SplineId", i.WaterfallSplineId], ["Passengers", i.PassengerInfoMap]);
    }
    return true;
  }
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    return !!e && e instanceof TsBaseVehicle_1.default && !!(e = e.VehicleActorComponent?.Entity?.GetComponent(260))?.IsWaterfallMove && (e.EndWaterfallMove(), true);
  }
  GetNotifyName() {
    return "贡多拉攀瀑";
  }
}
exports.default = TsAnimNotifyStateWaterfallMove;
//# sourceMappingURL=TsAnimNotifyStateWaterfallMove.js.map