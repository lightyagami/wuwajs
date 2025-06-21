"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssActorManager = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  SkeletalObserverManager_1 = require("../../SkeletalObserver/SkeletalObserverManager");
class DangoAbyssActorManager {
  static InitIndexDangoSkeletalObserverHandle(e) {
    var r;
    DangoAbyssActorManager.Vn1.get(e) || (Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 27, "初始化 DangoActorObserver", ["index", e]), r = SkeletalObserverManager_1.SkeletalObserverManager.NewSkeletalObserver(this.jn1), this.Vn1.set(e, r))
  }
  static RefreshDangoSkeletalObserverHandle(e, a, s) {
    let r = DangoAbyssActorManager.Vn1.get(e);
    if (r && void 0 !== r.Model || (this.DestroyDangoSkeletalObserverHandle(e), this.InitIndexDangoSkeletalObserverHandle(e), Log_1.Log.CheckError() && Log_1.Log.Error("Activity", 27, "RefreshDangoSkeletalObserverHandle使用错误", ["index", e], ["handleExist", void 0 !== r], ["modelExist", void 0 !== r?.Model]), r = DangoAbyssActorManager.Vn1.get(e)), r) {
      var t = r.Model;
      const n = a.MeshId;
      var o = t.CheckGetComponent(0);
      if (o?.ModelConfigId === n) 2 === o.GetModelLoadState() && s?.();
      else if (ConfigManager_1.ConfigManager.SkeletalObserverConfig.GetMeshConfig(n)) {
        const i = t.CheckGetComponent(1),
          g = t.CheckGetComponent(10);
        g.StopAnimation();
        o = a.DangoPointCase;
        i.SetTransformByTag(o);
        const l = t.CheckGetComponent(28);
        g.SetAnimationMode(1);
        o = a.StandAnimationName;
        ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.AnimationAsset, r => {
          r && l.LoadModelByDangoId(a.DangoId, n, !0, () => {
            var e = r;
            g.PlayAnimation(e, !0), (e = a.Transform) && i.SetAllMeshComponentRelativeTransform(e, !1, void 0, !1), s?.()
          })
        })
      }
    } else Log_1.Log.CheckError() && Log_1.Log.Error("Activity", 27, "没有初始化index observer", ["index", e])
  }
  static RefreshSkeletalObserverAnimation(e, r, a) {
    var s = DangoAbyssActorManager.Vn1.get(e);
    if (s) {
      const t = s.Model.CheckGetComponent(10);
      t.StopAnimation(), ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.AnimationAsset, e => {
        e && t.PlayAnimation(e, a)
      })
    } else Log_1.Log.CheckError() && Log_1.Log.Error("Activity", 27, "没有初始化index observer", ["index", e])
  }
  static ClearAllDangoSkeletalObserverHandle() {
    for (const e of this.Vn1.values()) SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(e);
    this.Vn1.clear()
  }
  static DestroyDangoSkeletalObserverHandle(e) {
    var r = this.Vn1.get(e);
    r && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 27, "销毁 DangoActorObserver", ["index", e]), SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(r), this.Vn1.delete(e))
  }
}(exports.DangoAbyssActorManager = DangoAbyssActorManager).jn1 = 15, DangoAbyssActorManager.Vn1 = new Map;
//# sourceMappingURL=DangoAbyssActorManager.js.map