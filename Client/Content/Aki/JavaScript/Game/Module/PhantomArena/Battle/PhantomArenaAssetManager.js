"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaAssetManager = void 0;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  LogProfiler_1 = require("../../../../Core/Common/LogProfiler"),
  StatSeconds_1 = require("../../../../Core/Performance/StatSeconds"),
  ModelUtil_1 = require("../../../../Core/Utils/ModelUtil"),
  StringBuilder_1 = require("../../../../Core/Utils/StringBuilder"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PreloadDefine_1 = require("../../../Preload/PreloadDefine"),
  GameModePromise_1 = require("../../../World/Define/GameModePromise");
class PhantomArenaAssetManager {
  static Yv1(e) {
    var a = new PreloadDefine_1.ModelAssetElement;
    return PhantomArenaAssetManager.zv1.set(e, a), a
  }
  static Jv1(e) {
    return PhantomArenaAssetManager.zv1.get(e)
  }
  static Zv1(e) {
    return PhantomArenaAssetManager.zv1.get(e)?.Clear(), PhantomArenaAssetManager.zv1.delete(e)
  }
  static async PreloadPhantomArenaAsset(r, e) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "[预加载] 开始预加载", ["modelId", r]);
    const o = ModelManager_1.ModelManager.PreloadModelNew;
    var a = new CustomPromise_1.CustomPromise,
      n = StatSeconds_1.StatSecondsAccumulator.Create("modelId:" + r),
      t = (n.Start(), PhantomArenaAssetManager.ey1.CreateChild("预加载资源, modelId:" + r, !0)),
      s = t.CreateChild("预加载主要资源", !0);
    const g = t.CreateChild("预加载其他资源", !0);
    t?.Start();
    let m = PhantomArenaAssetManager.Jv1(r);
    if (m) return Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "[预加载] 重复预加载"), e?.(2), t?.Stop(), n.Stop(), 2;
    (m = PhantomArenaAssetManager.Yv1(r)).LoadState = 0, m.Promise = a.Promise, m.AddCallback(e), m.MainAsset.AddObjectCallback = (e, a) => {
      m && !m.IsDestroy && o.HoldPreloadObject.AddEntityAsset(r, e)
    };
    var A = ModelUtil_1.ModelUtil.GetModelConfig(r);
    if (A && A.特效替换表 && A.蒙太奇替换表 ? (0 < (l = A.特效替换表.ToAssetPathName()).length && m?.MainAsset.SetupReplaceEffect(l), 0 < (l = A.蒙太奇替换表.ToAssetPathName()).length && m?.MainAsset.SetupReplaceMontage(l)) : A || Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "[预加载] ModelConfig为空", ["ModelId", r]), !ControllerHolder_1.ControllerHolder.PreloadControllerNew.CollectAssetByModelId(m, r)) return Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "[预加载]预加载收集模型资源失败", ["modelId", r]), e?.(2), t?.Stop(), n.Stop(), 2;
    s?.Start();
    var l = new GameModePromise_1.GameModePromise,
      A = (ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog && Log_1.Log.CheckDebug() && Log_1.Log.Debug("PhantomArena", 10, "[预加载] 开始预加载主要资源", ["ModelId", r], ["Dis", A?.描述], ["BP", A?.蓝图.ToAssetPathName()], ["\nAssets", "\n" + Array.from(m.MainAsset.AssetPathSet).map(e => "" + e).join("\n")]), ControllerHolder_1.ControllerHolder.PreloadControllerNew.LoadAssetAsync(m.MainAsset, m.LoadPriority, !1, l), await l.Promise);
    if (s?.Stop(), !A) return Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "[预加载] 预加载主要资源失败", ["modelId", r]), m.DoCallback(2), e?.(2), t?.Stop(), n.Stop(), 2;
    if (m.IsDestroy) return Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "[预加载] 资源已卸载"), m.DoCallback(4), e?.(4), t?.Stop(), n.Stop(), 4;
    var _ = new Array;
    if (g?.Start(), await Promise.all([ControllerHolder_1.ControllerHolder.PreloadControllerNew.CollectModelAssetSkillMap(m), ControllerHolder_1.ControllerHolder.PreloadControllerNew.CollectModelAssetBulletMap(m)]), m.IsDestroy) return Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "[预加载] 资源已卸载"), m.DoCallback(4), e?.(4), t?.Stop(), n.Stop(), 4;
    var d = new Map;
    if (m.SkillAssetManager.SkillAssetMap.size)
      for (var [i, P] of m.SkillAssetManager.SkillAssetMap) d.set(i, P);
    if (m.BulletAssetManager.AssetMap.size)
      for (var [M, h] of m.BulletAssetManager.AssetMap) d.set(M, h);
    let L = d.size;
    for (const [C, c] of d) {
      ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog && Log_1.Log.CheckDebug() && Log_1.Log.Debug("PhantomArena", 10, "[预加载] 开始预加载其他资源", ["modelId", r], ["id", C], ["\nAssets", "\n" + Array.from(c.AssetPathSet).map(e => "" + e).join("\n")]);
      var f = new GameModePromise_1.GameModePromise;
      ControllerHolder_1.ControllerHolder.PreloadControllerNew.LoadAssetAsync(c, m.LoadPriority, !1, f, e => {
        --L || g?.Stop(), e || Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "[预加载] 预加载其他资源失败", ["modelId", r], ["id", C])
      }), _.push(f.Promise)
    }
    l = await Promise.all(_);
    if (m.IsDestroy) return Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "[预加载] 资源已卸载"), m.DoCallback(4), e?.(4), t?.Stop(), n.Stop(), 4;
    let u = !0;
    for (const v of l) v || (u = !1);
    return u ? (a.SetResult(3), m.DoCallback(3), t?.Stop(), n.Stop(), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "[预加载] 预加载完成", ["modelId", r]), a.Promise) : (Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "[预加载] 预加载其他资源失败"), m.DoCallback(2), e?.(2), t?.Stop(), n.Stop(), 2)
  }
  static RemovePhantomArenaAsset(e) {
    var a = ModelManager_1.ModelManager.PreloadModelNew,
      r = PhantomArenaAssetManager.Jv1(e);
    r ? 4 !== r.LoadState && (r.LoadState = 4, a.HoldPreloadObject.RemoveEntityAssets(e) || Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "[预加载] 卸载模型还未加载完成", ["Key", e]), PhantomArenaAssetManager.Zv1(e), Log_1.Log.CheckInfo()) && Log_1.Log.Info("PhantomArena", 10, "[预加载]卸载完成", ["modelId", e]) : Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "[预加载] 重复卸载", ["modelId", e])
  }
  static PreloadPhantomArenaAssetByCardConfigId(e) {
    var a, r, e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e).EntityConfigId,
      o = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(e);
    o ? (a = ModelManager_1.ModelManager.CreatureModel.GetEntityModel(o.BlueprintType)) ? (a = a.ModelId, 0 < (r = PhantomArenaAssetManager.Nn1.get(a) ?? 0) ? PhantomArenaAssetManager.Nn1.set(a, r + 1) : (PhantomArenaAssetManager.Nn1.set(a, 1), PhantomArenaAssetManager.PreloadPhantomArenaAsset(a, () => {}))) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "[Preload]蓝图ID不存在", ["BlueprintType", o.BlueprintType]) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "[Preload]模型ID不存在", ["entityConfigId", e])
  }
  static RemovePhantomArenaAssetByCardConfigId(e) {
    var a, r, e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e).EntityConfigId,
      o = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(e);
    o ? (a = ModelManager_1.ModelManager.CreatureModel.GetEntityModel(o.BlueprintType)) ? (a = a.ModelId, (r = PhantomArenaAssetManager.Nn1.get(a) ?? 0) <= 0 || (1 < r ? PhantomArenaAssetManager.Nn1.set(a, r - 1) : (PhantomArenaAssetManager.Nn1.delete(a), PhantomArenaAssetManager.RemovePhantomArenaAsset(a)))) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "[Remove]蓝图ID不存在", ["BlueprintType", o.BlueprintType]) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "[Remove]模型ID不存在", ["entityConfigId", e])
  }
  static Clear() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "[预加载] 清理");
    for (const e of PhantomArenaAssetManager.zv1.keys()) PhantomArenaAssetManager.RemovePhantomArenaAsset(e);
    PhantomArenaAssetManager.zv1.clear(), PhantomArenaAssetManager.Nn1.clear()
  }
  static ToString() {
    var e, a, r = new StringBuilder_1.StringBuilder;
    r.Append("ModelIdMap: ");
    for ([e, a] of PhantomArenaAssetManager.Nn1) r.Append(`[ModelId:${e},Count:${a}]`), r.Append(" ");
    return r.ToString()
  }
}(exports.PhantomArenaAssetManager = PhantomArenaAssetManager).zv1 = new Map, PhantomArenaAssetManager.Nn1 = new Map, PhantomArenaAssetManager.ey1 = new LogProfiler_1.LogProfiler("加载声骸竞技场模型资源");
//# sourceMappingURL=PhantomArenaAssetManager.js.map