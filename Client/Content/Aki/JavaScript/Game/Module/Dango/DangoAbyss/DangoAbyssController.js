"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssController = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  AbyssRoomById_1 = require("../../../../Core/Define/ConfigQuery/AbyssRoomById"),
  BlueprintConfigByBlueprintType_1 = require("../../../../Core/Define/ConfigQuery/BlueprintConfigByBlueprintType"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  PreloadControllerNew_1 = require("../../../World/Controller/PreloadControllerNew"),
  AsyncTask_1 = require("../../../World/Task/AsyncTask"),
  TaskSystem_1 = require("../../../World/Task/TaskSystem"),
  DangoAbyssActivityController_1 = require("../../Activity/ActivityContent/DangoAbyss/DangoAbyssActivityController"),
  DangoAbyssActivityData_1 = require("../../Activity/ActivityContent/DangoAbyss/DangoAbyssActivityData"),
  SolarSpeedDefine_1 = require("../../Activity/ActivityContent/SolarisSpeed/SolarSpeedDefine"),
  AbyssDangoRolePanel_1 = require("../../Activity/ActivityContent/SolarisSpeed/View/AbyssDangoRolePanel"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../../ItemReward/ItemRewardDefine"),
  RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData"),
  LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  DangoAbyssActorManager_1 = require("./DangoAbyssActorManager"),
  DangoAbyssData_1 = require("./DangoAbyssData"),
  DangoAbyssDefine_1 = require("./DangoAbyssDefine"),
  DangoAbyssCommonRewardView_1 = require("./View/DangoAbyssCommonRewardView"),
  DangoAbyssEntranceView_1 = require("./View/DangoAbyssEntranceView"),
  DangoAbyssRankView_1 = require("./View/DangoAbyssRankView"),
  DangoAbyssTimeLimitRewardView_1 = require("./View/DangoAbyssTimeLimitRewardView"),
  S_ENTITY_TYPE_MONSTER = "Monster";
class DangoAbyssController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, DangoAbyssController.sZs), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssDangoSelect, DangoAbyssController.X2c), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityOpen, DangoAbyssController.Gu1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeonConfirm, DangoAbyssController.wa1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, DangoAbyssController.p5a), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, DangoAbyssController.Ilt), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowBadDangoTip, DangoAbyssController.Wv1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssFirstRoomEnter, DangoAbyssController.PreloadRoomMonsterEntitiesOnEnter)
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, DangoAbyssController.sZs), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssDangoSelect, DangoAbyssController.X2c), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityOpen, DangoAbyssController.Gu1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeonConfirm, DangoAbyssController.wa1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, DangoAbyssController.p5a), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, DangoAbyssController.Ilt), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShowBadDangoTip, DangoAbyssController.Wv1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssFirstRoomEnter, DangoAbyssController.PreloadRoomMonsterEntitiesOnEnter)
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(20171, this.Vvc), Net_1.Net.Register(28944, this.jvc), Net_1.Net.Register(18137, this.Hvc), Net_1.Net.Register(23836, this.$vc), Net_1.Net.Register(15927, this.Wvc), Net_1.Net.Register(19427, this.gvc)
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20171), Net_1.Net.UnRegister(28944), Net_1.Net.UnRegister(18137), Net_1.Net.UnRegister(23836), Net_1.Net.UnRegister(15927), Net_1.Net.UnRegister(19427)
  }
  static OpenAbyssSelectViewByActivityId(e) {
    var n = new DangoAbyssData_1.DangoAbyssInsSelectViewData,
      t = DangoAbyssActivityController_1.DangoAbyssActivityController.GetAbyssChallengeByActivityId(e);
    n.AbyssDataList = t, n.ActivityData = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e), UiManager_1.UiManager.OpenView("DangoAbyssInsSelectView", n)
  }
  static OpenAbyssRankView(e = 0) {
    var n = this.pUc(),
      t = new DangoAbyssRankView_1.DangoAbyssRankData;
    t.OpenChallengeId = e, t.DangoAbyssData = DangoAbyssActivityController_1.DangoAbyssActivityController.GetAbyssChallengeRankListByActivityId(n), UiManager_1.UiManager.OpenView("DangoAbyssRankView", t)
  }
  static OpenGetDangoView(e) {
    if (ModelManager_1.ModelManager.GameModeModel.Loading) Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 27, "当前处于loading状态，不打开团子解锁界面");
    else {
      const o = new Array;
      e.forEach((e, n) => {
        var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(n).GetName(),
          n = {
            DangoId: n,
            DangoLevel: e,
            UnlockTitle: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey("Text_GetNewDango", "Text_GetNewDango"),
            UnlockSubTitle: "",
            UnlockWutheringWaveTitleSpritePath: ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_TuanziUnlockTxt"),
            DetailName: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t),
            DetailDialog: ""
          };
        o.push(n)
      });
      e = {
        DataList: o,
        ShowTime: 1e3
      };
      UiManager_1.UiManager.OpenView("DangoAbyssGetDangoView", e)
    }
  }
  static OpenAbyssLimitRewardView(e = !0) {
    let n = "DangoAbyssTimeLimitRewardView";
    e || (n = "DangoAbyssTimeLimitRewardActivityView");
    var e = new DangoAbyssTimeLimitRewardView_1.DangoAbyssTimeLimitViewData,
      t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.pUc());
    e.Data = t, UiManager_1.UiManager.OpenView(n, e)
  }
  static OpenAbyssRewardView(e = !0) {
    let n = "DangoAbyssCommonRewardView";
    e || (n = "DangoAbyssCommonRewardActivityView");
    var e = new DangoAbyssCommonRewardView_1.DangoAbyssRewardViewData,
      t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.pUc());
    e.Data = t, UiManager_1.UiManager.OpenView(n, e)
  }
  static OpenAbyssEntranceViewByActivityId(n) {
    UiManager_1.UiManager.NormalResetToView("BattleView", () => {
      var e = new DangoAbyssEntranceView_1.DangoAbyssEntraceViewData;
      e.ActivityId = n, UiManager_1.UiManager.OpenView("DangoAbyssEntranceView", e)
    })
  }
  static pUc() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values())
      if (e instanceof DangoAbyssActivityData_1.DangoAbyssActivityData) return e.Id;
    return 0
  }
  static async OpenCurrentActivityAbyssEntranceAsync() {
    var e = this.pUc();
    if (0 === e) return !1;
    const n = new CustomPromise_1.CustomPromise;
    UiManager_1.UiManager.NormalResetToView("BattleView", () => {
      n.SetResult(!0)
    }), await n.Promise;
    var t = new DangoAbyssEntranceView_1.DangoAbyssEntraceViewData,
      e = (t.ActivityId = e, await UiManager_1.UiManager.OpenViewAsync("DangoAbyssEntranceView", t));
    return !!e
  }
  static OpenCurrentActivityAbyssEntrance() {
    var e = this.pUc();
    return 0 !== e && (this.OpenAbyssEntranceViewByActivityId(e), !0)
  }
  static CheckPreloadRoomMonsterEntities(e) {
    return !!ModelManager_1.ModelManager.DangoAbyssModel?.CheckInAbyss()
  }
  static async PreloadRoomMonsterEntities() {
    if (!this.CheckPreloadRoomMonsterEntities) return !1;
    var e = ModelManager_1.ModelManager.DangoAbyssModel,
      n = ModelManager_1.ModelManager.LevelPlayModel;
    if (!e || !n) return !1;
    ModelManager_1.ModelManager.GameModeModel.PreloadDangoAbyssMonsterProfiler.Restart(), PreloadControllerNew_1.PreloadControllerNew.ClearAllPbLevelEntityPb();
    var e = e.GetCurrentRoomId(),
      t = AbyssRoomById_1.configAbyssRoomById.GetConfig(e)?.BehaviorTree;
    if (t) {
      n = n.GetLevelPlayAllEntities(t);
      const r = new Set,
        s = e => {
          e = BlueprintConfigByBlueprintType_1.configBlueprintConfigByBlueprintType.GetConfig(e.BlueprintType);
          return !(!e || e.EntityType !== S_ENTITY_TYPE_MONSTER)
        };
      n.forEach(e => {
        var n = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
        if (n)
          if (s(n)) r.add(e);
          else {
            e = n.ComponentsData, n = (0, IComponent_1.getComponent)(e, "SpawnMonsterComponent");
            if (n && n.SpawnMonsterConfigs)
              for (const o of n.SpawnMonsterConfigs)
                for (const a of o.TargetsToAwake ?? []) {
                  var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(a);
                  t && s(t) && r.add(a)
                }
          } return !0
      }), await PreloadControllerNew_1.PreloadControllerNew.PreLoadLevelEntityByPbDataIds(Array.from(r))
    }
    return ModelManager_1.ModelManager.GameModeModel.PreloadDangoAbyssMonsterProfiler.Stop(), Log_1.Log.CheckInfo() && Log_1.Log.Info("Preload", 80, "[PreloadAbyssRoomMonsterEntities]", ["CurrentRoomId", e], ["Profile Info:", ModelManager_1.ModelManager.GameModeModel.PreloadDangoAbyssMonsterProfiler.ToString()]), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssRoomPreloadFinished), !0
  }
  static async W81() {
    if (!this.Q81) {
      for (this.Q81 = !0; 0 < this.K81.length;) {
        var e = this.K81.shift();
        e && await this.X81(e)
      }
      this.Q81 = !1
    }
  }
  static async X81(r) {
    var e = new AsyncTask_1.AsyncTask("AbyssSubLevelController", async () => {
      ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = 1;
      const [n, t] = this.UWa(r);
      if (0 === n.length && 0 === t.length) await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(17, 3);
      else {
        var e = Vector_1.Vector.Create(r.iPs, r.rPs, r.gqs),
          o = new UE.Rotator(0, r.fqs, 0);
        await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(17, 3);
        const a = new CustomPromise_1.CustomPromise;
        ControllerHolder_1.ControllerHolder.SubLevelController.ChangeSubLevel(n, t, 0, e, o, e => {
          e ? a.SetResult(!0) : Log_1.Log.CheckError() && Log_1.Log.Error("Activity", 27, "团子深渊子关卡加载失败", ["unloads", n], ["newLoads", t])
        }), await a.Promise
      }
      return await this.Qvc(r.Vy_), await this.PreloadRoomMonsterEntities(), await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(17, 1), !0
    });
    TaskSystem_1.TaskSystem.AddTask(e), await TaskSystem_1.TaskSystem.Run()
  }
  static async Qvc(e) {
    var n = Protocol_1.Aki.Protocol.v0c.create(),
      e = (n.Vy_ = e, await Net_1.Net.CallAsync(18540, n));
    e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs || Log_1.Log.CheckError() && Log_1.Log.Error("Activity", 27, "团子深渊进入下个房间失败")
  }
  static UWa(n) {
    return [n.fL_.filter(e => !n.mL_.includes(e)), n.mL_.filter(e => !n.fL_.includes(e))]
  }
  static ORc(e) {
    var n = {
        ButtonTextId: "ConfirmBox_217_ButtonText_0",
        DescriptionTextId: void 0,
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !0,
        OnClickedCallback: function() {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon()
        }
      },
      t = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentChallengeId(),
      t = !ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(t).IfStoryChallenge,
      o = [];
    o.push(n), t && o.push({
      ButtonTextId: "ConfirmBox_133_ButtonText_1",
      IsTimeDownCloseView: !1,
      IsClickedCloseView: !1,
      OnClickedCallback: function() {
        var e, n;
        ModelManager_1.ModelManager.GameModeModel.IsMulti ? ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.SettleViewButtonSuccessOnMultiCallBack(0) : (e = {
          opc: ModelManager_1.ModelManager.DangoAbyssModel.GetRoleSelectDangoMap()
        }, (n = new Protocol_1.Aki.Protocol.$ah).spc = e, ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon(n))
      },
      DescriptionTextId: void 0
    });
    const a = [];
    e.j7n.gws.forEach(e => {
      e = new RewardItemData_1.RewardItemData(e.s5n, e.m9n, void 0);
      a.push(e)
    });
    n = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceProgress(), t = {
      RewardItemData: a,
      Progress: n
    }, e = {
      ConfigId: ItemRewardDefine_1.ABYSS_SUCCESS,
      IsSuccess: !0,
      ButtonInfoList: o,
      DangoAbyssSuccessData: t,
      IsBagFull: !1
    };
    ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData(), ItemRewardController_1.ItemRewardController.OpenExploreRewardViewNew(e)
  }
  static AbyssLikePlayer(e) {
    var n = new Protocol_1.Aki.Protocol.f0c;
    n.W5n = e, Net_1.Net.Call(26815, n, e => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27969)
    })
  }
  static async RequestAbyssRankList(e) {
    var n = new Protocol_1.Aki.Protocol.A0c,
      e = (n.s5n = e, await Net_1.Net.CallAsync(23298, n));
    e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrAbyssRankListCd && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21894), ModelManager_1.ModelManager.DangoAbyssModel.OnAbyssChallegenRankUpdate(e))
  }
  static async RequestAbyssSelfRank(e) {
    var n = new Protocol_1.Aki.Protocol.B0c,
      e = (n.s5n = e, await Net_1.Net.CallAsync(22615, n));
    ModelManager_1.ModelManager.DangoAbyssModel.OnAbyssChallengeSelfRankUpdate(e)
  }
  static async RequestSetAbyssShowName(e, n) {
    var t = new Protocol_1.Aki.Protocol.x0c,
      t = (t.e8n = e, t.lnc = n, await Net_1.Net.CallAsync(19672, t));
    return !!t && (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 22919), !1) : (ModelManager_1.ModelManager.DangoAbyssModel.OnAnonymousNameStateChange(e, n), !0))
  }
  static StartAbyssChallenge(e) {
    e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e);
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId = e.InstEntranceId, ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = e.InstId, InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterEntrance(e.InstEntranceId).finally(void 0)
  }
  static VG1() {
    this.jG1 && ModelManager_1.ModelManager.DangoAbyssModel.CheckInDangoAbyssInstance() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 27, "显示缓存的结算数据"), this.Hvc(this.jG1)), this.jG1 = void 0
  }
  static nwc() {
    var e;
    33 === ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentDungeonConfig.InstSubType && ModelManager_1.ModelManager.DangoAbyssModel.CheckIsInMatch() && (e = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo(), ModelManager_1.ModelManager.DangoAbyssModel.RefreshOwnerListByMatchTeamInfo(e))
  }
  static InitAbyssDangoObserver(e) {
    DangoAbyssActorManager_1.DangoAbyssActorManager.InitIndexDangoSkeletalObserverHandle(e)
  }
  static RefreshAbyssDangoAnimation(e, n, t) {
    DangoAbyssActorManager_1.DangoAbyssActorManager.RefreshSkeletalObserverAnimation(e, n, t)
  }
  static RefreshAbyssDangoModel(e, n, t, o) {
    let a = void 0,
      r = 0,
      s = "";
    n === DangoAbyssDefine_1.BADDANGOID ? (a = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoTransform(), r = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoMeshId(), s = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoStandAni()) : (l = (i = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(n)).GetPhantomId(), a = ModelManager_1.ModelManager.PhantomBattleModel.GetMeshTransform(l), s = ModelManager_1.ModelManager.PhantomBattleModel.GetStandAnim(l), r = i.GetMeshId());
    var i, l = {
      DangoId: n,
      MeshId: r,
      DangoPointCase: t,
      Transform: a,
      StandAnimationName: s
    };
    DangoAbyssActorManager_1.DangoAbyssActorManager.RefreshDangoSkeletalObserverHandle(e, l, o)
  }
  static DestroyAbyssDangoObserver(e) {
    DangoAbyssActorManager_1.DangoAbyssActorManager.DestroyDangoSkeletalObserverHandle(e)
  }
  static RequestQuitChallenge() {
    var e = new Protocol_1.Aki.Protocol.u0c;
    Net_1.Net.Call(23216, e, e => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16708)
    })
  }
  static RequestChallengeUnlock(e) {
    var n = new Protocol_1.Aki.Protocol._0c;
    n.e8n = e, Net_1.Net.Call(23246, n, e => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19123)
    })
  }
}
exports.DangoAbyssController = DangoAbyssController, (_a = DangoAbyssController).Q81 = !1, DangoAbyssController.K81 = [], DangoAbyssController.jG1 = void 0, DangoAbyssController.PreloadRoomMonsterEntitiesOnEnter = () => {
  _a.PreloadRoomMonsterEntities()
}, DangoAbyssController.Vvc = e => {
  _a.K81.push(e), _a.W81()
}, DangoAbyssController.jvc = e => {
  ModelManager_1.ModelManager.DangoAbyssModel.PhraseRoomInfo(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssRoomInfoUpdate)
}, DangoAbyssController.Hvc = n => {
  if (ModelManager_1.ModelManager.GameModeModel.Loading) _a.jG1 = n, Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 27, "当前处于loading状态，缓存结算数据");
  else {
    var e = ModelManager_1.ModelManager.GameModeModel.IsMulti;
    if (ModelManager_1.ModelManager.DangoAbyssModel.OnAbyssChallengeResultNotify(n), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssChallengeResult), e) {
      var t = [],
        o = n.j7n.TRs.length;
      for (let e = 0; e < o; e++) {
        var a = n.j7n.TRs[e],
          r = a.W5n,
          s = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(r),
          i = s?.PlayerTitleId ?? 0,
          l = s?.PlayerTitleStarLevel ?? 0,
          _ = s?.Sex ?? 0,
          g = s?.IsSelf ?? !1;
        const M = [];
        var y = [],
          D = 0 < a.dUs.length ? 1 : 0;
        for (let e = 0; e < D; e++) {
          var d = a.dUs[e],
            c = {
              Id: d.K0c?.h5n ?? 0,
              Count: d.K0c?.e5n ?? 0
            };
          y.push(c), d.X0c.forEach(e => {
            e = {
              Id: e.h5n,
              Count: e.e5n
            };
            M.push(e)
          })
        }
        var v = ModelManager_1.ModelManager.DangoAbyssModel.GetMainHonorRank(y),
          r = {
            Rank: 0,
            PlayerId: r,
            IsAddButtonAvailable: !g && !ModelManager_1.ModelManager.FriendModel.IsMyFriend(r),
            IsSelf: g,
            BgPath: SolarSpeedDefine_1.rankBgPathMap[v],
            MedalColorHex: SolarSpeedDefine_1.medalColorHex[v],
            FxColorHex: SolarSpeedDefine_1.fxColorHex[v],
            PlayerIndexIconPath: (g ? SolarSpeedDefine_1.playerIndexSelfIconMap : SolarSpeedDefine_1.playerIndexIconMap)[e],
            NameText: s?.PlayerName ?? "",
            IconData: {
              IconPath: void 0 === s ? "" : ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(s.HeadId, !1).GetRoleHeadIconCircle()
            },
            LikeCount: a.V0c,
            SubDescData: M,
            MainDescData: y,
            AvatarTexturePath: SolarSpeedDefine_1.avatarPattern[v],
            LineTexturePath: SolarSpeedDefine_1.linePattern[v],
            BgTexturePath: SolarSpeedDefine_1.bgPattern[v],
            PlayerTitle: i,
            PlayerTitleStarLevel: l,
            Sex: _
          };
        t.push(r)
      }
      e = {
        TitleId: "DangoAbyssMultiEndTitle",
        RoleDataList: t,
        PanelType: AbyssDangoRolePanel_1.AbyssDangoRolePanel,
        ConfirmClick: () => {
          _a.ORc(n)
        }
      };
      UiManager_1.UiManager.OpenView("SolarSpeedResultView", e)
    } else _a.ORc(n)
  }
}, DangoAbyssController.$vc = e => {
  ModelManager_1.ModelManager.DangoAbyssModel.OnAbyssLikeNotify(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssLikeChange, e.W5n)
}, DangoAbyssController.Wvc = e => {
  ModelManager_1.ModelManager.DangoAbyssModel.OnAbyssFormationRoleSelectUpdateNotify(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssFormationUpdate)
}, DangoAbyssController.Wv1 = e => {
  e = new LguiUtil_1.TableTextArgNew(e);
  ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(29, e)
}, DangoAbyssController.wa1 = () => {
  ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyss() && _a.RequestQuitChallenge()
}, DangoAbyssController.Ilt = () => {
  _a.VG1()
}, DangoAbyssController.p5a = () => {
  _a.VG1();
  var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
  0 !== e && 1 === ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.WorldDungeonSubType && 0 !== (e = _a.pUc()) && (e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e), ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e.GetCurrentLastFinishChallengeId()).SmallWorldShowSceneItem.split(",").forEach(e => {
    e = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(e), 1);
    e?.IsValid() && e.SetActorHiddenInGame(!1)
  }))
}, DangoAbyssController.Gu1 = () => {
  var e = _a.pUc();
  0 !== e && (e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)).GetActivityTipNeedShowState() && (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(28), e.CacheActivityTipShowState())
}, DangoAbyssController.X2c = n => {
  var e = ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentDungeonConfig;
  e && 33 === e.InstSubType && (ModelManager_1.ModelManager.DangoAbyssModel.CheckIsInMatch() ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeRoleRequest(ModelManager_1.ModelManager.EditBattleTeamModel.GetOwnRoleConfigIdList[0]).then(e => {
    e && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFormationDango, n)
  }) : EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFormationDango, n))
}, DangoAbyssController.sZs = e => {
  Log_1.Log.CheckDebug() && Log_1.Log.Debug("TowerDefense", 27, "当队伍选人变化时", ["Reason", e]);
  e = ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentDungeonConfig;
  e && 33 === e.InstSubType && ModelManager_1.ModelManager.DangoAbyssModel.CheckIsInMatch() && _a.nwc()
}, DangoAbyssController.gvc = e => {
  var n = _a.pUc(),
    n = ModelManager_1.ModelManager.ActivityModel.GetActivityById(n);
  n ? (n.OnUpdateUnlockChallengeIdList(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssUnlockChallengeStateUpdate)) : Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启")
};
//# sourceMappingURL=DangoAbyssController.js.map