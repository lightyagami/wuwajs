"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GravityHookController = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
class GravityHookController {
  static ChangeGravity(e, t, o, r, i) {
    var a;
    var l;
    var _;
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    if (e?.Valid && (a = (e = e.Entity).GetComponent(189))?.Valid && (e = e.GetComponent(57))?.Valid && (e = e.InteractingTarget)?.Valid && (l = e.GetHookInteractConfig()) && l.Type === "GravityHook") {
      _ = a.GravityDirect;
      e = e.Entity.GetComponent(1);
      l = GravityUtils_1.GravityUtils.GetGravityDirectionByConfigAndActor(l.GravityDirection, e);
      _ = MathUtils_1.MathUtils.GetAngleByVectorDot(_, l);
      _ = MathUtils_1.MathUtils.RangeClamp(_, t, o, r, i);
      a.SetGravityDirectByNumber(l.X, l.Y, l.Z, true, _ * MathUtils_1.MathUtils.SecondToMillisecond);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelPlay", 48, "重力钩锁 更新重力方向", ["GravityDirect", l], ["SmoothSecond", _]);
      }
      (t = new Protocol_1.Aki.Protocol.nIf()).F4n = MathUtils_1.MathUtils.NumberToLong(e.CreatureData.GetCreatureDataId());
      Net_1.Net.Call(27553, t, e => {
        if (!e || e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelPlay", 48, "重力钩锁 请求更新重力方向失败");
          }
        }
      });
    }
  }
  static GetGravityHookLockInfo(e) {
    var e = this.NQd(e);
    var t = new UE.SGravityHookLockInfo();
    if (e) {
      t.IsValid = true;
      t.Location = e.ToUeVector();
    } else {
      t.IsValid = false;
      t.Location = Vector_1.Vector.ZeroVectorDouble;
    }
    return t;
  }
  static NQd(e) {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    if (e?.Valid) {
      e = e.Entity.GetComponent(107);
      if (e?.Valid) {
        e = e.GetCurrentTarget();
        if (e?.Valid) {
          e = e.GetHookInteractConfig();
          if (e && e.Type === "GravityHook") {
            e = e.CameraLookAtPointId;
            if (e) {
              e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e)?.Transform?.Pos;
              if (e) {
                return Vector_1.Vector.Create(e.X ?? 0, e.Y ?? 0, e.Z ?? 0);
              }
            }
          }
        }
      }
    }
  }
}
exports.GravityHookController = GravityHookController;
//# sourceMappingURL=GravityHookController.js.map