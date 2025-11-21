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
      var o = r.Model;
      const n = a.MeshId;
      var t = o.CheckGetComponent(0);
      if (t?.ModelConfigId === n) {
        if (t.GetModelLoadState() === 2) {
          s?.();
        }
      } else if (ConfigManager_1.ConfigManager.SkeletalObserverConfig.GetMeshConfig(n)) {
        const i = o.CheckGetComponent(1);
        const g = o.CheckGetComponent(10);
        g.StopAnimation();
        t = a.DangoPointCase;
        i.SetTransformByTag(t);
        const l = o.CheckGetComponent(28);
        g.SetAnimationMode(1);
        t = a.StandAnimationName;
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimationAsset, r => {
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
        }, 100, "Ui.DangoUi");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 27, "没有初始化index observer", ["index", e]);
    }
  }
  static RefreshSkeletalObserverAnimation(e, r, a) {
    var s = DangoAbyssActorManager.hs1.get(e);
    if (s) {
      const o = s.Model.CheckGetComponent(10);
      o.StopAnimation();
      ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.AnimationAsset, e => {
        if (e) {
          o.PlayAnimation(e, a);
        }
      }, 100, "Ui.DangoUi");
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
(exports.DangoAbyssActorManager = DangoAbyssActorManager).ls1 = 16;
DangoAbyssActorManager.hs1 = new Map(); //# sourceMappingURL=DangoAbyssActorManager.js.map