"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventCaptureRequest = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const SceneItemCaptureComponent_1 = require("../../../Game/NewWorld/SceneItem/SceneItemCaptureComponent");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const BattleNetController_1 = require("../../World/Controller/BattleNetController");
const LevelGameplayActionsDefine_1 = require("../LevelGameplayActionsDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class LevelEventCaptureRequest extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.NLe = "";
    this.E0 = 0;
  }
  ExecuteNew(a, e) {
    if (e.Type !== 1) {
      this.FinishExecute(false);
    } else if (EntitySystem_1.EntitySystem.Get(e.EntityId)?.Valid) {
      this.E0 = e.EntityId;
      if (SceneItemCaptureComponent_1.VISION_CAPTURE_WITH_RANGE) {
        const C = [];
        const c = [];
        const u = [];
        e = SceneItemCaptureComponent_1.SceneItemCaptureUtility.HuluDistanceMin;
        const p = SceneItemCaptureComponent_1.SceneItemCaptureUtility.HuluDistanceMax;
        var t = SceneItemCaptureComponent_1.SceneItemCaptureUtility.HuluAltitude;
        var r = SceneItemCaptureComponent_1.SceneItemCaptureUtility.GetAbsorbRadius();
        const v = Vector_1.Vector.Create(0, 0, 0);
        var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
        if (o?.Valid) {
          var o = o.GetComponent(3);
          v.DeepCopy(o.ActorLocationProxy);
          var l = Vector_1.Vector.Create(v);
          l.Z -= o.ScaledHalfHeight;
          var i = e => {
            var t = EntitySystem_1.EntitySystem.Get(e);
            if (!u.includes(e)) {
              if (t?.Valid) {
                t = t.GetComponent(1).ActorLocationProxy;
                c.push(t);
                u.push(e);
                if (Vector_1.Vector.Distance(t, v) <= p) {
                  C.push(t);
                }
              } else if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 96, "无效的幻象", ["entityId", e]);
              }
            }
          };
          i(this.E0);
          var o = ModelManager_1.ModelManager.VisionCaptureModel?.AllVisionEntityIds;
          if (o) {
            for (const h of o.keys()) {
              i(h);
            }
          }
          var o = EntitySystem_1.EntitySystem.Get(this.E0).GetComponent(206).ActorLocationProxy;
          var s = Vector_1.Vector.Distance(o, l);
          var s = MathUtils_1.MathUtils.Clamp(s, e, p);
          let n = MathUtils_1.MathUtils.GetNextPointWithDistance(l, o, s);
          n.Z += t;
          var e = ModelManager_1.ModelManager.TraceElementModel.GetLineTrace();
          e.WorldContextObject = GlobalData_1.GlobalData.World;
          e.ActorsToIgnore.Empty();
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, v);
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, n);
          var l = TraceElementCommon_1.TraceElementCommon.LineTrace(e, "VisionCaptureTest");
          if (l) {
            TraceElementCommon_1.TraceElementCommon.GetHitLocation(e.HitResult, 0, n);
            o = Vector_1.Vector.Distance(v, n) - SceneItemCaptureComponent_1.SceneItemCaptureUtility.HuluOffsetOnHit;
            n = MathUtils_1.MathUtils.GetNextPointWithDistance(v, n, o);
          } else {
            e.ClearCacheData();
          }
          var _ = [];
          for (let e = 0; e < u.length; e++) {
            var m = u[e];
            if (Vector_1.Vector.Distance(c[e], n) <= r) {
              _.push(m);
            }
          }
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 96, "掉落的幻象数量", ["all", u.length], ["inRange", _.length], ["point", n]);
          }
          BattleNetController_1.BattleNetController.RequestBatchCaptureEntity(_).then(t => {
            if (t.length > 0) {
              let e = true;
              for (const o of t) {
                var r = EntitySystem_1.EntitySystem.Get(o);
                if (r?.Valid && (this.kLe(a, o), r = r.GetComponent(150))) {
                  if (e) {
                    e = false;
                    r.ExecuteCapture(this.NLe, n);
                  } else {
                    r.AfterCapture();
                  }
                }
              }
              this.FinishExecute(true);
            } else {
              this.FinishExecute(false);
            }
          });
        } else {
          this.FinishExecute(false);
        }
      } else {
        BattleNetController_1.BattleNetController.RequestCaptureEntity(this.E0).then(e => {
          if (e) {
            this.kLe(a, this.E0);
            this.OLe(this.E0);
            this.FinishExecute(true);
          } else {
            this.FinishExecute(false);
          }
        });
      }
    } else {
      this.FinishExecute(false);
    }
  }
  kLe(e, t) {
    var r = new LevelGameplayActionsDefine_1.CommonActionInfo();
    r.Params = e.SuccessEvent;
    var e = new Array();
    e.push(r);
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(e, LevelGeneralContextDefine_1.EntityContext.Create(t));
  }
  OLe(e) {
    var e = EntitySystem_1.EntitySystem.Get(e);
    if (e &&= e.GetComponent(150)) {
      e.ExecuteCapture(this.NLe);
    }
  }
  OnReset() {
    this.NLe = undefined;
    this.E0 = 0;
  }
}
exports.LevelEventCaptureRequest = LevelEventCaptureRequest;
//# sourceMappingURL=LevelEventCaptureRequest.js.map