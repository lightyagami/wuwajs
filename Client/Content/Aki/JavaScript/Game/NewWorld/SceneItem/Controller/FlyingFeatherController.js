"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlyingFeatherController = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const SpecificScanEffectData_1 = require("../SpecificScanEffect/SpecificScanEffectData");
const SCAN_EFFECT_CLASS_PATH = "/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_Fx_Scanning_2_7.BP_Fx_Scanning_2_7_C";
class FlyingFeatherController extends ControllerBase_1.ControllerBase {
  static OnTick(e) {
    if (this.LFd.size !== 0) {
      var t;
      var r;
      var o = [];
      for ([t, r] of this.LFd) {
        if (!r.Update(e)) {
          o.push(t);
        }
      }
      for (const c of o) {
        this.StopFlyingFeatherScanEffect(c);
      }
    }
  }
  static StartFlyingFeatherScanEffect(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 31, "[FlyingFeatherController] StartChargeSlashScanEffect");
    }
    this._A++;
    ResourceSystem_1.ResourceSystem.LoadAsync(SCAN_EFFECT_CLASS_PATH, UE.Class, e => {
      if (e) {
        (e = ActorSystem_1.ActorSystem.Spawn(e, t, undefined)).StartScanEffect();
        this.LFd.set(this._A, new SpecificScanEffectData_1.SpecificScanEffectData(this._A, e, t.GetLocation(), 2));
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 31, "加载飞雷神扫描特效失败", ["path", SCAN_EFFECT_CLASS_PATH]);
      }
    });
    return this._A;
  }
  static StopFlyingFeatherScanEffect(e) {
    var t = this.LFd.get(e);
    if (t) {
      ActorSystem_1.ActorSystem.Put("StopChargeSlashScanEffect", t.EffectActor);
      this.LFd.delete(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 31, "[StopFlyingFeatherScanEffect] data is null", ["id", e]);
    }
  }
  static StopAllFlyingFeatherScanEffect() {
    for (var [, e] of this.LFd) {
      ActorSystem_1.ActorSystem.Put("StopAllFlyingFeatherScanEffect", e.EffectActor);
    }
    this.LFd.clear();
  }
}
(exports.FlyingFeatherController = FlyingFeatherController)._A = -1;
FlyingFeatherController.LFd = new Map(); //# sourceMappingURL=FlyingFeatherController.js.map