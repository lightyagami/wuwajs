"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaAssetManager = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const LogProfiler_1 = require("../../../../Core/Common/LogProfiler");
const StatSeconds_1 = require("../../../../Core/Performance/StatSeconds");
const ModelUtil_1 = require("../../../../Core/Utils/ModelUtil");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PreloadDefine_1 = require("../../../Preload/PreloadDefine");
const GameModePromise_1 = require("../../../World/Define/GameModePromise");
class PhantomArenaAssetManager {
  static yy1(e) {
    var a = new PreloadDefine_1.ModelAssetElement();
    PhantomArenaAssetManager.Sy1.set(e, a);
    return a;
  }
  static My1(e) {
    return PhantomArenaAssetManager.Sy1.get(e);
  }
  static Ey1(e) {
    PhantomArenaAssetManager.Sy1.get(e)?.Clear();
    return PhantomArenaAssetManager.Sy1.delete(e);
  }
  static async PreloadPhantomArenaAsset(r, e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "[预加载] 开始预加载", ["modelId", r]);
    }
    const o = ModelManager_1.ModelManager.PreloadModelNew;
    var a = new CustomPromise_1.CustomPromise();
    var n = StatSeconds_1.StatSecondsAccumulator.Create("modelId:" + r);
    n.Start();
    var t = PhantomArenaAssetManager.Iy1.CreateChild("预加载资源, modelId:" + r, true);
    var s = t.CreateChild("预加载主要资源", true);
    const g = t.CreateChild("预加载其他资源", true);
    t?.Start();
    let m = PhantomArenaAssetManager.My1(r);
    if (m) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "[预加载] 重复预加载");
      }
      e?.(2);
      t?.Stop();
      n.Stop();
      return 2;
    }
    (m = PhantomArenaAssetManager.yy1(r)).LoadState = 0;
    m.Promise = a.Promise;
    m.AddCallback(e);
    m.MainAsset.AddObjectCallback = (e, a) => {
      if (m && !m.IsDestroy) {
        o.HoldPreloadObject.AddEntityAsset(r, e);
      }
    };
    var A = ModelUtil_1.ModelUtil.GetModelConfig(r);
    if (A && A.特效替换表 && A.蒙太奇替换表) {
      if ((l = A.特效替换表.ToAssetPathName()).length > 0) {
        m?.MainAsset.SetupReplaceEffect(l);
      }
      if ((l = A.蒙太奇替换表.ToAssetPathName()).length > 0) {
        m?.MainAsset.SetupReplaceMontage(l);
      }
    } else if (!A) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "[预加载] ModelConfig为空", ["ModelId", r]);
      }
    }
    if (!ControllerHolder_1.ControllerHolder.PreloadControllerNew.CollectAssetByModelId(m, r)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "[预加载]预加载收集模型资源失败", ["modelId", r]);
      }
      e?.(2);
      t?.Stop();
      n.Stop();
      return 2;
    }
    s?.Start();
    var l = new GameModePromise_1.GameModePromise();
    if (ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("PhantomArena", 10, "[预加载] 开始预加载主要资源", ["ModelId", r], ["Dis", A?.描述], ["BP", A?.蓝图.ToAssetPathName()], ["\nAssets", "\n" + Array.from(m.MainAsset.AssetPathSet).map(e => "" + e).join("\n")]);
    }
    ControllerHolder_1.ControllerHolder.PreloadControllerNew.LoadAssetAsync(m.MainAsset, m.LoadPriority, false, l);
    var A = await l.Promise;
    s?.Stop();
    if (!A) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "[预加载] 预加载主要资源失败", ["modelId", r]);
      }
      m.DoCallback(2);
      e?.(2);
      t?.Stop();
      n.Stop();
      return 2;
    }
    if (m.IsDestroy) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "[预加载] 资源已卸载");
      }
      m.DoCallback(4);
      e?.(4);
      t?.Stop();
      n.Stop();
      return 4;
    }
    var _ = new Array();
    g?.Start();
    await Promise.all([ControllerHolder_1.ControllerHolder.PreloadControllerNew.CollectModelAssetSkillMap(m), ControllerHolder_1.ControllerHolder.PreloadControllerNew.CollectModelAssetBulletMap(m)]);
    if (m.IsDestroy) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "[预加载] 资源已卸载");
      }
      m.DoCallback(4);
      e?.(4);
      t?.Stop();
      n.Stop();
      return 4;
    }
    var d = new Map();
    if (m.SkillAssetManager.SkillAssetMap.size) {
      for (var [i, P] of m.SkillAssetManager.SkillAssetMap) {
        d.set(i, P);
      }
    }
    if (m.BulletAssetManager.AssetMap.size) {
      for (var [M, h] of m.BulletAssetManager.AssetMap) {
        d.set(M, h);
      }
    }
    let L = d.size;
    for (const [C, c] of d) {
      if (ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PhantomArena", 10, "[预加载] 开始预加载其他资源", ["modelId", r], ["id", C], ["\nAssets", "\n" + Array.from(c.AssetPathSet).map(e => "" + e).join("\n")]);
      }
      var f = new GameModePromise_1.GameModePromise();
      ControllerHolder_1.ControllerHolder.PreloadControllerNew.LoadAssetAsync(c, m.LoadPriority, false, f, e => {
        if (! --L) {
          g?.Stop();
        }
        if (!e) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PhantomArena", 10, "[预加载] 预加载其他资源失败", ["modelId", r], ["id", C]);
          }
        }
      });
      _.push(f.Promise);
    }
    l = await Promise.all(_);
    if (m.IsDestroy) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "[预加载] 资源已卸载");
      }
      m.DoCallback(4);
      e?.(4);
      t?.Stop();
      n.Stop();
      return 4;
    }
    let u = true;
    for (const v of l) {
      if (!v) {
        u = false;
      }
    }
    if (u) {
      a.SetResult(3);
      m.DoCallback(3);
      t?.Stop();
      n.Stop();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "[预加载] 预加载完成", ["modelId", r]);
      }
      return a.Promise;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "[预加载] 预加载其他资源失败");
      }
      m.DoCallback(2);
      e?.(2);
      t?.Stop();
      n.Stop();
      return 2;
    }
  }
  static RemovePhantomArenaAsset(e) {
    var a = ModelManager_1.ModelManager.PreloadModelNew;
    var r = PhantomArenaAssetManager.My1(e);
    if (r) {
      if (r.LoadState !== 4 && (r.LoadState = 4, a.HoldPreloadObject.RemoveEntityAssets(e) || Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "[预加载] 卸载模型还未加载完成", ["Key", e]), PhantomArenaAssetManager.Ey1(e), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("PhantomArena", 10, "[预加载]卸载完成", ["modelId", e]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "[预加载] 重复卸载", ["modelId", e]);
    }
  }
  static PreloadPhantomArenaAssetByCardConfigId(e) {
    var a;
    var r;
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e).EntityConfigId;
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(e);
    if (o) {
      if (a = ModelManager_1.ModelManager.CreatureModel.GetEntityModel(o.BlueprintType)) {
        a = a.ModelId;
        if ((r = PhantomArenaAssetManager.as1.get(a) ?? 0) > 0) {
          PhantomArenaAssetManager.as1.set(a, r + 1);
        } else {
          PhantomArenaAssetManager.as1.set(a, 1);
          PhantomArenaAssetManager.PreloadPhantomArenaAsset(a, () => {});
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "[Preload]蓝图ID不存在", ["BlueprintType", o.BlueprintType]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 10, "[Preload]模型ID不存在", ["entityConfigId", e]);
    }
  }
  static RemovePhantomArenaAssetByCardConfigId(e) {
    var a;
    var r;
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e).EntityConfigId;
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(e);
    if (o) {
      if (a = ModelManager_1.ModelManager.CreatureModel.GetEntityModel(o.BlueprintType)) {
        a = a.ModelId;
        if (!((r = PhantomArenaAssetManager.as1.get(a) ?? 0) <= 0)) {
          if (r > 1) {
            PhantomArenaAssetManager.as1.set(a, r - 1);
          } else {
            PhantomArenaAssetManager.as1.delete(a);
            PhantomArenaAssetManager.RemovePhantomArenaAsset(a);
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "[Remove]蓝图ID不存在", ["BlueprintType", o.BlueprintType]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 10, "[Remove]模型ID不存在", ["entityConfigId", e]);
    }
  }
  static Clear() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "[预加载] 清理");
    }
    for (const e of PhantomArenaAssetManager.Sy1.keys()) {
      PhantomArenaAssetManager.RemovePhantomArenaAsset(e);
    }
    PhantomArenaAssetManager.Sy1.clear();
    PhantomArenaAssetManager.as1.clear();
  }
  static ToString() {
    var e;
    var a;
    var r = new StringBuilder_1.StringBuilder();
    r.Append("ModelIdMap: ");
    for ([e, a] of PhantomArenaAssetManager.as1) {
      r.Append(`[ModelId:${e},Count:${a}]`);
      r.Append(" ");
    }
    return r.ToString();
  }
}
(exports.PhantomArenaAssetManager = PhantomArenaAssetManager).Sy1 = new Map();
PhantomArenaAssetManager.as1 = new Map();
PhantomArenaAssetManager.Iy1 = new LogProfiler_1.LogProfiler("加载声骸竞技场模型资源"); //# sourceMappingURL=PhantomArenaAssetManager.js.map