"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
class TsAnimNotifySummonGongduolaSetLocAndRot extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(o, e) {
    const r = o.GetOwner();
    const n = ModelManager_1.ModelManager.GongduolaSummonModel?.SummonLocation;
    const l = ModelManager_1.ModelManager.GongduolaSummonModel?.SummonRotation;
    o = ModelManager_1.ModelManager.GongduolaSummonModel?.SummonGravityDir;
    if (r instanceof TsBaseVehicle_1.default && n && l && o) {
      const m = r.VehicleActorComponent.Entity;
      var t = m.GetComponent(237);
      if (!t?.Valid) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Temp", 31, "[TsAnimNotifySummonGongduolaSetLocAndRot] moveComp is invalid", ["EntityId", m?.Id]);
        }
        return false;
      }
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(m, false, "GongduolaSummonController.AfterPlayCancelSummonAnim", false);
      ControllerHolder_1.ControllerHolder.GongduolaSummonController.StopCancelSummonAnim(m);
      if (!o.IsZero()) {
        t.SetGravityDirect(o);
      }
      TimerSystem_1.TimerSystem.Delay(() => {
        r.VehicleActorComponent.SetActorLocationAndRotation(n.ToUeVector(), l.ToUeRotator(), "TsAnimNotifySummonGongduolaSetLocAndRot");
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(r.VehicleActorComponent.Entity, true, "GongduolaSummonController.BeforePlaySummonAnim", false);
        ModelManager_1.ModelManager.GongduolaSummonModel.SummonLocation = undefined;
        ModelManager_1.ModelManager.GongduolaSummonModel.SummonRotation = undefined;
        ControllerHolder_1.ControllerHolder.GongduolaSummonController.PlaySummonAnim(m);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Temp", 31, "[ChTest]TsAnimNotifySummonGongduolaSetLocAndRot");
        }
      }, 500);
    }
    return true;
  }
}
exports.default = TsAnimNotifySummonGongduolaSetLocAndRot;
//# sourceMappingURL=TsAnimNotifySummonGongduolaSetLocAndRot.js.map