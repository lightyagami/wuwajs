"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const InstOnlineType_1 = require("../../../Core/Define/Config/SubType/InstOnlineType");
const InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const PhantomItemByItemId_1 = require("../../../Core/Define/ConfigQuery/PhantomItemByItemId");
const TowerDefenceInstanceById_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceInstanceById");
const TowerDefenceInstanceByInstanceId_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceInstanceByInstanceId");
const TowerDefenceMapMarkByActivityId_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceMapMarkByActivityId");
const TowerDefencePhantomById_1 = require("../../../Core/Define/ConfigQuery/TowerDefencePhantomById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const SolarSpeedDefine_1 = require("../Activity/ActivityContent/SolarisSpeed/SolarSpeedDefine");
const TowerDefenseRolePanel_1 = require("../Activity/ActivityContent/SolarisSpeed/View/TowerDefenseRolePanel");
const ActivityControllerBase_1 = require("../Activity/ActivityControllerBase");
const EditFormationDefine_1 = require("../EditFormation/EditFormationDefine");
const TowerDefenceDefine_1 = require("./TowerDefenceDefine");
const TowerDefenceInBattleView_1 = require("./View/TowerDefenceInBattleView");
const TowerDefencePhantomIconItem_1 = require("./View/TowerDefencePhantomIconItem");
const TowerDefencePhantomSkillItem_1 = require("./View/TowerDefencePhantomSkillItem");
const TowerDefenceSubView_1 = require("./View/TowerDefenceSubView");
class TowerDefenseController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.tZs = e => {
      var n;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefense", 64, "塔防活动状态变化时刷新的数据", ["notify", e]);
      }
      if (e.Izs) {
        (n = ModelManager_1.ModelManager.TowerDefenseModel).PhantomMessageCache.ParseTowerDefenseActivityData(e.Izs);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, n.PhantomMessageCache.Id);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseOnActivityInfoUpdateNotify);
      }
    };
    this.iZs = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefense", 64, "副本数据发生变化时的变化，包括是否副本解锁，副本分数等", ["notify", e]);
      }
      ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.ParseTowerDefenseInstanceDataList(e.Mzs, false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseOnInstanceInfoUpdateNotify);
    };
    this.rZs = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefense", 64, "战斗声骸升级/获得经验时刷新的数据", ["notify", e]);
      }
      ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.ParseTowerDefenseOwnPhantomDataList(e.Dps);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseOnPhantomInfoUpdateNotify);
      TowerDefenseController.zra();
    };
    this.ECa = e => {
      if (ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed) {
        TowerDefenseController.ERa(e);
      } else {
        ModelManager_1.ModelManager.TowerDefenseModel.DelayedEndNotify = e;
      }
    };
    this.Zra = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefense", 64, "进入战斗副本时刷新的数据", ["notify", e]);
      }
      var n;
      var t;
      var r = ModelManager_1.ModelManager.TowerDefenseModel;
      r.ResetPhantomOwnerDataList();
      for ([n, t] of e.Y7n.entries()) {
        var o = r.PhantomOwnerDataList[n];
        var a = t.hxs;
        var i = a.s5n;
        o.RoleCfgId = t.Q6n;
        o.PhantomId = i;
        r.PhantomMessageCache.OwnPhantomInBattleDataCache.set(i, a);
      }
    };
    this.tQa = n => {
      const t = MathUtils_1.MathUtils.LongToNumber(n.ZM_);
      var e = TimeUtil_1.TimeUtil.GetServerStopTimeStamp();
      const r = TimeUtil_1.TimeUtil.SetTimeSecond(t - e);
      var o = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(r + 0.5);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefense", 64, "局内角色角色角色复活通知", ["notify", n], ["time", t], ["local time with stop", e], ["local time", TimeUtil_1.TimeUtil.GetServerTimeStamp()], ["count down", o]);
      }
      if (o.CountDownText !== undefined) {
        if (TowerDefenseController.CheckIsSelf(n.W5n)) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TowerDefenceRoleDie", o.CountDownText);
        } else {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TowerDefencePlayerDie", o.CountDownText);
        }
      }
      const a = ModelManager_1.ModelManager.TowerDefenseModel;
      e = TimerSystem_1.GameplayTimerSystem.Forever(() => {
        var e = TimeUtil_1.TimeUtil.GetServerStopTimeStamp();
        if (e >= t) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView, n.W5n, n.Q6n);
          a.TryRemoveTimerInBattle(n.W5n, n.Q6n);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView, n.W5n, n.Q6n, TimeUtil_1.TimeUtil.SetTimeSecond(t - e), r);
        }
      }, 100);
      a.TryAddTimerInBattle(e, n.W5n, n.Q6n);
    };
    this.iQa = n => {
      const t = MathUtils_1.MathUtils.LongToNumber(n.ZM_);
      var e = TimeUtil_1.TimeUtil.GetServerStopTimeStamp();
      const r = TimeUtil_1.TimeUtil.SetTimeSecond(t - e);
      e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(0.5 + TimeUtil_1.TimeUtil.SetTimeSecond(t - e));
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefense", 64, "局内玩家玩家玩家复活通知", ["notify", n], ["time", MathUtils_1.MathUtils.LongToNumber(n.ZM_)], ["local time with stop", TimeUtil_1.TimeUtil.GetServerStopTimeStamp()], ["local time", TimeUtil_1.TimeUtil.GetServerTimeStamp()], ["count down", e]);
      }
      if (TowerDefenseController.CheckIsSelf(n.W5n)) {
        ModelManager_1.ModelManager.TowerDefenseModel.SelfReviveTargetTimestampForUi = MathUtils_1.MathUtils.LongToNumber(n.ZM_);
      } else if (e.CountDownText !== undefined) {
        i = ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(n.W5n)?.PlayerNumber ?? 0;
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TowerDefencePlayerRoleDie", i, e.CountDownText);
      }
      const o = ModelManager_1.ModelManager.TowerDefenseModel;
      o.TryRemoveTimerInBattle(n.W5n);
      var a;
      var i = ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.PositionItemMap;
      if (i) {
        const o = ModelManager_1.ModelManager.TowerDefenseModel;
        for (const [, l] of i) {
          if (l.PlayerId === n.W5n) {
            a = TimerSystem_1.GameplayTimerSystem.Forever(() => {
              var e = TimeUtil_1.TimeUtil.GetServerStopTimeStamp();
              if (e >= t) {
                EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView, n.W5n, 0);
                o.TryRemoveTimerInBattle(n.W5n, l.RoleId);
              } else {
                EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView, n.W5n, 0, TimeUtil_1.TimeUtil.SetTimeSecond(t - e), r);
              }
            }, 100);
            o.TryAddTimerInBattle(a, n.W5n, l.RoleId);
          }
        }
      }
    };
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetOrCreateParsedTowerDefenseMsg();
  }
  OnCreateSubPageComponent(e) {
    return new TowerDefenceSubView_1.TowerDefenseSubView();
  }
  OnGetActivityResource(e) {
    return "UiItem_LordGymMainA";
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(e) {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, TowerDefenseController.sZs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TowerDefenseBeforeConfirmQuickRoleSelect, TowerDefenseController.aZs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, TowerDefenseController.hZs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnterInstanceDungeon, TowerDefenseController.lZs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeon, TowerDefenseController._Zs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceExternalConfirm, TowerDefenseController.Fil);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleScoreChanged, TowerDefenseController.mZs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeforeDestroyInstanceDungeonEntranceView, TowerDefenseController.WZs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TowerDefenseSelfPhantomConfirm, TowerDefenseController.yCa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, TowerDefenseController.yRa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, TowerDefenseController.IRa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectInstanceIdChallenge, TowerDefenseController.y1l);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, TowerDefenseController.sZs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TowerDefenseBeforeConfirmQuickRoleSelect, TowerDefenseController.aZs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, TowerDefenseController.hZs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterInstanceDungeon, TowerDefenseController.lZs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeon, TowerDefenseController._Zs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceExternalConfirm, TowerDefenseController.Fil);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleScoreChanged, TowerDefenseController.mZs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeforeDestroyInstanceDungeonEntranceView, TowerDefenseController.WZs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TowerDefenseSelfPhantomConfirm, TowerDefenseController.yCa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, TowerDefenseController.yRa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, TowerDefenseController.IRa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectInstanceIdChallenge, TowerDefenseController.y1l);
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(22300, this.tZs);
    Net_1.Net.Register(21596, this.iZs);
    Net_1.Net.Register(29713, this.rZs);
    Net_1.Net.Register(16407, this.ECa);
    Net_1.Net.Register(18364, this.Zra);
    Net_1.Net.Register(20809, this.tQa);
    Net_1.Net.Register(20820, this.iQa);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22300);
    Net_1.Net.UnRegister(21596);
    Net_1.Net.UnRegister(29713);
    Net_1.Net.UnRegister(16407);
    Net_1.Net.UnRegister(18364);
    Net_1.Net.UnRegister(20809);
    Net_1.Net.UnRegister(20820);
  }
  GetActivityLevelUnlockState(e) {
    return TowerDefenseController.CheckIsInstanceUnlock(e);
  }
  static MarkPhantomIconScrollDataChosen(e, n, t) {
    var r = ModelManager_1.ModelManager.TowerDefenseModel;
    var o = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var o = r.GetOwnerData(o, t);
    if (n) {
      if (o && o.PhantomId !== TowerDefenceDefine_1.DEFAULT_ID) {
        r.CurrentSelfPhantomIdInUiTemp = o.PhantomId;
      } else {
        for (const l of e) {
          var a = l.Data;
          if (!a.IsOccupied && !a.IsLocked) {
            r.CurrentSelfPhantomIdInUiTemp = a.ConfigId;
            break;
          }
        }
      }
    }
    for (const s of e) {
      var i = s.Data;
      i.IsChosen = r.CurrentSelfPhantomIdInUiTemp === i.ConfigId;
    }
  }
  static CheckSelfPhantomCancelAble(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel;
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var t = n.GetOwnerData(t, e);
    return !!t && t.PhantomId !== TowerDefenceDefine_1.DEFAULT_ID && n.CurrentSelfPhantomIdInUiTemp === t.PhantomId;
  }
  static BuildCurrentPhantomNameTextIdInBattle() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentPhantomNameTextId();
  }
  static BuildPreviewRewardData() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetPreviewRewardData();
  }
  static BuildPhantomForInstanceDungeonEntranceData(e) {
    var n = [];
    for (const r of TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(e).OptionalBuff) {
      var t = {
        ItemId: TowerDefencePhantomById_1.configTowerDefencePhantomById.GetConfig(r).PhantomItemId,
        IncId: 0
      };
      n.push([t, 0]);
    }
    return n;
  }
  static BuildRecommendLevelForInstanceDungeonEntranceData(e) {
    return {
      TextId: "RecommendLevel",
      Level: InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e)?.RecommendLevel.get(1) ?? 0
    };
  }
  static BuildTotalScoreContent() {
    return ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.TotalScore.toString();
  }
  static BuildPhantomTipsInBattleData() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel;
    var n = e.GetCurrentPhantomSkillCfgListInBattle();
    var t = e.GetCurrentPhantomLevelInBattle();
    var n = n[t - 1];
    return {
      TitleTextId: n.Name,
      PhantomTextId: n.Name,
      Level: t,
      DescTextId: n.Description,
      DescArgs: e.GetCurrentPhantomSkillDescriptionArgsInBattle()
    };
  }
  static BuildTeamPhantomIconData(e, n) {
    e = ModelManager_1.ModelManager.TowerDefenseModel.GetOwnerData(e, n);
    if (e) {
      n = e.PhantomId;
      if (n && !(n <= 0)) {
        e = TowerDefencePhantomById_1.configTowerDefencePhantomById.GetConfig(n);
        if (e) {
          return PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(e.PhantomItemId)?.IconMiddle;
        }
      }
    }
  }
  static nZs(e) {
    return [{
      ButtonTextId: "Text_ButtonTextExit_Text",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: false,
      OnClickedCallback: TowerDefenseController.CZs
    }, {
      ButtonTextId: "TowerDefence_Restart",
      DescriptionTextId: "TowerDefence_GPint",
      DescriptionArgs: [e],
      IsTimeDownCloseView: false,
      IsClickedCloseView: false,
      OnClickedCallback: TowerDefenseController.gZs
    }];
  }
  static BuildPhantomIdListByOwnRoleCfgIdList(e) {
    var n = [];
    if (TowerDefenseController.CheckInUiFlow()) {
      var t = ModelManager_1.ModelManager.TowerDefenseModel;
      var r = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      for (const a of e) {
        var o = t.GetOwnerData(r, a);
        let e = TowerDefenceDefine_1.DEFAULT_ID;
        if (o) {
          e = o.PhantomId;
        }
        n.push(e);
      }
    }
    return n;
  }
  static BuildInstanceCountDownTextParam(e) {
    var t = ModelManager_1.ModelManager.TowerDefenseModel;
    var n = TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(e);
    if (n) {
      t = t.PhantomMessageCache.StageMapCache.get(n.Id);
      if (t) {
        t = t.UnlockTime * TimeUtil_1.TimeUtil.Millisecond - TimeUtil_1.TimeUtil.GetServerTime();
        if (t <= 0) {
          return "";
        }
        var r = Math.max(t, TimeUtil_1.TimeUtil.Minute);
        let e = 1;
        let n = 1;
        if (r > CommonDefine_1.SECOND_PER_DAY) {
          e = 3;
          n = 3;
        } else if (t > CommonDefine_1.SECOND_PER_HOUR) {
          e = 2;
          n = 2;
        }
        return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(r, e, n).CountDownText ?? "";
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefense", 64, "指定塔防副本协议数据不存在", ["InstanceId", e], ["TowerDefenseInstanceId", n.Id]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TowerDefense", 64, "副本ID与塔防副本表不对应", ["InstanceId", e]);
    }
  }
  static BuildInstanceCountDownText(e) {
    e = this.BuildInstanceCountDownTextParam(e);
    if (e) {
      return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityMowing_UnlockCondition"), e);
    }
  }
  static dZs() {
    if (TowerDefenseController.CheckInUiFlow() && TowerDefenseController.toa()) {
      var t = ModelManager_1.ModelManager.TowerDefenseModel;
      var e = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo();
      if (e) {
        let n = 0;
        for (const s of e.TRs) {
          var r = s.W5n;
          for (const _ of s.J6n) {
            var o = _.Q6n;
            var a = _.Tzs;
            var i = TowerDefenseController.CheckIsSelf(r);
            var l = t.PhantomOwnerDataList[n++];
            l.PlayerId = r;
            l.IsSelf = i;
            l.RoleCfgId = o;
            l.RoleSkinId = _.eI_;
            l.PhantomId = a;
            if (i) {
              t.RoleCfgId2PhantomIdMapCache.set(o, a);
            }
          }
        }
        for (let e = n; e < EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
          t.ResetPhantomOwnerDataByIndex(e);
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("TowerDefense", 64, "同步匹配数据时，队伍不足3人，所以将不足的数据重置", ["第几个角色是空缺", e]);
          }
        }
      }
    }
  }
  static Fea() {
    var n = ModelManager_1.ModelManager.TowerDefenseModel;
    var t = ModelManager_1.ModelManager.EditBattleTeamModel;
    for (let e = 0; e < EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
      var r = t.GetRoleSlotData(e + 1);
      if (r) {
        var r = r.GetRoleData;
        var o = n.PhantomOwnerDataList[e];
        if (r) {
          o.PlayerId = r.PlayerId;
          o.IsSelf = r.IsSelf;
          o.RoleCfgId = r.ConfigId;
          o.RoleSkinId = r.SkinId;
          o.PhantomId = n.RoleCfgId2PhantomIdMapCache.get(r.ConfigId) ?? TowerDefenceDefine_1.DEFAULT_ID;
          continue;
        }
      }
      n.ResetPhantomOwnerDataByIndex(e);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TowerDefense", 64, "单机战队编辑界面同步后的Owner数据", ["OwnerData", n.PhantomOwnerDataList]);
    }
  }
  static zra() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel;
    var n = e.GetCurrentPhantomIdInBattle();
    var e = e.PhantomMessageCache.OwnPhantomInBattleNewLevelUpFlagCache.get(n) ?? false;
    if (!UiManager_1.UiManager.IsViewOpen("TowerDefenceInBattleTips") && e) {
      UiManager_1.UiManager.OpenView("TowerDefenceInBattleTips");
    }
  }
  static async EnterTowerDefense() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
    var n = ModelManager_1.ModelManager.EditBattleTeamModel;
    var t = e.InstanceId;
    if (t) {
      n = n.GetOwnRoleConfigIdList[0];
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TowerDefense", 10, "进入塔防副本", ["instanceId", t], ["RoleIdList", n]);
      }
      return await ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(t, n, e.EntranceId, 0, undefined, ModelManager_1.ModelManager.TowerDefenseModel.GetProtocolPhantomIdList(n));
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefense", 64, "进入副本失败，副本Id不存在", ["instanceId", t]);
      }
      return false;
    }
  }
  static RequestScoreReward(n) {
    var e = Protocol_1.Aki.Protocol.gzs.create();
    const t = ModelManager_1.ModelManager.TowerDefenseModel;
    e.BVn = [n];
    Net_1.Net.CallAsync(23348, e).then(e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefense", 64, "塔防积分奖励的response", ["response", e], ["rewardId", n]);
      }
      if (e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        t.PhantomMessageCache.UpdateByScoreRewardRequest(n);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, t.GetPreviewRewardData());
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.PhantomMessageCache.Id);
      }
    }, () => {});
  }
  static RequestInstanceReward(n) {
    var e = Protocol_1.Aki.Protocol.mzs.create();
    const t = ModelManager_1.ModelManager.TowerDefenseModel;
    e.BVn = [n];
    Net_1.Net.CallAsync(17037, e).then(e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefense", 64, "塔防关卡奖励的response", ["response", e], ["instanceId", n]);
      }
      if (e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        t.PhantomMessageCache.UpdateByInstanceRewardRequest(n);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, t.GetPreviewRewardData());
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.PhantomMessageCache.Id);
      }
    }, () => {});
  }
  static async RequestSelfRankData(e) {
    var n = Protocol_1.Aki.Protocol.Nhc.create();
    n.s5n = e;
    var e = await Net_1.Net.CallAsync(15270, n);
    if (e) {
      ModelManager_1.ModelManager.TowerDefenseModel.RankData.SetSelfServerData(e.mnc);
    }
  }
  static async RequestRankList(e) {
    var n = Protocol_1.Aki.Protocol.nnc.create();
    n.s5n = e;
    var e = await Net_1.Net.CallAsync(24281, n);
    if (e) {
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerDefenceRankCd) {
        ModelManager_1.ModelManager.TowerDefenseModel.RankData.SetSelfServerData(e.mnc);
        ModelManager_1.ModelManager.TowerDefenseModel.RankData.SetIsOpenAnonymousName(!e.lnc);
      } else if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17573);
      } else {
        ModelManager_1.ModelManager.TowerDefenseModel.RankData.SetFriendServerData(e.dnc);
        ModelManager_1.ModelManager.TowerDefenseModel.RankData.SetSelfServerData(e.mnc);
        ModelManager_1.ModelManager.TowerDefenseModel.RankData.SetIsOpenAnonymousName(!e.lnc);
      }
    }
  }
  static RequestRankShowName(e, n) {
    var t = Protocol_1.Aki.Protocol.anc.create();
    t.lnc = e;
    Net_1.Net.Call(22551, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17573);
        } else {
          n?.();
        }
      }
    });
  }
  static SetCurrentTowerDefensePhantomIdInUiTemp(e) {
    ModelManager_1.ModelManager.TowerDefenseModel.CurrentSelfPhantomIdInUiTemp = e;
  }
  static ResetCurrentTowerDefensePhantomIdInUiTemp() {
    ModelManager_1.ModelManager.TowerDefenseModel.ResetCurrentPhantomIdInUiTempToFirstAvailable();
  }
  static ToggleInBattleView() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiToggleTowerDefenseInfoView);
  }
  static ResetCurrentPhantomLevelUpFlag(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel;
    var t = n.GetCurrentPhantomIdInBattle();
    var r = n.GetCurrentPhantomLevelInBattle();
    n.PhantomMessageCache.OwnPhantomInBattleNewLevelUpFlagCache.set(t, e < r);
  }
  static TryReopenInBattleTip() {
    TowerDefenseController.zra();
  }
  static TryOpenPhantomViewByPlayerIdAndRoleId(e, n) {
    if (TowerDefenseController.CheckIsSelf(e)) {
      if (ModelManager_1.ModelManager.InstanceDungeonModel.GetPrewarPlayerReadyState(e)) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TowerDefence_PhantasmTips");
      } else {
        e = {
          RoleCfgId: n
        };
        UiManager_1.UiManager.OpenView("TowerDefencePhantomView", e);
      }
    }
  }
  static SyncSelfTowerDefensePhantomId(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel;
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var t = n.GetOwnerData(t, e);
    if (t) {
      t.PhantomId = n.CurrentSelfPhantomIdInUiTemp;
      n.RoleCfgId2PhantomIdMapCache.set(e, n.CurrentSelfPhantomIdInUiTemp);
      if (TowerDefenseController.toa()) {
        t = ModelManager_1.ModelManager.EditBattleTeamModel;
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.MatchChangeRoleRequest(t.GetOwnRoleConfigIdList[0]).then(e => {
          if (e) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefensePhantomChanged);
          }
        }, () => {});
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("TowerDefense", 64, "单机同步自己的声骸数据，id：" + n.CurrentSelfPhantomIdInUiTemp);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefensePhantomChanged);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TowerDefense", 64, "自己选择声骸后，找不到自己的OwnerData，声骸ID不进行同步", ["roleCfgId", e]);
    }
  }
  static ERa(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TowerDefense", 64, "战斗结束时刷新的数据，然后根据是否在副本中决定是否打开奖励面板", ["notify", e]);
    }
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      if (e.KRs && ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        this.Usc(e);
      } else {
        this.OpenTowerDefenseResultView(e);
      }
      if (UiManager_1.UiManager.IsViewOpen("TowerDefenceInBattleTips")) {
        UiManager_1.UiManager.CloseView("TowerDefenceInBattleTips");
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseOnTowerDefenseBattleEndNotify);
    }
  }
  static OpenTowerDefenseResultView(r) {
    var o = r.r6n;
    var o = TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(o);
    if (o !== undefined) {
      o = o.IsDifficult;
      let e = "";
      let n = "";
      let t = undefined;
      var a = TowerDefenseController.nZs(r.tBs);
      if (o) {
        n = r.KRs ? (e = "TowerDefenceWinTime", TimeUtil_1.TimeUtil.GetTimeString(r.Qxs)) : (e = "TowerDefencelose", "");
        a[1].DescriptionTextId = "TowerDefenceBestTime";
        a[1].DescriptionArgs = [TimeUtil_1.TimeUtil.GetTimeString(r.JM_)];
      } else if (r.KRs) {
        e = "MowingCurrentPoint";
        n = "";
        t = r.SMs;
      } else {
        e = "TowerDefencelose";
        n = "";
      }
      var o = {
        ConfigId: r.KRs ? TowerDefenceDefine_1.INSTANCE_SUCCESS : TowerDefenceDefine_1.INSTANCE_FAIL,
        IsSuccess: r.KRs,
        ExploreRecordInfo: {
          TitleTextId: e,
          Record: n,
          RecordRollingTo: t,
          IsNewRecord: o ? r.Qxs !== 0 && r.JM_ >= r.Qxs : r.SMs >= r.tBs && r.SMs !== 0
        },
        ButtonInfoList: a
      };
      ControllerHolder_1.ControllerHolder.ItemRewardController.OpenExploreRewardViewNew(o);
    }
  }
  static Usc(e) {
    var n = [];
    var t = [];
    for (const s of e._nc) {
      var r = s.W5n;
      let e = 0;
      var o = t.indexOf(r);
      if (o !== -1) {
        e = o;
      } else {
        e = t.length;
        t.push(r);
      }
      var o = ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(r);
      var a = o?.IsSelf ?? false;
      var i = [];
      for (const _ of s.cnc) {
        var l = {
          Title: _.s5n,
          Count: _.SMs
        };
        i.push(l);
      }
      r = {
        Rank: 0,
        PlayerId: r,
        IsAddButtonAvailable: !a && !ModelManager_1.ModelManager.FriendModel.IsMyFriend(r),
        IsSelf: a,
        BgPath: SolarSpeedDefine_1.rankBgPathMap[0],
        MedalColorHex: SolarSpeedDefine_1.medalColorHex[0],
        FxColorHex: SolarSpeedDefine_1.fxColorHex[0],
        PlayerIndexIconPath: (a ? SolarSpeedDefine_1.playerIndexSelfIconMap : SolarSpeedDefine_1.playerIndexIconMap)[e],
        NameText: o?.PlayerName ?? "",
        IconData: {
          IconPath: o === undefined ? "" : ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(o.HeadId, false).GetRoleHeadIconCircle()
        },
        BestTitle: s.tbs,
        DescDataList: i
      };
      n.push(r);
    }
    const s = {
      TitleId: "TowerDefenceSettlement01",
      RoleDataList: n,
      PanelType: TowerDefenseRolePanel_1.TowerDefenseRolePanel,
      ConfirmClick: () => {
        TowerDefenseController.OpenTowerDefenseResultView(e);
      }
    };
    UiManager_1.UiManager.OpenView("SolarSpeedResultView", s);
  }
  static GetLevelInBattle() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentPhantomLevelInBattle();
  }
  static GetLevelContentInBattle() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel;
    if (e.CheckCurrentActivityShowDifferent()) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerDefencewenhao") ?? "";
    } else {
      return e.GetCurrentPhantomLevelInBattle().toString();
    }
  }
  static GetExpDataInBattle() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel;
    if (!e.CheckCurrentActivityShowDifferent()) {
      return e.GetCurrentPhantomExpPairInBattle();
    }
  }
  static GetProgressInBattle() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentPhantomExpPairInBattle();
    if (e.Exp === 0) {
      return 0;
    } else if (e.Threshold === 0) {
      return 1;
    } else {
      return e.Exp / e.Threshold;
    }
  }
  static GetIsFirstOpen() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetOrCreateParsedTowerDefenseMsg().GetIfFirstOpen();
  }
  static GetActivitySubViewTitle() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetOrCreateParsedTowerDefenseMsg().GetTitle();
  }
  static GetActivityCfg() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetOrCreateParsedTowerDefenseMsg().LocalConfig;
  }
  static GetActivityPreviewReward() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetOrCreateParsedTowerDefenseMsg().GetPreviewReward();
  }
  static TryGetReviveViewName() {
    if (!UiManager_1.UiManager.IsViewOpen("ExploreRewardView")) {
      return "TowerDefenceReviveView";
    }
  }
  static GetCurrentSceneTeamItem() {
    return ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
  }
  static GetAllOwnSceneTeamItems() {
    return ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true);
  }
  static GetRecordByInstanceId(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel;
    var e = TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(e);
    if (e) {
      return n.PhantomMessageCache.StageMapCache.get(e.Id)?.Record ?? 0;
    } else {
      return 0;
    }
  }
  static GetPassTimeContentByInstanceId(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel;
    var e = TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(e);
    let t = 0;
    if (e) {
      n = n.PhantomMessageCache.StageMapCache.get(e.Id);
      t = n && n.Passed ? n.PassTime : 0;
    }
    return TimeUtil_1.TimeUtil.GetTimeString(t);
  }
  static GetTotalScoreLimitByInstanceId(e) {
    e = TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(e);
    if (e) {
      return e.UnlockScoreLimit;
    } else {
      return 0;
    }
  }
  static GetCurrentScoreLimit() {
    var e;
    var n = ModelManager_1.ModelManager.TowerDefenseModel;
    let t = 0;
    for ([e] of n.PhantomMessageCache.StageMapCache) {
      var r = TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(e);
      if (r !== undefined && n.PhantomMessageCache.IsStageUnlockedByTowerDefenseInstanceId(e)) {
        t = r.UnlockScoreLimit > t ? r.UnlockScoreLimit : t;
      }
    }
    return t;
  }
  static GetMarkIdByActivityId(e) {
    e = TowerDefenceMapMarkByActivityId_1.configTowerDefenceMapMarkByActivityId.GetConfig(e);
    if (e === undefined) {
      return 0;
    } else {
      return e.MarkId;
    }
  }
  static GetSuitableInstanceId() {
    return ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.GetSuitableInstanceId();
  }
  static GetPhantomSkillDescriptionArgsByPhantomId(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel;
    if (n.CheckCurrentActivityShowDifferent()) {
      n = n.PhantomConfigCache.get(e);
      e = PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(n.PhantomItemId).SkillId;
      return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExByPhantomSkillIdAndQuality(e, 5);
    }
  }
  static GetPhantomSkillDescriptionByPhantomId(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel;
    if (n.CheckCurrentActivityShowDifferent()) {
      n = n.PhantomConfigCache.get(e);
      e = PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(n.PhantomItemId).SkillId;
      return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(e).DescriptionEx;
    }
  }
  static CheckActivityUnlockByCondition() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetOrCreateParsedTowerDefenseMsg().IsUnLock();
  }
  static CheckInInstanceDungeon() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 21);
  }
  static CheckIsInstanceUnlock(e) {
    return ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.IsStageUnLocked(e);
  }
  static CheckIsInstanceSingle() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.OnlineType === InstOnlineType_1.InstOnlineType.Single);
  }
  static CheckHasReward() {
    return ModelManager_1.ModelManager.TowerDefenseModel.CheckHasReward();
  }
  static CheckHasNewStage() {
    return ModelManager_1.ModelManager.TowerDefenseModel.HasNotClickNewLevel();
  }
  static CheckIsSelf(e) {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId() === e;
  }
  static CheckActivityUnlockByMulti() {
    return !ModelManager_1.ModelManager.GameModeModel.IsMulti || ModelManager_1.ModelManager.PlayerInfoModel.GetId() === ModelManager_1.ModelManager.OnlineModel.OwnerId;
  }
  static CheckInUiFlow() {
    return ModelManager_1.ModelManager.TowerDefenseModel.IsUiFlowOpen;
  }
  static CheckIsSelfEntrance(e) {
    return TowerDefenceDefine_1.entranceSet.has(e);
  }
  static CheckIsPhantomViewOpened() {
    return ModelManager_1.ModelManager.TowerDefenseModel.IsPhantomViewOpened;
  }
  static CheckAllPhantomsReady() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel;
    var n = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    for (const t of e.PhantomOwnerDataList) {
      if (n === t.PlayerId && t.RoleCfgId > 0 && t.PhantomId <= 0) {
        return false;
      }
    }
    return true;
  }
  static CheckIsTowerEntity(e) {
    var n;
    return !!TowerDefenseController.CheckInInstanceDungeon() && (n = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), !!(n = TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(n))) && n.BaseEntityId === e.TrackTarget;
  }
  static toa() {
    return ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() !== 0;
  }
  static CheckIsChallengeInstanceByInstanceId(e) {
    e = TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(e);
    return e !== undefined && e.IsDifficult;
  }
  static CheckInstancePassedByInstanceId(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel;
    var e = TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(e);
    return !!e && (n.PhantomMessageCache.StageMapCache.get(e.Id)?.Passed ?? false);
  }
  static CheckCurrentPhantomIsOccupiedInUi() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel;
    return e.CheckPhantomIsOccupied(e.CurrentSelfPhantomIdInUiTemp);
  }
  static SetIsUiFlowOpen(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel;
    n.IsUiFlowOpen = e;
    n.IsPhantomViewOpened = false;
  }
  static SetPhantomViewOpened(e) {
    ModelManager_1.ModelManager.TowerDefenseModel.IsPhantomViewOpened = e;
  }
}
(exports.TowerDefenseController = TowerDefenseController).BuildPhantomIconItem = () => new TowerDefencePhantomIconItem_1.TowerDefensePhantomIconItem();
TowerDefenseController.BuildPhantomSkillItem = () => new TowerDefencePhantomSkillItem_1.TowerDefensePhantomSkillItem();
TowerDefenseController.BuildPhantomSkillInBattleItem = () => new TowerDefenceInBattleView_1.TowerDefensePhantomSkillInBattleItem();
TowerDefenseController.BuildPhantomIconScrollData = () => {
  var e;
  var n;
  var t;
  var r = [];
  var o = ModelManager_1.ModelManager.TowerDefenseModel;
  var a = o.SortedPhantomConfigCache;
  var i = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
  for (const l of a) {
    if (o.CheckPhantomAvailableInActivityByActivityId(l.ActivityId)) {
      e = PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(l.PhantomItemId);
      n = TowerDefenseController.toa() ? i.GetMatchingId() : i.SelectInstanceId;
      if (!(t = TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(n))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Activity", 64, "副本ID配置错误，无法在塔防副本配置中找到，请检查联机塔防表和副本表", ["选中的副本ID", n]);
        }
      }
      n = !t?.OptionalBuff.includes(l.Id) ?? true;
      t = {
        Type: 3,
        Data: {
          ConfigId: l.Id,
          HexColorPath: ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(l.MarkResourceId) ?? "",
          IsLocked: n,
          IsChosen: false,
          IsOccupied: o.CheckPhantomIsOccupied(l.Id)
        },
        PhantomId: l.PhantomItemId,
        QualityId: e.QualityId,
        IsLockVisibleBlack: n || !o.IsPhantomViewOpened
      };
      r.push(t);
    }
  }
  r.sort(TowerDefenseController.Bua);
  return r;
};
TowerDefenseController.BuildPhantomSkillLayoutData = () => {
  var e;
  var n;
  var t = [];
  var r = ModelManager_1.ModelManager.TowerDefenseModel;
  var o = r.PhantomConfigCache.get(r.CurrentSelfPhantomIdInUiTemp);
  var a = TowerDefenseController.GetPhantomSkillDescriptionArgsByPhantomId(r.CurrentSelfPhantomIdInUiTemp);
  for ([e, n] of o.SkillDataList.entries()) {
    var i = TowerDefenseController.GetPhantomSkillDescriptionByPhantomId(r.CurrentSelfPhantomIdInUiTemp) ?? n.Description;
    t.push({
      SkillTextId: n.Name,
      DescriptionTextId: i,
      DescriptionArgs: a,
      Level: (e + 1).toString()
    });
  }
  return t;
};
TowerDefenseController.BuildPhantomOtherData = () => {
  var e;
  var n = ModelManager_1.ModelManager.TowerDefenseModel;
  var t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
  var r = n.PhantomConfigCache.get(n.CurrentSelfPhantomIdInUiTemp);
  if (r) {
    t = TowerDefenseController.toa() ? t.GetMatchingId() : t.SelectInstanceId;
    e = TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(t);
    r = {
      NameTextId: r.PhantomNameTextId,
      TypeIconPath: r.TypeIconPath,
      TypeTextId: r.PhantomTypeTextId,
      IsLocked: !e?.OptionalBuff.includes(n.CurrentSelfPhantomIdInUiTemp) ?? true
    };
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TowerDefense", 64, "塔防声骸选择界面杂项数据", ["ITowerDefensePhantomOtherData", r], ["instanceId", t]);
    }
    return r;
  }
};
TowerDefenseController.BuildPhantomIconInBattleData = () => {
  var e = ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentPhantomIdInBattle();
  var e = TowerDefencePhantomById_1.configTowerDefencePhantomById.GetConfig(e)?.PhantomItemId;
  return {
    Type: 3,
    Data: e,
    PhantomId: e
  };
};
TowerDefenseController.BuildPhantomSkillInBattleLayoutData = () => {
  var e;
  var n;
  var t = [];
  var r = ModelManager_1.ModelManager.TowerDefenseModel;
  var o = r.GetCurrentPhantomSkillCfgListInBattle();
  var a = r.GetCurrentPhantomLevelInBattle();
  var i = r.GetCurrentPhantomIdInBattle();
  for ([e, n] of o.entries()) {
    var l = TowerDefenseController.GetPhantomSkillDescriptionByPhantomId(i) ?? n.Description;
    t.push({
      Skill: n.Name,
      Description: l,
      DescriptionArgs: r.GetCurrentPhantomSkillDescriptionArgsInBattle(),
      IsUnlock: a > e
    });
  }
  return t;
};
TowerDefenseController.Bua = (e, n) => {
  e = e.Data;
  n = n.Data;
  if (e.IsLocked === n.IsLocked) {
    return e.ConfigId - n.ConfigId;
  } else if (e.IsLocked) {
    return 1;
  } else {
    return -1;
  }
};
TowerDefenseController.HandleOnClickReward = () => {
  UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", ModelManager_1.ModelManager.TowerDefenseModel.GetPreviewRewardData(), (e, n) => {
    if (UiManager_1.UiManager.IsViewOpen("CommonActivityView")) {
      UiManager_1.UiManager.GetViewByName("CommonActivityView")?.AddChildViewById(n);
    }
  });
};
TowerDefenseController.aZs = () => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("TowerDefense", 64, "当塔防快速选人确定时");
  }
  if (TowerDefenseController.CheckInUiFlow()) {
    TowerDefenseController.Fea();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefensePhantomChanged);
  }
};
TowerDefenseController.hZs = () => {};
TowerDefenseController.lZs = () => {
  if (TowerDefenseController.CheckInInstanceDungeon()) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseShowInBattleView, true);
  }
};
TowerDefenseController._Zs = () => {
  ModelManager_1.ModelManager.TowerDefenseModel.ResetTimerCacheInBattle();
  var e = UiManager_1.UiManager.GetViewByName("BattleView");
  if (e) {
    e.ResetFormationCooldownExternal();
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseShowInBattleView, false);
};
TowerDefenseController.Fil = () => {
  if (TowerDefenseController.CheckInInstanceDungeon()) {
    ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(() => {
      if (UiManager_1.UiManager.IsViewShow("ExploreRewardView")) {
        UiManager_1.UiManager.CloseView("ExploreRewardView");
      }
      ModelManager_1.ModelManager.TowerDefenseModel.ResetAllCache();
    });
  }
};
TowerDefenseController.CZs = e => {
  ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(() => {
    if (UiManager_1.UiManager.IsViewShow("ExploreRewardView")) {
      UiManager_1.UiManager.CloseView("ExploreRewardView");
    }
    ModelManager_1.ModelManager.TowerDefenseModel.ResetAllCache();
  });
};
TowerDefenseController.gZs = e => {
  if (ModelManager_1.ModelManager.TowerDefenseModel.GetOrCreateParsedTowerDefenseMsg().CheckIfClose()) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TowerDefenceActivityEnd");
  } else if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TowerDefense", 64, "奖励结算时，申请多人投票");
    }
    ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.SettleViewButtonSuccessOnMultiCallBack(e);
  } else {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TowerDefense", 64, "奖励结算时，申请单人重进副本");
    }
    ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon().finally(() => {
      if (UiManager_1.UiManager.IsViewShow("ExploreRewardView")) {
        UiManager_1.UiManager.CloseView("ExploreRewardView");
      }
    });
  }
};
TowerDefenseController.mZs = (e, n) => {
  if (TowerDefenseController.CheckInInstanceDungeon() && Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("TowerDefense", 64, "战斗分数", ["scoreId", e], ["scoreValue", n]);
  }
};
TowerDefenseController.WZs = () => {
  if (!TowerDefenseController.CheckInUiFlow()) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TowerDefense", 64, "当前关闭的是副本入口面板，但是该面板不是因为由塔防活动拉起的");
    }
  }
  TowerDefenseController.SetIsUiFlowOpen(false);
};
TowerDefenseController.sZs = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("TowerDefense", 64, "当队伍选人变化时", ["Reason", e]);
  }
  if (TowerDefenseController.CheckInUiFlow()) {
    if (TowerDefenseController.toa()) {
      TowerDefenseController.dZs();
    } else {
      if (e === "单机切换队伍时") {
        ModelManager_1.ModelManager.TowerDefenseModel.RoleCfgId2PhantomIdMapCache.clear();
      }
      TowerDefenseController.Fea();
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefensePhantomChanged);
  }
};
TowerDefenseController.yCa = e => {
  TowerDefenseController.SyncSelfTowerDefensePhantomId(e);
  TowerDefenseController.ResetCurrentTowerDefensePhantomIdInUiTemp();
};
TowerDefenseController.yRa = () => {
  var e;
  if (TowerDefenseController.CheckInInstanceDungeon() && (e = ModelManager_1.ModelManager.TowerDefenseModel).DelayedEndNotify) {
    TowerDefenseController.ERa(e.DelayedEndNotify);
    e.DelayedEndNotify = undefined;
  }
};
TowerDefenseController.IRa = e => {
  if (TowerDefenseController.CheckInUiFlow() && e === "EditBattleTeamView") {
    if (UiManager_1.UiManager.IsViewOpen("TowerDefencePhantomView")) {
      UiManager_1.UiManager.CloseView("TowerDefencePhantomView");
    }
    ModelManager_1.ModelManager.TowerDefenseModel.RoleCfgId2PhantomIdMapCache.clear();
    if (!TowerDefenseController.CheckActivityUnlockByMulti()) {
      TowerDefenseController.SetIsUiFlowOpen(false);
    }
  }
};
TowerDefenseController.y1l = e => {
  ModelManager_1.ModelManager.TowerDefenseModel.SetLevelHasClickByInstanceId(e);
}; //# sourceMappingURL=TowerDefenceController.js.map