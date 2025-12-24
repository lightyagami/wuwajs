"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritController = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const SunSpiritCrowdPerform_1 = require("./SunSpiritPerform/SunSpiritCrowdPerform");
const SunSpiritFlyingToGearState_1 = require("./SunSpiritState/SunSpiritFlyingToGearState");
const SunSpiritFlyingToPlayerState_1 = require("./SunSpiritState/SunSpiritFlyingToPlayerState");
const DEBUG_KEY = "SunSpirit";
const TICK_INTERVAL = 33;
const ENABLE_TAGS = [1802753086];
class SunSpiritController extends ControllerBase_1.ControllerBase {
  static get Knm() {
    return !!ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_KEY);
  }
  static OnInit() {
    Net_1.Net.Register(24472, this.Xnm);
    Net_1.Net.Register(29036, this.Ynm);
    Net_1.Net.Register(28576, this.znm);
    Net_1.Net.Register(20576, this.Jnm);
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      ModelManager_1.ModelManager.SundryModel?.ChangeModuleDebugLevel(DEBUG_KEY, 1);
    }
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDone, this.nye)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    return true;
  }
  static I$m() {
    var e;
    var t = ModelManager_1.ModelManager.SunSpiritModel.GetIsSunSpiritEnable();
    if (t) {
      if (e = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig().CrowdAiConfig) {
        ControllerHolder_1.ControllerHolder.CrowdAiController.EnableCrowdAiSystemByConfigAsset(e);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SunSpirit", 39, "日灵: 集群启用失败，日灵集群配置获取不到");
        }
        ControllerHolder_1.ControllerHolder.CrowdAiController.EnableCrowdAiSystemByConfigPath();
      }
    } else {
      ControllerHolder_1.ControllerHolder.CrowdAiController.DisableCrowdAiSystem();
    }
    this.T$m(true);
    if (t) {
      this.AZm();
    } else {
      this.DZm();
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSunSpiritEnableUpdated, t);
  }
  static AZm() {
    if (!UiManager_1.UiManager.IsViewOpen("SunSpiritHintView")) {
      UiManager_1.UiManager.OpenView("SunSpiritHintView");
    }
    if (!UiManager_1.UiManager.IsViewOpen("SunSpiritLauncherHintView")) {
      UiManager_1.UiManager.OpenView("SunSpiritLauncherHintView");
    }
  }
  static DZm() {
    if (UiManager_1.UiManager.IsViewOpen("SunSpiritHintView")) {
      UiManager_1.UiManager.CloseView("SunSpiritHintView");
    }
    if (UiManager_1.UiManager.IsViewOpen("SunSpiritLauncherHintView")) {
      UiManager_1.UiManager.CloseView("SunSpiritLauncherHintView");
    }
  }
  static b$m() {
    var t = ModelManager_1.ModelManager.CreatureModel?.GetPlayerId();
    if (t) {
      let e = false;
      for (const o of ENABLE_TAGS) {
        if (e ||= ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(t, o, true)) {
          break;
        }
      }
      var i = ModelManager_1.ModelManager.SunSpiritModel.GetIsSunSpiritEnable();
      if (i !== e) {
        ModelManager_1.ModelManager.SunSpiritModel.SetIsSunSpiritEnable(e);
      }
      var r = ModelManager_1.ModelManager.SunSpiritModel.GetIsSunSpiritEnable();
      if (i !== r) {
        this.I$m();
      }
    }
  }
  static SetGmOverrideSunSpiritEnable(e) {
    var t = ModelManager_1.ModelManager.SunSpiritModel.GetIsSunSpiritEnable();
    ModelManager_1.ModelManager.SunSpiritModel.GmOverrideIsSunSpiritEnable = e;
    ModelManager_1.ModelManager.SunSpiritModel.IsUsingGmOverrideSunSpiritEnable = true;
    var e = ModelManager_1.ModelManager.SunSpiritModel.GetIsSunSpiritEnable();
    if (t !== e) {
      this.I$m();
    }
  }
  static ClearGmOverrideSunSpiritEnable() {
    var e = ModelManager_1.ModelManager.SunSpiritModel.GetIsSunSpiritEnable();
    ModelManager_1.ModelManager.SunSpiritModel.GmOverrideIsSunSpiritEnable = false;
    ModelManager_1.ModelManager.SunSpiritModel.IsUsingGmOverrideSunSpiritEnable = false;
    var t = ModelManager_1.ModelManager.SunSpiritModel.GetIsSunSpiritEnable();
    if (e !== t) {
      this.I$m();
    }
  }
  static T$m(e) {
    this.R$m.length = 0;
    ModelManager_1.ModelManager.SunSpiritModel?.GetAllSunSpiritDataByPlayerIdAndAreaId(ModelManager_1.ModelManager.CreatureModel?.GetPlayerId(), ModelManager_1.ModelManager.AreaModel?.AreaInfo?.AreaId, true, undefined, this.R$m);
    for (const t of this.R$m) {
      t.RefreshSunSpiritStateByCachedProto(e);
    }
    this.R$m.length = 0;
  }
  static OnClear() {
    Net_1.Net.UnRegister(24472);
    Net_1.Net.UnRegister(29036);
    Net_1.Net.UnRegister(28576);
    Net_1.Net.UnRegister(20576);
    this.DZm();
    this.R$m.length = 0;
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDone, this.nye)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    for (const e of this.Cer) {
      e.EndTask();
    }
    return !(this.Cer.length = 0);
  }
  static OnTick(e) {
    this.tsm(e);
  }
  static tsm(e) {
    this.esm += e;
    if (!(this.esm < TICK_INTERVAL)) {
      var t = this.esm * CommonDefine_1.SECOND_PER_MILLIONSECOND;
      this.esm = 0;
      this.R$m.length = 0;
      ModelManager_1.ModelManager.SunSpiritModel?.GetAllSunSpiritDataByPlayerIdAndAreaId(ModelManager_1.ModelManager.CreatureModel?.GetPlayerId(), ModelManager_1.ModelManager.AreaModel?.AreaInfo?.AreaId, true, undefined, this.R$m);
      for (const i of this.R$m) {
        i.TickState(t);
      }
      this.R$m.length = 0;
    }
  }
  static OnEntityInitSetSunSpirit(e) {
    if (this.Knm) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SunSpirit", 39, "日灵: 列表更新(实体添加)", ["SpiritConfigs", e]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SunSpirit", 39, "日灵: 列表更新(实体添加)");
    }
    for (const t of e) {
      ModelManager_1.ModelManager.SunSpiritModel?.AddOrUpdateSunSpiritDataByPb(t);
    }
  }
  static C8f(f) {
    if (f.aom === Protocol_1.Aki.Protocol.lom.Proto_Fly) {
      const d = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig();
      if (d) {
        const c = [];
        for (const t of f.nom) {
          var e = t.oom?.rom;
          if (e) {
            c.push(e);
          }
        }
        WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("HandleSunSpiritActionOperationNotifyFly", c, () => {
          let e = d.FlyFromPlayerToGearDefaultDuration;
          var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(c[0]);
          var i = Vector_1.Vector.Create();
          let r = false;
          if (t?.Valid) {
            r = !!t.Entity?.GetComponent(334)?.GetSunSpiritSocketLocAndRot(0, i, undefined);
          }
          const o = e = r && (t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy) && (i = Vector_1.Vector.Dist(i, t), (t = d.FlyFromPlayerToGearSpeedForCalc) > 0) ? i / t : e;
          var n = new Map();
          var a = [];
          for (const s of f.nom) {
            if (s.oom) {
              var _ = s.oom.rom;
              let e = n.get(_);
              if (!e) {
                e = [];
                n.set(_, e);
              }
              e.push(s);
            } else {
              a.push(s);
            }
          }
          for (const p of n.values()) {
            p.sort((e, t) => d.FlyFromPlayerToGearInOrderFromMinToMax ? e.oom.c5n - t.oom.c5n : t.oom.c5n - e.oom.c5n);
          }
          var S = d.FlyFromPlayerToGearDelayInterval * CommonDefine_1.MILLIONSECOND_PER_SECOND;
          const l = d.FlyFromPlayerToGearWaitTimeBeforeFly;
          for (const g of n.values()) {
            let e = 0;
            for (const u of g) {
              if (e < TimerSystem_1.MIN_TIME) {
                this.p8f(f, u, l, o);
              } else {
                TimerSystem_1.TimerSystem.Delay(() => {
                  this.p8f(f, u, l, o);
                }, Math.min(e, TimerSystem_1.MAX_TIME));
              }
              e += S;
            }
          }
          for (const M of a) {
            this.p8f(f, M, l, o);
          }
        });
      }
    }
  }
  static v8f(f) {
    if (f.aom === Protocol_1.Aki.Protocol.lom.Proto_Back) {
      const d = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig();
      if (d) {
        const c = [];
        for (const t of f.nom) {
          var e = t.oom?.rom;
          if (e) {
            c.push(e);
          }
        }
        WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("HandleSunSpiritActionOperationNotifyBack", c, () => {
          let e = d.FlyFromGearToPlayerDefaultDuration;
          var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(c[0]);
          var i = Vector_1.Vector.Create();
          let r = false;
          if (t?.Valid) {
            r = !!t.Entity?.GetComponent(334)?.GetSunSpiritSocketLocAndRot(0, i, undefined);
          }
          const o = e = r && (t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy) && (i = Vector_1.Vector.Dist(i, t), (t = d.FlyFromGearToPlayerSpeedForCalc) > 0) ? i / t : e;
          var n = new Map();
          var a = [];
          for (const s of f.nom) {
            if (s.oom) {
              var _ = s.oom.rom;
              let e = n.get(_);
              if (!e) {
                e = [];
                n.set(_, e);
              }
              e.push(s);
            } else {
              a.push(s);
            }
          }
          for (const p of n.values()) {
            p.sort((e, t) => d.FlyFromGearToPlayerInOrderFromMinToMax ? e.oom.c5n - t.oom.c5n : t.oom.c5n - e.oom.c5n);
          }
          var S = d.FlyFromGearToPlayerDelayInterval * CommonDefine_1.MILLIONSECOND_PER_SECOND;
          const l = d.FlyFromGearToPlayerWaitTimeBeforeFly;
          for (const g of n.values()) {
            let e = 0;
            for (const u of g) {
              if (e < TimerSystem_1.MIN_TIME) {
                this.y8f(f, u, l, o);
              } else {
                TimerSystem_1.TimerSystem.Delay(() => {
                  this.y8f(f, u, l, o);
                }, Math.min(e, TimerSystem_1.MAX_TIME));
              }
              e += S;
            }
          }
          for (const M of a) {
            this.y8f(f, M, l, o);
          }
        });
      }
    }
  }
  static p8f(e, t, i, r) {
    var o;
    var n;
    var a = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritDataByPlayerIdAndConfigId(ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), t.r6n, t.A5n);
    if (a) {
      if (t.oom) {
        o = t.oom.rom;
        n = t.oom.c5n;
        i = new SunSpiritFlyingToGearState_1.SunSpiritFlyingToGearState(a, i, r, o, n, () => {
          this.w$m(e, t);
        });
        a.StopAllAndSetNextSunSpiritState(i);
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SunSpirit", 39, "日灵: 操作协议内容有误", ["SpiritConfigId", t.A5n]);
        }
        this.w$m(e, t);
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SunSpirit", 39, "日灵: 执行操作，未找到日灵数据", ["SpiritConfigId", t.A5n]);
      }
      this.w$m(e, t);
    }
  }
  static y8f(e, t, i, r) {
    var o;
    var n;
    var a = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritDataByPlayerIdAndConfigId(ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), t.r6n, t.A5n);
    if (a) {
      if (t.oom) {
        o = t.oom.rom;
        n = t.oom.c5n;
        i = new SunSpiritFlyingToPlayerState_1.SunSpiritFlyingToPlayerState(a, i, r, o, n, () => {
          this.w$m(e, t);
        });
        a.StopAllAndSetNextSunSpiritState(i);
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SunSpirit", 39, "日灵: 操作协议内容有误", ["SpiritConfigId", t.A5n]);
        }
        this.w$m(e, t);
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SunSpirit", 39, "日灵: 执行操作，未找到日灵数据", ["SpiritConfigId", t.A5n]);
      }
      this.w$m(e, t);
    }
  }
  static ism(e) {
    if (this.Knm) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SunSpirit", 39, "日灵: 执行操作完成", ["RelatedSceneItemId", e.F4n], ["OperationType", e.aom], ["SpiritConfigs", e.nom]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SunSpirit", 39, "日灵: 执行操作完成", ["OperationType", e.aom]);
    }
    var t = Protocol_1.Aki.Protocol.eom.create();
    t.w5n = e.w5n;
    t.c5n = e.c5n;
    t.W5n = e.W5n;
    Net_1.Net.Send(24694, t);
  }
  static w$m(e, t) {
    var i = this.L$m.get(e);
    if (i) {
      if (i.has(t)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SunSpirit", 39, "日灵: 执行操作，单个日灵执行操作完成", ["RelatedSceneItemId", e.F4n], ["OperationType", e.aom], ["SunSpiritConfigId", t.A5n]);
        }
        i.delete(t);
        if (i.size === 0) {
          this.L$m.delete(e);
          this.ism(e);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SunSpirit", 39, "日灵: 执行操作，单个日灵执行操作完成回调时，发现所执行的操作已非活跃", ["RelatedSceneItemId", e.F4n], ["OperationType", e.aom], ["SunSpiritConfigId", t.A5n]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("SunSpirit", 39, "日灵: 执行操作，单个日灵执行操作完成回调时，发现所属的操作列表已非活跃", ["RelatedSceneItemId", e.F4n], ["OperationType", e.aom], ["SunSpiritConfigId", t.A5n]);
    }
  }
}
exports.SunSpiritController = SunSpiritController;
(_a = SunSpiritController).nye = () => {
  var e = ModelManager_1.ModelManager.CreatureModel?.GetPlayerId();
  if (e) {
    var t = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(e)?.GetComponent(215);
    if (t) {
      for (const r of ENABLE_TAGS) {
        var i = t.ListenForTagAddOrRemove(r, _a.P$m);
        if (i) {
          _a.Cer.push(i);
        }
      }
      _a.b$m();
    }
  }
};
SunSpiritController.Cer = [];
SunSpiritController.P$m = () => {
  _a.b$m();
};
SunSpiritController.esm = 0;
SunSpiritController.R$m = [];
SunSpiritController.Xnm = e => {
  if (_a.Knm) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SunSpirit", 39, "日灵: 列表初始化", ["SpiritConfigs", e.som]);
    }
  } else if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("SunSpirit", 39, "日灵: 列表初始化");
  }
  for (const t of e.som) {
    ModelManager_1.ModelManager.SunSpiritModel?.AddOrUpdateSunSpiritDataByPb(t);
  }
};
SunSpiritController.Ynm = e => {
  e = e.som;
  if (e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SunSpirit", 39, "日灵: 收集", ["SpiritConfigId", e.A5n]);
    }
    ModelManager_1.ModelManager.SunSpiritModel?.AddOrUpdateSunSpiritDataByPb(e);
  }
};
SunSpiritController.znm = e => {
  if (_a.Knm) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SunSpirit", 39, "日灵: 列表更新", ["SpiritConfigs", e.som]);
    }
  } else if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("SunSpirit", 39, "日灵: 列表更新");
  }
  for (const t of e.som) {
    ModelManager_1.ModelManager.SunSpiritModel?.AddOrUpdateSunSpiritDataByPb(t);
  }
};
SunSpiritController.Jnm = e => {
  if (_a.Knm) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SunSpirit", 39, "日灵: 执行操作", ["RelatedSceneItemId", e.F4n], ["OperationType", e.aom], ["SpiritConfigs", e.nom]);
    }
  } else if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("SunSpirit", 39, "日灵: 执行操作", ["OperationType", e.aom]);
  }
  _a.L$m.set(e, new Set(e.nom));
  switch (e.aom) {
    case Protocol_1.Aki.Protocol.lom.Proto_Fly:
      _a.C8f(e);
      break;
    case Protocol_1.Aki.Protocol.lom.Proto_Back:
      _a.v8f(e);
  }
};
SunSpiritController.L$m = new Map();
SunSpiritController.Zpe = e => {
  ModelManager_1.ModelManager.SunSpiritModel?.GetAllSunSpiritDataByPlayerIdAndAreaId(ModelManager_1.ModelManager.CreatureModel?.GetPlayerId(), ModelManager_1.ModelManager.AreaModel?.AreaInfo?.AreaId, true, undefined, _a.R$m);
  for (const i of _a.R$m) {
    var t;
    if (i.GetSunSpiritState().StateType === 4 && (t = i.GetSunSpiritPerform()) instanceof SunSpiritCrowdPerform_1.SunSpiritCrowdPerform) {
      t.OnBattleStateChanged(e);
    }
  }
}; //# sourceMappingURL=SunSpiritController.js.map