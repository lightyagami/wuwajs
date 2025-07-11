"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleAudioController = undefined;
const ue_1 = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const RoleAudioRulesById_1 = require("../../../../Core/Define/ConfigQuery/RoleAudioRulesById");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../Module/Abilities/FormationAttributeController");
const FormationDataController_1 = require("../../../Module/Abilities/FormationDataController");
const CharacterUnifiedStateTypes_1 = require("../Common/Component/Abilities/CharacterUnifiedStateTypes");
const ROLE_CHANGE_FRONT_EVENT = "scene_role_switched_front";
const DEFAULT_INTERVAL_TIME = 10000;
const ENTER_FIGHT_DISTANCE = 1000;
const INTERVAL_TIME = 500;
const MIN_INTERVAL_TIME = 50;
class RoleAudioCoolDownTime {
  constructor(e) {
    this.Type = 0;
    this.CurrentTeamTime = [0, 0, 0];
    this.TeamIntervalTime = 0;
    this.ProbabilityCooldown = {
      DefaultCooldownTime: 0,
      DefaultProbability: 1
    };
    var o = e.valueOf();
    this.Type = e;
    var e = RoleAudioRulesById_1.configRoleAudioRulesById.GetConfig(o);
    this.TeamIntervalTime = e?.TeamColdTime ?? DEFAULT_INTERVAL_TIME;
    var o = e?.CharacterColdTime ?? DEFAULT_INTERVAL_TIME;
    var e = (e?.PostProbability ?? 100) / 100;
    this.ProbabilityCooldown = {
      DefaultCooldownTime: o,
      DefaultProbability: e
    };
  }
  RefreshCoolDownTime(e, o = true) {
    ModelManager_1.ModelManager.GameAudioModel?.UpdateAudioCooldownRecord(e, this.Type, this.ProbabilityCooldown.DefaultProbability, this.ProbabilityCooldown.DefaultCooldownTime, o);
  }
  CheckCoolDownTime(e, o, t = true, i = true) {
    var r = true;
    var a = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItems();
    if (!a) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[CheckAndUpdateCoolDownTime] GetTeamItems失败");
      }
      return false;
    }
    let n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    for (const s of a) {
      if (s.GetConfigId === e) {
        n = s.GetPlayerId();
        break;
      }
    }
    let l = 0;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && (l = (ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(n)?.PlayerNumber ?? 1) - 1) < 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[CheckAndUpdateCoolDownTime] GetCurrentTeamListById失败");
      }
      return false;
    } else {
      r = (a = Time_1.Time.Now - this.CurrentTeamTime[l]) >= this.TeamIntervalTime;
      if (a < this.TeamIntervalTime && i && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[CheckAndUpdateCoolDownTime] PostEvent 队伍CD中，取消触发角色语音", ["RoleId", e], ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(this.Type)], ["剩余时间/秒", (this.TeamIntervalTime - a) / CommonDefine_1.MILLIONSECOND_PER_SECOND], ["CD/秒", this.TeamIntervalTime / CommonDefine_1.MILLIONSECOND_PER_SECOND]);
      }
      if ((r = r && (ModelManager_1.ModelManager.GameAudioModel?.CheckAudioProbabilityInfo(o, this.Type, this.ProbabilityCooldown, false, i) ?? false)) && t) {
        this.CurrentTeamTime[l] = Time_1.Time.Now;
        this.RefreshCoolDownTime(o, i);
      }
      return r;
    }
  }
}
class RoleAudioController extends ControllerBase_1.ControllerBase {
  static sca() {
    for (const o of [0, 1001, 1002, 1003, 1004, 10041, 10042, 1005, 1006, 1007, 2001, 2002, 2004, 2005, 2006, 2007, 2008, 1008]) {
      this.aca.set(o, new RoleAudioCoolDownTime(o));
    }
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("FixHookSkillList");
    if (e) {
      this.Isu = [];
      this.Isu.push(...e);
    }
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("SuperSprintStartSkillList");
    if (e) {
      this.Tsu = [];
      this.Tsu.push(...e);
    }
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("SuperSprintEndSkillList");
    if (e) {
      this.bsu = [];
      this.bsu.push(...e);
    }
  }
  static OnInit() {
    this.sca();
    this.Sir = (CommonParamById_1.configCommonParamById.GetIntConfig("LowEndurancePercent") ?? 0) / 10000;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.ero);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenTreasureBox, this.yir);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
    FormationAttributeController_1.FormationAttributeController.AddValueListener(1, this.Pni);
    return true;
  }
  static OnTick() {
    if (this.BKa) {
      this.bKa();
      this.Pln = Time_1.Time.Now;
    } else if (Global_1.Global.BaseCharacter && this.n$t && ModelManager_1.ModelManager.GameModeModel.WorldDone && !ModelManager_1.ModelManager.GameModeModel.IsTeleport) {
      if (this.n$t?.MoveComp?.IsMoving) {
        this.Phn = MIN_INTERVAL_TIME;
      } else {
        this.Phn = INTERVAL_TIME;
      }
      if (!(Time_1.Time.Now - this.Pln < this.Phn)) {
        this.Pln = Time_1.Time.Now;
        this.SetUpdateAudioDynamicTrace();
      }
    }
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.ero);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenTreasureBox, this.yir);
    FormationAttributeController_1.FormationAttributeController.RemoveValueListener(1, this.Pni);
    return true;
  }
  static SetUpdateAudioDynamicTrace(e = false) {
    this.qKa = e;
    if (!this.BKa) {
      this.BKa = true;
      this.OKa = false;
    }
  }
  static bKa() {
    var e = ue_1.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
    if (e) {
      if (this.OKa) {
        e?.DynamicReverbApply();
        this.OKa = false;
        this.BKa = false;
        if (this.qKa) {
          this.SetUpdateAudioDynamicTrace(true);
        }
      } else if (this.n$t) {
        e?.D_DynamicReverbTrace(this.n$t.ActorLocation, this.qKa);
        this.qKa = false;
        this.OKa = true;
      } else {
        this.BKa = false;
      }
    } else {
      this.OKa = false;
      this.BKa = false;
    }
  }
  static PlayRoleAudio(e, o, t) {
    var i = e?.GetComponent(3);
    var r = e?.GetComponent(189);
    var a = r?.GetAkComponent();
    if (e && i && r && a && r.Config) {
      return this.xzs(i.CreatureData.GetPbDataId(), e.Id, a, o, RoleAudioController.GetRoleAudioConfig(r.Config, o), t);
    } else {
      return 0;
    }
  }
  static xzs(e, o, t, i, r, a) {
    var n;
    var l = this.aca.get(0);
    if (l?.CheckCoolDownTime(e, o, false, false)) {
      if (this.n$t?.Entity.GetComponent(45)?.IsInRoll()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[RoleAudio] PostEvent 特殊移动模式下不触发角色语音", ["RoleId", e], ["Event", r], ["Owner", t.GetOwner()?.GetName()], ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(i)]);
        }
        return 0;
      } else if (n = this.aca.get(i)) {
        if (!r || r.length < 1) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Audio", 42, "[RoleAudio] event为空 在尝试播放角色未配置的语音", ["RoleId", e], ["Event", r], ["Owner", t.GetOwner()?.GetName()], ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(i)]);
          }
          return 0;
        } else if (n.CheckCoolDownTime(e, o)) {
          l?.RefreshCoolDownTime(o);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 42, "[RoleAudio] PostEvent 触发角色语音", ["RoleId", e], ["Event", r], ["Owner", t.GetOwner()?.GetName()], ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(i)]);
          }
          if (a) {
            return AudioSystem_1.AudioSystem.PostEvent(r, t, {
              CallbackMask: 1,
              CallbackHandler: (e, o) => {
                a(e, o);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Audio", 42, "[RoleAudio] 语音播放完成回调", ["Event", r]);
                }
              }
            });
          } else {
            return AudioSystem_1.AudioSystem.PostEvent(r, t);
          }
        } else {
          return 0;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Audio", 42, "[RoleAudio] IntervalCoolDownTimeMap没注册音频配置数据", ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(i)]);
        }
        return 0;
      }
    } else {
      return 0;
    }
  }
  static RefreshPlayAudioCooldownTime(e, o) {
    var t = this.aca.get(e);
    if (t) {
      t.RefreshCoolDownTime(o);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[RoleAudio] PostEvent 重置语音CD", ["Event", o], ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(e)]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 42, "[RoleAudio] IntervalCoolDownTimeMap没注册音频配置数据", ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(e)]);
    }
  }
  static OnPlayerIsHit(e) {
    TimerSystem_1.TimerSystem.Next(() => {
      this.PlayRoleAudio(e, 2007);
    });
  }
  static OnPlayerEnterFight(e, o) {
    if (o < ENTER_FIGHT_DISTANCE || e.Id !== Global_1.Global.BaseCharacter?.EntityId) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[RoleAudio] 触发进战语音距离不满足或非前台角色", ["Dist", o], ["Id", e.Id], ["Global", Global_1.Global.BaseCharacter?.EntityId]);
      }
    } else {
      this.PlayRoleAudio(e, 2006);
    }
  }
  static OnMoveStateChange(e, o) {
    switch (e) {
      case CharacterUnifiedStateTypes_1.ECharMoveState.Glide:
        this.PlayRoleAudio(o, 1002);
        break;
      case CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp:
        this.PlayRoleAudio(o, 2008);
        break;
      case CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb:
        TimerSystem_1.TimerSystem.Next(() => {
          this.PlayRoleAudio(o, 1001);
        });
    }
    this.Rsu(e, o);
  }
  static OnPlayerDies(e) {
    var o = e?.GetComponent(3);
    var t = e?.GetComponent(189);
    var i = t?.GetAkComponent();
    if (e && o && t && i && t.Config && e.Id === Global_1.Global.BaseCharacter?.EntityId && (AudioSystem_1.AudioSystem.PostEvent(t.Config.DeathEvent, i), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Audio", 42, "[RoleAudio] PostEvent 触发角色语音", ["RoleId", o.CreatureData.GetPbDataId()], ["Event", t.Config.DeathEvent], ["Owner", i.GetOwner()?.GetName()]);
    }
  }
  static OnPlayAccelerateAudio(e, o, t) {
    if (FormationDataController_1.FormationDataController.GlobalIsInFight) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[RoleAudio] 处于战斗状态，不触发加速语音", ["RoleId", e?.GetComponent(3)?.CreatureData.GetPbDataId()]);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[RoleAudio] 检查是否触发加速语音", ["MoveState", o], ["PositionState", t]);
      }
      if (o === CharacterUnifiedStateTypes_1.ECharMoveState.Sprint || t === CharacterUnifiedStateTypes_1.ECharPositionState.Air && o === CharacterUnifiedStateTypes_1.ECharMoveState.Other) {
        this.wsu = RoleAudioController.PlayRoleAudio(e, 1008, () => {
          this.wsu = 0;
        });
      }
    }
  }
  static Rsu(e, o) {
    var t;
    if (this.wsu !== 0 && !(t = o.GetComponent(101).PositionState, e === CharacterUnifiedStateTypes_1.ECharMoveState.Sprint) && (t !== CharacterUnifiedStateTypes_1.ECharPositionState.Ground || e !== CharacterUnifiedStateTypes_1.ECharMoveState.Other)) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.wsu, 0, {
        TransitionDuration: 1000
      });
      this.wsu = 0;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[RoleAudio] PostEvent 打断角色加速语音", ["RoleId", o?.GetComponent(3)?.CreatureData.GetPbDataId()], ["MoveState", e], ["PositionState", t]);
      }
    }
  }
  static GetRoleAudioConfig(e, o) {
    switch (o) {
      case 1001:
        return e.FastClimbEvent;
      case 1002:
        return e.EnterGlideEvent;
      case 1003:
        return e.ClimbLeapEvent;
      case 1005:
        return e.UseExploreHookEvent;
      case 1006:
        return e.ScanTreasureBoxEvent;
      case 1007:
        return e.OpenTreasureBoxEvent;
      case 2001:
        return e.VisionMorphEvent;
      case 2002:
        return e.VisionSummonEvent;
      case 2004:
        return e.ExtremeDodgeEvent;
      case 2005:
        return e.ParryEvent;
      case 2006:
        return e.EnterBattleEvent;
      case 2007:
        return e.UnderAttackEvent;
      case 2008:
        return e.KnockUpEvent;
      case 1008:
        return e.AccelerateEvent;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Audio", 42, "[RoleAudio] 错误的类型", ["type", o]);
        }
        return "";
    }
  }
  static GetRoleAudioTypeDesc(e) {
    switch (e) {
      case 0:
        return "全局";
      case 1001:
        return "快速攀爬";
      case 1002:
        return "滑翔";
      case 1003:
        return "跨越";
      case 1004:
      case 10041:
      case 10042:
        return "体力变化";
      case 1005:
        return "使用钩锁技能";
      case 1006:
        return "扫描到宝箱";
      case 1007:
        return "开宝箱";
      case 2001:
        return "幻象变身";
      case 2002:
        return "幻象召唤";
      case 2004:
        return "闪避";
      case 2005:
        return "弹反";
      case 2006:
        return "进战";
      case 2007:
        return "受击";
      case 2008:
        return "被击飞";
      case 1008:
        return "加速";
    }
    return "未定义";
  }
}
exports.RoleAudioController = RoleAudioController;
(_a = RoleAudioController).Isu = undefined;
RoleAudioController.Tsu = undefined;
RoleAudioController.bsu = undefined;
RoleAudioController.n$t = undefined;
RoleAudioController.Asu = undefined;
RoleAudioController.Sir = 0;
RoleAudioController.aca = new Map();
RoleAudioController.Phn = INTERVAL_TIME;
RoleAudioController.Pln = 0;
RoleAudioController.OKa = false;
RoleAudioController.BKa = false;
RoleAudioController.qKa = false;
RoleAudioController.ero = (e, o, t) => {
  e = EntitySystem_1.EntitySystem.Get(e);
  if (e && (!_a.Isu?.includes(o) && o !== 210001 || _a.PlayRoleAudio(e, 1005), _a.Tsu?.includes(o) && _a.OnPlayAccelerateAudio(e, CharacterUnifiedStateTypes_1.ECharMoveState.Sprint, CharacterUnifiedStateTypes_1.ECharPositionState.Ground), _a.bsu?.includes(o))) {
    _a.RefreshPlayAudioCooldownTime(0, e.Id);
  }
};
RoleAudioController.Crl = [];
RoleAudioController.grl = [];
RoleAudioController.dLe = () => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Audio", 42, "[RoleAudio] 随队伍预加载角色Foley和脚步声音效");
  }
  _a.grl.length = 0;
  _a.grl.push(..._a.Crl);
  _a.Crl.length = 0;
  for (const o of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()) {
    var e = o.Entity?.CheckGetComponent(189);
    if (e?.Config) {
      if (!_a.Crl.includes(e.Config.FootstepEvent)) {
        _a.Crl.push(e.Config.FootstepEvent);
      }
      if (!_a.Crl.includes(e.Config.FoleyEvent)) {
        _a.Crl.push(e.Config.FoleyEvent);
      }
    }
  }
  for (const t of _a.grl) {
    if (!_a.Crl.includes(t)) {
      AudioSystem_1.AudioSystem.ReleaseAudioEvent(t);
    }
  }
  for (const i of _a.Crl) {
    if (!_a.grl.includes(i)) {
      AudioSystem_1.AudioSystem.PreloadAudioEvent(i);
    }
  }
};
RoleAudioController.xie = (e, o) => {
  _a.n$t = e.Entity?.CheckGetComponent(3);
  _a.Asu = e.Entity?.CheckGetComponent(189);
  if (_a.Asu?.Config) {
    AudioSystem_1.AudioSystem.SetState("role_name", _a.Asu.Config.Name);
  }
  e = _a.Asu?.GetAkComponent();
  if (e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[RoleAudio] PostEvent 角色进场语音事件", ["RoleId", _a.n$t?.CreatureData.GetPbDataId()], ["Event", ROLE_CHANGE_FRONT_EVENT], ["Owner", e.GetOwner()?.GetName()]);
    }
    AudioSystem_1.AudioSystem.PostEvent(ROLE_CHANGE_FRONT_EVENT, e);
  }
};
RoleAudioController.yir = () => {
  if (_a.n$t) {
    _a.PlayRoleAudio(_a.n$t.Entity, 1007);
  }
};
RoleAudioController.Pni = (o, t, i) => {
  if (o === 1 && !(i < t) && !ModelManager_1.ModelManager.SceneTeamModel?.ChangingRole) {
    o = FormationAttributeController_1.FormationAttributeController.GetMax(1);
    if (!(t / o > _a.Sir)) {
      var t = _a.Asu?.GetAkComponent();
      var r = _a.Asu?.Config?.LowStrengthEvent;
      if (_a.n$t && t && r) {
        var a = _a.aca.get(10041);
        var n = _a.aca.get(10042);
        if (a && n) {
          var l = _a.n$t.CreatureData.GetPbDataId();
          var s = _a.n$t.Entity.Id;
          if (a.CheckCoolDownTime(l, s, false, false) && n.CheckCoolDownTime(l, s, false, false)) {
            let e = false;
            if (e = (i / o > _a.Sir ? a : n).CheckCoolDownTime(l, s, true)) {
              _a.xzs(_a.n$t.CreatureData.GetPbDataId(), s, t, 1004, r);
            }
          }
        }
      }
    }
  }
};
RoleAudioController.wsu = 0; //# sourceMappingURL=RoleAudioController.js.map