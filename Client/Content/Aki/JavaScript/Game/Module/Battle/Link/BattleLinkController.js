"use strict";

var _a;
var __decorate = this && this.__decorate || function (e, t, i, a) {
  var n;
  var o = arguments.length;
  var r = o < 3 ? t : a === null ? a = Object.getOwnPropertyDescriptor(t, i) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, a);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (n = e[l]) {
        r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleLinkController = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletController_1 = require("../../../NewWorld/Bullet/BulletController");
const AbilityEvent_1 = require("../../../NewWorld/Character/Common/Component/Abilities/AbilityEvent");
const GameplayCueController_1 = require("../../../NewWorld/Character/Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController");
const RenderUtil_1 = require("../../../Render/Utils/RenderUtil");
const UiTimeDilation_1 = require("../../../Ui/Base/UiTimeDilation");
const UiManager_1 = require("../../../Ui/UiManager");
const GameModeController_1 = require("../../../World/Controller/GameModeController");
const BattleUiControl_1 = require("../../BattleUi/BattleUiControl");
const CombatMessage_1 = require("../../CombatMessage/CombatMessage");
const BattleLinkDefine_1 = require("./BattleLinkDefine");
const seqCameraTag = new UE.FName("SequenceCamera");
const characterTag = new UE.FName("Character");
class BattleLinkController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(24337, this.JAl);
    Net_1.Net.Register(20168, this.ZAl);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(24337);
    Net_1.Net.UnRegister(20168);
    this.Nmt();
    return true;
  }
  static OnPreload() {
    if (ModelManager_1.ModelManager.BattleLinkModel?.CheckInBattleLink()) {
      this.yWe();
      this.PJa();
      if (ModelManager_1.ModelManager.BattleLinkModel?.CheckInDreamLink() || ModelManager_1.ModelManager.MapRogueModel.GameInfo?.InBattle && ModelManager_1.ModelManager.BattleLinkModel.CheckInNewBattleLink()) {
        return ["BattleLinkController", ModelManager_1.ModelManager.BattleLinkModel.PreloadTeamRoleRes()];
      } else {
        return undefined;
      }
    }
  }
  static OnLeaveLevel() {
    this.Nmt();
    this.Zza = false;
    if (this.awa) {
      if (this.awa.SequencePlayer?.IsPlaying()) {
        this.awa.SequencePlayer?.Stop();
      }
      ActorSystem_1.ActorSystem.Put("BattleLinkController.OnLeaveLevel", this.awa);
    }
    this.awa = undefined;
    if (this.j3) {
      TimerSystem_1.TimerSystem.Remove(this.j3);
      this.j3 = undefined;
      this.eRe();
    }
    if (this.tJa) {
      BattleUiControl_1.BattleUiControl.SetBattleViewVisible(this.tJa);
    }
    this.tJa = undefined;
    if (this.dgl) {
      UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag("BattleLinkController.LinkExplosionStart");
      GameModeController_1.GameModeController.SetTimeDilation(1);
    }
    this.dgl = false;
    this.Ash.clear();
    this.Dsh = true;
    this.Mth = undefined;
    this.vBu = undefined;
    return !(this.cRd = undefined);
  }
  static yWe() {
    if (!this.zHa && (this.zHa = true, ModelManager_1.ModelManager.BattleLinkModel.CheckInDreamLink() && (EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.BJe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe)), ModelManager_1.ModelManager.BattleLinkModel.CheckInNewBattleLink() && (EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnRoleDead, this.pr1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRevive, this.vr1)), ModelManager_1.ModelManager.BattleLinkModel.CheckInSpecialBattleLink())) {
      var e = ModelManager_1.ModelManager.CreatureModel?.GetPlayerId() ?? 0;
      var t = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(e);
      if (t) {
        e = ConfigManager_1.ConfigManager.BattleLinkConfig.GetLinkParam(1);
        if (e) {
          this.dRd = new Map();
          for (var [i, a] of e.LinkBuffRoleMap.entries()) {
            AbilityEvent_1.AbilityEvent.Add(t, 3, i, this.mRd);
            this.dRd.set(i, a);
          }
        }
        this.fRd = t;
      }
    }
  }
  static Nmt() {
    if (this.zHa) {
      this.zHa = false;
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
      }
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharUseSkill, this.BJe)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.BJe);
      }
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharOnRoleDead, this.pr1)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnRoleDead, this.pr1);
      }
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnRevive, this.vr1)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRevive, this.vr1);
      }
      if (ModelManager_1.ModelManager.BattleLinkModel.CheckInSpecialBattleLink() && this.fRd && this.dRd) {
        for (const e of this.dRd.keys()) {
          AbilityEvent_1.AbilityEvent.Remove(this.fRd, 3, e, this.mRd);
        }
      }
      this.fRd = undefined;
      this.dRd = undefined;
    }
  }
  static PJa() {
    this.awa ||= ActorSystem_1.ActorSystem.Get(UE.LevelSequenceActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined, false);
  }
  static yr1(e, t) {
    if (this.Sr1?.includes(e)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnNewLinkStatusChanged, ModelManager_1.ModelManager.BattleLinkModel.GetNewLinkStatus());
    }
  }
  static Rsh(t) {
    if (!this.Ash.has(t)) {
      var i = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(i).GetCurrentGroup().GetRoleList();
      let e = 0;
      for (const n of i) {
        var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(n.CreatureDataId);
        if (a.Entity.Id === t && (this.Ash.set(a.Entity.Id, a), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Battle", 67, "[BattleLink]缓存Entity成功", ["entityId", t]);
        }
        if (this.Ash.has(a.Entity.Id)) {
          e += 1;
        }
      }
      if (e === i.length) {
        this.Dsh = false;
      }
    }
  }
  static UseLinkSkill(e) {
    var t;
    var i;
    if (e) {
      if (this.Zqi) {
        if (ModelManager_1.ModelManager.BattleLinkModel.HasLinkEntityId(e.Id)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 67, "[BattleLink]触发队友大招失败, 该entity已触发过", ["entityId", e.Id]);
          }
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 67, "[BattleLink]触发队友大招成功", ["MessageId", this.Zqi], ["entityId", e.Id]);
          }
          e = e.GetComponent(175);
          t = MathUtils_1.MathUtils.LongToBigInt(this.Zqi);
          if (i = CommonParamById_1.configCommonParamById.GetLong54Config("LinkSkillNotifyBuff")) {
            e.AddBuff(i, {
              InstigatorId: e.CreatureDataId,
              Reason: "触发Link大招",
              PreMessageId: t
            });
          }
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[BattleLink]触发队友大招失败", ["MessageId", this.Zqi]);
      }
    }
  }
  static StartLink(e = 0) {
    e = e === 0 ? TimeUtil_1.TimeUtil.GetServerTimeStamp() : e;
    if (UiManager_1.UiManager.IsViewOpen("BattleLinkView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBattleLinkRestart, e);
    } else {
      UiManager_1.UiManager.OpenView("BattleLinkView", e);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "[BattleLink]Link倒计时开始");
    }
  }
  static StopLink() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBattleLinkStop);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "[BattleLink]Link倒计时结束");
    }
  }
  static StartLinkExplosion() {
    this.StopLink();
    this.TryPlaySplitScreen();
  }
  static TryPlaySplitScreen() {
    if (!this.Zza) {
      if (ModelManager_1.ModelManager.BattleLinkModel?.CheckSplitScreenRes() && this.awa) {
        this.Zza = true;
        ModelManager_1.ModelManager.BattleLinkModel.PlayRoleAnim(true);
        if (ModelManager_1.ModelManager.BattleLinkModel.GetSplitScreenMainBp()?.IsA(UE.BP_SplitScreen_New_C.StaticClass())) {
          this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
            this.j3 = undefined;
            this.t$a();
          }, 100);
        } else {
          this.eJa();
        }
        this.LinkExplosionStart();
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏衔接播放失败");
      }
    }
  }
  static eJa() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
    if (e &&= e.GetComponent(21)) {
      this.yau = e?.AddCue(BattleLinkDefine_1.LINK_BURST_POST_EFFECT);
    }
    var e = BattleLinkDefine_1.LINK_POST_EFFECT_DURATION * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
      this.j3 = undefined;
      this.eRe();
      this.t$a();
    }, e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "[BattleLink]播放分屏衔接");
    }
  }
  static eRe() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
    if (e &&= e.GetComponent(21)) {
      e.RemoveCueByHandle(this.yau);
    }
  }
  static t$a() {
    var e = ModelManager_1.ModelManager.BattleLinkModel;
    var t = e?.GetSplitScreenMainBp();
    var i = e?.GetSplitScreenSeq();
    if (t && i && this.awa) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏Seq开始播放");
      }
      AudioSystem_1.AudioSystem.SetState("sp_rogue_link_vo_reuse_burst", "vo_reuse");
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 42, "[BattleLink]Link分屏开始播放");
      }
      e.InitBeforeStart();
      e.PlayRoleAnim();
      AudioSystem_1.AudioSystem.SetState("game_rogue_link_state", "in_link");
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 42, "[BattleLink]Link音乐切入");
      }
      e.PlayRoleLinkAudio();
      this.Mth = new UE.Rotator();
      e = ControllerHolder_1.ControllerHolder.CameraController.CameraRotator;
      this.Mth.Pitch = e.Pitch;
      this.Mth.Yaw = e.Yaw;
      this.Mth.Roll = e.Roll;
      CameraController_1.CameraController.SequenceCamera.PlayerComponent.SetBlendTime(0, 0);
      CameraController_1.CameraController.SequenceCamera.PlayerComponent.StopSequence();
      e = ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera;
      this.awa.SetSequence(i);
      this.GPe.Add(e);
      this.awa.SetBindingByTag(seqCameraTag, this.GPe, false);
      this.GPe.Empty();
      this.GPe.Add(t);
      this.awa.SetBindingByTag(characterTag, this.GPe, false);
      this.GPe.Empty();
      CameraController_1.CameraController.EnterCameraMode(1);
      t.SetActorHiddenInGame(false);
      t.Start();
      this.awa.SequencePlayer.OnFinished.Clear();
      this.awa.SequencePlayer.OnFinished.Add(this.uwa);
      this.awa.SequencePlayer.Play();
      RenderUtil_1.RenderUtil.BeginPSOSyncMode();
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏Seq播放失败");
      }
      this.LinkExplosionEnd();
    }
  }
  static LinkExplosionStart() {
    UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag("BattleLinkController.LinkExplosionStart");
    this.dgl = true;
    this.tJa = BattleUiControl_1.BattleUiControl.SetBattleViewInvisible();
    GameModeController_1.GameModeController.SetTimeDilation(0);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏假时停开始");
    }
  }
  static LinkExplosionEnd() {
    UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag("BattleLinkController.LinkExplosionStart");
    this.dgl = false;
    if (this.tJa) {
      BattleUiControl_1.BattleUiControl.SetBattleViewVisible(this.tJa);
    }
    this.tJa = undefined;
    GameModeController_1.GameModeController.SetTimeDilation(1);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏假时停结束");
    }
    ModelManager_1.ModelManager.BattleLinkModel?.ResetLinkSkillStatus();
    if (this.Zqi) {
      var i;
      var a = MathUtils_1.MathUtils.LongToBigInt(this.Zqi);
      var n = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
      var o = n.GetComponent(175);
      let e = undefined;
      let t = undefined;
      if (ModelManager_1.ModelManager.BattleLinkModel?.CheckInDreamLink()) {
        e = CommonParamById_1.configCommonParamById.GetLong54ArrayConfig("LinkBrustBuffs");
        t = CommonParamById_1.configCommonParamById.GetLong54ArrayConfig("LinkBrustBullets");
      } else if (i = ModelManager_1.ModelManager.BattleLinkModel?.GetLinkConfig()) {
        e = i.BuffIdsInBrust;
        t = i.BulletIdsInBrust;
      }
      if (e) {
        for (const l of e) {
          var r = Number(l);
          o.AddBuff(r, {
            InstigatorId: o.CreatureDataId,
            Reason: "Link爆发结束增加buff",
            PreMessageId: a
          });
          this.vBu ||= [];
          this.vBu.push(r);
        }
      }
      if (t) {
        for (const s of t) {
          BulletController_1.BulletController.CreateBulletCustomTarget(n, s.toString(), undefined, {}, a);
        }
      }
    }
  }
  static yBu() {
    if (this.vBu && this.vBu.length !== 0) {
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(175);
      if (e) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 67, "[BattleLink]离开Link爆发状态, 开始移除Link爆发Buff");
        }
        for (const t of this.vBu) {
          e.RemoveBuff(t, -1, "离开Link爆发状态移除buff");
        }
      }
      this.vBu.length = 0;
    }
  }
  static SetPlayerUltraSkillEnable(e) {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(206);
    if (t) {
      if (e) {
        t.RemoveTag(-732810197);
      } else {
        t.AddTag(-732810197);
      }
    }
  }
  static ShowLinkButton(e, t) {
    UiManager_1.UiManager.GetViewByName("BattleView").ShowLinkButton(e);
    if (t) {
      ModelManager_1.ModelManager.BattleLinkModel.SetNewLinkGmTest(e);
      this.Nmt();
      this.yWe();
    }
  }
  static RefreshAliveRoleIdList() {
    let e = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamRoleConfigIdList(false, true);
    if (e) {
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
      const a = [];
      for (const n of t) {
        var i = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(n.GetConfigId);
        if (i && n.IsDead()) {
          a.push(i);
        }
      }
      e = e.filter(e => !a.includes(e));
      ModelManager_1.ModelManager.BattleLinkModel.SetRoleIdList(e);
      ModelManager_1.ModelManager.BattleLinkModel.ResetMainBp();
    }
  }
  static GetIsInLinkExplosion() {
    return this.dgl;
  }
  static SetMessageId(e) {
    this.Zqi = e;
  }
  static GetMessageId() {
    return this.Zqi;
  }
  static OnNewLinkStateNotify(e, t, i) {
    var a = i?.$8n ?? 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "[BattleLink]接收Link状态改变通知", ["status", t.lMs], ["msgId", a]);
    }
    if (e?.Valid) {
      this.SetMessageId(a);
      ModelManager_1.ModelManager.BattleLinkModel?.HandleNewLinkStateNotify(t, i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnNewLinkStatusChanged, Number(t.lMs));
      if (t.lMs === Protocol_1.Aki.Protocol.qn1.Proto_Burst) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBattleLinkStatusChanged, 4);
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBattleLinkStatusChanged, 0);
      }
    }
  }
  static OnExitLinkBurst() {
    AudioSystem_1.AudioSystem.SetState("game_rogue_link_state", "not_in_link");
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 42, "[BattleLink]Link音乐切出");
    }
    this.yBu();
  }
  static RequestNewLinkBurst() {
    var e;
    var t;
    if (this.Zqi !== undefined && (e = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity)) {
      t = MathUtils_1.MathUtils.LongToBigInt(this.Zqi);
      CombatMessage_1.CombatNet.Send(16466, e, Protocol_1.Aki.Protocol.kn1.create(), t);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[BattleLink]Link爆发请求", ["msgId", t]);
      }
      if (this.cRd) {
        ModelManager_1.ModelManager.BattleLinkModel.SetRoleIdList(this.cRd);
        ModelManager_1.ModelManager.BattleLinkModel.ResetMainBp();
      } else {
        this.RefreshAliveRoleIdList();
      }
      this.TryPlaySplitScreen();
    }
  }
  static async NewLinkBurstTest() {
    if (!this.w8c) {
      this.w8c = true;
      this.PJa();
      if (this.cRd) {
        await this.PreloadRes(1);
        ModelManager_1.ModelManager.BattleLinkModel.SetRoleIdList(this.cRd);
        ModelManager_1.ModelManager.BattleLinkModel.ResetMainBp();
      } else {
        this.RefreshAliveRoleIdList();
        await ModelManager_1.ModelManager.BattleLinkModel.PreloadRes().Promise;
      }
      this.TryPlaySplitScreen();
      this.w8c = false;
    }
  }
  static async PreloadRes(e) {
    ModelManager_1.ModelManager.BattleLinkModel.SetPreloadConfigId(e);
    e = ModelManager_1.ModelManager.BattleLinkModel.PreloadRes();
    await e.Promise;
    return e.IsFulfilled();
  }
}
(_a = BattleLinkController).zHa = false;
BattleLinkController.tJa = undefined;
BattleLinkController.Zqi = undefined;
BattleLinkController.Zza = false;
BattleLinkController.yau = GameplayCueController_1.INVALID_CUE_HANDLE;
BattleLinkController.awa = undefined;
BattleLinkController.GPe = UE.NewArray(UE.Actor);
BattleLinkController.Mth = undefined;
BattleLinkController.j3 = undefined;
BattleLinkController.Ash = new Map();
BattleLinkController.Dsh = true;
BattleLinkController.dgl = false;
BattleLinkController.Sr1 = [];
BattleLinkController.vBu = undefined;
BattleLinkController.fRd = undefined;
BattleLinkController.dRd = undefined;
BattleLinkController.cRd = undefined;
BattleLinkController.w8c = false;
BattleLinkController.BJe = (e, t, i) => {
  if (_a.Dsh && !_a.Ash.has(e)) {
    _a.Rsh(e);
  }
  var a = _a.Ash.get(e);
  if (a) {
    if (a.Entity?.GetComponent(40)?.GetSkillInfo(t)?.SkillGenre === 3 && ModelManager_1.ModelManager.BattleLinkModel.CanUseLinkSkill(e)) {
      ModelManager_1.ModelManager.BattleLinkModel.AddLinkEntityId(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBattleLinkStop);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBattleLinkStatusChanged, 3);
    }
  } else if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Battle", 67, "[BattleLink]EntityCache中找不到entity", ["entityId", e]);
  }
};
BattleLinkController.dLe = () => {
  if (ModelManager_1.ModelManager.BattleLinkModel.CheckInNewBattleLink()) {
    _a.Sr1.length = 0;
    for (const i of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
      var e = i.EntityHandle?.Entity?.Id ?? 0;
      if (e) {
        _a.Sr1.push(e);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnNewLinkStatusChanged, ModelManager_1.ModelManager.BattleLinkModel.GetNewLinkStatus());
  } else {
    var t = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamRoleConfigIdList(false, true);
    if (t) {
      ModelManager_1.ModelManager.BattleLinkModel.SetRoleIdList(t);
      ModelManager_1.ModelManager.BattleLinkModel.ResetMainBp();
    }
    _a.Ash.clear();
    _a.Dsh = true;
  }
};
BattleLinkController.pr1 = e => {
  _a.yr1(e, true);
};
BattleLinkController.vr1 = e => {
  _a.yr1(e.Id, false);
};
BattleLinkController.mRd = (t, e) => {
  t = _a.dRd?.get(t);
  if (t && (_a.cRd ||= [], !_a.cRd.includes(t))) {
    let e = t;
    var i;
    var a = ConfigManager_1.ConfigManager.BattleLinkConfig.GetLinkParam(1);
    if (a?.ChangeGenderMap.has(t) && (i = ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleById(t)) && i.Gender !== ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() && (i = a.ChangeGenderMap.get(t))) {
      e = i;
    }
    if (!_a.cRd.includes(e)) {
      _a.cRd.splice(0, 0, e);
    }
    if (_a.cRd.length > 3) {
      _a.cRd.length = 3;
    }
  }
};
BattleLinkController.uwa = () => {
  _a.Zza = false;
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏Seq播放结束");
  }
  AudioSystem_1.AudioSystem.SetState("sp_rogue_link_vo_reuse_burst", "none");
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Battle", 42, "[BattleLink]Link分屏播放结束");
  }
  var e = ModelManager_1.ModelManager.BattleLinkModel?.GetSplitScreenMainBp();
  e?.End();
  e?.SetActorHiddenInGame(true);
  var e = ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera;
  if (e.GetAttachParentActor()) {
    e.K2_DetachFromActor();
  }
  CameraController_1.CameraController.ExitCameraMode(1);
  if (_a.Mth) {
    CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(_a.Mth);
    _a.Mth = undefined;
  }
  _a.LinkExplosionEnd();
  RenderUtil_1.RenderUtil.EndPSOSyncMode();
};
BattleLinkController.JAl = e => {
  ModelManager_1.ModelManager.BattleLinkModel?.HandleLinkingStateNotify(e);
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Battle", 67, "[BattleLink]接收Link状态改变通知", ["status", e.sT_], ["msgId", e._Vn]);
  }
};
BattleLinkController.ZAl = e => {
  ModelManager_1.ModelManager.BattleLinkModel?.HandleLinkExitNotify(e);
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Battle", 67, "[BattleLink]接收Link退出通知", ["status", e.sT_], ["reason", e.x9n]);
  }
  _a.OnExitLinkBurst();
};
__decorate([CombatMessage_1.CombatNet.Listen("Bn1", false)], BattleLinkController, "OnNewLinkStateNotify", null);
exports.BattleLinkController = BattleLinkController; //# sourceMappingURL=BattleLinkController.js.map