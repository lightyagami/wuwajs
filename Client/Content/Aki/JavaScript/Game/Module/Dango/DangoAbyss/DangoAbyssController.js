"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssController = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const AbyssRoomById_1 = require("../../../../Core/Define/ConfigQuery/AbyssRoomById");
const BlueprintConfigByBlueprintType_1 = require("../../../../Core/Define/ConfigQuery/BlueprintConfigByBlueprintType");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const PreloadControllerNew_1 = require("../../../World/Controller/PreloadControllerNew");
const AsyncTask_1 = require("../../../World/Task/AsyncTask");
const TaskSystem_1 = require("../../../World/Task/TaskSystem");
const DangoAbyssActivityController_1 = require("../../Activity/ActivityContent/DangoAbyss/DangoAbyssActivityController");
const DangoAbyssActivityData_1 = require("../../Activity/ActivityContent/DangoAbyss/DangoAbyssActivityData");
const SolarSpeedDefine_1 = require("../../Activity/ActivityContent/SolarisSpeed/SolarSpeedDefine");
const AbyssDangoRolePanel_1 = require("../../Activity/ActivityContent/SolarisSpeed/View/AbyssDangoRolePanel");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const ItemRewardDefine_1 = require("../../ItemReward/ItemRewardDefine");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
const LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DangoAbyssActorManager_1 = require("./DangoAbyssActorManager");
const DangoAbyssData_1 = require("./DangoAbyssData");
const DangoAbyssDefine_1 = require("./DangoAbyssDefine");
const DangoAbyssCommonRewardView_1 = require("./View/DangoAbyssCommonRewardView");
const DangoAbyssEntranceView_1 = require("./View/DangoAbyssEntranceView");
const DangoAbyssRankView_1 = require("./View/DangoAbyssRankView");
const DangoAbyssTimeLimitRewardView_1 = require("./View/DangoAbyssTimeLimitRewardView");
const S_ENTITY_TYPE_MONSTER = "Monster";
class DangoAbyssController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, DangoAbyssController.sZs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssDangoSelect, DangoAbyssController.X2c);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeonConfirm, DangoAbyssController.Ja1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, DangoAbyssController.p5a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, DangoAbyssController.Ilt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowBadDangoTip, DangoAbyssController.gy1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssFirstRoomEnter, DangoAbyssController.PreloadRoomMonsterEntitiesOnEnter);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, DangoAbyssController.sZs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssDangoSelect, DangoAbyssController.X2c);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeonConfirm, DangoAbyssController.Ja1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, DangoAbyssController.p5a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, DangoAbyssController.Ilt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShowBadDangoTip, DangoAbyssController.gy1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssFirstRoomEnter, DangoAbyssController.PreloadRoomMonsterEntitiesOnEnter);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(23917, this.Vvc);
    Net_1.Net.Register(16729, this.jvc);
    Net_1.Net.Register(23188, this.Hvc);
    Net_1.Net.Register(24044, this.$vc);
    Net_1.Net.Register(22855, this.Wvc);
    Net_1.Net.Register(24733, this.gvc);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(23917);
    Net_1.Net.UnRegister(16729);
    Net_1.Net.UnRegister(23188);
    Net_1.Net.UnRegister(24044);
    Net_1.Net.UnRegister(22855);
    Net_1.Net.UnRegister(24733);
  }
  static OpenAbyssSelectViewByActivityId(e) {
    var n = new DangoAbyssData_1.DangoAbyssInsSelectViewData();
    var t = DangoAbyssActivityController_1.DangoAbyssActivityController.GetAbyssChallengeByActivityId(e);
    n.AbyssDataList = t;
    n.ActivityData = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    UiManager_1.UiManager.OpenView("DangoAbyssInsSelectView", n);
  }
  static OpenAbyssRankView(e = 0) {
    var n = this.pUc();
    var t = new DangoAbyssRankView_1.DangoAbyssRankData();
    t.OpenChallengeId = e;
    t.DangoAbyssData = DangoAbyssActivityController_1.DangoAbyssActivityController.GetAbyssChallengeRankListByActivityId(n);
    UiManager_1.UiManager.OpenView("DangoAbyssRankView", t);
  }
  static OpenGetDangoView(e) {
    if (ModelManager_1.ModelManager.GameModeModel.Loading) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "当前处于loading状态，不打开团子解锁界面");
      }
    } else {
      const a = new Array();
      e.forEach((e, n) => {
        var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(n).GetName();
        var n = {
          DangoId: n,
          DangoLevel: e,
          UnlockTitle: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey("Text_GetNewDango", "Text_GetNewDango"),
          UnlockSubTitle: "",
          UnlockWutheringWaveTitleSpritePath: ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_TuanziUnlockTxt"),
          DetailName: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t),
          DetailDialog: ""
        };
        a.push(n);
      });
      e = {
        DataList: a,
        ShowTime: 1000
      };
      UiManager_1.UiManager.OpenView("DangoAbyssGetDangoView", e);
    }
  }
  static OpenAbyssLimitRewardView(e = true) {
    let n = "DangoAbyssTimeLimitRewardView";
    if (!e) {
      n = "DangoAbyssTimeLimitRewardActivityView";
    }
    var e = new DangoAbyssTimeLimitRewardView_1.DangoAbyssTimeLimitViewData();
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.pUc());
    e.Data = t;
    UiManager_1.UiManager.OpenView(n, e);
  }
  static OpenAbyssRewardView(e = true) {
    let n = "DangoAbyssCommonRewardView";
    if (!e) {
      n = "DangoAbyssCommonRewardActivityView";
    }
    var e = new DangoAbyssCommonRewardView_1.DangoAbyssRewardViewData();
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.pUc());
    e.Data = t;
    UiManager_1.UiManager.OpenView(n, e);
  }
  static OpenAbyssEntranceViewByActivityId(n) {
    UiManager_1.UiManager.NormalResetToView("BattleView", () => {
      var e = new DangoAbyssEntranceView_1.DangoAbyssEntraceViewData();
      e.ActivityId = n;
      UiManager_1.UiManager.OpenView("DangoAbyssEntranceView", e);
    });
  }
  static pUc() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values()) {
      if (e instanceof DangoAbyssActivityData_1.DangoAbyssActivityData) {
        return e.Id;
      }
    }
    return 0;
  }
  static async OpenCurrentActivityAbyssEntranceAsync() {
    var e = this.pUc();
    if (e === 0) {
      return false;
    }
    const n = new CustomPromise_1.CustomPromise();
    UiManager_1.UiManager.NormalResetToView("BattleView", () => {
      n.SetResult(true);
    });
    await n.Promise;
    var t = new DangoAbyssEntranceView_1.DangoAbyssEntraceViewData();
    t.ActivityId = e;
    var e = await UiManager_1.UiManager.OpenViewAsync("DangoAbyssEntranceView", t);
    return !!e;
  }
  static OpenCurrentActivityAbyssEntrance() {
    var e = this.pUc();
    return e !== 0 && (this.OpenAbyssEntranceViewByActivityId(e), true);
  }
  static CheckPreloadRoomMonsterEntities(e) {
    return !!ModelManager_1.ModelManager.DangoAbyssModel?.CheckInAbyss();
  }
  static async PreloadRoomMonsterEntities() {
    if (!this.CheckPreloadRoomMonsterEntities) {
      return false;
    }
    var e = ModelManager_1.ModelManager.DangoAbyssModel;
    var n = ModelManager_1.ModelManager.LevelPlayModel;
    if (!e || !n) {
      return false;
    }
    ModelManager_1.ModelManager.GameModeModel.PreloadDangoAbyssMonsterProfiler.Restart();
    PreloadControllerNew_1.PreloadControllerNew.ClearAllPbLevelEntityPb();
    var e = e.GetCurrentRoomId();
    var t = AbyssRoomById_1.configAbyssRoomById.GetConfig(e)?.BehaviorTree;
    if (t) {
      n = n.GetLevelPlayAllEntities(t);
      const r = new Set();
      const i = e => {
        e = BlueprintConfigByBlueprintType_1.configBlueprintConfigByBlueprintType.GetConfig(e.BlueprintType);
        return !!e && e.EntityType === S_ENTITY_TYPE_MONSTER;
      };
      n.forEach(e => {
        var n = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
        if (n) {
          if (i(n)) {
            r.add(e);
          } else {
            e = n.ComponentsData;
            n = (0, IComponent_1.getComponent)(e, "SpawnMonsterComponent");
            if (n && n.SpawnMonsterConfigs) {
              for (const a of n.SpawnMonsterConfigs) {
                for (const o of a.TargetsToAwake ?? []) {
                  var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(o);
                  if (t && i(t)) {
                    r.add(o);
                  }
                }
              }
            }
          }
        }
        return true;
      });
      await PreloadControllerNew_1.PreloadControllerNew.PreLoadLevelEntityByPbDataIds(Array.from(r));
    }
    ModelManager_1.ModelManager.GameModeModel.PreloadDangoAbyssMonsterProfiler.Stop();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Preload", 80, "[PreloadAbyssRoomMonsterEntities]", ["CurrentRoomId", e], ["Profile Info:", ModelManager_1.ModelManager.GameModeModel.PreloadDangoAbyssMonsterProfiler.ToString()]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssRoomPreloadFinished);
    return true;
  }
  static async Rj1() {
    if (!this.Lj1) {
      for (this.Lj1 = true; this.wj1.length > 0;) {
        var e = this.wj1.shift();
        if (e) {
          await this.Aj1(e);
        }
      }
      this.Lj1 = false;
    }
  }
  static async Aj1(r) {
    var e = new AsyncTask_1.AsyncTask("AbyssSubLevelController", async () => {
      ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = 1;
      const [n, t] = this.UWa(r);
      if (n.length === 0 && t.length === 0) {
        await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(17, 3);
      } else {
        var e = Vector_1.Vector.Create(r.iPs, r.rPs, r.gqs);
        var a = new UE.Rotator(0, r.fqs, 0);
        await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(17, 3);
        const o = new CustomPromise_1.CustomPromise();
        ControllerHolder_1.ControllerHolder.SubLevelController.ChangeSubLevel(n, t, 0, e, a, e => {
          if (e) {
            o.SetResult(true);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Activity", 27, "团子深渊子关卡加载失败", ["unloads", n], ["newLoads", t]);
          }
        });
        await o.Promise;
      }
      await this.Qvc(r.Vy_);
      await this.PreloadRoomMonsterEntities();
      await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(17, 1);
      return true;
    });
    TaskSystem_1.TaskSystem.AddTask(e);
    await TaskSystem_1.TaskSystem.Run();
  }
  static async Qvc(e) {
    var n = Protocol_1.Aki.Protocol.v0c.create();
    n.Vy_ = e;
    var e = await Net_1.Net.CallAsync(23271, n);
    if (!e || e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 27, "团子深渊进入下个房间失败");
      }
    }
  }
  static UWa(n) {
    return [n.fL_.filter(e => !n.mL_.includes(e)), n.mL_.filter(e => !n.fL_.includes(e))];
  }
  static ORc(e) {
    var n = {
      ButtonTextId: "ConfirmBox_217_ButtonText_0",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: true,
      OnClickedCallback: function () {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      }
    };
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentChallengeId();
    var t = !ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(t).IfStoryChallenge;
    var a = [];
    a.push(n);
    if (t) {
      a.push({
        ButtonTextId: "ConfirmBox_133_ButtonText_1",
        IsTimeDownCloseView: false,
        IsClickedCloseView: false,
        OnClickedCallback: function () {
          if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
            ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.SettleViewButtonSuccessOnMultiCallBack(0);
          } else {
            ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon();
          }
        },
        DescriptionTextId: undefined
      });
    }
    const o = [];
    e.j7n.gws.forEach(e => {
      e = new RewardItemData_1.RewardItemData(e.s5n, e.m9n, undefined);
      o.push(e);
    });
    n = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceProgress();
    t = {
      RewardItemData: o,
      Progress: n
    };
    e = {
      ConfigId: ItemRewardDefine_1.ABYSS_SUCCESS,
      IsSuccess: true,
      ButtonInfoList: a,
      DangoAbyssSuccessData: t,
      IsBagFull: false
    };
    ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
    ItemRewardController_1.ItemRewardController.OpenExploreRewardViewNew(e);
  }
  static AbyssLikePlayer(e) {
    var n = new Protocol_1.Aki.Protocol.f0c();
    n.W5n = e;
    Net_1.Net.Call(20669, n, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23261);
      }
    });
  }
  static async RequestAbyssRankList(e) {
    var n = new Protocol_1.Aki.Protocol.A0c();
    n.s5n = e;
    var e = await Net_1.Net.CallAsync(27422, n);
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrAbyssRankListCd) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18928);
      }
      ModelManager_1.ModelManager.DangoAbyssModel.OnAbyssChallegenRankUpdate(e);
    }
  }
  static async RequestAbyssSelfRank(e) {
    var n = new Protocol_1.Aki.Protocol.B0c();
    n.s5n = e;
    var e = await Net_1.Net.CallAsync(20086, n);
    ModelManager_1.ModelManager.DangoAbyssModel.OnAbyssChallengeSelfRankUpdate(e);
  }
  static async RequestSetAbyssShowName(e, n) {
    var t = new Protocol_1.Aki.Protocol.x0c();
    t.e8n = e;
    t.lnc = n;
    var t = await Net_1.Net.CallAsync(26329, t);
    return !!t && (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 23511), false) : (ModelManager_1.ModelManager.DangoAbyssModel.OnAnonymousNameStateChange(e, n), true));
  }
  static StartAbyssChallenge(e) {
    e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e);
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId = e.InstEntranceId;
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = e.InstId;
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterEntrance(e.InstEntranceId).finally(undefined);
  }
  static vF1() {
    if (this.yF1 && ModelManager_1.ModelManager.DangoAbyssModel.CheckInDangoAbyssInstance()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "显示缓存的结算数据");
      }
      this.Hvc(this.yF1);
    }
    this.yF1 = undefined;
  }
  static nwc() {
    var e;
    if (ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentDungeonConfig.InstSubType === 33 && ModelManager_1.ModelManager.DangoAbyssModel.CheckIsInMatch()) {
      e = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo();
      ModelManager_1.ModelManager.DangoAbyssModel.RefreshOwnerListByMatchTeamInfo(e);
    }
  }
  static InitAbyssDangoObserver(e) {
    DangoAbyssActorManager_1.DangoAbyssActorManager.InitIndexDangoSkeletalObserverHandle(e);
  }
  static RefreshAbyssDangoAnimation(e, n, t) {
    DangoAbyssActorManager_1.DangoAbyssActorManager.RefreshSkeletalObserverAnimation(e, n, t);
  }
  static RefreshAbyssDangoModel(e, n, t, a) {
    let o = undefined;
    let r = 0;
    let i = "";
    if (n === DangoAbyssDefine_1.BADDANGOID) {
      o = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoTransform();
      r = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoMeshId();
      i = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoStandAni();
    } else {
      l = (s = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(n)).GetPhantomId();
      o = ModelManager_1.ModelManager.PhantomBattleModel.GetMeshTransform(l);
      i = ModelManager_1.ModelManager.PhantomBattleModel.GetStandAnim(l);
      r = s.GetMeshId();
    }
    var s;
    var l = {
      DangoId: n,
      MeshId: r,
      DangoPointCase: t,
      Transform: o,
      StandAnimationName: i
    };
    DangoAbyssActorManager_1.DangoAbyssActorManager.RefreshDangoSkeletalObserverHandle(e, l, a);
  }
  static DestroyAbyssDangoObserver(e) {
    DangoAbyssActorManager_1.DangoAbyssActorManager.DestroyDangoSkeletalObserverHandle(e);
  }
  static RequestQuitChallenge() {
    var e = new Protocol_1.Aki.Protocol.u0c();
    Net_1.Net.Call(18621, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22737);
      }
    });
  }
  static RequestChallengeUnlock(e) {
    var n = new Protocol_1.Aki.Protocol._0c();
    n.e8n = e;
    Net_1.Net.Call(23330, n, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21170);
      }
    });
  }
}
exports.DangoAbyssController = DangoAbyssController;
(_a = DangoAbyssController).Lj1 = false;
DangoAbyssController.wj1 = [];
DangoAbyssController.yF1 = undefined;
DangoAbyssController.PreloadRoomMonsterEntitiesOnEnter = () => {
  _a.PreloadRoomMonsterEntities();
};
DangoAbyssController.Vvc = e => {
  _a.wj1.push(e);
  _a.Rj1();
};
DangoAbyssController.jvc = e => {
  ModelManager_1.ModelManager.DangoAbyssModel.PhraseRoomInfo(e);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssRoomInfoUpdate);
};
DangoAbyssController.Hvc = n => {
  if (ModelManager_1.ModelManager.GameModeModel.Loading) {
    _a.yF1 = n;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Activity", 27, "当前处于loading状态，缓存结算数据");
    }
  } else {
    var e = ModelManager_1.ModelManager.GameModeModel.IsMulti;
    ModelManager_1.ModelManager.DangoAbyssModel.OnAbyssChallengeResultNotify(n);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssChallengeResult);
    if (e) {
      var t = [];
      var a = n.j7n.TRs.length;
      for (let e = 0; e < a; e++) {
        var o = n.j7n.TRs[e];
        var r = o.W5n;
        var i = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(r);
        var s = i?.PlayerTitleId ?? 0;
        var l = i?.PlayerTitleStarLevel ?? 0;
        var _ = i?.Sex ?? 0;
        var g = i?.IsSelf ?? false;
        const M = [];
        var y = [];
        var d = o.dUs.length > 0 ? 1 : 0;
        for (let e = 0; e < d; e++) {
          var D = o.dUs[e];
          var c = {
            Id: D.K0c?.h5n ?? 0,
            Count: D.K0c?.e5n ?? 0
          };
          y.push(c);
          D.X0c.forEach(e => {
            e = {
              Id: e.h5n,
              Count: e.e5n
            };
            M.push(e);
          });
        }
        var v = ModelManager_1.ModelManager.DangoAbyssModel.GetMainHonorRank(y);
        var r = {
          Rank: 0,
          PlayerId: r,
          IsAddButtonAvailable: !g && !ModelManager_1.ModelManager.FriendModel.IsMyFriend(r),
          IsSelf: g,
          BgPath: SolarSpeedDefine_1.rankBgPathMap[v],
          MedalColorHex: SolarSpeedDefine_1.medalColorHex[v],
          FxColorHex: SolarSpeedDefine_1.fxColorHex[v],
          PlayerIndexIconPath: (g ? SolarSpeedDefine_1.playerIndexSelfIconMap : SolarSpeedDefine_1.playerIndexIconMap)[e],
          NameText: i?.PlayerName ?? "",
          IconData: {
            IconPath: i === undefined ? "" : ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(i.HeadId, false).GetRoleHeadIconCircle()
          },
          LikeCount: o.V0c,
          SubDescData: M,
          MainDescData: y,
          AvatarTexturePath: SolarSpeedDefine_1.avatarPattern[v],
          LineTexturePath: SolarSpeedDefine_1.linePattern[v],
          BgTexturePath: SolarSpeedDefine_1.bgPattern[v],
          PlayerTitle: s,
          PlayerTitleStarLevel: l,
          Sex: _
        };
        t.push(r);
      }
      e = {
        TitleId: "DangoAbyssMultiEndTitle",
        RoleDataList: t,
        PanelType: AbyssDangoRolePanel_1.AbyssDangoRolePanel,
        ConfirmClick: () => {
          _a.ORc(n);
        }
      };
      UiManager_1.UiManager.OpenView("SolarSpeedResultView", e);
    } else {
      _a.ORc(n);
    }
  }
};
DangoAbyssController.$vc = e => {
  ModelManager_1.ModelManager.DangoAbyssModel.OnAbyssLikeNotify(e);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssLikeChange, e.W5n);
};
DangoAbyssController.Wvc = e => {
  ModelManager_1.ModelManager.DangoAbyssModel.OnAbyssFormationRoleSelectUpdateNotify(e);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssFormationUpdate);
};
DangoAbyssController.gy1 = e => {
  e = new LguiUtil_1.TableTextArgNew(e);
  ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(29, e);
};
DangoAbyssController.Ja1 = () => {
  if (ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyss()) {
    _a.RequestQuitChallenge();
  }
};
DangoAbyssController.Ilt = () => {
  _a.vF1();
};
DangoAbyssController.p5a = () => {
  _a.vF1();
  var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
  if (e !== 0 && ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.WorldDungeonSubType === 1 && (e = _a.pUc()) !== 0) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e.GetCurrentLastFinishChallengeId()).SmallWorldShowSceneItem.split(",").forEach(e => {
      e = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(e), 1);
      if (e?.IsValid()) {
        e.SetActorHiddenInGame(false);
      }
    });
  }
};
DangoAbyssController.X2c = n => {
  var e = ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentDungeonConfig;
  if (e && e.InstSubType === 33) {
    if (ModelManager_1.ModelManager.DangoAbyssModel.CheckIsInMatch()) {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeRoleRequest(ModelManager_1.ModelManager.EditBattleTeamModel.GetOwnRoleConfigIdList[0]).then(e => {
        if (e) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFormationDango, n);
        }
      });
    } else {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFormationDango, n);
    }
  }
};
DangoAbyssController.sZs = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("TowerDefense", 27, "当队伍选人变化时", ["Reason", e]);
  }
  e = ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentDungeonConfig;
  if (e && e.InstSubType === 33 && ModelManager_1.ModelManager.DangoAbyssModel.CheckIsInMatch()) {
    _a.nwc();
  }
};
DangoAbyssController.gvc = e => {
  var n = _a.pUc();
  var n = ModelManager_1.ModelManager.ActivityModel.GetActivityById(n);
  if (n) {
    n.OnUpdateUnlockChallengeIdList(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssUnlockChallengeStateUpdate);
  } else if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
  }
}; //# sourceMappingURL=DangoAbyssController.js.map