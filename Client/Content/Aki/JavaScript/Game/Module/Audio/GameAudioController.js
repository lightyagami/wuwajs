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
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const StateRef_1 = require("../../../Core/Utils/Audio/StateRef");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelPlayDefine_1 = require("../LevelPlay/LevelPlayDefine");
const RoleAudioVolumeInfo_1 = require("./RoleAudioVolumeInfo");
exports.CHECK_TIME_OUT_COOLDOWN_RECORD = 20000;
const LEAVE_BATTLE_DELAY_MS = 1000;
const monsterMatchTypeLevel = {
  [0]: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 2
};
const monsterMatchTypeState = {
  [0]: "small",
  1: "medium",
  2: "elite",
  3: "boss_common",
  4: "elite"
};
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAggroAdd, this.zwa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAggroRemoved, this.Jwa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.hWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLevelPlayStateNotify, this.Fpi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterLevelPlayNotify, this.Hpi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveLevelPlayNotify, this.jpi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.OnTeleportStart);
    Net_1.Net.Register(27022, GameAudioController.UUn);
    this.bQc.Init();
    this.xq1();
    return true;
  }
  static OnTick(e) {
    this.mie += e;
    if (this.mie > exports.CHECK_TIME_OUT_COOLDOWN_RECORD) {
      this.mie = 0;
      ModelManager_1.ModelManager.GameAudioModel?.CheckTimeOutCooldownRecords();
    }
    this.bQc.Update();
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
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAggroAdd, this.zwa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAggroRemoved, this.Jwa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.hWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLevelPlayStateNotify, this.Fpi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterLevelPlayNotify, this.Hpi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveLevelPlayNotify, this.jpi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.OnTeleportStart);
    Net_1.Net.UnRegister(27022);
    this.bQc.Clear();
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
    var t = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
    if (t?.IsValid()) {
      if ((t = t.GetEnvironmentInfo(e.op_ToVector())).StateEvent !== this.YTn.StateEvent) {
        this.YTn.StateEvent = t.StateEvent;
        if (e = t.StateEvent || this.HWe?.ResetEvent) {
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
    var t = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
    if (t?.IsValid()) {
      if ((t = t.GetEnvironmentInfo_MusicCompatible(e.op_ToVector())).StateEvent !== this.YTn.StateEvent_MusicCompatible) {
        this.YTn.StateEvent_MusicCompatible = t.StateEvent;
        if (e = t.StateEvent || this.HWe?.MusicResetEvent) {
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
    var t = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
    if (t?.IsValid()) {
      var o;
      var i;
      var a;
      var n;
      var r = t.GetEnvironmentStates(e.op_ToVector());
      for ([o, i] of this.VWe.entries()) {
        var s = r.Get(o);
        if (s) {
          r.Remove(o);
          if (s !== i && (this.VWe.set(o, s), UE.KuroAudioStatics.SetState(o, s), Log_1.Log.CheckInfo())) {
            Log_1.Log.Info("Audio", 56, "[Game.Environment] SetState", ["Group", o], ["State", s]);
          }
        } else {
          this.VWe.delete(o);
          UE.KuroAudioStatics.SetState(o, "none");
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Audio", 56, "[Game.Environment] SetState", ["Group", o], ["State", "none"]);
          }
        }
      }
      for (let e = 0; e < r.GetMaxIndex(); e++) {
        if (r.IsValidIndex(e) && (a = r.GetKey(e), n = r.Get(a)) && (this.VWe.set(a, n), UE.KuroAudioStatics.SetState(a, n), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Audio", 56, "[Game.Environment] SetState", ["Group", a], ["State", n]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 56, "[Game.Controller] AudioEnvironmentSubsystem 无效");
    }
  }
  static UpdateAudioState(e) {
    for (const t of e) {
      if (t.Y4n) {
        UE.KuroAudioStatics.SetState(t.USs, t.Y4n);
      } else {
        UE.KuroAudioStatics.SetState(t.USs, "none");
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
      var t = this.Ltl;
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
        Log_1.Log.Debug("Audio", 42, "[Game.Audio] UpdateLoadingType", ["NowType", this.Ltl], ["LastType", t]);
      }
    }
  }
  static UpdateLoadingTypeFromTransitionOption(e) {
    let t = 1;
    if (e === undefined || e.p5n === undefined) {
      t = 1;
    } else {
      switch (e.p5n) {
        case Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4:
          t = 5;
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
          t = 0;
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
          t = 4;
          break;
        default:
          t = 1;
      }
    }
    this.UpdateLoadingType(t);
  }
  static GetAkComponent(e, t) {
    if (e.IsA(UE.TsBaseCharacter_C.StaticClass())) {
      var o = e.CharacterActorComponent?.Entity?.GetComponent(51);
      if (o?.Valid) {
        return o.GetAkComponent(t);
      }
    }
    if (e.IsA(UE.TsUiSceneRoleActor_C.StaticClass())) {
      o = AudioSystem_1.AudioSystem.GetAkComponent(e, {
        SocketName: t,
        OnCreated: e => {
          AudioSystem_1.AudioSystem.SetSwitch("actor_ui_switch", "sys_ui", e);
        }
      });
      if (o) {
        return o;
      }
    }
    if (e.IsA(UE.Actor.StaticClass())) {
      o = AudioSystem_1.AudioSystem.GetAkComponent(e, {
        SocketName: t,
        OnCreated: e => {
          this.SetRolePriority(0, e);
        }
      });
      if (o) {
        return o;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 42, "[Game.Audio] GetAkComponent 失败", ["Owner", e.GetName()], ["Socket", t], ["Class", e.GetClass().GetName()]);
    }
  }
  static SetRolePriority(e, t) {
    let o = 0;
    let i = "p1";
    let a = "";
    switch (e) {
      case 0:
        o = 1;
        i = "p1";
        a = "当前控制";
        break;
      case 1:
        o = 0.5;
        i = "p3";
        a = "后台控制";
        break;
      case 2:
        o = 0;
        i = "p3";
        a = "其他归属";
    }
    AudioSystem_1.AudioSystem.SetSwitch("char_p1orp3", i, t);
    AudioSystem_1.AudioSystem.SetRtpcValue("role_priority", o, {
      Actor: t
    });
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[char_p1orp3] 实体声音模式设置P1/P3优先级和RTPC(role_priority)", ["char_p1orp3", i], ["RolePriority", a], ["actor", t.GetName()]);
    }
  }
  static AddRolePrioritySummon(e, t, o) {
    if (!GameAudioController.rQl.has(e)) {
      GameAudioController.rQl.set(e, new Set());
    }
    if (!GameAudioController.rQl.get(e).has(t)) {
      GameAudioController.rQl.get(e).add(t);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[char_p1orp3] 角色语音优先级记录召唤物", ["召唤师ID", e], ["召唤物ID", t], ["actor", o.GetName()], ["update", GameAudioController.Ptm.has(t)]);
    }
    GameAudioController.Ptm.set(t, o);
  }
  static RemoveRolePrioritySummon(e, t) {
    if (GameAudioController.rQl.has(e) && (GameAudioController.rQl.get(e).delete(t), GameAudioController.Ptm.delete(t), GameAudioController.rQl.get(e).size === 0 && GameAudioController.rQl.delete(e), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Audio", 42, "[char_p1orp3] 角色语音优先级移除记录的召唤物", ["召唤师ID", e], ["召唤物ID", t]);
    }
  }
  static RoleChangeController(e, t) {
    if (GameAudioController.rQl.has(e)) {
      for (const i of GameAudioController.rQl.get(e)) {
        var o = GameAudioController.Ptm.get(i);
        if (o?.IsValid()) {
          GameAudioController.SetRolePriority(t ? 0 : 1, o);
        }
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
      for (const o of e) {
        var t = o.EnterMorphSwitch.split("\\");
        if (t.length === 2 && (this.Dq1.set(o.MorphId, {
          ExitEvent: o.ExitMorphEvent,
          IgnoredType: o.IgnoredTypeList,
          IgnoredEvent: o.IgnoredEventList,
          SwitchName: {
            Key: t[0],
            Value: t[1]
          }
        }), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Audio", 42, "[MorphAudio] 初始化形态语音限制规则", ["ModelId", o.MorphId], ["ExitEvent", o.ExitMorphEvent], ["IgnoredType", o.IgnoredTypeList], ["IgnoredEvent", o.IgnoredEventList]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 42, "[MorphAudio] RoleMorphAudioRules表格配置异常");
    }
  }
  static HasMorphAudioConfig(e) {
    return this.Dq1.has(e);
  }
  static CheckMorphAudioPlay(e, t) {
    if (!this.Dq1.has(e)) {
      return true;
    }
    let o = false;
    return !(o = typeof t == "string" ? o || this.Dq1.get(e).IgnoredEvent.includes(t) : o || this.Dq1.get(e).IgnoredType.includes(t)) || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[MorphAudio] 形态语音受限制，跳过播放音频事件", ["ModelId", e], ["Event", t]), false);
  }
  static PostEvent(e, t, o) {
    return this.bQc.PostEvent(e, t, o);
  }
  static RemoveEvent(e, t) {
    this.bQc.RemoveEvent(e, t);
  }
  static get k6l() {
    return this.kCd;
  }
  static set k6l(e) {
    if (e !== this.kCd) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[BGM] 更新怪物BGM", ["Old", this.k6l], ["New", e]);
      }
      this.kCd = e;
    }
  }
  static F21() {
    let e = "";
    var t = this.exl;
    var o = this.k6l;
    this.exl = undefined;
    for (const a of this.oWe) {
      var i = EntitySystem_1.EntitySystem.Get(a)?.GetComponent(3);
      if (i?.Valid && (this.vWe(i), (i = this.N21(i)) !== "")) {
        e = i;
      }
    }
    this.B6l = e;
    this.k6l = e;
    if ((t !== this.exl || o !== this.k6l) && !(Log_1.Log.CheckInfo() && Log_1.Log.Info("Audio", 42, "[BGM] 更新怪物最高等级", ["MonsterType", this.exl]), this.CheckIgnoreByPlotKeep())) {
      this.uWe();
    }
  }
  static vWe(e) {
    var t = e?.CreatureData;
    if (e && t?.GetLivingStatus() !== Protocol_1.Aki.Protocol.JEs.Proto_Dead) {
      if ((t = t?.GetBaseInfo()?.Category.MonsterMatchType) === undefined) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Audio", 42, "[BGM] 无效的怪物类型", ["怪物类型", t], ["实体ID", e.Entity.Id]);
        }
      } else if ((!this.exl || monsterMatchTypeLevel[t] > monsterMatchTypeLevel[this.exl]) && (this.exl = t, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Audio", 42, "[BGM.Debug] RefreshEnemyMaxLevel", ["MaxLevel", monsterMatchTypeLevel[t]], ["MonsterType", this.exl], ["SourceEntity", e.Entity.Id], ["SourceEntityName", e?.Actor.GetName()]);
      }
    }
  }
  static N21(e) {
    var t;
    var o = e.CreatureData.GetAttributeComponent();
    var i = e.Entity.GetComponent(209);
    if (o.FightMusic) {
      this.B6l = o.FightMusic;
      this.k6l = o.FightMusic;
      return o.FightMusic;
    }
    let a = "";
    if (o.FightMusics && o.FightMusics.Element.length > 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[BGM.Debug] 新BGM配置", ["FightMusics", o.FightMusics.Element]);
      }
      if (this.q6l) {
        this.G6l();
        this.q6l.length = 0;
      } else {
        this.q6l = [];
      }
      for (const n of o.FightMusics.Element) {
        if (n.ActivateTag) {
          if ((t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(n.ActivateTag)) && (this.q6l.push({
            TagId: t.TagId,
            Music: n.FightMusic,
            TagComp: i
          }), i?.AddTagAddOrRemoveListener(t.TagId, this.O6l), i?.HasTag(t.TagId)) && (a = n.FightMusic, Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("Audio", 42, "[BGM.Debug] 满足播放条件的BGM", ["BGM", a]);
          }
        } else {
          a = n.FightMusic;
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 42, "[BGM.Debug] 满足播放条件的BGM", ["BGM", a]);
          }
        }
      }
    }
    return a;
  }
  static F6l(e) {
    if (this.k6l !== e) {
      this.k6l = e;
      this.uWe();
    }
  }
  static GetMonsterTypeState() {
    var e;
    if (this.OCd && this.exl !== undefined) {
      if (this.k6l.length > 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Audio", 42, "[BGM] 使用怪物标签音乐", ["Tag", this.k6l]);
        }
        return this.k6l;
      } else {
        e = monsterMatchTypeState[this.exl];
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[BGM] 使用怪物通用音乐", ["Type", e]);
        }
        return e;
      }
    } else {
      return "none";
    }
  }
  static G6l() {
    if (this.q6l) {
      for (const e of this.q6l) {
        if (e.TagComp) {
          e.TagComp.RemoveTagAddOrRemoveListener(e.TagId, this.O6l);
        }
      }
    }
  }
  static qCd() {
    this.exl = undefined;
    this.k6l = "";
    this.B6l = "";
    this.G6l();
    this.q6l = undefined;
  }
  static get IsPlayingBattleMusic() {
    return this.OCd;
  }
  static SetPlayerWwiseState(e, t) {
    if (e) {
      if (t && this.Zje !== "battle_strong") {
        this.Zje = "battle_strong";
        AudioSystem_1.AudioSystem.SetState("battle_music_state", "battle_strong");
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Audio", 42, "[BGM] 切换玩家战斗音乐状态: 进入战斗造成伤害");
        }
      } else if (this.Zje !== "battle_in" && (this.Zje = "battle_in", AudioSystem_1.AudioSystem.SetState("battle_music_state", "battle_in"), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Audio", 42, "[BGM] 切换玩家战斗音乐状态: 进入战斗未造成伤害");
      }
    } else {
      this.Zje = "none";
      AudioSystem_1.AudioSystem.SetState("battle_music_state", "none");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 42, "[BGM] 切换玩家战斗音乐状态: 非战斗状态");
      }
    }
  }
  static EWe(e) {
    if (e) {
      AudioSystem_1.AudioSystem.SetState("music_group", "battle");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 42, "[BGM] 切换战斗音乐状态:战斗");
      }
    } else {
      AudioSystem_1.AudioSystem.SetState("music_group", "field");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 42, "[BGM] 切换战斗音乐状态:非战斗");
      }
    }
  }
  static uWe() {
    var e = this.GetMonsterTypeState();
    AudioSystem_1.AudioSystem.SetState("monster_type", e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Audio", 42, "[BGM] 切换怪物类型状态:", ["Group", "monster_type"], ["State", e]);
    }
  }
  static OnEnterBattleState() {
    if (!this.OCd) {
      this.OCd = true;
      this.SetPlayerWwiseState(true);
      this.uWe();
      this.EWe(true);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[AreaAudio] BGM切换至战斗状态");
      }
    }
  }
  static OnExitBattleState() {
    if (this.OCd) {
      if (this.GCd?.Valid()) {
        TimerSystem_1.TimerSystem.Remove(this.GCd);
        this.GCd = undefined;
      }
      if (this.Yjd()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[AreaAudio] 没有仇恨对象，但处于无音区玩法，暂不退出战斗状态");
        }
      } else {
        this.OCd = false;
        this.EWe(false);
        this.SetPlayerWwiseState(false);
        this.uWe();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[AreaAudio] 离开战斗,BGM切换回常态");
        }
      }
    }
  }
  static TryUpdateBattleState() {
    var e = this.oWe.size !== 0;
    if (this.OCd !== e) {
      if (e) {
        if (this.GCd?.Valid() && (TimerSystem_1.TimerSystem.Remove(this.GCd), this.GCd = undefined, Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Audio", 42, "[BGM] 离开战斗但脱战时间过短，已忽略本次脱战");
        }
        if (!this.CheckIgnoreByPlotKeep()) {
          this.OnEnterBattleState();
        }
      } else if (!this.GCd?.Valid()) {
        this.GCd = TimerSystem_1.TimerSystem.Delay(() => {
          this.OnExitBattleState();
          this.GCd = undefined;
        }, LEAVE_BATTLE_DELAY_MS);
      }
    }
  }
  static CheckIgnoreByPlotKeep() {
    if (ModelManager_1.ModelManager.PlotModel.KeepBgAudio) {
      this.zje = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 55, "[BGM] 提示: 剧情期间保持原背景音乐，跳过切换");
      }
      return true;
    } else {
      return !!this.zje && (this.zje = false, Log_1.Log.CheckInfo() && Log_1.Log.Info("Audio", 55, "[BGM] 提示: 由于先前被剧情保持了场景音乐，准备更新所有音乐状态"), this.TryUpdateBattleState(), true);
    }
  }
  static Yjd() {
    for (const e of this.FCd) {
      if (e[1]) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[AreaAudio] 处于激活的无音区玩法中", ["玩法ID", e[0]]);
        }
        return true;
      }
    }
    return false;
  }
  static dWl(e) {
    for (const t of this.FCd) {
      if (t[1] !== e && (this.FCd.set(t[0], e), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Audio", 42, "[AreaAudio] 无音区玩法状态改变", ["玩法ID", t[0]], ["state", e]);
      }
    }
  }
}
exports.GameAudioController = GameAudioController;
(_a = GameAudioController).HWe = undefined;
GameAudioController.Nme = undefined;
GameAudioController.Ltl = undefined;
GameAudioController.YTn = new EnvironmentCache();
GameAudioController.VWe = new Map();
GameAudioController.bQc = new RoleAudioVolumeInfo_1.RoleAudioVolumeInfo();
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
GameAudioController.OnTeleportStart = () => {
  _a.dWl(false);
};
GameAudioController.rQl = new Map();
GameAudioController.Ptm = new Map();
GameAudioController.HUc = new Set();
GameAudioController.jUc = (e, t) => {
  if (e !== t || _a.HUc.size !== 0) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[PostAkEventAudio] 地图变更", ["Old", e], ["New", t]);
    }
    if (ConfigManager_1.ConfigManager.WorldMapConfig.IsDungeonInWorld(t) && !ConfigManager_1.ConfigManager.WorldMapConfig.IsDungeonInWorld(e)) {
      for (const o of _a.HUc) {
        AudioSystem_1.AudioSystem.ExecuteAction(o, 0);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[PostAkEventAudio] 全局音频事件Handle移除", ["Handle", o]);
        }
      }
    }
    _a.HUc.clear();
  }
};
GameAudioController.Dq1 = new Map();
GameAudioController._7_ = (e, t, o) => {
  var i = e.GetComponent(287);
  var a = e.EntityData?.GetActor();
  if (a && i) {
    t = i.GetMorphData(t)?.ModelId;
    if ((i = i.GetMorphData(o)?.ModelId) && _a.Dq1.has(i) && (o = _a.Dq1.get(i), AudioSystem_1.AudioSystem.PostEvent(o.ExitEvent, a), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Audio", 42, "[MorphAudio] 发送旧状态的结束Event", ["EntityId", e.Id], ["OldModelId", i], ["ExitEvent", o.ExitEvent]);
    }
    if (t && _a.Dq1.has(t) && (i = _a.Dq1.get(t), AudioSystem_1.AudioSystem.SetSwitch(i.SwitchName.Key, i.SwitchName.Value, a), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Audio", 42, "[MorphAudio] 切换新状态Switch", ["EntityId", e.Id], ["ModelId", t], ["Key", i.SwitchName.Key], ["Value", i.SwitchName.Value]);
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Audio", 42, "[MorphAudio] Actor或MorphComp无效", ["EntityId", e.Id]);
  }
};
GameAudioController.oWe = new Set();
GameAudioController.zwa = e => {
  for (const t of e) {
    _a.lWe(t);
  }
};
GameAudioController.Jwa = e => {
  for (const t of e) {
    _a.cWe(t);
  }
};
GameAudioController.lWe = e => {
  if (EntitySystem_1.EntitySystem.Get(e)?.GetComponent(0)?.GetAttributeComponent()?.IgnoreFightMusic) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[BGM] 新增仇恨，配置忽略BGM，跳过", ["来源", e]);
    }
  } else {
    _a.oWe.add(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[BGM] 新增仇恨", ["来源", e]);
    }
    _a.F21();
    _a.TryUpdateBattleState();
    _a.dWl(true);
  }
};
GameAudioController.cWe = e => {
  if (_a.oWe.has(e) && (_a.oWe.delete(e), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[BGM] 移除仇恨", ["来源", e]), _a.oWe.size === 0)) {
    _a.qCd();
    _a.TryUpdateBattleState();
  }
};
GameAudioController.B6l = "";
GameAudioController.kCd = "";
GameAudioController.exl = undefined;
GameAudioController.q6l = undefined;
GameAudioController.O6l = (e, t) => {
  if (_a.q6l) {
    for (const o of _a.q6l) {
      if (o.TagComp?.HasTag(o.TagId)) {
        _a.F6l(o.Music);
        return;
      }
    }
  } else if (Log_1.Log.CheckWarn()) {
    Log_1.Log.Warn("Audio", 42, "[BGM] Tag变化更新怪物BGM,没有数据,设置默认BGM", ["tagId", e], ["exist", t]);
  }
  _a.F6l(_a.B6l);
};
GameAudioController.OCd = false;
GameAudioController.Zje = "none";
GameAudioController.GCd = undefined;
GameAudioController.zje = false;
GameAudioController.hWe = () => {
  _a.CheckIgnoreByPlotKeep();
};
GameAudioController.FCd = new Map();
GameAudioController.Fpi = (e, t) => {
  if (ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(e)?.LevelPlayTypeNumber === LevelPlayDefine_1.levelPlayTypeToNumber.SilentArea && t !== 2 && t !== 1 && !(t === 2 ? _a.FCd.has(e) || _a.FCd.set(e, false) : _a.FCd.has(e) && _a.FCd.delete(e), _a.Yjd())) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[AreaAudio] 无音区玩法关闭/完成，尝试更新战斗音乐状态", ["id", e], ["state", t]);
    }
    _a.TryUpdateBattleState();
  }
};
GameAudioController.Hpi = e => {
  if (ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(e)?.LevelPlayTypeNumber === LevelPlayDefine_1.levelPlayTypeToNumber.SilentArea && !_a.FCd.has(e)) {
    _a.FCd.set(e, false);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[AreaAudio] 进入无音区玩法范围，记录玩法ID", ["Id", e]);
    }
  }
};
GameAudioController.jpi = e => {
  if (_a.FCd.has(e)) {
    _a.FCd.delete(e);
    if (!_a.Yjd()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[AreaAudio] 离开无音区玩法范围，尝试更新战斗音乐状态", ["Id", e]);
      }
      _a.TryUpdateBattleState();
    }
  }
}; //# sourceMappingURL=GameAudioController.js.map