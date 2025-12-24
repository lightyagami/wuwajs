"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseController = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TDPlayerController_1 = require("../../KuroSimpleCombat/TD/TDPlayer/TDPlayerController");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
class TrapDefenseController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(21979, this.c9u);
    Net_1.Net.Register(27088, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "L7u", ["增益Buff全量更新通知", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoBdBuffAllUpdateNotify(e);
    });
    Net_1.Net.Register(19835, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "I7u", ["增益Buff选择通知", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoBdBuffSelectUpdateNotify(e);
    });
    Net_1.Net.Register(25335, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "Wud", ["增益Buff获得更新通知", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoBdBuffGetUpdateNotify(e);
    });
    Net_1.Net.Register(20478, this.KHc);
    Net_1.Net.Register(19750, this.XHc);
    Net_1.Net.Register(22576, this.WYc);
    Net_1.Net.Register(24676, this.QYc);
    Net_1.Net.Register(26413, this.gid);
    Net_1.Net.Register(19536, this.U0d);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("TrapDefenseBuildingDevelopMainView", TrapDefenseController.tJc, "TrapDefenseController.CanOpenDevelopView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("TrapDefenseBuildingDevelopMainView", TrapDefenseController.tJc);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21979);
    Net_1.Net.UnRegister(27088);
    Net_1.Net.UnRegister(19835);
    Net_1.Net.UnRegister(20478);
    Net_1.Net.UnRegister(19750);
    Net_1.Net.UnRegister(22576);
    Net_1.Net.UnRegister(24676);
    Net_1.Net.UnRegister(26413);
    Net_1.Net.UnRegister(19536);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInstanceChange, this.jUc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseInventoryDataUpdate, this.emd);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInstanceChange, this.jUc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseInventoryDataUpdate, this.emd);
  }
  static RequestTrapDefenseUseItem(r) {
    var e = Protocol_1.Aki.Protocol.dZc.create();
    e.bzc = r;
    Net_1.Net.Call(20144, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_TrapDefenseItemNotEnough) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("TowerDefenseEvent", 10, "塔防尝试使用道具不足", ["ItemId", r]);
          }
        } else if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25892);
        } else if ((e = ModelManager_1.ModelManager.TrapDefenseModel?.BattleInventoryData.GetItemData(r)) && e.IsUseSkill) {
          TDPlayerController_1.TowerDefensePlayerController.PlayerDoSkill(e.SkillIndex);
          ModelManager_1.ModelManager.TrapDefenseModel?.BattleData.RefreshExploreSkillData();
        }
      }
    });
  }
  static OpenOrganDevelop(e, o, r = 0, a = undefined) {
    e = {
      IsInDungeon: e,
      SelectedIndex: r,
      LevelData: a
    };
    UiManager_1.UiManager.OpenView("TrapDefenseBuildingDevelopMainView", e, (e, r) => {
      if (e && o) {
        o.AddChildViewById(r);
      }
    });
  }
  static RequestTrapDefenseDevelopReset() {
    var e = Protocol_1.Aki.Protocol.iHc.create();
    e.w6n = ModelManager_1.ModelManager.TrapDefenseModel.GetActivityId();
    Net_1.Net.Call(29418, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27603);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TrapDefense_Building_Reset_Text");
        ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.ResetAllOrgan();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseOnDevelopResetAll);
      }
    });
  }
  static RequestTrapDefenseDevelopLevelUp(e) {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(e);
    var r = {
      MachineType: e.MachineType,
      DataType: e.DataType,
      Level: e.Level + 1,
      Branch: e.Branch
    };
    var r = ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(r);
    if (e.MachineType === 2) {
      TrapDefenseController.KYc(e.DataType, r);
    } else {
      TrapDefenseController.XYc(e.DataType, r);
    }
  }
  static XYc(e, r) {
    var o = Protocol_1.Aki.Protocol.N9c.create();
    o.s5n = e;
    Net_1.Net.Call(23296, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20632);
      } else {
        ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.OnItemUpdate(r);
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TowerDefense_Building_LevelUp");
      }
    });
  }
  static KYc(e, r) {
    var o = Protocol_1.Aki.Protocol.$9c.create();
    o.s5n = e;
    Net_1.Net.Call(23602, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25199);
      } else {
        ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.OnItemUpdate(r);
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TowerDefense_Building_LevelUp");
      }
    });
  }
  static RequestTrapDefenseDevelopResetOne(e) {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(e);
    var r = {
      MachineType: e.MachineType,
      DataType: e.DataType,
      Level: 1,
      Branch: 0
    };
    var r = ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(r);
    if (e.MachineType === 2) {
      TrapDefenseController.YYc(e.DataType, r);
    } else {
      TrapDefenseController.zYc(e.DataType, r);
    }
  }
  static zYc(e, r) {
    var o = Protocol_1.Aki.Protocol.J9c.create();
    o.s5n = e;
    Net_1.Net.Call(22941, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26172);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TrapDefense_Building_Reset_Text");
        ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.OnItemUpdate(r);
      }
    });
  }
  static YYc(e, r) {
    var o = Protocol_1.Aki.Protocol.eHc.create();
    o.s5n = e;
    Net_1.Net.Call(16339, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27980);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TrapDefense_Building_Reset_Text");
        ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.OnItemUpdate(r);
      }
    });
  }
  static async RequestTrapDefenseDevelopBranch(e) {
    var r = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(e);
    if (r.MachineType === 2) {
      return TrapDefenseController.JYc(r.DataType, r.Branch, e);
    } else {
      return TrapDefenseController.ZYc(r.DataType, r.Branch, e);
    }
  }
  static async ZYc(e, r, o) {
    var a = Protocol_1.Aki.Protocol.j9c.create();
    a.s5n = e;
    a.yHc = r;
    var e = await Net_1.Net.CallAsync(21517, a);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 15242) && (ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.OnItemUpdate(o), true);
  }
  static async JYc(e, r, o) {
    var a = Protocol_1.Aki.Protocol.Q9c.create();
    a.s5n = e;
    a.yHc = r;
    var e = await Net_1.Net.CallAsync(26799, a);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 15530) && (ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.OnItemUpdate(o), true);
  }
  static OpenPauseView() {
    UiManager_1.UiManager.OpenView("TrapDefensePauseView");
  }
  static OpenTrapDefenseShopOpenTips(e) {
    e = {
      Callback: e
    };
    UiManager_1.UiManager.OpenView("TrapDefenseEventShopOpenTips", e);
  }
  static async OpenTrapDefenseTerrainChangeTips(e) {
    e = {
      Callback: e
    };
    return (await UiManager_1.UiManager.OpenViewAsync("TrapDefenseEventTerrainChangeTips", e)) !== undefined;
  }
  static async OpenTrapDefenseBossComingTips(e) {
    e = {
      Callback: e
    };
    return (await UiManager_1.UiManager.OpenViewAsync("TrapDefenseEventBossComingTips", e)) !== undefined;
  }
  static OpenTrapDefenseRoundTips(e, r) {
    e = {
      Round: e,
      Callback: r
    };
    UiManager_1.UiManager.OpenView("TrapDefenseRoundTips", e);
  }
  static OpenTrapDefenseCountDownTips(e, r) {
    e = {
      CountDownTime: e,
      Callback: r
    };
    UiManager_1.UiManager.OpenView("TrapDefenseCountDownTips", e);
  }
  static async Gzu(e) {
    const r = new CustomPromise_1.CustomPromise();
    this.OpenTrapDefenseCountDownTips(e, () => {
      r.SetResult();
    });
    await r.Promise;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("TowerDefenseEvent", 10, "挑战倒计时结束");
    }
  }
  static async Fzu() {
    const e = new CustomPromise_1.CustomPromise();
    var r = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetBatch();
    this.OpenTrapDefenseRoundTips(r, () => {
      e.SetResult();
    });
    await e.Promise;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("TowerDefenseEvent", 10, "波次提醒结束");
    }
  }
  static async YHc(e) {
    await this.Gzu(e);
    await this.Fzu();
  }
  static async StartChallengeRoundTips() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.PreviewCountDown;
    await ControllerHolder_1.ControllerHolder.TrapDefenseController.YHc(e);
  }
  static RefreshTrapDefenseMainView() {
    var e = UiManager_1.UiManager.GetViewByName("CommonGameMainView");
    if (e &&= e.OpenParam) {
      e.RefreshSelectPanel();
    }
  }
  static async RequestBdBuffSelect(e) {
    var r = Protocol_1.Aki.Protocol.R7u.create();
    r.P7u = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "R7u", ["", r]);
    }
    var e = await Net_1.Net.CallAsync(29259, r);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "w7u", ["", e]);
    }
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 16243);
  }
  static async RequestBdBuffRefresh() {
    var e = Protocol_1.Aki.Protocol.T7u.create();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "T7u", ["", e]);
    }
    var e = await Net_1.Net.CallAsync(25528, e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "b7u", ["", e]);
    }
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 20036) && (ModelManager_1.ModelManager.TrapDefenseModel?.ProtoBdBuffRefreshResponse(e), true);
  }
  static async RequestChallenge(e, r = false) {
    var o = e.Config.InstId;
    var a = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetRoleIdList ?? [];
    var t = new Protocol_1.Aki.Protocol.BVu();
    t.v9n = e.Id;
    t.Wod = !r;
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.BVu = t;
    ModelManager_1.ModelManager.TrapDefenseModel?.BattleData.SetHasStartAkEvent(false);
    return ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(o, a, 0, 0);
  }
  static async RequestTrapDefenseChallengeQuit(e) {
    var r = Protocol_1.Aki.Protocol.Y9c.create();
    AudioSystem_1.AudioSystem.ExecuteAction("play_2_6_tower_defence_music_ingame", 0);
    r.eou = e;
    var e = await Net_1.Net.CallAsync(29613, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 19334);
  }
  static async RequestTrapDefenseSlotUpdate(e) {
    var r = Protocol_1.Aki.Protocol.sHc.create();
    r.q6n = e;
    var e = await Net_1.Net.CallAsync(25493, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 23525);
  }
  static async RequestTrapDefenseCurChallengeInfo() {
    var e = Protocol_1.Aki.Protocol.qld.create();
    var e = await Net_1.Net.CallAsync(16826, e);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 22851)) {
      return 0;
    } else {
      return e?.j6n.length ?? 0;
    }
  }
  static async RequestTrapDefenseRewardClaim(e) {
    var r = Protocol_1.Aki.Protocol.O9c.create();
    r.BVn = e;
    var e = await Net_1.Net.CallAsync(26701, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 20912);
  }
  static async RequestTrapDefenseSpecialRewardClaim(e) {
    var r = Protocol_1.Aki.Protocol.G9c.create();
    r.BVn = [e];
    var e = await Net_1.Net.CallAsync(28289, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 29143);
  }
  static async RequestTrapDefenseTechUnlock(e) {
    var r = ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.NodeIdMap.get(e);
    return !!r && !!ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.CanNodeAfford(r) && !((r = Protocol_1.Aki.Protocol.B9c.create()).s5n = e, e = await Net_1.Net.CallAsync(19019, r), ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 16246)) && !(ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrapDefenseTalentNodeUpgradeTips"), 0);
  }
  static async RequestTrapDefenseShopRefresh() {
    var e;
    return !(ModelManager_1.ModelManager.TrapDefenseModel.ShopData.RemainingRefreshCount <= 0) && !(e = Protocol_1.Aki.Protocol.fzc.create(), e = await Net_1.Net.CallAsync(17653, e), ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 26078)) && !(ModelManager_1.ModelManager.TrapDefenseModel.ProtoShopRefreshResponse(e), ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TrapDefenseShopRefreshSuccess"), 0);
  }
  static async RequestTrapDefenseShopPurchase(e, r, o = 1) {
    var a = Protocol_1.Aki.Protocol.Czc.create();
    if (r === 0) {
      a.bzc = e;
      a.Nzc = "bzc";
      a.PJc = o;
    } else if (r === 1) {
      a.Pzc = e;
      a.Nzc = "Pzc";
      a.PJc = 1;
    }
    var o = await Net_1.Net.CallAsync(25363, a);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(o, 29867) && (o?.Q4n !== undefined && (ModelManager_1.ModelManager.TrapDefenseModel.ProtoShopPurchaseResponse(o.A8s, e), ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TrapDefenseShopPurchaseSuccess")), true);
  }
  static UpdateEnemyPositions() {
    var e = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.GetEntityPositions();
    ModelManager_1.ModelManager.TrapDefenseModel.MapData.UpdateEnemyPositions(e ?? []);
  }
  static ChangeMap(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TowerDefenseEvent", 86, "TrapDefenseController:ChangeMap", ["mapId: ", e]);
    }
    ModelManager_1.ModelManager.TrapDefenseModel.MapData.ChangeMap(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseMapChanged, e);
  }
}
exports.TrapDefenseController = TrapDefenseController;
(_a = TrapDefenseController).ResultNotifyCache = undefined;
TrapDefenseController.IsActivityInited = false;
TrapDefenseController.gid = e => {
  ModelManager_1.ModelManager.TrapDefenseModel?.BattleInventoryData.UpdateItemData(e.zxs);
};
TrapDefenseController.tJc = (e, r) => {
  return !r.IsInDungeon || ModelManager_1.ModelManager.TrapDefenseModel.BattleData.IsCanBuildMachine;
};
TrapDefenseController.WYc = e => {
  ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.UpdateDevelopInfo(e);
};
TrapDefenseController.OpenDefenseChallengeResultView = (e, r) => {
  e = {
    Notify: e,
    NeedShowViewAnim: r
  };
  AudioSystem_1.AudioSystem.ExecuteAction("play_2_6_tower_defence_music_ingame", 0);
  UiManager_1.UiManager.OpenView("TrapDefenseResultView", e);
};
TrapDefenseController.QYc = e => {
  if (TrapDefenseController.IsActivityInited) {
    TrapDefenseController.OpenDefenseChallengeResultView(e, false);
  } else {
    TrapDefenseController.ResultNotifyCache = e;
  }
};
TrapDefenseController.KHc = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("TowerDefenseBattle", 10, "怪物连击通知", ["连击数", e.pjc]);
  }
  ModelManager_1.ModelManager.TrapDefenseModel.BattleData.SetComboNum(e.pjc);
};
TrapDefenseController.XHc = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("TowerDefenseBattle", 10, "怪物波次结束通知", ["倒计时", e.Cjc]);
  }
  _a.YHc(e.Cjc);
};
TrapDefenseController.c9u = e => {
  ModelManager_1.ModelManager.TrapDefenseModel?.BattleData.SetBehaviorTreeVar(e.i9u);
  ModelManager_1.ModelManager.TrapDefenseModel?.BattleData.SetTechParamMapVar(e.fHc?.C6n);
  ModelManager_1.ModelManager.TrapDefenseModel?.ViewModelBuildingDevelop.InitInBattle(e);
  ModelManager_1.ModelManager.TrapDefenseModel?.BattleInventoryData.UpdateItemData(e.zxs);
  if (e.Psm) {
    _a.ChangeMap(e.Psm);
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseOnSystemInfoNotify);
};
TrapDefenseController.U0d = e => {
  e = e.DEs;
  ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.UploadSlotChangeByNotify(e);
};
TrapDefenseController.jUc = (e, r) => {
  r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(r);
  if (r && r.InstSubType === 37) {
    ControllerHolder_1.ControllerHolder.SkillButtonUiController.AddEventInterface(ModelManager_1.ModelManager.TrapDefenseModel.BattleData);
  } else {
    ControllerHolder_1.ControllerHolder.SkillButtonUiController.RemoveEventInterface(ModelManager_1.ModelManager.TrapDefenseModel.BattleData);
  }
};
TrapDefenseController.emd = () => {
  ModelManager_1.ModelManager.TrapDefenseModel.BattleData.RefreshExploreSkillData();
}; //# sourceMappingURL=TrapDefenseController.js.map