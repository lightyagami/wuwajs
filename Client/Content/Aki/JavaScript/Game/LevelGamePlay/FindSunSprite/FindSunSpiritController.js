"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindSunSpiritController = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const FindSunSpiritById_1 = require("../../../Core/Define/ConfigQuery/FindSunSpiritById");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ILevelPlay_1 = require("../../../UniverseEditor/Interface/ILevelPlay");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine");
const LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine");
const UiManager_1 = require("../../Ui/UiManager");
const FindSunSpiritModel_1 = require("./FindSunSpiritModel");
const FindSunSpiritPerformManager_1 = require("./Performance/FindSunSpiritPerformManager");
class FindSunSpiritController {
  static StartFindSunSpirit(e, r, i = 0) {
    const o = ModelManager_1.ModelManager.FindSunSpiritModel;
    o.Config = e;
    o.ResetTimes = 0;
    o.OnFindSunSpiritFinish = r;
    var r = ModelManager_1.ModelManager.CameraModel?.CurrentCameraActor;
    if (r && (o.CurrentCameraActor = r, cpp_1.FKuroGameBudgetAllocatorInterface.AddAssistantActor(r), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("LevelPlay", 48, "虚影找日灵，添加当前相机为辅助Actor");
    }
    var r = Vector_1.Vector.Create();
    r.FromConfigVector(e.Pos);
    o.LevelPosition = r;
    var r = Rotator_1.Rotator.Create();
    var a = e.Direction;
    r.Set(a.Y ?? 0, a.Z ?? 0, a.X ?? 0);
    o.LevelRotator = r;
    var a = Quat_1.Quat.Create();
    r.Quaternion(a);
    o.LevelQuat = a;
    var t = new Array();
    for (const i of e.TargetLocationIds) {
      var n;
      var l = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(i);
      if (l &&= l.Transform) {
        (n = new FindSunSpiritModel_1.FindSunSpiritEndTarget()).TargetLocation.FromConfigVector(l.Pos);
        l = l.Rot;
        n.TargetRotator.Set(l?.Y ?? 0, l?.Z ?? 0, l?.X ?? 0);
        t.push(n);
      }
    }
    o.LevelEndTargetList = t;
    if (i > 0 && (r = ModelManager_1.ModelManager.CreatureModel.GetEntityData(i))) {
      o.UploadInfo = {
        PbDataId: i,
        BlueprintType: r.BlueprintType
      };
    }
    const _ = e.Id;
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_FindSunSpiritGlobalConfig_C", () => {
      ResourceSystem_1.ResourceSystem.LoadAsync("/Game/Aki/GamePlay/FindSunSpirit/DA_FindSunSpiritGlobalConfig.DA_FindSunSpiritGlobalConfig", UE.BP_FindSunSpiritGlobalConfig_C, e => {
        var r;
        var i;
        if (e?.IsValid()) {
          o.GlobalConfig = e;
          o.TriggerCooldownTime = e.射击冷却时间;
          o.FailResetDelayTime = e.失败重置延迟时间;
          this.dig(false, _);
          e = o.UploadInfo;
          r = o.LevelConfig;
          if (e && r) {
            (i = new LogReportDefine_1.FindSunSpiritStartLogEvent()).i_config_id = e.PbDataId;
            i.i_id = _;
            i.s_type_name = e.BlueprintType;
            i.i_paint_count = r.MaxStep;
            ControllerHolder_1.ControllerHolder.LogReportController.LogReport(i);
          }
        } else {
          this.FinishFindSunSpirit();
        }
      });
    });
  }
  static ResetFindSunSpirit(e) {
    var r = ModelManager_1.ModelManager.FindSunSpiritModel;
    if (r.IsGameplayReady) {
      r.IsTriggerCooldown = false;
      r.TriggerCooldownTimer?.Remove();
      r.TriggerCooldownTimer = undefined;
      r.IsGameFinish = false;
      r.IsGameplayReady = false;
      r.ResetTimes++;
      const i = r.Config.DifficultyReductionConfig;
      if (!i || r.ResetTimes < i.LoseTimes || r.LevelConfig.CurrentLevelId === i.SubstituteId) {
        this.dig(true);
        e?.();
      } else {
        (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(453)).FunctionMap.set(1, () => {
          this.dig(true);
          e?.();
        });
        r.FunctionMap.set(2, () => {
          this.dig(true, i.SubstituteId);
          e?.();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
      }
    }
  }
  static dig(e, r = 0) {
    const i = r > 0 && r !== ModelManager_1.ModelManager.FindSunSpiritModel.LevelConfig?.CurrentLevelId;
    if (i) {
      this.CAf(r);
    }
    this.f4f();
    if (UiManager_1.UiManager.IsViewOpen("FindSunSpiritView")) {
      this.mig(i, e);
    } else {
      UiManager_1.UiManager.OpenView("FindSunSpiritView", undefined, () => {
        this.mig(i, e);
      });
    }
  }
  static CAf(e) {
    var r = ModelManager_1.ModelManager.FindSunSpiritModel.GlobalConfig;
    if (r?.IsValid()) {
      var i = new FindSunSpiritModel_1.FindSunSpiritLevelConfig();
      ModelManager_1.ModelManager.FindSunSpiritModel.LevelConfig = i;
      var o = FindSunSpiritById_1.configFindSunSpiritById.GetConfig(e);
      if (o) {
        try {
          var a = JSON.parse(o.Level);
          i.CurrentLevelId = e;
          i.MaxStep = a.MaxTimes ?? -1;
          i.MaxDropHeight = a.MaxJumpHeight;
          var t = a.GridConfig;
          var n = t.BoardSize;
          var l = n?.Y ?? 0;
          const w = n?.X ?? 0;
          if (l <= 0 || w <= 0) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelPlay", 48, "虚影找日灵配置关卡大小异常", ["Id", e]);
            }
          } else {
            i.LevelWidth = w;
            i.LevelHeight = l;
            var _ = t.Grids;
            var d = _.length;
            var s = new Array(d);
            var v = l - 1;
            var M = [];
            var u = r.扩散影响范围;
            var g = u.Num();
            for (let e = 0; e < g; e++) {
              var S = u.Get(e);
              M.push([S.X, S.Y]);
            }
            for (let e = 0; e < d; e++) {
              var c = _[e];
              var f = Math.floor(e / w);
              var p = e + (v - f * 2) * w;
              var L = c.Type;
              var y = new FindSunSpiritModel_1.FindSunSpiritGrid();
              y.Type = L;
              s[p] = y;
              switch (L) {
                case ILevelPlay_1.EFindSunSpiritGridType.Empty:
                  y.IsBlock = false;
                  break;
                case ILevelPlay_1.EFindSunSpiritGridType.NormalFloor:
                  y.IsBlock = true;
                  break;
                case ILevelPlay_1.EFindSunSpiritGridType.MutableFloor:
                  y.IsMutable = true;
                  y.IsBlock = c.State === ILevelPlay_1.EFindSunSpiritGridState.Physical;
                  break;
                case ILevelPlay_1.EFindSunSpiritGridType.BeginFloor:
                  y.IsBlock = false;
                  i.SunSpiritStartGridIndices.push(p);
                  break;
                case ILevelPlay_1.EFindSunSpiritGridType.EndFloor:
                  y.IsBlock = false;
                  i.SunSpiritEndIndex = p;
              }
              if (L === ILevelPlay_1.EFindSunSpiritGridType.Empty || L === ILevelPlay_1.EFindSunSpiritGridType.NormalFloor || L === ILevelPlay_1.EFindSunSpiritGridType.MutableFloor) {
                if (c.SpreadDevice) {
                  var h = new FindSunSpiritModel_1.FindSunSpiritModifier();
                  var P = (h.GridIndex = p) % w;
                  var F = Math.floor(p / w);
                  h.GridX = P;
                  h.GridY = F;
                  for (const q of M) {
                    var m;
                    var C = P + (q[0] ?? 0);
                    var I = F + (q[1] ?? 0);
                    if (!(C < 0) && !(C >= w) && !(I < 0) && !(l <= I)) {
                      m = I * w + C;
                      h.ModifyIndexSet.add(m);
                    }
                  }
                  i.ModifierList.push(h);
                }
              }
            }
            i.ModifierList.sort((e, r) => {
              var i = e.GridX - r.GridX;
              if (i != 0) {
                return i;
              } else {
                return r.GridY - e.GridY;
              }
            });
            i.SunSpiritStartGridIndices.sort((e, r) => {
              var i = e % w - r % w;
              if (i != 0) {
                return i;
              } else {
                return Math.floor(r / w) - Math.floor(e / w);
              }
            });
            i.GridList = s;
          }
        } catch (e) {
          if (e instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("LevelPlay", 48, "虚影找日灵配置异常", e, ["error", e.message]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelPlay", 48, "虚影找日灵配置异常", ["error", e]);
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 48, "虚影找日灵配置不存在", ["Id", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 48, "虚影找日灵全局配置缺失");
    }
  }
  static f4f() {
    var r = ModelManager_1.ModelManager.FindSunSpiritModel;
    var i = r.LevelConfig;
    if (i) {
      var o = i.GridList;
      var a = o?.length ?? 0;
      var t = i.LevelWidth;
      var n = i.LevelHeight;
      var l = i.ModifierList?.length ?? 0;
      if ((a <= 0 || l <= 0 || t <= 0 || n <= 0) && Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 48, "虚影找日灵配置异常", ["gridLength", a], ["modifierLength", l], ["Width", t], ["Height", n]);
      }
      let e = r.LevelPlay;
      if (!e) {
        e = new FindSunSpiritModel_1.FindSunSpiritLevelPlay();
        r.LevelPlay = e;
      }
      var _ = e.GridList;
      var d = _.length;
      for (let e = 0; e < a; e++) {
        var s = o[e];
        var v = e >= d ? new FindSunSpiritModel_1.FindSunSpiritGrid() : _[e];
        v.Type = s.Type;
        v.IsBlock = s.IsBlock;
        v.IsMutable = s.IsMutable;
        _[e] = v;
      }
      e.SunSpiritIndexSet.clear();
      for (const M of i.SunSpiritStartGridIndices) {
        e.SunSpiritIndexSet.add(M);
      }
      e.SunSpiritNum = e.SunSpiritIndexSet.size;
      e.CurrentStep = 0;
      e.SelectedModifierIndex = 0;
    }
  }
  static mig(e, r) {
    const i = ModelManager_1.ModelManager.FindSunSpiritModel;
    let o = i.PerformManager;
    if (!o) {
      o = new FindSunSpiritPerformManager_1.FindSunSpiritPerformManager();
      i.PerformManager = o;
    }
    o.RefreshPerformAsync(e, r).finally(() => {
      i.IsGameplayReady = true;
      this.$Wf();
    });
  }
  static FinishFindSunSpirit() {
    var e;
    var r;
    var i;
    var o;
    var a = ModelManager_1.ModelManager.FindSunSpiritModel;
    var t = a.CurrentCameraActor;
    if (t && (cpp_1.FKuroGameBudgetAllocatorInterface.RemoveAssistantActor(t), a.CurrentCameraActor = undefined, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("LevelPlay", 48, "虚影找日灵，移除辅助Actor");
    }
    var t = a.GameFinishResult;
    if (t && (e = a.UploadInfo, r = a.LevelPlay, i = a.LevelConfig, e) && r && i) {
      (o = new LogReportDefine_1.FindSunSpiritFinishLogEvent()).i_config_id = e.PbDataId;
      o.i_id = i.CurrentLevelId;
      o.s_type_name = e.BlueprintType;
      o.i_paint_count = r.CurrentStep;
      o.i_count = a.ResetTimes;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(o);
    }
    ModelManager_1.ModelManager.FindSunSpiritModel.OnFindSunSpiritFinish?.(t);
    this.vAf(t);
  }
  static vAf(e) {
    var r = ModelManager_1.ModelManager.FindSunSpiritModel;
    r.GlobalConfig = undefined;
    r.Config = undefined;
    r.LevelPosition = undefined;
    r.LevelRotator = undefined;
    r.ResetTimes = 0;
    r.IsGameFinish = false;
    r.GameFinishResult = false;
    r.OnFindSunSpiritFinish = undefined;
    r.LevelConfig = undefined;
    r.IsGameplayReady = false;
    r.LevelPlay = undefined;
    r.PerformManager?.ClearPerform(!e);
    r.PerformManager = undefined;
    r.UploadInfo = undefined;
    r.IsTriggerCooldown = false;
    r.TriggerCooldownTime = 0;
    r.TriggerCooldownTimer?.Remove();
    r.TriggerCooldownTimer = undefined;
    r.FailResetDelayTime = 0;
  }
  static SelectModifier(e) {
    var r;
    var i;
    var o;
    var a;
    var t = ModelManager_1.ModelManager.FindSunSpiritModel;
    if (t.IsGameplayReady && (i = t.LevelConfig, r = t.LevelPlay, t = t.PerformManager, o = (i = i.ModifierList).length, r) && o > 1) {
      a = r.SelectedModifierIndex;
      e = e ? r.SelectedModifierIndex + 1 : r.SelectedModifierIndex - 1;
      r.SelectedModifierIndex = e = (e + o) % o;
      t.SelectModifier(i[a].GridIndex, i[e].GridIndex);
    }
  }
  static TriggerModifierAndFindPaths() {
    var e = ModelManager_1.ModelManager.FindSunSpiritModel;
    if (e.IsGameplayReady && !e.IsTriggerCooldown) {
      var r = e.LevelConfig;
      var i = e.LevelPlay;
      var o = e.PerformManager;
      var a = r.ModifierList[i.SelectedModifierIndex];
      var t = i.GridList;
      for (const l of a.ModifyIndexSet) {
        var n = t[l];
        if (n.IsMutable) {
          n.IsBlock = !n.IsBlock;
        }
      }
      o.TriggerModifier(a.GridIndex);
      o = this.$Wf();
      i.CurrentStep++;
      if (o) {
        for (const _ of o) {
          i.SunSpiritIndexSet.delete(_[0]);
        }
      }
      if (i.SunSpiritIndexSet.size <= 0) {
        e.IsGameFinish = true;
        e.GameFinishResult = true;
      } else if (i.CurrentStep >= r.MaxStep) {
        e.IsGameFinish = true;
        e.GameFinishResult = false;
      }
      return o;
    }
  }
  static IsTriggerCooldown() {
    return ModelManager_1.ModelManager.FindSunSpiritModel.IsTriggerCooldown;
  }
  static StartTriggerCooldown() {
    const e = ModelManager_1.ModelManager.FindSunSpiritModel;
    e.IsTriggerCooldown = true;
    e.TriggerCooldownTimer?.Remove();
    e.TriggerCooldownTimer = undefined;
    e.TriggerCooldownTimer = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      e.TriggerCooldownTimer = undefined;
      e.IsTriggerCooldown = false;
    }, e.TriggerCooldownTime);
  }
  static async PlaySunSpiritPerformAsync(e) {
    await ModelManager_1.ModelManager.FindSunSpiritModel.PerformManager.PlaySunSpiritPerformAsync(e);
  }
  static $Wf() {
    var e = ModelManager_1.ModelManager.FindSunSpiritModel;
    var r = e.LevelConfig;
    var i = e.LevelPlay;
    var o = e.PerformManager;
    var a = new Array();
    var t = r.SunSpiritEndIndex;
    for (const _ of i.SunSpiritIndexSet) {
      var n = this.yAf(_, t);
      var l = n.length;
      if (l > 1) {
        if (n[l - 1] === t) {
          a.push(n);
          o.ShowGuideLine(n, true);
        } else {
          o.ShowGuideLine(n, false);
        }
      }
    }
    if (a.length <= 0) {
      return undefined;
    } else {
      return a;
    }
  }
  static yAf(e, r) {
    var i = [];
    let o = e;
    while (o >= 0 && (i.push(o), o !== r)) {
      o = this.SAf(o);
    }
    if (i.length <= 1) {
      return i;
    }
    var a = i.length - 1;
    var t = [];
    t.push(i[0]);
    for (let e = 1; e < a; e++) {
      var n = i[e];
      if (i[e + 1] - n != 1 || n - i[e - 1] != 1) {
        t.push(n);
      }
    }
    t.push(i[a]);
    return t;
  }
  static SAf(e) {
    var r;
    var i = ModelManager_1.ModelManager.FindSunSpiritModel;
    var o = i.LevelConfig.LevelWidth;
    var a = i.LevelConfig.MaxDropHeight;
    var t = i.LevelPlay.GridList;
    var n = t.length;
    var i = e + 1;
    if (n <= i || i % o == 0) {
      return -1;
    }
    if (t[i].IsBlock) {
      if (n <= (r = i + o) || t[r].IsBlock || i < n && t[e + o].IsBlock) {
        return -1;
      } else {
        return r;
      }
    }
    let l = 0;
    let _ = false;
    let d = i;
    let s = i - o;
    while (s >= 0 && s < n && (!(a > 0) || !(l > a))) {
      if (t[s].IsBlock) {
        _ = true;
        break;
      }
      l++;
      d = s;
      s -= o;
    }
    if (_) {
      return d;
    } else {
      return -1;
    }
  }
}
exports.FindSunSpiritController = FindSunSpiritController;
//# sourceMappingURL=FindSunSpiritController.js.map