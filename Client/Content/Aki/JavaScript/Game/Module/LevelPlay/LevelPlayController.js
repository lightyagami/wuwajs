"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralNetworks_1 = require("../../LevelGamePlay/LevelGeneralNetworks");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const BattleNetController_1 = require("../../World/Controller/BattleNetController");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const ControllerWithAssistantBase_1 = require("../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase");
const GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const MapController_1 = require("../Map/Controller/MapController");
const PowerController_1 = require("../Power/PowerController");
const GuideLineAssistant_1 = require("../QuestNew/Controller/GuideLineAssistant");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const LevelPlayDefine_1 = require("./LevelPlayDefine");
const LevelPlayModel_1 = require("./LevelPlayModel");
const WAIT_ENTITY_OVER_TIME = 90000;
const assistantMap = {
  [0]: undefined
};
class LevelPlayController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnRegisterNetEvent() {
    super.OnRegisterNetEvent();
    Net_1.Net.Register(21380, LevelPlayController.Opi);
    Net_1.Net.Register(25318, LevelPlayController.kpi);
    Net_1.Net.Register(20288, LevelPlayController.Fpi);
    Net_1.Net.Register(25315, LevelPlayController.Vpi);
    Net_1.Net.Register(16414, LevelPlayController.Hpi);
    Net_1.Net.Register(26188, LevelPlayController.jpi);
    Net_1.Net.Register(28296, LevelPlayController.oja);
  }
  static OnUnRegisterNetEvent() {
    super.OnRegisterNetEvent();
    Net_1.Net.UnRegister(21380);
    Net_1.Net.UnRegister(25318);
    Net_1.Net.UnRegister(20288);
    Net_1.Net.UnRegister(25315);
    Net_1.Net.UnRegister(16414);
    Net_1.Net.UnRegister(26188);
    Net_1.Net.UnRegister(28296);
  }
  static OnAddEvents() {
    super.OnAddEvents();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AnyCharGravityDirectChanged, LevelPlayController.M6c);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, LevelPlayController.dLe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnRoleDead, LevelPlayController.Uku);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, LevelPlayController.nye);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AnyCharGravityDirectChanged, LevelPlayController.M6c);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, LevelPlayController.dLe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnRoleDead, LevelPlayController.Uku);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, LevelPlayController.nye);
    super.OnRemoveEvents();
  }
  static RegisterAssistant() {
    this.AddAssistant(0, new GuideLineAssistant_1.GuideLineAssistant(Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay));
  }
  static cYt(e) {
    if (this.Assistants) {
      return this.Assistants.get(e);
    }
  }
  static OnInit() {
    this.InitTickOptimize(60, 120);
    return super.OnInit();
  }
  static Wpi() {
    const o = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (o) {
      const a = ModelManager_1.ModelManager.LevelPlayModel;
      var e = a.GetProcessingLevelPlayInfos();
      if (e.size === 0) {
        a.SetTrackLevelPlayId(LevelPlayDefine_1.INVALID_LEVELPLAYID);
      } else {
        let t = a.GetTrackLevelPlayInfo();
        if (t && (t = t.CanTrack && (t.UpdateDistanceSquared(o), t.IsInTrackRange()) ? t : undefined)?.Tree?.GetBlackBoard()?.IsTrackBoundToParent) {
          t = undefined;
        }
        const n = a.GetTrackLevelPlayId();
        e.forEach((e, r) => {
          if (r !== n && e.CanTrack) {
            for (var [, l] of a.EverBoundLevelPlayIds ?? []) {
              if (l?.has(r)) {
                return;
              }
            }
            if (!e?.Tree?.GetBlackBoard()?.IsTrackBoundToParent) {
              if (e?.IsOnlyTrackWhenQuestBind) {
                e.UpdateDistanceSquared(o);
              } else if (t) {
                if (!(e.TrackPriority < t.TrackPriority)) {
                  if (e.TrackPriority > t.TrackPriority) {
                    e.UpdateDistanceSquared(o);
                    if (e.IsInTrackRange()) {
                      t = e;
                    }
                  } else {
                    e.UpdateDistanceSquared(o);
                    if (e.IsInTrackRange() && e.CacheDistanceSquared < t.CacheDistanceSquared) {
                      t = e;
                    }
                  }
                }
              } else {
                e.UpdateDistanceSquared(o);
                if (e.IsInTrackRange()) {
                  t = e;
                }
              }
            }
          }
        });
        e = t?.Id ?? LevelPlayDefine_1.INVALID_LEVELPLAYID;
        a.SetTrackLevelPlayId(e);
      }
    }
  }
  static GFg() {
    const t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (t) {
      var e = ModelManager_1.ModelManager.LevelPlayModel;
      var r = e.GetProcessingLevelPlayInfos();
      if (r.size === 0) {
        e.SetTrackBoundLevelPlayId(LevelPlayDefine_1.INVALID_LEVELPLAYID);
      } else {
        let l = e.GetTrackBoundLevelPlayInfo();
        if (!!l && !(l = l.CanTrack && (l.UpdateDistanceSquared(t), l.IsInTrackRange()) ? l : undefined)?.Tree?.GetBlackBoard()?.IsTrackBoundToParent) {
          l = undefined;
        }
        const o = e.GetTrackBoundLevelPlayId();
        r.forEach((e, r) => {
          if (r !== o && e.CanTrack && e?.Tree?.GetBlackBoard()?.IsTrackBoundToParent) {
            if (l) {
              if (!(e.TrackPriority < l.TrackPriority)) {
                if (e.TrackPriority > l.TrackPriority) {
                  e.UpdateDistanceSquared(t);
                  if (e.IsInTrackRange()) {
                    l = e;
                  }
                } else {
                  e.UpdateDistanceSquared(t);
                  if (e.IsInTrackRange() && e.CacheDistanceSquared < l.CacheDistanceSquared) {
                    l = e;
                  }
                }
              }
            } else {
              e.UpdateDistanceSquared(t);
              if (e.IsInTrackRange()) {
                l = e;
              }
            }
          }
        });
        r = l?.Id ?? LevelPlayDefine_1.INVALID_LEVELPLAYID;
        e.SetTrackBoundLevelPlayId(r);
      }
    }
  }
  static Kpi(e) {
    if (ModelManager_1.ModelManager.TrackModel.IsTracking(4, e)) {
      MapController_1.MapController.RequestTrackMapMark({
        MarkType: 10,
        MarkId: e,
        Track: false
      });
    }
  }
  static ReceiveReward(l, t) {
    if (!ModelManager_1.ModelManager.LevelPlayModel.IsInReceiveReward) {
      const M = ModelManager_1.ModelManager.CreatureModel.GetEntity(l);
      if (M) {
        var o = M.Entity.GetComponent(0);
        var a = o.GetPbDataId();
        const y = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfoByRewardEntityId(a);
        if (y) {
          a = ConfigManager_1.ConfigManager.LevelPlayConfig.GetExchangeRewardInfo(y.RewardId);
          if (a && a.Cost) {
            const C = a.Cost.get(5);
            let e = !(ModelManager_1.ModelManager.LevelPlayModel.IsInReceiveReward = true);
            let r = undefined;
            if (t > 0) {
              const y = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(t);
              if (y && y.LevelPlayType === "SilentArea" && (r = ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity([3], false)) && r.LeftUpCount > 0) {
                e = true;
              }
            }
            var [t, n, i, _, v] = ModelManager_1.ModelManager.ActivityRegressModel.GetLevelPlayDoubleDropTuple(t);
            var s = a.SharedId > 0;
            if (a.SharedId === LevelPlayDefine_1.WEEK_SHARE_ID) {
              var g = ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(a.SharedId);
              if (ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetShareMaxCount(a.SharedId) <= g) {
                ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Week_InstanceDungeonRewardTimeNotEnough_Text");
                ModelManager_1.ModelManager.LevelPlayModel.IsInReceiveReward = false;
                return;
              }
            }
            if (!t && !s && ModelManager_1.ModelManager.FunctionModel.IsOpen(10071) && CommonParamById_1.configCommonParamById.GetIntArrayConfig("MultiExchangeLevelPlayType")?.includes(y.LevelPlayTypeNumber)) {
              a = {
                SinglePowerCost: C,
                RewardCallBack: e => {
                  LevelPlayController.RequestReceiveReward(l, e, y);
                },
                NeedResetLevelPlayModelRewardFlag: true
              };
              if (e) {
                a.Tip = r?.GetFullTip();
              }
              UiManager_1.UiManager.OpenView("PowerMagnificationRewardPopView", a);
            } else {
              g = new ConfirmBoxDefine_1.ConfirmBoxDataNew(64);
              g.ShowPowerItem = true;
              g.IsEscViewTriggerCallBack = false;
              g.CanExecuteCloseFunc = e => e !== 2 || ModelManager_1.ModelManager.PowerModel.IsPowerEnough(C);
              g.SetTextArgs(C.toString());
              const L = LevelPlayController.pcm(o);
              if (L !== -1) {
                g.SetBtnText(0, ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey("Text_ButtonTextRetry_Text", ""));
                g.FunctionMap.set(1, () => {
                  ModelManager_1.ModelManager.LevelPlayModel.IsInReceiveReward = false;
                  LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntityInteractOption(l, L, e => M.Entity?.GetComponent(209)?.GetInteractController()?.HandleInteractResponse(e.Q4n, e.UIs));
                });
              }
              g.FunctionMap.set(2, () => {
                if (LevelPlayController.Qpi(C)) {
                  LevelPlayController.RequestReceiveReward(l, 1, y);
                }
              });
              g.DestroyFunction = () => {
                ModelManager_1.ModelManager.LevelPlayModel.IsInReceiveReward = false;
              };
              if (e && r) {
                g.Tip = r.GetFullTip();
              }
              if (t) {
                s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(v);
                a = StringUtils_1.StringUtils.FormatStaticBuilder(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(_), n, i);
                g.Tip = "" + s + a;
              }
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(g);
            }
          }
        }
      }
    }
  }
  static pcm(e) {
    e = e.GetPbEntityInitData();
    if (e) {
      var r = (0, IComponent_1.getComponent)(e.ComponentsData, "InteractComponent");
      if (r && r.Options) {
        for (let e = 0; e < r.Options.length; e++) {
          var l = r.Options[e];
          if (l.Type.Type === "Actions" && l.Type.Actions?.[0]?.Name === "ResetLevelPlay") {
            return e;
          }
        }
      }
    }
    return -1;
  }
  static RequestReceiveReward(e, r, l) {
    e = Protocol_1.Aki.Protocol.Jns.create({
      F4n: MathUtils_1.MathUtils.NumberToLong(e),
      Cal: r
    });
    ModelManager_1.ModelManager.ActivityRegressModel.LastUnGetRewardLevelPlayId = l.Id;
    Net_1.Net.Call(20399, e, e => {
      ModelManager_1.ModelManager.ActivityRegressModel.LastUnGetRewardLevelPlayId = 0;
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(e.Q4n);
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e);
      } else {
        l.UpdateCanGetReward(false);
      }
    });
  }
  static Qpi(e) {
    var r;
    return !!ModelManager_1.ModelManager.PowerModel.IsPowerEnough(e) || (r = ConfigManager_1.ConfigManager.TextConfig.GetTextById("ReceiveLevelPlayPowerNotEnough"), ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(r), PowerController_1.PowerController.OpenPowerView(2, ModelManager_1.ModelManager.PowerModel.GetCurrentNeedPower(e)), false);
  }
  static E6c() {
    var e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroLevelPlaySubsystem.StaticClass());
    if (e?.IsValid()) {
      e.ProcessAllItems();
    }
  }
  static async Dku(e) {
    for (const t of await BattleNetController_1.BattleNetController.RequestBatchCaptureEntity(e)) {
      var r = EntitySystem_1.EntitySystem.Get(t);
      var l = r?.GetComponent(157);
      if (r?.Valid && l) {
        l.AfterCapture();
      }
    }
  }
  static Bku(e, r = 0) {
    var l;
    var t;
    var o;
    var a;
    var n = [];
    for ([l, t] of ModelManager_1.ModelManager.VisionCaptureModel.GetVisionFinish()) {
      if (e.RangeAbsorbPbDataIds.has(l) && (a = (o = EntitySystem_1.EntitySystem.Get(t))?.GetComponent(1), o?.Valid) && a && (ModelManager_1.ModelManager.LevelPlayModel.EntityPositionRangeCheck?.GetOrAdd(e.RangeAbsorbPhantom.AutoAbsorbRangeEntity), ModelManager_1.ModelManager.LevelPlayModel.EntityPositionRangeCheck?.CheckReachedPosition(e.RangeAbsorbPhantom.AutoAbsorbRangeEntity, a.ActorLocationProxy))) {
        n.push(t);
      }
    }
    if (!(n.length <= 0)) {
      this.Dku(n);
    }
  }
  static mMm(e, l, t) {
    if (t.GameplayTags.Num() > 0) {
      e = ActorUtils_1.ActorUtils.GetEntityByActor(e);
      if (!e?.Valid || !e.Entity?.Valid) {
        return;
      }
      var o = e.Entity.CheckGetComponent(217);
      if (!o) {
        return;
      }
      for (let e = 0, r = t.GameplayTags.Num(); e < r; ++e) {
        var a = t.GameplayTags.Get(e);
        if (!o.HasTag(a.TagId)) {
          return;
        }
      }
    }
    for (let e = 0, r = l.GameplayTags.Num(); e < r; ++e) {
      var n = l.GameplayTags.Get(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CheckClientEvent, n);
    }
  }
  static kku(e) {
    if (e.Children) {
      if (ModelManager_1.ModelManager.LevelPlayModel.NightmareLevelPlayInfos.has(e.Id)) {
        ModelManager_1.ModelManager.LevelPlayModel.NightmareLevelPlayInfos.get(e.Id).Enable = true;
      } else {
        ModelManager_1.ModelManager.LevelPlayModel.NightmareLevelPlayInfos.set(e.Id, new LevelPlayModel_1.NightmareKillInfo(true, 0, 0, e.RangeAbsorbPhantom.IntervalKillNumber));
      }
      for (const l of e.Children) {
        var r = l.split("_");
        var r = r[r.length - 1];
        var r = MathUtils_1.MathUtils.StringToNumber(r);
        if (r) {
          e.RangeAbsorbPbDataIds.add(r);
          r = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(r);
          if (r) {
            r = (0, IComponent_1.getComponent)(r.ComponentsData, "SpawnMonsterComponent");
            if (r) {
              for (const t of r.SpawnMonsterConfigs) {
                if (t.TargetsToAwake) {
                  for (const o of t.TargetsToAwake) {
                    e.RangeAbsorbPbDataIds.add(o);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  static Oku(e) {
    if (ModelManager_1.ModelManager.LevelPlayModel.NightmareLevelPlayInfos?.has(e.Id)) {
      ModelManager_1.ModelManager.LevelPlayModel.NightmareLevelPlayInfos.get(e.Id).Enable = false;
    }
  }
  static qku(e) {
    ModelManager_1.ModelManager.LevelPlayModel.NightmareLevelPlayInfos?.delete(e.Id);
  }
  static H0n(e, r, l) {
    var t;
    if (l?.Valid && (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Valid && t === l) {
      if (r) {
        this.kku(e);
      } else {
        this.Oku(e);
      }
    }
  }
  static Gku(e) {
    var r;
    var l = e.RangeAbsorbPhantom.PlayerActiveFuncRangeEntity;
    var l = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(l);
    if (l?.Valid && l.Entity?.Valid) {
      if (r = l.Entity?.GetComponent(91)) {
        if (r.IsOverlappingPlayer()) {
          this.kku(e);
        } else {
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(e, l.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n.bind(this, e));
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 72, "范围吸收声骸功能没有正确配置范围实体", ["LevelPlayId", e.Id], ["RangeAbsorbPhantom", e.RangeAbsorbPhantom]);
      }
    }
  }
  static Fku(r) {
    if (r.LevelPlayType === "NightmareSpawnPoint") {
      if (r.RangeAbsorbPhantom) {
        const l = r.RangeAbsorbPhantom.PlayerActiveFuncRangeEntity;
        var e;
        if (ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(l)?.Valid) {
          this.Gku(r);
        } else {
          if (ModelManager_1.ModelManager.LevelPlayModel.NightmareLevelPlayWaitEntityTask?.has(r.Id)) {
            ModelManager_1.ModelManager.LevelPlayModel.NightmareLevelPlayWaitEntityTask?.get(r.Id)?.Cancel();
          }
          e = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelPlayController.RegisterNightmareRangeEntity", l, e => {
            if (e) {
              this.Gku(r);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Event", 72, "Entity加载超时或已被移除", ["PbDataId", l]);
            }
          }, WAIT_ENTITY_OVER_TIME, false);
          ModelManager_1.ModelManager.LevelPlayModel.NightmareLevelPlayWaitEntityTask?.set(r.Id, e);
        }
      }
    }
  }
  static Nku(e) {
    if (ModelManager_1.ModelManager.LevelPlayModel.NightmareLevelPlayWaitEntityTask?.has(e.Id)) {
      ModelManager_1.ModelManager.LevelPlayModel.NightmareLevelPlayWaitEntityTask?.get(e.Id)?.Cancel();
      ModelManager_1.ModelManager.LevelPlayModel.NightmareLevelPlayWaitEntityTask?.delete(e.Id);
    }
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(e);
    this.qku(e);
  }
  static LogReportMotorcycleLevelPlay(e, r, l, t = 2, o = 1) {
    var a;
    var n = Global_1.Global.BaseCharacter?.CachedActorLocation;
    if (n) {
      (a = new LogReportDefine_1.ExploreEntityLogEvent()).i_config_id = e;
      a.i_type = r;
      a.interaction = o;
      if (l !== undefined) {
        a.i_status = l ? 2 : 1;
      }
      a.i_result = t;
      a.f_pos_x = n.X;
      a.f_pos_y = n.Y;
      a.f_pos_z = n.Z;
      a.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId;
      a.i_father_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.Father;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(a);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 18, "埋点上报错误：玩家坐标为空");
    }
  }
}
exports.LevelPlayController = LevelPlayController;
(_a = LevelPlayController).OnTick = e => {
  if (ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp) {
    LevelPlayController.Wpi();
    LevelPlayController.GFg();
    LevelPlayController.cYt(0)?.Tick(e);
  }
};
LevelPlayController.Opi = e => {
  for (const l of e.Dxs) {
    var r = ModelManager_1.ModelManager.LevelPlayModel.SafeCreateLevelPlayInfo(l.s5n);
    r.UpdateState(l.Y4n);
    r.UpdateFirstPass(l.vDs);
    r.UpdateRefreshTime(l.Lxs);
    if (r.IsClose && r.MarkConfig !== undefined && r.MarkConfig.MarkId > 0) {
      LevelPlayController.Kpi(r.MarkConfig.MarkId);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneGameplay", 18, "下发已开启的玩法", ["玩法id", l.s5n], ["玩法状态", LevelPlayDefine_1.levelPlayStatusLogString[l.Y4n]], ["是否首通", l.vDs], ["开启时间", l.Lxs]);
    }
  }
};
LevelPlayController.kpi = e => {
  var r;
  var e = e.s5n;
  var l = ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(e);
  if (l) {
    l.UpdateFirstPass(true);
    if (l.FirstRewardId) {
      r = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(LevelPlayDefine_1.GAMEPLAY_FIRST_PROMPT_TYPE_ID);
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(r.TypeId, undefined, undefined, undefined, undefined, LevelPlayDefine_1.GAMEPLAY_FIRST_PROMPT_TYPE_ID);
    }
    if ((r = l.LevelPlayFirstPassAction) && r.length > 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneGameplay", 33, "开始执行玩法首通动作");
      }
      ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(r, LevelGeneralContextDefine_1.LevelPlayContext.Create(l.Id));
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneGameplay", 18, "玩法首通信息推送", ["id", e]);
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("SceneGameplay", 18, "玩法首通时，玩法不存在", ["玩法Id", e]);
  }
};
LevelPlayController.Fpi = e => {
  var r = e.s5n;
  var l = e.Bb_;
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLevelPlayStateNotify, r, e.Y4n);
  switch (e.Y4n) {
    case 1:
    case 2:
      var t = ModelManager_1.ModelManager.LevelPlayModel.SafeCreateLevelPlayInfo(r);
      t.UpdateState(e.Y4n);
      t.UpdateCompleteNumber(l);
      ModelManager_1.ModelManager.WorldMapModel?.CheckGamePlayIsTracked(t);
      break;
    case 0:
      t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(r);
      if (t && (ModelManager_1.ModelManager.LevelPlayModel.LevelPlayClose(t), t.MarkConfig) && t.MarkConfig.MarkId > 0) {
        LevelPlayController.Kpi(t.MarkConfig.MarkId);
      }
      break;
    case 3:
      ModelManager_1.ModelManager.LevelPlayModel.LevelPlayFinish(r);
  }
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("SceneGameplay", 18, "玩法状态改变", ["玩法id", r], ["玩法状态", LevelPlayDefine_1.levelPlayStatusLogString[e.Y4n]]);
  }
};
LevelPlayController.Hpi = e => {
  var r = e.s5n;
  let l = ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(r);
  l = l || ModelManager_1.ModelManager.LevelPlayModel.EnterLevelPlayRange(r);
  LevelPlayController.Fku(l);
  l.UpdateState(e.Y4n);
  l.UpdateCanGetReward(e.Txs);
  e = l.LevelPlayEnterAction;
  if (l.CanExecOpenAction && e && e.length > 0) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneGameplay", 33, "开始执行玩法进入动作(Finish状态下不会执行)");
    }
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(e, LevelGeneralContextDefine_1.LevelPlayContext.Create(l.Id));
  }
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("SceneGameplay", 18, "玩法进入", ["id", r]);
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterLevelPlayNotify, r);
};
LevelPlayController.jpi = e => {
  var e = e.s5n;
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveLevelPlayNotify, e);
  var r = ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(e);
  if (r) {
    LevelPlayController.Nku(r);
  }
  ModelManager_1.ModelManager.LevelPlayModel.LeaveLevelPlayRange(e);
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("SceneGameplay", 18, "玩法离开", ["id", e]);
  }
};
LevelPlayController.oja = e => {
  var r;
  var l = e.s5n;
  var e = MathUtils_1.MathUtils.LongToNumber(e.ZLs);
  var e = Math.floor(e - TimeUtil_1.TimeUtil.GetServerTime());
  if (!(e <= 0)) {
    r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Levelplay_reflesh");
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(StringUtils_1.StringUtils.Format(r, e.toString()));
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneGameplay", 65, "多人联机获奖提示", ["id", l], ["countdown", e]);
    }
  }
};
LevelPlayController.Vpi = e => {
  var r = e.s5n;
  ModelManager_1.ModelManager.LevelPlayModel.SafeCreateLevelPlayInfo(r).UpdateRefreshTime(e.pDs);
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("SceneGameplay", 18, "玩法开启时间更新", ["id", r], ["OpenTime", e.pDs]);
  }
};
LevelPlayController.M6c = (e, r, l) => {
  var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  if (t?.Valid) {
    if (t.Entity === e) {
      LevelPlayController.E6c();
    }
  } else if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("LevelPlay", 72, "[OnAnyCharGravityDirectChanged] 玩家实体无效");
  }
};
LevelPlayController.dLe = () => {
  LevelPlayController.E6c();
};
LevelPlayController.V1m = (e, r, l, t) => {
  _a.mMm(r, l, t);
};
LevelPlayController.j1m = (e, r, l, t, o, a) => {
  _a.mMm(r, o, a);
};
LevelPlayController.nye = () => {
  var e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(Global_1.Global.BaseCharacter, UE.KuroLevelPlaySubsystem.StaticClass());
  if (e?.IsValid()) {
    e.OnSpecificTagActorHit.Clear();
    e.OnSpecificTagActorHit.Add(LevelPlayController.j1m);
    e.OnSpecificTagActorBeginOverlap.Clear();
    e.OnSpecificTagActorBeginOverlap.Add(LevelPlayController.V1m);
  }
};
LevelPlayController.Uku = e => {
  var r;
  var l;
  var t;
  var o = ModelManager_1.ModelManager.CreatureModel.GetCreaturePbDataId(e);
  for ([r, l] of ModelManager_1.ModelManager.LevelPlayModel.NightmareLevelPlayInfos) {
    if (l.Enable && (t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(r)) && t.RangeAbsorbPbDataIds?.has(o) && (l.CurrentKillCount++, l.CurrentKillCount >= l.IntervalKillNumber[l.CurrentIntervalIndex % l.IntervalKillNumber.length])) {
      l.CurrentKillCount = 0;
      l.CurrentIntervalIndex = (l.CurrentIntervalIndex + 1) % l.IntervalKillNumber.length;
      if (t.RangeAbsorbPhantom?.DelayTime) {
        TimerSystem_1.TimerSystem.Delay(_a.Bku.bind(_a, t), t.RangeAbsorbPhantom?.DelayTime * CommonDefine_1.MILLIONSECOND_PER_SECOND);
      } else {
        _a.Bku(t);
      }
    }
  }
}; //# sourceMappingURL=LevelPlayController.js.map