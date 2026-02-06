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
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../Ui/UiLayer");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const SunSpiritCrowdPerform_1 = require("./SunSpiritPerform/SunSpiritCrowdPerform");
const SunSpiritFlyingToGearState_1 = require("./SunSpiritState/SunSpiritFlyingToGearState");
const SunSpiritFlyingToPlayerState_1 = require("./SunSpiritState/SunSpiritFlyingToPlayerState");
const SunSpiritHintView_1 = require("./View/SunSpiritHintView");
const SunSpiritLauncherHintView_1 = require("./View/SunSpiritLauncherHintView");
const DEBUG_KEY = "SunSpirit";
const TICK_INTERVAL = 33;
const ENABLE_TAGS = [1802753086];
class SunSpiritController extends ControllerBase_1.ControllerBase {
  static get Knm() {
    return !!ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_KEY);
  }
  static OnInit() {
    Net_1.Net.Register(19989, this.Xnm);
    Net_1.Net.Register(28132, this.Ynm);
    Net_1.Net.Register(28229, this.znm);
    Net_1.Net.Register(17440, this.Jnm);
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      ModelManager_1.ModelManager.SundryModel?.ChangeModuleDebugLevel(DEBUG_KEY, 1);
    }
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDone, this.nye)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    return true;
  }
  static SQm() {
    const i = ModelManager_1.ModelManager.SunSpiritModel.GetIsSunSpiritEnable();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SunSpirit", 39, "日灵系统开启状态更新", ["NewEnable", i]);
    }
    if (i) {
      ModelManager_1.ModelManager.SunSpiritModel.LoadAndInitSunSpiritConfig(false, e => {
        if (e) {
          if (e = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig().CrowdAiConfig) {
            ControllerHolder_1.ControllerHolder.CrowdAiController.EnableCrowdAiSystemByConfigAsset(e);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SunSpirit", 39, "日灵: 集群启用失败，日灵集群配置获取不到");
            }
            ControllerHolder_1.ControllerHolder.CrowdAiController.EnableCrowdAiSystemByConfigPath();
          }
          this.MQm(true);
          this.w0f();
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSunSpiritEnableUpdated, i);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SunSpirit", 39, "日灵系统开启失败，加载并初始化SunSpiritConfig时被中断");
        }
      });
    } else {
      ControllerHolder_1.ControllerHolder.CrowdAiController.DisableCrowdAiSystem();
      ModelManager_1.ModelManager.SunSpiritModel?.ClearAndReleaseSunSpiritConfig();
      this.MQm(true);
      this.L0f();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSunSpiritEnableUpdated, i);
    }
  }
  static w0f() {
    if (!this.CNg) {
      this.CNg = new SunSpiritHintView_1.SunSpiritHintView();
      this.CNg.CreateByResourceIdAsync("UiItem_LaHaiLuoRiLing", UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.HUD));
    }
    if (!this.pNg) {
      this.pNg = new SunSpiritLauncherHintView_1.SunSpiritLauncherHintView();
      this.pNg.CreateByResourceIdAsync("UiItem_LaHaiLuoRiLing", UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.HUD));
    }
  }
  static L0f() {
    if (this.CNg) {
      this.CNg.Destroy();
      this.CNg = undefined;
    }
    if (this.pNg) {
      this.pNg.Destroy();
      this.pNg = undefined;
    }
  }
  static EQm() {
    var i = ModelManager_1.ModelManager.CreatureModel?.GetPlayerId();
    if (i) {
      let e = false;
      for (const t of ENABLE_TAGS) {
        if (e ||= ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(i, t, true)) {
          break;
        }
      }
      this.SetSunSpiritEnable(e);
    }
  }
  static SetSunSpiritEnable(e) {
    var i = ModelManager_1.ModelManager.SunSpiritModel.GetIsSunSpiritEnable();
    if (i !== e) {
      ModelManager_1.ModelManager.SunSpiritModel.SetIsSunSpiritEnable(e);
    }
    var e = ModelManager_1.ModelManager.SunSpiritModel.GetIsSunSpiritEnable();
    if (i !== e) {
      this.SQm();
    }
  }
  static SetGmOverrideSunSpiritEnable(e) {
    var i = ModelManager_1.ModelManager.SunSpiritModel.GetIsSunSpiritEnable();
    ModelManager_1.ModelManager.SunSpiritModel.GmOverrideIsSunSpiritEnable = e;
    ModelManager_1.ModelManager.SunSpiritModel.IsUsingGmOverrideSunSpiritEnable = true;
    var e = ModelManager_1.ModelManager.SunSpiritModel.GetIsSunSpiritEnable();
    if (i !== e) {
      this.SQm();
    }
  }
  static ClearGmOverrideSunSpiritEnable() {
    var e = ModelManager_1.ModelManager.SunSpiritModel.GetIsSunSpiritEnable();
    ModelManager_1.ModelManager.SunSpiritModel.GmOverrideIsSunSpiritEnable = false;
    ModelManager_1.ModelManager.SunSpiritModel.IsUsingGmOverrideSunSpiritEnable = false;
    var i = ModelManager_1.ModelManager.SunSpiritModel.GetIsSunSpiritEnable();
    if (e !== i) {
      this.SQm();
    }
  }
  static MQm(e) {
    this.IQm.length = 0;
    ModelManager_1.ModelManager.SunSpiritModel?.GetAllSunSpiritDataByPlayerIdAndAreaId(ModelManager_1.ModelManager.CreatureModel?.GetPlayerId(), ModelManager_1.ModelManager.AreaModel?.AreaInfo?.AreaId, true, undefined, this.IQm);
    for (const i of this.IQm) {
      i.RefreshSunSpiritStateByCachedProto(e);
    }
    this.IQm.length = 0;
  }
  static OnClear() {
    Net_1.Net.UnRegister(19989);
    Net_1.Net.UnRegister(28132);
    Net_1.Net.UnRegister(28229);
    Net_1.Net.UnRegister(17440);
    this.L0f();
    this.IQm.length = 0;
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
    this.vNg(e);
  }
  static vNg(e) {
    if (this.CNg) {
      this.CNg.Tick(e);
    }
    if (this.pNg) {
      this.pNg.Tick(e);
    }
  }
  static tsm(e) {
    this.esm += e;
    if (!(this.esm < TICK_INTERVAL)) {
      var i = this.esm * CommonDefine_1.SECOND_PER_MILLIONSECOND;
      this.esm = 0;
      this.IQm.length = 0;
      ModelManager_1.ModelManager.SunSpiritModel?.GetAllSunSpiritDataByPlayerIdAndAreaId(ModelManager_1.ModelManager.CreatureModel?.GetPlayerId(), ModelManager_1.ModelManager.AreaModel?.AreaInfo?.AreaId, true, undefined, this.IQm);
      for (const t of this.IQm) {
        t.TickState(i);
      }
      this.IQm.length = 0;
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
    for (const i of e) {
      ModelManager_1.ModelManager.SunSpiritModel?.AddOrUpdateSunSpiritDataByPb(i, true);
    }
  }
  static RYf(d) {
    if (d.aom === Protocol_1.Aki.Protocol.lom.Proto_Fly) {
      const M = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig();
      if (M) {
        const c = [];
        for (const i of d.nom) {
          var e = i.oom?.rom;
          if (e) {
            c.push(e);
          }
          ModelManager_1.ModelManager.SunSpiritModel?.AddOrUpdateSunSpiritDataByPb(i, false);
        }
        WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("HandleSunSpiritActionOperationNotifyFly", c, () => {
          let e = M.FlyFromPlayerToGearDefaultDuration;
          var i = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(c[0]);
          var t = Vector_1.Vector.Create();
          let r = false;
          if (i?.Valid) {
            r = !!i.Entity?.GetComponent(336)?.GetSunSpiritSocketLocAndRot(0, t, undefined);
          }
          const o = e = r && (i = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy) && (t = Vector_1.Vector.Dist(t, i), (i = M.FlyFromPlayerToGearSpeedForCalc) > 0) ? t / i : e;
          var n = new Map();
          var a = [];
          for (const l of d.nom) {
            if (l.oom) {
              var _ = l.oom.rom;
              let e = n.get(_);
              if (!e) {
                e = [];
                n.set(_, e);
              }
              e.push(l);
            } else {
              a.push(l);
            }
          }
          for (const p of n.values()) {
            p.sort((e, i) => M.FlyFromPlayerToGearInOrderFromMinToMax ? e.oom.c5n - i.oom.c5n : i.oom.c5n - e.oom.c5n);
          }
          var S = M.FlyFromPlayerToGearDelayInterval * CommonDefine_1.MILLIONSECOND_PER_SECOND;
          const s = M.FlyFromPlayerToGearWaitTimeBeforeFly;
          for (const g of n.values()) {
            let e = 0;
            for (const u of g) {
              if (e < TimerSystem_1.MIN_TIME) {
                this.LYf(d, u, s, o);
              } else {
                TimerSystem_1.TimerSystem.Delay(() => {
                  this.LYf(d, u, s, o);
                }, Math.min(e, TimerSystem_1.MAX_TIME));
              }
              e += S;
            }
          }
          for (const f of a) {
            this.LYf(d, f, s, o);
          }
        });
      }
    }
  }
  static wYf(d) {
    if (d.aom === Protocol_1.Aki.Protocol.lom.Proto_Back) {
      const M = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig();
      if (M) {
        const c = [];
        for (const i of d.nom) {
          var e = i.oom?.rom;
          if (e) {
            c.push(e);
          }
        }
        WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("HandleSunSpiritActionOperationNotifyBack", c, () => {
          let e = M.FlyFromGearToPlayerDefaultDuration;
          var i = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(c[0]);
          var t = Vector_1.Vector.Create();
          let r = false;
          if (i?.Valid) {
            r = !!i.Entity?.GetComponent(336)?.GetSunSpiritSocketLocAndRot(0, t, undefined);
          }
          const o = e = r && (i = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy) && (t = Vector_1.Vector.Dist(t, i), (i = M.FlyFromGearToPlayerSpeedForCalc) > 0) ? t / i : e;
          var n = new Map();
          var a = [];
          for (const l of d.nom) {
            if (l.oom) {
              var _ = l.oom.rom;
              let e = n.get(_);
              if (!e) {
                e = [];
                n.set(_, e);
              }
              e.push(l);
            } else {
              a.push(l);
            }
          }
          for (const p of n.values()) {
            p.sort((e, i) => M.FlyFromGearToPlayerInOrderFromMinToMax ? e.oom.c5n - i.oom.c5n : i.oom.c5n - e.oom.c5n);
          }
          var S = M.FlyFromGearToPlayerDelayInterval * CommonDefine_1.MILLIONSECOND_PER_SECOND;
          const s = M.FlyFromGearToPlayerWaitTimeBeforeFly;
          for (const g of n.values()) {
            let e = 0;
            for (const u of g) {
              if (e < TimerSystem_1.MIN_TIME) {
                this.PYf(d, u, s, o);
              } else {
                TimerSystem_1.TimerSystem.Delay(() => {
                  this.PYf(d, u, s, o);
                }, Math.min(e, TimerSystem_1.MAX_TIME));
              }
              e += S;
            }
          }
          for (const f of a) {
            this.PYf(d, f, s, o);
          }
        });
      }
    }
  }
  static LYf(e, i, t, r) {
    var o;
    var n;
    var a = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritDataByPlayerIdAndConfigId(ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), i.r6n, i.A5n);
    if (a) {
      if (i.oom) {
        o = i.oom.rom;
        n = i.oom.c5n;
        t = new SunSpiritFlyingToGearState_1.SunSpiritFlyingToGearState(a, t, r, o, n, () => {
          this.TQm(e, i);
        });
        a.StopAllAndSetNextSunSpiritState(t);
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SunSpirit", 39, "日灵: 操作协议内容有误", ["SpiritConfigId", i.A5n]);
        }
        this.TQm(e, i);
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SunSpirit", 39, "日灵: 执行操作，未找到日灵数据", ["SpiritConfigId", i.A5n]);
      }
      this.TQm(e, i);
    }
  }
  static PYf(e, i, t, r) {
    var o;
    var n;
    var a = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritDataByPlayerIdAndConfigId(ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), i.r6n, i.A5n);
    if (a) {
      if (i.oom) {
        o = i.oom.rom;
        n = i.oom.c5n;
        t = new SunSpiritFlyingToPlayerState_1.SunSpiritFlyingToPlayerState(a, t, r, o, n, () => {
          this.TQm(e, i);
        });
        a.StopAllAndSetNextSunSpiritState(t);
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SunSpirit", 39, "日灵: 操作协议内容有误", ["SpiritConfigId", i.A5n]);
        }
        this.TQm(e, i);
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SunSpirit", 39, "日灵: 执行操作，未找到日灵数据", ["SpiritConfigId", i.A5n]);
      }
      this.TQm(e, i);
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
    var i = Protocol_1.Aki.Protocol.eom.create();
    i.w5n = e.w5n;
    i.c5n = e.c5n;
    i.W5n = e.W5n;
    Net_1.Net.Send(29686, i);
  }
  static TQm(e, i) {
    var t = this.bQm.get(e);
    if (t) {
      if (t.has(i)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SunSpirit", 39, "日灵: 执行操作，单个日灵执行操作完成", ["RelatedSceneItemId", e.F4n], ["OperationType", e.aom], ["SunSpiritConfigId", i.A5n]);
        }
        t.delete(i);
        if (t.size === 0) {
          this.bQm.delete(e);
          if (e.aom === Protocol_1.Aki.Protocol.lom.Proto_Fly) {
            for (const r of e.nom) {
              ModelManager_1.ModelManager.SunSpiritModel?.AddOrUpdateSunSpiritDataByPb(r, true);
            }
          }
          this.ism(e);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SunSpirit", 39, "日灵: 执行操作，单个日灵执行操作完成回调时，发现所执行的操作已非活跃", ["RelatedSceneItemId", e.F4n], ["OperationType", e.aom], ["SunSpiritConfigId", i.A5n]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("SunSpirit", 39, "日灵: 执行操作，单个日灵执行操作完成回调时，发现所属的操作列表已非活跃", ["RelatedSceneItemId", e.F4n], ["OperationType", e.aom], ["SunSpiritConfigId", i.A5n]);
    }
  }
}
exports.SunSpiritController = SunSpiritController;
(_a = SunSpiritController).nye = () => {
  var e = ModelManager_1.ModelManager.CreatureModel?.GetPlayerId();
  if (e) {
    var i = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(e)?.GetComponent(217);
    if (i) {
      for (const r of ENABLE_TAGS) {
        var t = i.ListenForTagAddOrRemove(r, _a.RQm);
        if (t) {
          _a.Cer.push(t);
        }
      }
      _a.EQm();
    }
  }
};
SunSpiritController.CNg = undefined;
SunSpiritController.pNg = undefined;
SunSpiritController.Cer = [];
SunSpiritController.RQm = () => {
  _a.EQm();
};
SunSpiritController.esm = 0;
SunSpiritController.IQm = [];
SunSpiritController.Xnm = e => {
  if (_a.Knm) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SunSpirit", 39, "日灵: 列表初始化", ["SpiritConfigs", e.som]);
    }
  } else if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("SunSpirit", 39, "日灵: 列表初始化");
  }
  for (const i of e.som) {
    ModelManager_1.ModelManager.SunSpiritModel?.AddOrUpdateSunSpiritDataByPb(i, true);
  }
};
SunSpiritController.Ynm = e => {
  e = e.som;
  if (e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SunSpirit", 39, "日灵: 收集", ["SpiritConfigId", e.A5n]);
    }
    ModelManager_1.ModelManager.SunSpiritModel?.AddOrUpdateSunSpiritDataByPb(e, true);
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
  for (const i of e.som) {
    ModelManager_1.ModelManager.SunSpiritModel?.AddOrUpdateSunSpiritDataByPb(i, true);
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
  _a.bQm.set(e, new Set(e.nom));
  switch (e.aom) {
    case Protocol_1.Aki.Protocol.lom.Proto_Fly:
      _a.RYf(e);
      break;
    case Protocol_1.Aki.Protocol.lom.Proto_Back:
      _a.wYf(e);
  }
};
SunSpiritController.bQm = new Map();
SunSpiritController.Zpe = e => {
  ModelManager_1.ModelManager.SunSpiritModel?.GetAllSunSpiritDataByPlayerIdAndAreaId(ModelManager_1.ModelManager.CreatureModel?.GetPlayerId(), ModelManager_1.ModelManager.AreaModel?.AreaInfo?.AreaId, true, undefined, _a.IQm);
  for (const t of _a.IQm) {
    var i;
    if (t.GetSunSpiritState().StateType === 4 && (i = t.GetSunSpiritPerform()) instanceof SunSpiritCrowdPerform_1.SunSpiritCrowdPerform) {
      i.OnBattleStateChanged(e);
    }
  }
}; //# sourceMappingURL=SunSpiritController.js.map