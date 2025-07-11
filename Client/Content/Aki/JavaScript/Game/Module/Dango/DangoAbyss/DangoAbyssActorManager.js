"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssActorManager = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const SkeletalObserverManager_1 = require("../../SkeletalObserver/SkeletalObserverManager");
class DangoAbyssActorManager {
  static InitIndexDangoSkeletalObserverHandle(e) {
    var r;
    if (!DangoAbyssActorManager.hs1.get(e)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "初始化 DangoActorObserver", ["index", e]);
      }
      r = SkeletalObserverManager_1.SkeletalObserverManager.NewSkeletalObserver(this.ls1);
      this.hs1.set(e, r);
    }
  }
  static RefreshDangoSkeletalObserverHandle(e, a, s) {
    let r = DangoAbyssActorManager.hs1.get(e);
    if (!r || r.Model === undefined) {
      this.DestroyDangoSkeletalObserverHandle(e);
      this.InitIndexDangoSkeletalObserverHandle(e);
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 27, "RefreshDangoSkeletalObserverHandle使用错误", ["index", e], ["handleExist", r !== undefined], ["modelExist", r?.Model !== undefined]);
      }
      r = DangoAbyssActorManager.hs1.get(e);
    }
    if (r) {
      var t = r.Model;
      const n = a.MeshId;
      var o = t.CheckGetComponent(0);
      if (o?.ModelConfigId === n) {
        if (o.GetModelLoadState() === 2) {
          s?.();
        }
      } else if (ConfigManager_1.ConfigManager.SkeletalObserverConfig.GetMeshConfig(n)) {
        const i = t.CheckGetComponent(1);
        const g = t.CheckGetComponent(10);
        g.StopAnimation();
        o = a.DangoPointCase;
        i.SetTransformByTag(o);
        const l = t.CheckGetComponent(28);
        g.SetAnimationMode(1);
        o = a.StandAnimationName;
        ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.AnimationAsset, r => {
          if (r) {
            l.LoadModelByDangoId(a.DangoId, n, true, () => {
              var e = r;
              g.PlayAnimation(e, true);
              if (e = a.Transform) {
                i.SetAllMeshComponentRelativeTransform(e, false, undefined, false);
              }
              s?.();
            });
          }
        });
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 27, "没有初始化index observer", ["index", e]);
    }
  }
  static RefreshSkeletalObserverAnimation(e, r, a) {
    var s = DangoAbyssActorManager.hs1.get(e);
    if (s) {
      const t = s.Model.CheckGetComponent(10);
      t.StopAnimation();
      ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.AnimationAsset, e => {
        if (e) {
          t.PlayAnimation(e, a);
        }
      });
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 27, "没有初始化index observer", ["index", e]);
    }
  }
  static ClearAllDangoSkeletalObserverHandle() {
    for (const e of this.hs1.values()) {
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(e);
    }
    this.hs1.clear();
  }
  static DestroyDangoSkeletalObserverHandle(e) {
    var r = this.hs1.get(e);
    if (r) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "销毁 DangoActorObserver", ["index", e]);
      }
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(r);
      this.hs1.delete(e);
    }
  }
}
(exports.DangoAbyssActorManager = DangoAbyssActorManager).ls1 = 15;
DangoAbyssActorManager.hs1 = new Map(); //# sourceMappingURL=DangoAbyssActorManager.js.map