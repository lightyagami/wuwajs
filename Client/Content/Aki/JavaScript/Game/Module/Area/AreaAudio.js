"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaAudio = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils");
const LEAVE_BATTLE_DELAY_MS = 500;
const monsterMatchTypeLevel = {
  [0]: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 2
};
const monsterMatchTypeState = {
  [0]: "small",
  1: "elite",
  2: "medium",
  3: "boss_common",
  4: "elite"
};
class AreaAudio {
  constructor() {
    this.$je = "";
    this.Yje = false;
    this.Jje = false;
    this.zje = false;
    this.Zje = "none";
    this.tWe = "none";
    this.iWe = new Set();
    this.oWe = new Set();
    this.exl = undefined;
    this.B6l = "";
    this.q6l = undefined;
    this.AreaChanged = () => {
      var t;
      if (ModelManager_1.ModelManager.AreaModel.AreaInfo.WuYinQuID > 0) {
        t = ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(ModelManager_1.ModelManager.AreaModel.AreaInfo.WuYinQuID);
        this.tWe = t ? t.IsFinish ? "purified" : "unpurified" : "none";
      } else {
        this.tWe = "none";
      }
      if (!this.nWe()) {
        this.sWe();
      }
    };
    this.TDe = undefined;
    this.yK = t => {
      if (this.oWe.size > 0 && t) {
        this.wku(t);
      }
      if (this.oWe.size === 0 && !t) {
        this.wku(t);
      }
    };
    this.hWe = () => {
      this.nWe();
    };
    this.zwa = t => {
      for (const e of t) {
        this.lWe(e);
      }
    };
    this.Jwa = t => {
      for (const e of t) {
        this.cWe(e);
      }
    };
    this.lWe = t => {
      if (EntitySystem_1.EntitySystem.Get(t)?.GetComponent(0)?.GetAttributeComponent()?.IgnoreFightMusic) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 55, "[BGM] 新增仇恨，配置忽略BGM，跳过", ["来源", t]);
        }
      } else {
        this.oWe.add(t);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 55, "[BGM] 新增仇恨", ["来源", t]);
        }
        this.F21();
        this.wku(true);
      }
    };
    this.cWe = t => {
      if (this.oWe.has(t) && (this.oWe.delete(t), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 55, "[BGM] 移除仇恨", ["来源", t]), this.F21(), this.oWe.size === 0)) {
        this.wku(false);
      }
    };
    this.mWe = () => {
      this.dWe();
    };
    this.OnRemoveEntity = (t, e) => {
      if (this.iWe.has(e.Id)) {
        this.iWe.delete(e.Id);
        EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
        EventSystem_1.EventSystem.RemoveWithTarget(e.Entity, EventDefine_1.EEventName.CharDamage, this.CWe);
      }
    };
    this.CWe = (t, e, i, s, o) => {
      if (s.DamageData.CalculateType === 0 && this.gWe(e.Id) && this.Yje) {
        if (!this.Jje && !(this.Jje = true, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 55, "[BGM] 触发:战斗中首次造成伤害"), this.nWe())) {
          this.fWe();
        }
      }
    };
    this.O6l = (t, e) => {
      if (this.q6l) {
        for (const i of this.q6l) {
          if (i.TagComp?.HasTag(i.TagId)) {
            this.F6l(i.Music);
            return;
          }
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Audio", 42, "[BGM] Tag变化更新怪物BGM,没有数据,设置默认BGM", ["tagId", t], ["exist", e]);
      }
      this.F6l(this.B6l);
    };
  }
  get k6l() {
    return this.$je;
  }
  set k6l(t) {
    if (t !== this.$je) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[BGM] 更新怪物BGM", ["Old", this.k6l], ["New", t]);
      }
      this.$je = t;
    }
  }
  Init() {
    this.dde();
  }
  Destroy() {
    if (this.TDe?.Valid()) {
      TimerSystem_1.TimerSystem.Remove(this.TDe);
      this.Tlh();
    }
    this.Cde();
  }
  sWe() {
    if (this.tWe === "unpurified") {
      AudioSystem_1.AudioSystem.SetState("wuyinqu_type", "unpurified");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 55, "[BGM] 切换无音区: 进入无音区，未净化");
      }
    } else if (this.tWe === "purified") {
      AudioSystem_1.AudioSystem.SetState("wuyinqu_type", "purified");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 55, "[BGM] 切换无音区: 进入无音区，已净化");
      }
    } else {
      AudioSystem_1.AudioSystem.SetState("wuyinqu_type", "none");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 55, "[BGM] 切换无音区: 未处在无音区");
      }
    }
  }
  aWe() {
    if (this.Yje) {
      this.Llh();
    } else {
      this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
        if (this.Yje) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Audio", 55, "[BGM] 离开战斗但脱战时间过短，已忽略本次脱战");
          }
        } else {
          this.Tlh();
        }
        this.TDe = undefined;
      }, LEAVE_BATTLE_DELAY_MS);
    }
  }
  Llh() {
    this.fWe();
    this.uWe();
    this.EWe();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[AreaAudio] BGM切换至战斗状态");
    }
  }
  Tlh() {
    this.EWe();
    this.fWe();
    this.uWe();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[AreaAudio] 离开战斗,BGM切换回常态");
    }
  }
  wku(t) {
    if (this.Yje !== t && !(Log_1.Log.CheckInfo() && Log_1.Log.Info("Audio", 55, "[BGM] 战斗状态变化", ["isGameInBattle", t]), this.Yje = t, this.Yje || (this.Jje = false, this.exl = undefined, this.k6l = "", this.B6l = "", this.G6l(), this.q6l = undefined), this.nWe())) {
      this.aWe();
    }
  }
  fWe() {
    if (this.Yje) {
      if (this.Jje && this.Zje !== "battle_strong") {
        this.Zje = "battle_strong";
        AudioSystem_1.AudioSystem.SetState("battle_music_state", "battle_strong");
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Audio", 55, "[BGM] 切换玩家状态: 进入战斗造成伤害");
        }
      } else if (this.Zje !== "battle_in" && (this.Zje = "battle_in", AudioSystem_1.AudioSystem.SetState("battle_music_state", "battle_in"), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Audio", 55, "[BGM] 切换玩家状态: 进入战斗未造成伤害");
      }
    } else {
      this.Zje = "none";
      AudioSystem_1.AudioSystem.SetState("battle_music_state", "none");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 55, "[BGM] 切换玩家状态: 非战斗状态");
      }
    }
  }
  nWe() {
    if (ModelManager_1.ModelManager.PlotModel.KeepBgAudio) {
      this.zje = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 55, "[BGM] 提示: 剧情期间保持原背景音乐，跳过切换");
      }
      return true;
    } else {
      return !!this.zje && (this.zje = false, Log_1.Log.CheckInfo() && Log_1.Log.Info("Audio", 55, "[BGM] 提示: 由于先前被剧情保持了场景音乐，准备更新所有音乐状态"), this.sWe(), this.aWe(), true);
    }
  }
  EWe() {
    if (this.Yje) {
      AudioSystem_1.AudioSystem.SetState("music_group", "battle");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 55, "[BGM] 切换战斗状态:战斗");
      }
    } else {
      AudioSystem_1.AudioSystem.SetState("music_group", "field");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 55, "[BGM] 切换战斗状态:非战斗");
      }
    }
  }
  uWe() {
    var t = this._We();
    AudioSystem_1.AudioSystem.SetState("monster_type", t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Audio", 55, "[BGM] 切换怪物类型状态:", ["Group", "monster_type"], ["State", t]);
    }
  }
  _We() {
    var t;
    if (this.Zje === "none" || this.exl === undefined) {
      return "none";
    } else if (this.k6l.length > 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 55, "[BGM] 使用怪物标签状态", ["Tag", this.k6l]);
      }
      return this.k6l;
    } else {
      t = monsterMatchTypeState[this.exl];
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 55, "[BGM] 使用怪物通用状态:", ["Type", t]);
      }
      return t;
    }
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeArea, this.AreaChanged);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.yK);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.mWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAggroAdd, this.zwa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAggroRemoved, this.Jwa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.hWe);
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeArea, this.AreaChanged);
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.yK);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.mWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAggroAdd, this.zwa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAggroRemoved, this.Jwa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.hWe);
  }
  F21() {
    let t = "";
    for (const i of this.oWe) {
      var e = EntitySystem_1.EntitySystem.Get(i)?.GetComponent(3);
      if (e?.Valid && (this.vWe(e), (e = this.N21(e)) !== "")) {
        t = e;
      }
    }
    this.B6l = t;
    this.k6l = t;
  }
  dWe() {
    this.SWe();
    this.iWe.clear();
    this.oWe.clear();
    this.yWe();
    this.wku(false);
  }
  yWe() {
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true)) {
      this.iWe.add(t.Id);
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, t, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
      EventSystem_1.EventSystem.AddWithTarget(t.Entity, EventDefine_1.EEventName.CharDamage, this.CWe);
    }
  }
  SWe() {
    if (this.iWe.size > 0) {
      for (const e of this.iWe) {
        var t = ModelManager_1.ModelManager.CharacterModel.GetHandle(e);
        if (t?.Valid) {
          EventSystem_1.EventSystem.RemoveWithTarget(t.Entity, EventDefine_1.EEventName.CharDamage, this.CWe);
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, t, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
        }
      }
      this.iWe.clear();
    }
  }
  gWe(t) {
    var e;
    var t = EntitySystem_1.EntitySystem.Get(t);
    return !!t && !!Global_1.Global.BaseCharacter && !(e = t.GetComponent(3)?.CreatureData, !(t = t.GetComponent(3)?.Actor)) && CampUtils_1.CampUtils.GetCampRelationship(t.Camp, Global_1.Global.BaseCharacter.Camp) === 2 && e?.GetBaseInfo()?.Category.MainType === "Monster";
  }
  vWe(t) {
    var e = t?.CreatureData;
    if (t && e?.GetLivingStatus() !== Protocol_1.Aki.Protocol.JEs.Proto_Dead) {
      if ((e = e?.GetBaseInfo()?.Category.MonsterMatchType) === undefined) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Audio", 55, "[BGM] 无效的怪物类型", ["怪物类型", e], ["实体ID", t.Entity.Id]);
        }
      } else if ((!this.exl || monsterMatchTypeLevel[e] > monsterMatchTypeLevel[this.exl]) && (this.exl = e, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Audio", 55, "[BGM] 已记录怪物最高等级", ["MaxLevel", monsterMatchTypeLevel[e]], ["MonsterType", this.exl], ["SourceEntity", t.Entity.Id], ["SourceEntityName", t?.Actor.GetName()]);
      }
    }
  }
  N21(t) {
    var e;
    var i = t.CreatureData.GetAttributeComponent();
    var s = t.Entity.GetComponent(205);
    if (i.FightMusic) {
      this.B6l = i.FightMusic;
      this.k6l = i.FightMusic;
      return i.FightMusic;
    }
    let o = "";
    if (i.FightMusics && i.FightMusics.Element.length > 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[BGM] 新BGM配置", ["FightMusics", i.FightMusics.Element]);
      }
      if (this.q6l) {
        this.G6l();
        this.q6l.length = 0;
      } else {
        this.q6l = [];
      }
      for (const _ of i.FightMusics.Element) {
        if (_.ActivateTag) {
          if ((e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(_.ActivateTag)) && (this.q6l.push({
            TagId: e.TagId,
            Music: _.FightMusic,
            TagComp: s
          }), s?.AddTagAddOrRemoveListener(e.TagId, this.O6l), s?.HasTag(e.TagId)) && (o = _.FightMusic, Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("Audio", 42, "[BGM] 满足播放条件的BGM", ["BGM", o]);
          }
        } else {
          o = _.FightMusic;
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 42, "[BGM] 满足播放条件的BGM", ["BGM", o]);
          }
        }
      }
    }
    return o;
  }
  F6l(t) {
    if (this.k6l !== t) {
      this.k6l = t;
      this.uWe();
    }
  }
  G6l() {
    if (this.q6l) {
      for (const t of this.q6l) {
        if (t.TagComp) {
          t.TagComp.RemoveTagAddOrRemoveListener(t.TagId, this.O6l);
        }
      }
    }
  }
}
exports.AreaAudio = AreaAudio;
//# sourceMappingURL=AreaAudio.js.map