"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingTowerController = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ItemRewardController_1 = require("../../../ItemReward/ItemRewardController");
const ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const MowingTowerData_1 = require("./MowingTowerData");
const MowingTowerSubView_1 = require("./MowingTowerSubView");
const SENDCD = 1000;
const BUFF_IS_NOT_VAILD = "ErrorCode_2500057_Text";
class MowingTowerController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.fSn = () => {
      var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      if (ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 24) {
        MowingTowerController.RequestSettlement();
      }
    };
    this.yLl = e => {
      var o = ConfigManager_1.ConfigManager.MowingTowerConfig.GetBossMowingTowerConfigById(e.jM_[0].ELl).ActivityId;
      var r = ModelManager_1.ModelManager.ActivityModel.GetActivityById(o);
      r.PhraseLevelInfo(e.jM_);
      r.PhraseRewardInfo(e.jM_);
      r.CheckIfNewMowingTowerOpen();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMowingTowerData);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMowingTowerRewardRedDot, o);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, o);
    };
    this.OnMowTowerFirstScoreNotify = () => {};
    this.vSn = e => {
      var o = this.ESn(ItemRewardDefine_1.BOSS_RUSH_SUCCESS, true, () => {}, e);
      var r = ConfigManager_1.ConfigManager.MowingTowerConfig.GetBossMowingTowerConfigById(e.ELl)?.IsInfinite;
      var t = [];
      var n = {
        Target: e.GM_.toString(),
        DescriptionTextId: "BossRushMonsterScoreTips",
        Belong: 0
      };
      t.push(n);
      if (!r) {
        n = {
          Target: e.FM_.toString(),
          DescriptionTextId: "BossRushTimeScoreTips",
          Belong: 0
        };
        t.push(n);
      }
      var n = {
        Target: e.NM_.toString(),
        DescriptionTextId: "BossRushMonsterScoreTips",
        Belong: 1
      };
      t.push(n);
      if (!r) {
        n = {
          Target: e.VM_.toString(),
          DescriptionTextId: "BossRushTimeScoreTips",
          Belong: 1
        };
        t.push(n);
      }
      var r = e.GM_ + e.FM_ + e.NM_ + e.VM_;
      var n = r > e.AMs;
      o.SetHalfAreaData({
        ItemList: t,
        IfNewRecord: n,
        FullScore: r
      });
      ItemRewardController_1.ItemRewardController.Open(o);
    };
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityMowingTower";
  }
  OnCreateSubPageComponent(e) {
    return new MowingTowerSubView_1.MowingTowerSubView();
  }
  OnCreateActivityData(e) {
    return new MowingTowerData_1.MowingTowerData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnInit() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("MowingTowerMainView", MowingTowerController.CheckCanOpen, "MowingTowerController.CheckCanOpen");
    return true;
  }
  OnClear() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("MowingTowerMainView", MowingTowerController.CheckCanOpen);
    return true;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(18291, this.vSn);
    Net_1.Net.Register(23417, this.yLl);
    Net_1.Net.Register(26494, this.OnMowTowerFirstScoreNotify);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18291);
    Net_1.Net.UnRegister(23417);
    Net_1.Net.UnRegister(26494);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeonConfirm, this.fSn);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeonConfirm, this.fSn);
  }
  ESn(e, o, r, t) {
    var n = [];
    n.push({
      ButtonTextId: "Text_ButtonTextConfirmResult_Text",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: true,
      IsClickedCloseView: false,
      OnClickedCallback: () => {
        MowingTowerController.OpenDefaultMowingTowerView().then(e => {
          if (!e) {
            ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
          }
        });
      }
    });
    var i = t.AMs > 0;
    n.push({
      ButtonTextId: "Text_ButtonTextChallengeOneMore_Text",
      DescriptionTextId: i ? "BossRushCurrentHighScore" : undefined,
      DescriptionArgs: [t.AMs],
      IsTimeDownCloseView: false,
      IsClickedCloseView: false,
      OnClickedCallback: () => {
        var e = ConfigManager_1.ConfigManager.MowingTowerConfig.GetBossMowingTowerConfigById(t.ELl).ActivityId;
        var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e).GetMowingTowerLevelDetailInfoById(t.ELl);
        MowingTowerController.RequestStartMowingTowerByTeamData(e.ConvertToTeamInfo());
      }
    });
    ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
    var i = ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreRewardDataFromConfig(e, o, undefined, undefined, undefined, n, undefined, undefined, r, undefined);
    return i;
  }
  static RequestStartMowingTowerByTeamData(e) {
    var o = [];
    for (const a of e.GetPrepareSelectBuff()) {
      var r = new Protocol_1.Aki.Protocol.Dks();
      r.b6n = a.BuffId;
      r.q6n = a.Slot;
      o.push(r);
    }
    var t = e.GetCurrentTeamMembers();
    var n = t[0];
    var t = t[1];
    var i = e.ActivityId;
    this.RequestStartMowingTower(i, e.GetCurrentSelectLevel().GetInstanceDungeonId(), e.GetCurrentSelectLevel().GetId(), o, n, t);
  }
  static RequestStartMowingTower(e, o, r, t, n, i) {
    if (MowingTowerController.ILl !== 0 && Time_1.Time.Now - MowingTowerController.ILl <= SENDCD) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Activity", 5, "发送协议太快");
      }
      return;
    }
    this.ILl = Time_1.Time.Now;
    var a = [];
    for (const s of t) {
      if (s.b6n === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(BUFF_IS_NOT_VAILD);
        return;
      }
      a.push(s.b6n);
    }
    var l = [];
    for (const _ of i) {
      if (_ !== 0) {
        l.push(_);
      }
    }
    t = {
      TLl: a,
      ELl: r,
      LLl: l
    };
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.RLl = t;
    ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(o, n, 0, 0);
  }
  static RequestSettlement() {
    Net_1.Net.Call(27212, new Protocol_1.Aki.Protocol.Wg_(), e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20808);
      }
    });
  }
  static RequestGetMowingTowerLevelReward(o, e, r, t) {
    var n = new Protocol_1.Aki.Protocol.Yg_();
    n.N6n = e;
    Net_1.Net.Call(16278, n, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23071);
      }
      ModelManager_1.ModelManager.ActivityModel.GetActivityById(o).SetRewardStateClaimed(r, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMowingTowerReward);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMowingTowerRewardRedDot, o);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, o);
    });
  }
  static async OpenDefaultMowingTowerView() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values()) {
      if (e instanceof MowingTowerData_1.MowingTowerData && e.CheckIfInOpenTime()) {
        return this.OpenMowingTowerView(e.Id);
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Activity", 5, "找不到MowingTower活动");
    }
    return false;
  }
  static async OpenMowingTowerView(e) {
    var o = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    o.CacheCurrentOpenBossNum();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, o.Id);
    const r = new CustomPromise_1.CustomPromise();
    UiManager_1.UiManager.OpenView("MowingTowerMainView", e, e => {
      r.SetResult(e);
    });
    return r.Promise;
  }
}
(exports.MowingTowerController = MowingTowerController).ILl = 0;
MowingTowerController.CheckCanOpen = () => !ModelManager_1.ModelManager.GameModeModel?.IsMulti || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("MowingTowerMultiTips"), false); //# sourceMappingURL=MowingTowerController.js.map