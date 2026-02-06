"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../../../Ui/UiManager");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityControllerHolder_1 = require("../../ActivityControllerHolder");
const SpringManorData_1 = require("./SpringManorData");
const SpringManorDefine_1 = require("./SpringManorDefine");
const SpringManorSubView_1 = require("./View/SpringManorSubView");
const AUTO_CHECK_TRACK_RANGE_INTERVAL = 500;
const VECTOR_DIMENSION = 3;
class SpringManorController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.ewg = e => {
      var r = ModelManager_1.ModelManager.SpringManorModel;
      var t = r.ActivityData;
      var o = t.GetAtmosphere();
      var a = e.ybf;
      var t = t.GetAtmosphereLevel();
      var e = e.YIg;
      var n = r.IsMaxLevel(e) ? e : e + 1;
      var n = ConfigManager_1.ConfigManager.SpringManorConfig.GetLevelConfigById(n).AtmosphereNeed;
      var i = r.CheckInInstance();
      if (o < a && i && (i = {
        OldLevel: t,
        NewLevel: e,
        OldAtmosphere: o,
        NewAtmosphere: a,
        MaxAtmosphere: n
      }, UiManager_1.UiManager.OpenView("Spring26AtmosphereLevelUpView", i), n = ConfigManager_1.ConfigManager.SpringManorConfig.GetLevelConfigById(e).UnlockFunction.length > 0, t < e && n && UiManager_1.UiManager.OpenView("Spring26UnlockView"), r.GetAtmosphereLevelStage(t) < (i = r.GetAtmosphereLevelStage(e)))) {
        r.SetAtmosphereStageUpParam({
          OldAtmosphere: o,
          NewAtmosphere: a,
          OldLevel: t,
          NewLevel: e,
          Stage: i
        });
      }
      ModelManager_1.ModelManager.SpringManorModel?.ActivityData.OnAtmosphereUpdateNotify(a, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SpringManorAtmosphereUpdate);
    };
    this.L0g = e => {
      if (e.cmg !== undefined) {
        this.w0g(e.cmg);
      } else if (e.vlu !== undefined) {
        this.Gqf(e.vlu);
      } else if (e.TBg !== undefined) {
        this.ZBg(e.TBg);
      } else if (e.smg !== undefined) {
        this.XFg(e.smg);
      }
    };
    this.DSe = (e, r) => {
      if (r === Protocol_1.Aki.Protocol.hTs.a3_ || r === Protocol_1.Aki.Protocol.hTs.Proto_Delete) {
        this.StopTrackSubQuest(e);
      }
    };
    this.nye = () => {
      if (ModelManager_1.ModelManager.SpringManorModel.CheckInInstance()) {
        this.P0g(true);
      }
    };
    this.LatestUnlockBookItemId = 0;
    this.LatestUnlockBrochureId = 0;
    this.Eyg = r => {
      if (r) {
        var t = ModelManager_1.ModelManager.SpringManorModel.ActivityData;
        if (t) {
          let e = 0;
          for (const n of r.hug) {
            var o = n.nug;
            var a = t.GetBookItemStateById(o);
            t?.SetBookItemDataById(o, n);
            if (a === 0 && n.sug === Protocol_1.Aki.Protocol.sug.Proto_BookItemUnlock) {
              e = o;
            }
          }
          if (e > 0) {
            this.Iyg(r.w6n, r.rug, e);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBrochureBookItemStateUpdate);
        }
      }
    };
    this.kkg = undefined;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_Spring26ActivityEntry";
  }
  OnCreateSubPageComponent(e) {
    return new SpringManorSubView_1.SpringManorSubView();
  }
  OnCreateActivityData(e) {
    return new SpringManorData_1.SpringManorData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  RequestExhibitionSave(e) {
    var r = new Protocol_1.Aki.Protocol.J1g();
    r.i_g = e;
    Net_1.Net.Call(24813, r, e => {
      if (e && e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 24294);
      }
    });
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(15245, this.L0g);
    Net_1.Net.Register(27004, this.ewg);
    Net_1.Net.Register(23179, this.Eyg);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15245);
    Net_1.Net.UnRegister(27004);
    Net_1.Net.UnRegister(23179);
  }
  ZBg(e) {
    ModelManager_1.ModelManager.SpringManorModel?.ActivityData.OnSkipEntryUpdateNotify(e);
  }
  XFg(e) {
    ModelManager_1.ModelManager.SpringManorModel?.ActivityData.UpdateGuessJokerGameData(e.WFg);
  }
  w0g(e) {
    ModelManager_1.ModelManager.SpringManorModel?.ActivityData.OnFunctionUpdateNotify(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SpringManorFunctionOpenNotify);
    if (SpringManorDefine_1.furnitureFunctionTypeList.includes(e)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FurnitureFunctionOpenNotify, e);
    }
  }
  Gqf(e) {
    ModelManager_1.ModelManager.SpringManorModel?.ActivityData.OnTaskUpdateNotify(e);
    this.UpdateRewardTrack();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SpringManorTaskUpdateNotify);
  }
  RequestTaskRewardReceive(e, r) {
    var t = new Protocol_1.Aki.Protocol.Zdg();
    t.w6n = ModelManager_1.ModelManager.SpringManorModel.ActivityData.Id;
    const o = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetTabCanClaimableTaskId(e);
    t.B6n = o;
    Net_1.Net.Call(22651, t, e => {
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 21295);
        } else {
          ModelManager_1.ModelManager.SpringManorModel?.ActivityData.OnRewardTaskClaimed(o);
          r?.();
        }
      }
    });
  }
  RequestScoreRewardReceive(r) {
    var e = new Protocol_1.Aki.Protocol.tmg();
    e.w6n = ModelManager_1.ModelManager.SpringManorModel.ActivityData.Id;
    const t = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetCanClaimedScoreRewardList();
    e._mg = t;
    Net_1.Net.Call(20670, e, e => {
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 22225);
        } else {
          ModelManager_1.ModelManager.SpringManorModel?.ActivityData.OnScoreRewardClaimed(t);
          r?.();
        }
      }
    });
  }
  RequestAtmosphereRewardReceive(r) {
    var e = new Protocol_1.Aki.Protocol.omg();
    e.w6n = ModelManager_1.ModelManager.SpringManorModel.ActivityData.Id;
    const t = ModelManager_1.ModelManager.SpringManorModel.GetCanClaimedLevelIdList();
    e.umg = t;
    Net_1.Net.Call(19625, e, e => {
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 27559);
        } else {
          ModelManager_1.ModelManager.SpringManorModel?.ActivityData.OnAtmosphereLevelRewardUpdateNotify(t);
          r?.();
        }
      }
    });
  }
  RequestTrackQuest(e, r) {
    if (ModelManager_1.ModelManager.SpringManorModel.IsMainQuest(e)) {
      ControllerHolder_1.ControllerHolder.QuestNewController.RequestTrackQuest(e, r, 2);
    } else if (r) {
      this.TrackSubQuest(e);
    } else {
      this.StopTrackSubQuest(e);
    }
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
  }
  OnShowActivityFirstUnlockView(e) {
    UiManager_1.UiManager.OpenView("Spring26ActivityOpenView");
  }
  LeaveInstanceDungeonRequest() {
    this.P0g(false);
    this.ClearCustomTrack();
    ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
  }
  P0g(e) {
    this.gBe(1098729489, e);
    this.gBe(-8769906, e);
    this.gBe(-866600078, e);
    this.gBe(-79759327, e);
  }
  gBe(e, r) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (ControllerHolder_1.ControllerHolder.FormationDataController.IsPlayerExist(t)) {
      if (r) {
        if (!ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(t, e, true)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("LevelEvent", 90, "添加Tag", ["TagName", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)]);
          }
          ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(t, e);
        }
      } else if (ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(t, e, true)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelEvent", 90, "删除Tag", ["TagName", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)]);
        }
        ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(t, e);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 90, "找不到当前玩家", ["PlayerId", t], ["TagName", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)]);
    }
  }
  EnterBigWorldInstRequestAndUnTrackQuest() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
    if (e && !ModelManager_1.ModelManager.SpringManorModel?.IsMainQuest(e.Id)) {
      ControllerHolder_1.ControllerHolder.QuestNewController.RequestTrackQuest(e.Id, false, 2, 0, () => {
        this.EnterBigWorldInstRequest();
      });
    } else {
      this.EnterBigWorldInstRequest();
    }
  }
  EnterBigWorldInstRequest() {
    var e = new Protocol_1.Aki.Protocol.Wpg();
    var r = new Protocol_1.Aki.Protocol.Kpg();
    r.Xpg = new Protocol_1.Aki.Protocol.Xpg();
    r.Xpg.w6n = ModelManager_1.ModelManager.SpringManorModel.ActivityData.Id;
    e.Kpg = r;
    Net_1.Net.Call(24560, e, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22152);
      }
    });
  }
  Iyg(e, r, t) {
    var o;
    var a = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureById(r);
    if (a && this.C3g(a.Type)) {
      switch (a.Type) {
        case 0:
        case 1:
          if (!UiManager_1.UiManager.IsViewOpen("Spring26AlbumPropView")) {
            o = {
              ActivityId: e,
              ConfigId: this.LatestUnlockBookItemId = t,
              BrochureId: this.LatestUnlockBrochureId = r
            };
            UiManager_1.UiManager.OpenView("Spring26AlbumPropView", o);
          }
          break;
        case 2:
          if (!UiManager_1.UiManager.IsViewOpen("Spring26BrochureCompletedView")) {
            o = {
              ConfigId: t
            };
            UiManager_1.UiManager.OpenView("Spring26BrochureCompletedView", o);
          }
      }
    }
  }
  C3g(e) {
    switch (e) {
      case 0:
      case 1:
        return ModelManager_1.ModelManager.SpringManorModel.ActivityData.IsFunctionUnlocked(7);
      case 2:
        return ModelManager_1.ModelManager.SpringManorModel.ActivityData.IsFunctionUnlocked(8);
    }
    return false;
  }
  static RequestBrochureReward(e, r, t, o) {
    r = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureByActivityAndType(e, r);
    if (r) {
      const i = ModelManager_1.ModelManager.SpringManorModel.ActivityData;
      if (i) {
        var a = Protocol_1.Aki.Protocol.J_g.create();
        a.w6n = e;
        a.rug = r.Id;
        const _ = [];
        if (o) {
          for (const t of r.BookItemIds) {
            var n = i?.GetBookItemDataById(t);
            if (n && n.sug === Protocol_1.Aki.Protocol.sug.Proto_BookItemUnlock) {
              _.push(t);
            }
          }
        } else {
          _.push(t);
        }
        a.hug = _;
        Net_1.Net.Call(16616, a, e => {
          if (e) {
            if (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
              for (const r of _) {
                i?.SetTargetBookItemState(r, Protocol_1.Aki.Protocol.sug.Proto_BookItemRewarded);
                if (ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController.LatestUnlockBookItemId === r) {
                  ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController.LatestUnlockBookItemId = 0;
                  ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController.LatestUnlockBrochureId = 0;
                }
              }
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBrochureBookItemStateUpdate);
            } else {
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 19661);
            }
          }
        });
      }
    }
  }
  ClearCustomTrack() {
    this.StopTrackRewardTask();
    this.StopTrackSkipEntry();
    this.StopCurrentTrackSubQuest();
    if (this.kkg !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.kkg);
    }
  }
  TryStartTrackCheckTimer() {
    if (this.kkg === undefined) {
      const r = ModelManager_1.ModelManager.SpringManorModel;
      if (r.HasAnyCanAutoEndTrack()) {
        this.kkg = TimerSystem_1.GameplayTimerSystem.Forever(() => {
          var e;
          if (r.HasAnyCanAutoEndTrack()) {
            if ((e = r.GetCurrentTrackRewardPosition()) && r.CheckPositionIsInAutoEndRange(e)) {
              this.StopTrackRewardTask();
            }
            if ((e = r.GetCurrentTrackGetWayPosition()) && r.CheckPositionIsInAutoEndRange(e)) {
              this.StopTrackSkipEntry();
            }
          } else {
            if (this.kkg !== undefined) {
              TimerSystem_1.GameplayTimerSystem.Remove(this.kkg);
            }
            this.kkg = undefined;
          }
        }, AUTO_CHECK_TRACK_RANGE_INTERVAL);
      }
    }
  }
  ExecuteSkipEntry(e, r) {
    var t;
    var o = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSkipEntryConfigById(e);
    if (o) {
      if (o.JumpId > 0) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(o.JumpId);
      } else {
        if (o.IsTeleport) {
          o = o.TrackPosition;
          t = Vector_1.Vector.Create(Number(o[0]), Number(o[1]), Number(o[2]));
          o = Rotator_1.Rotator.Create(Number(o[3]), Number(o[4]), Number(o[5]));
          ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayer({
            ClientReason: "SpringManorSkipEntry",
            TargetPosition: t.ToUeVector(),
            TargetRotation: o.ToUeRotator(),
            TeleportMode: 1
          });
        } else {
          ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController?.TrackSkipEntry(e);
        }
        r?.();
      }
    }
  }
  TrackSkipEntry(e) {
    var r;
    var t = ModelManager_1.ModelManager.SpringManorModel;
    var o = t.GetCurrentTrackGetWayId();
    if (o !== e && !!(r = ConfigManager_1.ConfigManager.SpringManorConfig.GetSkipEntryConfigById(e)) && !(r.TrackPosition.length < VECTOR_DIMENSION)) {
      if (o > 0) {
        this.StopTrackSkipEntry();
      }
      o = r.TrackPosition;
      o = Vector_1.Vector.Create(Number(o[0]), Number(o[1]), Number(o[2]));
      ControllerHolder_1.ControllerHolder.TrackController.StartTrack({
        TrackSource: 0,
        Id: e,
        TrackTarget: o,
        IconPath: r.TrackIconPath
      });
      t.SetCurrentTrackGetWayId(e, o);
      this.TryStartTrackCheckTimer();
    }
  }
  StopTrackSkipEntry() {
    var e = ModelManager_1.ModelManager.SpringManorModel;
    var r = e.GetCurrentTrackGetWayId();
    if (r !== 0) {
      e.ClearCurrentTrackGetWayId();
      ControllerHolder_1.ControllerHolder.TrackController.EndTrack(0, r);
    }
  }
  TrackRewardTask(e) {
    var r;
    var t = ModelManager_1.ModelManager.SpringManorModel;
    var o = t.GetCurrentTrackRewardId();
    if (o !== e && (r = ConfigManager_1.ConfigManager.SpringManorConfig.GetRewardTaskConfigById(e)) && r.SkipType === 2) {
      if (o > 0) {
        this.StopTrackRewardTask();
      }
      o = r.SkipParam;
      r = Vector_1.Vector.Create(Number(o[0]), Number(o[1]), Number(o[2]));
      o = t.GetActivityConfig();
      ControllerHolder_1.ControllerHolder.TrackController.StartTrack({
        TrackSource: 0,
        Id: e,
        TrackTarget: r,
        IconPath: o.TrackRewardIconPath
      });
      t.SetCurrentTrackRewardId(e, r);
      this.TryStartTrackCheckTimer();
    }
  }
  StopTrackRewardTask() {
    var e = ModelManager_1.ModelManager.SpringManorModel;
    var r = e.GetCurrentTrackRewardId();
    if (r !== 0) {
      e.ClearCurrentTrackRewardId();
      ControllerHolder_1.ControllerHolder.TrackController.EndTrack(0, r);
    }
  }
  UpdateRewardTrack() {
    var e = ModelManager_1.ModelManager.SpringManorModel;
    var r = e.GetCurrentTrackRewardId();
    if (!(r <= 0)) {
      if (e.ActivityData?.GetRewardTaskData(r)?.Status !== 1) {
        this.StopTrackRewardTask();
      }
    }
  }
  TrackSubQuest(e) {
    var r = ModelManager_1.ModelManager.SpringManorModel;
    var t = r.GetTrackingSubQuestId();
    if (t !== e && ModelManager_1.ModelManager.QuestNewModel.GetQuest(e)) {
      if (r.CheckTrackingSubQuest()) {
        this.StopTrackSubQuest(t);
      }
      this.EU_(e);
      this.Nxg(e);
      r.SetTrackingSubQuestId(e);
    }
  }
  StopCurrentTrackSubQuest() {
    var e = ModelManager_1.ModelManager.SpringManorModel.GetTrackingSubQuestId();
    this.StopTrackSubQuest(e);
  }
  StopTrackSubQuest(e) {
    var r = ModelManager_1.ModelManager.SpringManorModel;
    if (r.IsTrackingSubQuest(e)) {
      this.Vxg();
      this.IU_();
      r.ClearTrackingSubQuest();
    }
  }
  Nxg(e) {
    var r = ModelManager_1.ModelManager.SpringManorModel;
    if (r.CheckTrackingSubQuest()) {
      this.Vxg();
    }
    var r = r.GetQuestTrackPosition(e);
    var t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(t.QuestMarkId);
    ControllerHolder_1.ControllerHolder.TrackController.StartTrack({
      TrackSource: 5,
      Id: e,
      TrackTarget: r,
      IconPath: t
    });
  }
  Vxg() {
    var e = ModelManager_1.ModelManager.SpringManorModel;
    if (e.CheckTrackingSubQuest()) {
      ControllerHolder_1.ControllerHolder.TrackController.EndTrack(5, e.GetTrackingSubQuestId());
    }
  }
  EU_(e) {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    if (e && e.HasBehaviorTree() && (e = e.Tree?.GetBlackBoard()?.CreateShowData(false))) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText, e, 0, false);
    }
  }
  IU_() {
    var e = ModelManager_1.ModelManager.SpringManorModel.GetTrackingSubQuestId();
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    if (e && e.HasBehaviorTree()) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText, e.TreeId, 0, false);
    }
  }
  async ChangeRoleRequest(e) {
    var r = ModelManager_1.ModelManager.EditFormationModel;
    var t = r.GetCurrentFormationData;
    if (t) {
      var o = r.GetCurrentFormationId;
      if (o) {
        if (o !== e) {
          var a = [];
          for (const i of t.GetRoleIdList) {
            a.push(i);
          }
          var n;
          var o = a.includes(e);
          var t = t.GetCurrentRolePosition - 1;
          if (o) {
            o = a.indexOf(e);
            n = a[t];
            a[t] = a[o];
            a[o] = n;
          } else {
            a[t] = e;
          }
          var o = await ControllerHolder_1.ControllerHolder.EditFormationController.UpdateFormationRequest(r.GetCurrentFormationId, true, a, e);
          if (o) {
            await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SpringManor", 90, "尝试切换角色，但没有当前角色ID！");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SpringManor", 90, "尝试切换角色，但没有当前编队数据！");
    }
  }
}
(exports.SpringManorController = SpringManorController).SpringManorInputHandler = e => {
  var r = ModelManager_1.ModelManager.SpringManorModel?.ActivityData;
  if (r) {
    switch (e) {
      case InputMappingsDefine_1.actionMappings.切换角色1:
        if (r.IsFunctionUnlocked(0)) {
          UiManager_1.UiManager.OpenView("Spring26GameplayEntryView");
        }
        break;
      case InputMappingsDefine_1.actionMappings.切换角色2:
        if (r.IsFunctionUnlocked(3)) {
          ControllerHolder_1.ControllerHolder.FurnitureController.OpenFurnitureAreaSelectView();
        }
        break;
      case InputMappingsDefine_1.actionMappings.切换角色3:
        UiManager_1.UiManager.OpenView("Spring26RewardView");
    }
  }
};
//# sourceMappingURL=SpringManorController.js.map