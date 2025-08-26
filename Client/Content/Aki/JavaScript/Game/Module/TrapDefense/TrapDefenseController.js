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
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
class TrapDefenseController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(18387, this.K9c);
    Net_1.Net.Register(24157, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "M6u", ["增益Buff全量更新通知", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoBdBuffAllUpdateNotify(e);
    });
    Net_1.Net.Register(16370, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "C6u", ["增益Buff选择通知", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoBdBuffSelectUpdateNotify(e);
    });
    Net_1.Net.Register(28228, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "wad", ["增益Buff获得更新通知", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoBdBuffGetUpdateNotify(e);
    });
    Net_1.Net.Register(28298, this.X9c);
    Net_1.Net.Register(29586, this.Y9c);
    Net_1.Net.Register(27340, this.z9c);
    Net_1.Net.Register(23997, this.J9c);
    Net_1.Net.Register(18449, this.led);
    Net_1.Net.Register(25416, this.__d);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("TrapDefenseBuildingDevelopMainView", TrapDefenseController.Z9c, "TrapDefenseController.CanOpenDevelopView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("TrapDefenseBuildingDevelopMainView", TrapDefenseController.Z9c);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18387);
    Net_1.Net.UnRegister(24157);
    Net_1.Net.UnRegister(16370);
    Net_1.Net.UnRegister(28298);
    Net_1.Net.UnRegister(29586);
    Net_1.Net.UnRegister(27340);
    Net_1.Net.UnRegister(23997);
    Net_1.Net.UnRegister(18449);
    Net_1.Net.UnRegister(25416);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInstanceChange, this.jUc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseInventoryDataUpdate, this.tld);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInstanceChange, this.jUc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseInventoryDataUpdate, this.tld);
  }
  static RequestTrapDefenseUseItem(r) {
    var e = Protocol_1.Aki.Protocol.lzc.create();
    e.oju = r;
    Net_1.Net.Call(18889, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_TrapDefenseItemNotEnough) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("TowerDefenseEvent", 10, "塔防尝试使用道具不足", ["ItemId", r]);
          }
        } else if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25683);
        } else if ((e = ModelManager_1.ModelManager.TrapDefenseModel?.BattleInventoryData.GetItemData(r)) && e.IsUseSkill) {
          ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.PlayerDoSkill(e.SkillIndex);
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
    var e = Protocol_1.Aki.Protocol.o8u.create();
    e.w6n = ModelManager_1.ModelManager.TrapDefenseModel.GetActivityId();
    Net_1.Net.Call(20862, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29792);
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
      TrapDefenseController.eHc(e.DataType, r);
    } else {
      TrapDefenseController.tHc(e.DataType, r);
    }
  }
  static tHc(e, r) {
    var o = Protocol_1.Aki.Protocol.O6u.create();
    o.s5n = e;
    Net_1.Net.Call(23065, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26581);
      } else {
        ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.OnItemUpdate(r);
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TowerDefense_Building_LevelUp");
      }
    });
  }
  static eHc(e, r) {
    var o = Protocol_1.Aki.Protocol.N6u.create();
    o.s5n = e;
    Net_1.Net.Call(15042, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19072);
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
      TrapDefenseController.iHc(e.DataType, r);
    } else {
      TrapDefenseController.rHc(e.DataType, r);
    }
  }
  static rHc(e, r) {
    var o = Protocol_1.Aki.Protocol.e8u.create();
    o.s5n = e;
    Net_1.Net.Call(21208, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16421);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TrapDefense_Building_Reset_Text");
        ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.OnItemUpdate(r);
      }
    });
  }
  static iHc(e, r) {
    var o = Protocol_1.Aki.Protocol.i8u.create();
    o.s5n = e;
    Net_1.Net.Call(28949, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15761);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TrapDefense_Building_Reset_Text");
        ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.OnItemUpdate(r);
      }
    });
  }
  static async RequestTrapDefenseDevelopBranch(e) {
    var r = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(e);
    if (r.MachineType === 2) {
      return TrapDefenseController.oHc(r.DataType, r.Branch, e);
    } else {
      return TrapDefenseController.nHc(r.DataType, r.Branch, e);
    }
  }
  static async nHc(e, r, o) {
    var a = Protocol_1.Aki.Protocol.G6u.create();
    a.s5n = e;
    a.Q7u = r;
    var e = await Net_1.Net.CallAsync(29557, a);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 24315) && (ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.OnItemUpdate(o), true);
  }
  static async oHc(e, r, o) {
    var a = Protocol_1.Aki.Protocol.j6u.create();
    a.s5n = e;
    a.Q7u = r;
    var e = await Net_1.Net.CallAsync(25852, a);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 17118) && (ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.OnItemUpdate(o), true);
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
  static async sHc(e) {
    const r = new CustomPromise_1.CustomPromise();
    this.OpenTrapDefenseCountDownTips(e, () => {
      r.SetResult();
    });
    await r.Promise;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("TowerDefenseEvent", 10, "挑战倒计时结束");
    }
  }
  static async aHc() {
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
  static async hHc(e) {
    await this.sHc(e);
    await this.aHc();
  }
  static async StartChallengeRoundTips() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.PreviewCountDown;
    await ControllerHolder_1.ControllerHolder.TrapDefenseController.hHc(e);
  }
  static RefreshTrapDefenseMainView() {
    var e = UiManager_1.UiManager.GetViewByName("CommonGameMainView");
    if (e &&= e.OpenParam) {
      e.RefreshSelectPanel();
    }
  }
  static async RequestBdBuffSelect(e) {
    var r = Protocol_1.Aki.Protocol.y6u.create();
    r.R7u = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "y6u", ["", r]);
    }
    var e = await Net_1.Net.CallAsync(28838, r);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "S6u", ["", e]);
    }
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 27588);
  }
  static async RequestBdBuffRefresh() {
    var e = Protocol_1.Aki.Protocol.p6u.create();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "p6u", ["", e]);
    }
    var e = await Net_1.Net.CallAsync(23906, e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "v6u", ["", e]);
    }
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 23840) && (ModelManager_1.ModelManager.TrapDefenseModel?.ProtoBdBuffRefreshResponse(e), true);
  }
  static async RequestChallenge(e, r = false) {
    var o = e.Config.InstId;
    var a = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetRoleIdList ?? [];
    var t = new Protocol_1.Aki.Protocol.iku();
    t.v9n = e.Id;
    t.Fid = !r;
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.iku = t;
    ModelManager_1.ModelManager.TrapDefenseModel?.BattleData.SetHasStartAkEvent(false);
    return ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(o, a, 0, 0);
  }
  static async RequestTrapDefenseChallengeQuit(e) {
    var r = Protocol_1.Aki.Protocol.J6u.create();
    r.eou = e;
    var e = await Net_1.Net.CallAsync(28952, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 28682) && (AudioSystem_1.AudioSystem.ExecuteAction("play_2_6_tower_defence_music_ingame", 0), true);
  }
  static async RequestTrapDefenseSlotUpdate(e) {
    var r = Protocol_1.Aki.Protocol._8u.create();
    r.q6n = e;
    var e = await Net_1.Net.CallAsync(29047, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 24403);
  }
  static async RequestTrapDefenseCurChallengeInfo() {
    var e = Protocol_1.Aki.Protocol.nsd.create();
    var e = await Net_1.Net.CallAsync(24252, e);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 28276)) {
      return 0;
    } else {
      return e?.j6n.length ?? 0;
    }
  }
  static async RequestTrapDefenseRewardClaim(e) {
    var r = Protocol_1.Aki.Protocol.x6u.create();
    r.BVn = e;
    var e = await Net_1.Net.CallAsync(20937, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 27969);
  }
  static async RequestTrapDefenseSpecialRewardClaim(e) {
    var r = Protocol_1.Aki.Protocol.B6u.create();
    r.BVn = [e];
    var e = await Net_1.Net.CallAsync(17405, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 28820);
  }
  static async RequestTrapDefenseTechUnlock(e) {
    var r = ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.NodeIdMap.get(e);
    return !!r && !!ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.CanNodeAfford(r) && !((r = Protocol_1.Aki.Protocol.P6u.create()).s5n = e, e = await Net_1.Net.CallAsync(23147, r), ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 16917)) && !(ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrapDefenseTalentNodeUpgradeTips"), 0);
  }
  static async RequestTrapDefenseShopRefresh() {
    var e;
    return !(ModelManager_1.ModelManager.TrapDefenseModel.ShopData.RemainingRefreshCount <= 0) && !(e = Protocol_1.Aki.Protocol.x8u.create(), e = await Net_1.Net.CallAsync(26547, e), ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 16863)) && !(ModelManager_1.ModelManager.TrapDefenseModel.ProtoShopRefreshResponse(e), ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TrapDefenseShopRefreshSuccess"), 0);
  }
  static async RequestTrapDefenseShopPurchase(e, r, o = 1) {
    var a = Protocol_1.Aki.Protocol.B8u.create();
    if (r === 0) {
      a.oju = e;
      a.S9u = "oju";
      a.AYc = o;
    } else if (r === 1) {
      a.lju = e;
      a.S9u = "lju";
      a.AYc = 1;
    }
    var o = await Net_1.Net.CallAsync(20825, a);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(o, 23234) && (o?.Q4n !== undefined && (ModelManager_1.ModelManager.TrapDefenseModel.ProtoShopPurchaseResponse(o.A8s, e), ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TrapDefenseShopPurchaseSuccess")), true);
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
TrapDefenseController.led = e => {
  ModelManager_1.ModelManager.TrapDefenseModel?.BattleInventoryData.UpdateItemData(e.zxs);
};
TrapDefenseController.Z9c = (e, r) => {
  return !r.IsInDungeon || ModelManager_1.ModelManager.TrapDefenseModel.BattleData.IsCanBuildMachine;
};
TrapDefenseController.z9c = e => {
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
TrapDefenseController.J9c = e => {
  if (TrapDefenseController.IsActivityInited) {
    TrapDefenseController.OpenDefenseChallengeResultView(e, false);
  } else {
    TrapDefenseController.ResultNotifyCache = e;
  }
};
TrapDefenseController.X9c = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("TowerDefenseBattle", 10, "怪物连击通知", ["连击数", e.F7u]);
  }
  ModelManager_1.ModelManager.TrapDefenseModel.BattleData.SetComboNum(e.F7u);
};
TrapDefenseController.Y9c = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("TowerDefenseBattle", 10, "怪物波次结束通知", ["倒计时", e.G7u]);
  }
  _a.hHc(e.G7u);
};
TrapDefenseController.K9c = e => {
  ModelManager_1.ModelManager.TrapDefenseModel?.BattleData.SetBehaviorTreeVar(e.U7u);
  ModelManager_1.ModelManager.TrapDefenseModel?.BattleData.SetTechParamMapVar(e.O7u?.C6n);
  ModelManager_1.ModelManager.TrapDefenseModel?.ViewModelBuildingDevelop.InitInBattle(e);
  ModelManager_1.ModelManager.TrapDefenseModel?.BattleInventoryData.UpdateItemData(e.zxs);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseOnSystemInfoNotify);
};
TrapDefenseController.__d = e => {
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
TrapDefenseController.tld = () => {
  ModelManager_1.ModelManager.TrapDefenseModel.BattleData.RefreshExploreSkillData();
}; //# sourceMappingURL=TrapDefenseController.js.map