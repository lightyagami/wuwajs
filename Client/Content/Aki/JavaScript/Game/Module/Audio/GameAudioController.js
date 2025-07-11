"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameAudioController = exports.CHECK_TIME_OUT_COOLDOWN_RECORD = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const RoleMorphAudioRulesAll_1 = require("../../../Core/Define/ConfigQuery/RoleMorphAudioRulesAll");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const StateRef_1 = require("../../../Core/Utils/Audio/StateRef");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const RoleAudioVolumeInfo_1 = require("./RoleAudioVolumeInfo");
exports.CHECK_TIME_OUT_COOLDOWN_RECORD = 20000;
class EnvironmentCache {
  constructor() {
    this.StateEvent = "";
    this.StateEvent_MusicCompatible = "";
    this.DynamicReverbRtpc1 = 0;
    this.DynamicReverbRtpc2 = 0;
    this.DynamicReverbEnabled = false;
  }
}
class GameAudioController extends ControllerBase_1.ControllerBase {
  static UpdatePlayerLocation(e) {
    this.Nme = e;
    e = this.Nme.ToUeVector();
    this.xin(e);
    this.$Tn(e);
    this.kWe(e);
  }
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PauseGame, this.LZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AfterLoadMap, this.k2a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.uMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeatherChange, this.dIe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeArea, this.Hje);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInstanceChange, this.jUc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_);
    Net_1.Net.Register(22613, GameAudioController.UUn);
    this.LWc.Init();
    this.xq1();
    return true;
  }
  static OnTick(e) {
    this.mie += e;
    if (this.mie > exports.CHECK_TIME_OUT_COOLDOWN_RECORD) {
      this.mie = 0;
      ModelManager_1.ModelManager.GameAudioModel?.CheckTimeOutCooldownRecords();
    }
    this.LWc.Update();
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PauseGame, this.LZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AfterLoadMap, this.k2a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, this.uMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeatherChange, this.dIe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeArea, this.Hje);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInstanceChange, this.jUc);
    Net_1.Net.UnRegister(22613);
    this.LWc.Clear();
    return true;
  }
  static zUn() {
    switch (ModelManager_1.ModelManager.WeatherModel?.GetCurrentWeatherType()) {
      case 1:
        this.ZUn.State = "sunny";
        break;
      case 2:
        this.ZUn.State = "cloudy";
        break;
      case 3:
        this.ZUn.State = "rainy";
        break;
      case 4:
        this.ZUn.State = "thunder_rain";
        break;
      case 5:
        this.ZUn.State = "snowy";
        break;
      default:
        this.ZUn.State = "none";
    }
  }
  static xin(e) {
    var o = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
    if (o?.IsValid()) {
      if ((o = o.GetEnvironmentInfo(e.op_ToVector())).StateEvent !== this.YTn.StateEvent) {
        this.YTn.StateEvent = o.StateEvent;
        if (e = o.StateEvent || this.HWe?.ResetEvent) {
          AudioSystem_1.AudioSystem.PostEvent(e);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Audio", 56, "[Game.Environment] PostEvent", ["Event", e]);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Audio", 56, "[Game.Environment] 当前地图未配置重置音频事件");
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 56, "[Game.Controller] AudioEnvironmentSubsystem 无效");
    }
  }
  static $Tn(e) {
    var o = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
    if (o?.IsValid()) {
      if ((o = o.GetEnvironmentInfo_MusicCompatible(e.op_ToVector())).StateEvent !== this.YTn.StateEvent_MusicCompatible) {
        this.YTn.StateEvent_MusicCompatible = o.StateEvent;
        if (e = o.StateEvent || this.HWe?.MusicResetEvent) {
          AudioSystem_1.AudioSystem.PostEvent(e);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Audio", 56, "[Game.Environment] PostEvent", ["Event", e]);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Audio", 56, "[Game.Environment] 当前地图未配置重置音频事件");
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 56, "[Game.Controller] AudioEnvironmentSubsystem 无效");
    }
  }
  static kWe(e) {
    var o = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
    if (o?.IsValid()) {
      var t;
      var i;
      var n;
      var r;
      var a = o.GetEnvironmentStates(e.op_ToVector());
      for ([t, i] of this.VWe.entries()) {
        var s = a.Get(t);
        if (s) {
          a.Remove(t);
          if (s !== i && (this.VWe.set(t, s), UE.KuroAudioStatics.SetState(t, s), Log_1.Log.CheckInfo())) {
            Log_1.Log.Info("Audio", 56, "[Game.Environment] SetState", ["Group", t], ["State", s]);
          }
        } else {
          this.VWe.delete(t);
          UE.KuroAudioStatics.SetState(t, "none");
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Audio", 56, "[Game.Environment] SetState", ["Group", t], ["State", "none"]);
          }
        }
      }
      for (let e = 0; e < a.GetMaxIndex(); e++) {
        if (a.IsValidIndex(e) && (n = a.GetKey(e), r = a.Get(n)) && (this.VWe.set(n, r), UE.KuroAudioStatics.SetState(n, r), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Audio", 56, "[Game.Environment] SetState", ["Group", n], ["State", r]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 56, "[Game.Controller] AudioEnvironmentSubsystem 无效");
    }
  }
  static UpdateAudioState(e) {
    for (const o of e) {
      if (o.Y4n) {
        UE.KuroAudioStatics.SetState(o.USs, o.Y4n);
      } else {
        UE.KuroAudioStatics.SetState(o.USs, "none");
      }
    }
  }
  static UpdateAudioStatebyClient(e) {
    if (e.Group) {
      UE.KuroAudioStatics.SetState(e.Group, e.State);
    }
  }
  static UpdateLoadingType(e) {
    if (this.Ltl !== e) {
      var o = this.Ltl;
      if ((this.Ltl = e) !== undefined) {
        switch (e) {
          case 1:
            AudioSystem_1.AudioSystem.SetState("loading", "default");
            break;
          case 2:
            AudioSystem_1.AudioSystem.SetState("loading", "fade");
            break;
          case 4:
            AudioSystem_1.AudioSystem.SetState("loading", "seamless");
            break;
          case 5:
          case 0:
            AudioSystem_1.AudioSystem.SetState("loading", "none");
            break;
          default:
            AudioSystem_1.AudioSystem.SetState("loading", "others");
        }
      } else {
        AudioSystem_1.AudioSystem.SetState("loading", "none");
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[Game.Audio] UpdateLoadingType", ["NowType", this.Ltl], ["LastType", o]);
      }
    }
  }
  static UpdateLoadingTypeFromTransitionOption(e) {
    let o = 1;
    if (e === undefined || e.p5n === undefined) {
      o = 1;
    } else {
      switch (e.p5n) {
        case Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4:
          o = 5;
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
          o = 0;
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
          o = 4;
          break;
        default:
          o = 1;
      }
    }
    this.UpdateLoadingType(o);
  }
  static GetAkComponent(e, o) {
    if (e.IsA(UE.TsBaseCharacter_C.StaticClass())) {
      var t = e.CharacterActorComponent?.Entity?.GetComponent(51);
      if (t?.Valid) {
        return t.GetAkComponent(o);
      }
    }
    if (e.IsA(UE.TsUiSceneRoleActor_C.StaticClass())) {
      t = AudioSystem_1.AudioSystem.GetAkComponent(e, {
        SocketName: o,
        OnCreated: e => {
          AudioSystem_1.AudioSystem.SetSwitch("actor_ui_switch", "sys_ui", e);
        }
      });
      if (t) {
        return t;
      }
    }
    if (e.IsA(UE.Actor.StaticClass())) {
      t = AudioSystem_1.AudioSystem.GetAkComponent(e, {
        SocketName: o,
        OnCreated: e => {
          this.SetRolePriority(0, e);
        }
      });
      if (t) {
        return t;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 42, "[Game.Audio] GetAkComponent 失败", ["Owner", e.GetName()], ["Socket", o], ["Class", e.GetClass().GetName()]);
    }
  }
  static SetRolePriority(e, o) {
    let t = 0;
    let i = "p1";
    let n = "";
    switch (e) {
      case 0:
        t = 1;
        i = "p1";
        n = "当前控制";
        break;
      case 1:
        t = 0.5;
        i = "p3";
        n = "后台控制";
        break;
      case 2:
        t = 0;
        i = "p3";
        n = "其他归属";
    }
    AudioSystem_1.AudioSystem.SetSwitch("char_p1orp3", i, o);
    AudioSystem_1.AudioSystem.SetRtpcValue("role_priority", t, {
      Actor: o
    });
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[char_p1orp3] 实体声音模式设置P1/P3优先级和RTPC(role_priority)", ["char_p1orp3", i], ["RolePriority", n], ["actor", o.GetName()]);
    }
  }
  static AddRolePrioritySummon(e, o, t) {
    if (!GameAudioController.rQl.has(e)) {
      GameAudioController.rQl.set(e, []);
    }
    GameAudioController.rQl.get(e).push({
      Id: o,
      Actor: t
    });
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[char_p1orp3] 角色语音优先级记录召唤物", ["召唤师ID", e], ["召唤物ID", o], ["actor", t.GetName()]);
    }
  }
  static RemoveRolePrioritySummon(e, o) {
    if (GameAudioController.rQl.has(e)) {
      GameAudioController.rQl.get(e).filter(e => e.Id !== o);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[char_p1orp3] 角色语音优先级移除记录的召唤物", ["召唤师ID", e], ["召唤物ID", o]);
    }
  }
  static RoleChangeController(e, o) {
    if (GameAudioController.rQl.has(e)) {
      for (const t of GameAudioController.rQl.get(e)) {
        GameAudioController.SetRolePriority(o ? 0 : 1, t.Actor);
      }
    }
  }
  static AddPostAkEventHandle(e) {
    this.HUc.add(e);
  }
  static RemovePostAkEventHandle(e) {
    if (this.HUc.has(e)) {
      this.HUc.delete(e);
    }
  }
  static xq1() {
    var e = RoleMorphAudioRulesAll_1.configRoleMorphAudioRulesAll.GetConfigList();
    if (e) {
      for (const t of e) {
        var o = t.EnterMorphSwitch.split("\\");
        if (o.length === 2 && (this.Dq1.set(t.MorphId, {
          ExitEvent: t.ExitMorphEvent,
          IgnoredType: t.IgnoredTypeList,
          IgnoredEvent: t.IgnoredEventList,
          SwitchName: {
            Key: o[0],
            Value: o[1]
          }
        }), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Audio", 42, "[MorphAudio] 初始化形态语音限制规则", ["ModelId", t.MorphId], ["ExitEvent", t.ExitMorphEvent], ["IgnoredType", t.IgnoredTypeList], ["IgnoredEvent", t.IgnoredEventList]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 42, "[MorphAudio] RoleMorphAudioRules表格配置异常");
    }
  }
  static HasMorphAudioConfig(e) {
    return this.Dq1.has(e);
  }
  static CheckMorphAudioPlay(e, o) {
    if (!this.Dq1.has(e)) {
      return true;
    }
    let t = false;
    return !(t = typeof o == "string" ? t || this.Dq1.get(e).IgnoredEvent.includes(o) : t || this.Dq1.get(e).IgnoredType.includes(o)) || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[MorphAudio] 形态语音受限制，跳过播放音频事件", ["ModelId", e], ["Event", o]), false);
  }
  static PostEvent(e, o, t) {
    return this.LWc.PostEvent(e, o, t);
  }
  static RemoveEvent(e, o) {
    this.LWc.RemoveEvent(e, o);
  }
}
exports.GameAudioController = GameAudioController;
(_a = GameAudioController).HWe = undefined;
GameAudioController.Nme = undefined;
GameAudioController.Ltl = undefined;
GameAudioController.YTn = new EnvironmentCache();
GameAudioController.VWe = new Map();
GameAudioController.LWc = new RoleAudioVolumeInfo_1.RoleAudioVolumeInfo();
GameAudioController.ZUn = new StateRef_1.StateRef("weather_type", "none");
GameAudioController.bPl = new StateRef_1.StateRef("country", "none");
GameAudioController.mie = 0;
GameAudioController.k2a = () => {
  var e = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
  if (e?.IsValid()) {
    e.EnvironmentUpdatedDelegate.Add(() => {
      var e;
      if (_a.Nme && (e = _a.Nme.ToUeVector(), _a.xin(e), _a.$Tn(e), _a.kWe(e), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Audio", 56, "[Game.Environment] EnvironmentUpdatedDelegate");
      }
    });
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Audio", 56, "[Game.Controller] AudioEnvironmentSubsystem 无效");
  }
};
GameAudioController.nye = () => {
  _a.zUn();
  AudioSystem_1.AudioSystem.PostEvent("on_world_done");
};
GameAudioController.FWe = () => {
  var e = ModelManager_1.ModelManager.GameModeModel?.MapConfig.MapId;
  _a.HWe = e ? ConfigManager_1.ConfigManager.AudioConfig?.GetMapConfig(e) : undefined;
  if (_a.HWe?.EnterEvent && (AudioSystem_1.AudioSystem.PostEvent(_a.HWe.EnterEvent), Log_1.Log.CheckInfo())) {
    Log_1.Log.Info("Audio", 56, "[Game.World] PostEvent", ["Event", _a.HWe.EnterEvent]);
  }
  if (_a.HWe?.Event && (AudioSystem_1.AudioSystem.PostEvent(_a.HWe.Event), Log_1.Log.CheckInfo())) {
    Log_1.Log.Info("Audio", 56, "[Game.World] PostEvent", ["Event", _a.HWe.Event]);
  }
};
GameAudioController.uMe = () => {
  if (_a.HWe?.Event && (AudioSystem_1.AudioSystem.ExecuteAction(_a.HWe.Event, 0), Log_1.Log.CheckInfo())) {
    Log_1.Log.Info("Audio", 56, "[Game.World] StopEvent", ["Event", _a.HWe.Event]);
  }
  if (_a.HWe?.ExitEvent && (AudioSystem_1.AudioSystem.PostEvent(_a.HWe.ExitEvent), Log_1.Log.CheckInfo())) {
    Log_1.Log.Info("Audio", 56, "[Game.World] PostEvent", ["Event", _a.HWe.ExitEvent]);
  }
  _a.HWe = undefined;
  _a.Nme = undefined;
  AudioSystem_1.AudioSystem.PostEvent("on_world_cleanup");
};
GameAudioController.Ilt = () => {
  _a.zUn();
};
GameAudioController.UUn = e => {
  _a.UpdateAudioState(e.wSs);
};
GameAudioController.LZe = e => {
  if (e === 1) {
    AudioSystem_1.AudioSystem.PostEvent("global_pause_game_pause");
  } else if (e === 0) {
    AudioSystem_1.AudioSystem.PostEvent("global_pause_game_resume");
  }
};
GameAudioController.dIe = () => {
  _a.zUn();
};
GameAudioController.Hje = () => {
  var e;
  if (ModelManager_1.ModelManager.AreaModel?.AreaInfo && ConfigManager_1.ConfigManager.InfluenceConfig && (e = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(ModelManager_1.ModelManager.AreaModel.AreaInfo.CountryId)?.AudioName ?? "none", _a.bPl.State = e, Log_1.Log.CheckDebug())) {
    Log_1.Log.Debug("Audio", 42, "[Game.World] Change area, update country audio", ["AudioName", e]);
  }
};
GameAudioController.rQl = new Map();
GameAudioController.HUc = new Set();
GameAudioController.jUc = (e, o) => {
  if (e !== o || _a.HUc.size !== 0) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[PostAkEventAudio] 地图变更", ["Old", e], ["New", o]);
    }
    if (ConfigManager_1.ConfigManager.WorldMapConfig.IsDungeonInWorld(o) && !ConfigManager_1.ConfigManager.WorldMapConfig.IsDungeonInWorld(e)) {
      for (const t of _a.HUc) {
        AudioSystem_1.AudioSystem.ExecuteAction(t, 0);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[PostAkEventAudio] 全局音频事件Handle移除", ["Handle", t]);
        }
      }
    }
    _a.HUc.clear();
  }
};
GameAudioController.Dq1 = new Map();
GameAudioController._7_ = (e, o, t) => {
  var i = e.GetComponent(279);
  var n = e.EntityData?.GetActor();
  if (n && i) {
    o = i.GetMorphData(o)?.ModelId;
    if ((i = i.GetMorphData(t)?.ModelId) && _a.Dq1.has(i) && (t = _a.Dq1.get(i), AudioSystem_1.AudioSystem.PostEvent(t.ExitEvent, n), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Audio", 42, "[MorphAudio] 发送旧状态的结束Event", ["EntityId", e.Id], ["OldModelId", i], ["ExitEvent", t.ExitEvent]);
    }
    if (o && _a.Dq1.has(o) && (i = _a.Dq1.get(o), AudioSystem_1.AudioSystem.SetSwitch(i.SwitchName.Key, i.SwitchName.Value, n), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Audio", 42, "[MorphAudio] 切换新状态Switch", ["EntityId", e.Id], ["ModelId", o], ["Key", i.SwitchName.Key], ["Value", i.SwitchName.Value]);
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Audio", 42, "[MorphAudio] Actor或MorphComp无效", ["EntityId", e.Id]);
  }
}; //# sourceMappingURL=GameAudioController.js.map