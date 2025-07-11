"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const EffectContext_1 = require("./EffectContext/EffectContext");
const EffectParameterNiagara_1 = require("./EffectParameter/EffectParameterNiagara");
const EffectSystem_1 = require("./EffectSystem");
class TsEffectFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static SpawnEffect(e, t, f, c, n, a, o = false) {
    if (t?.IsValid()) {
      if (n) {
        var i;
        if (!(n.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT)) {
          i = `[蓝图:${t.GetName()}] ${n}`;
          return EffectSystem_1.EffectSystem.SpawnEffect(e, c, f, i, new EffectContext_1.EffectContext(undefined, t, o)) ?? 0;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "TsEffectFunctionLibrary.SpawnEffectWithActor的Reason字符串长度必须大于等于限制字符数量", ["蓝图对象", t.GetName()], ["Reason", n], ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "TsEffectFunctionLibrary.SpawnEffectWithActor的Reason不能使用undefined", ["蓝图对象", t.GetName()], ["Reason", n]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderEffect", 3, "TsEffectFunctionLibrary.SpawnEffect失败，因为CallObject无效", ["Path", f], ["Reason", n]);
    }
  }
  static SpawnEffectUI(e, t, f, c, n) {
    if (t?.IsValid()) {
      if (n) {
        var a;
        if (!(n.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT)) {
          a = `[蓝图:${t.GetName()}] ${n}`;
          return EffectSystem_1.EffectSystem.SpawnEffect(e, c, f, a, new EffectContext_1.EffectContext(undefined, t), 1) ?? 0;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "TsEffectFunctionLibrary.SpawnEffectUI的Reason字符串长度必须大于等于限制字符数量", ["蓝图对象", t.GetName()], ["Reason", n], ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "TsEffectFunctionLibrary.SpawnEffectUI的Reason不能使用undefined", ["蓝图对象", t.GetName()], ["Reason", n]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderEffect", 3, "TsEffectFunctionLibrary.SpawnEffectUI失败，因为CallObject无效", ["Path", f], ["Reason", n]);
    }
  }
  static SpawnEffectWithActor(e, t, f, c, n, a, o, i = false) {
    var r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(e);
    if (r === 2 || r === 4) {
      if (f?.IsValid()) {
        if (t?.IsValid()) {
          if (n) {
            if (!(n.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT)) {
              r = `[蓝图:${t.GetName()}] ${n}`;
              return EffectSystem_1.EffectSystem.SpawnEffectWithActor(e, f, c, r, true, new EffectContext_1.EffectContext(undefined, t, i), false, o.valueOf());
            }
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "TsEffectFunctionLibrary.SpawnEffectWithActor的Reason字符串长度必须大于等于限制字符数量", ["蓝图对象", t.GetName()], ["Reason", n], ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "TsEffectFunctionLibrary.SpawnEffectWithActor的Reason不能使用undefined", ["蓝图对象", t.GetName()], ["Reason", n]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderEffect", 3, "SpawnEffectWithActor失败，因为CallObject无效", ["Actor", f.GetName()], ["Reason", n]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 3, "TsEffectFunctionLibrary.SpawnEffectWithActor失败，因为effectActor参数无效", ["Reason", n]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderEffect", 29, "TsEffectFunctionLibrary.SpawnEffectWithActor仅能于编辑时调用", ["Path", c], ["Reason", n]);
    }
  }
  static InitializeWithPreview(e) {
    EffectSystem_1.EffectSystem.InitializeWithPreview(e);
  }
  static EffectHandleIsValid(e) {
    return EffectSystem_1.EffectSystem.IsValid(e);
  }
  static StopEffect(e, t, f, c, n) {
    var a;
    if (t?.IsValid()) {
      if (f) {
        if (f.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "TsEffectFunctionLibrary.StopEffect的Reason字符串长度必须大于等于限制字符数量", ["蓝图对象", t.GetName()], ["Reason", f], ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT]);
          }
          return false;
        } else if (e) {
          a = `[蓝图:${t.GetName()}] ${f}`;
          return EffectSystem_1.EffectSystem.StopEffectById(e, a, c);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RenderEffect", 3, "特效句柄无效", ["CallObject", t.GetName()], ["Reason", f], ["Handle", e]);
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "TsEffectFunctionLibrary.StopEffect的Reason不能使用undefined", ["蓝图对象", t.GetName()], ["Reason", f], ["Handle", e]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 3, "CallObject无效", ["Reason", f], ["Handle", e]);
      }
      return false;
    }
  }
  static PlayEffect(e, t, f) {
    if (t?.IsValid()) {
      if (f) {
        if (f.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "TsEffectFunctionLibrary.PlayEffect的Reason字符串长度必须大于等于限制字符数量", ["蓝图对象", t.GetName()], ["Reason", f], ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT]);
          }
          return false;
        } else {
          return !!e || (Log_1.Log.CheckError() && Log_1.Log.Error("RenderEffect", 3, "特效句柄无效", ["CallObject", t.GetName()], ["Reason", f], ["Handle", e]), false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "TsEffectFunctionLibrary.PlayEffect的Reason不能使用undefined", ["蓝图对象", t.GetName()], ["Reason", f], ["Handle", e]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 3, "CallObject无效", ["Reason", f], ["Handle", e]);
      }
      return false;
    }
  }
  static SetEffectParameterNiagara(e, t, f, c, n, a) {
    if (e) {
      var o = new EffectParameterNiagara_1.EffectParameterNiagara();
      if (t) {
        var i = (0, puerts_1.$unref)(t);
        var r = i.Num();
        if (r > 0) {
          o.UserParameterFloat = [];
          for (let e = 0; e < r; ++e) {
            o.UserParameterFloat.push([i.Get(e).Name, i.Get(e).Value]);
          }
        }
      }
      if (f) {
        var s = (0, puerts_1.$unref)(f);
        var E = s.Num();
        if (E > 0) {
          o.UserParameterColor = [];
          for (let e = 0; e < E; ++e) {
            o.UserParameterColor.push([s.Get(e).Name, s.Get(e).Value]);
          }
        }
      }
      if (c) {
        var _ = (0, puerts_1.$unref)(c);
        var y = _.Num();
        if (y > 0) {
          o.UserParameterVector = [];
          for (let e = 0; e < y; ++e) {
            o.UserParameterVector.push([_.Get(e).Name, _.Get(e).Value]);
          }
        }
      }
      if (n) {
        var L = (0, puerts_1.$unref)(n);
        var S = L.Num();
        if (S > 0) {
          o.MaterialParameterFloat = [];
          for (let e = 0; e < S; ++e) {
            o.MaterialParameterFloat.push([L.Get(e).Name, L.Get(e).Value]);
          }
        }
      }
      if (a) {
        var g = (0, puerts_1.$unref)(a);
        var l = g.Num();
        if (l > 0) {
          o.MaterialParameterColor = [];
          for (let e = 0; e < l; ++e) {
            o.MaterialParameterColor.push([g.Get(e).Name, g.Get(e).Value]);
          }
        }
      }
      EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, o);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderEffect", 25, "特效句柄无效");
    }
  }
  static EditorTickHandle(e, t) {
    EffectSystem_1.EffectSystem.TickHandleInEditor(e, t);
  }
  static GetEffectActor(e) {
    return EffectSystem_1.EffectSystem.GetSureEffectActor(e);
  }
  static GetPlayType(e) {
    switch (e) {
      case 1:
        return true;
      case 2:
        return false;
      default:
        return;
    }
  }
  static AttachEffectActorToActor(e, t, f, c, n, a, o) {
    if (EffectSystem_1.EffectSystem.IsValid(e) && t) {
      EffectSystem_1.EffectSystem.GetEffectActor(e).K2_AttachToActor(t, f, c, n, a, o);
    }
  }
  static AttachEffectActorToComponent(e, t, f, c, n, a, o) {
    if (EffectSystem_1.EffectSystem.IsValid(e) && t) {
      EffectSystem_1.EffectSystem.GetEffectActor(e).K2_AttachToComponent(t, f, c, n, a, o);
    }
  }
  static SetEffectActorRelativeLocation(e, t, f, c) {
    if (EffectSystem_1.EffectSystem.IsValid(e)) {
      EffectSystem_1.EffectSystem.GetEffectActor(e).D_K2_SetActorRelativeLocation(t, f, undefined, c);
    }
  }
  static SetEffectHiddenInGame(e, t) {
    if (EffectSystem_1.EffectSystem.IsValid(e)) {
      EffectSystem_1.EffectSystem.SetEffectHidden(e, t, "TsEffectFunctionLibrary.SetEffectHiddenInGame");
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderEffect", 45, "设置EffectHiddenInGame,但找不到对应", ["handle", e]);
    }
  }
  static SetEffectIgnoreVisibilityOptimize(e, t) {
    if (EffectSystem_1.EffectSystem.IsValid(e)) {
      EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(e, t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("RenderEffect", 36, "设置EffectIgnoreVisibilityOptimize，句柄失效", ["handle", e]);
    }
  }
  static SetEffectStoppingTime(e, t) {
    if (EffectSystem_1.EffectSystem.IsValid(e)) {
      EffectSystem_1.EffectSystem.SetEffectStoppingTime(e, t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("RenderEffect", 36, "设置EffectStoppingTime，句柄失效", ["handle", e]);
    }
  }
  static SetGlobalStoppingTime(e, t) {
    EffectSystem_1.EffectSystem.SetGlobalStoppingTime(e, t);
  }
  static SetPublicToSequence(e, t) {}
  static SetSimulateFromSequence(e, t) {}
}
exports.default = TsEffectFunctionLibrary;
//# sourceMappingURL=TsEffectFunctionLibrary.js.map