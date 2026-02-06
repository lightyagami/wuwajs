"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiTimeDilation_1 = require("../../Ui/Base/UiTimeDilation");
const UiManager_1 = require("../../Ui/UiManager");
class ShipTowerController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(24188, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ShipTower", 69, "My_", ["割草爬塔活动副本积分结算推送", e]);
      }
      UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag("ShipTower");
      ModelManager_1.ModelManager.ShipTowerModel.UpdateResultNotify(e);
    });
    Net_1.Net.Register(21450, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ShipTower", 69, "Ey_", ["割草爬塔关卡信息更新", e]);
      }
      ModelManager_1.ModelManager.ShipTowerModel.UpdateLevelPlayNotify(e);
    });
    Net_1.Net.Register(26199, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ShipTower", 69, "_O1", ["割草爬塔局内周期更新推送", e]);
      }
      ModelManager_1.ModelManager.ShipTowerModel.UpdateSeasonNotify(e);
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24188);
    Net_1.Net.UnRegister(21450);
    Net_1.Net.UnRegister(26199);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.Jn_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItemList, this.PG_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.m7_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CrossDay, this.Wjd);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.Jn_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemList, this.PG_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.m7_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CrossDay, this.Wjd);
  }
  static RequestChallenge(e, o = false, r = false) {
    var t = e.TeamDataList[0];
    var n = e.TeamDataList[1];
    var a = new Protocol_1.Aki.Protocol.Yn_();
    a.ELl = e.Id;
    a.TLl = e.GetAllTeamBuffIdList();
    a.LLl = n.GetRoleIdListEdit();
    a.xQ_ = r;
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Yn_ = a;
    var e = (o ? n : t).GetRoleIdListEdit();
    var r = (o ? n : t).InstId;
    ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(r, e, 0, 0);
  }
  static async SlashAndTowerInfoRequest() {
    var e = Protocol_1.Aki.Protocol.Cy_.create();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "Cy_");
    }
    var e = await Net_1.Net.CallAsync(24721, e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "gy_", ["", e]);
    }
    ModelManager_1.ModelManager.ShipTowerModel.SlashAndTowerInfoResponse(e);
  }
  static async SlashAndTowerScoreRewardRequest(e, o) {
    var r = new Protocol_1.Aki.Protocol.py_();
    r.s5n = e;
    r.cOl = o;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "py_", ["", r]);
    }
    var e = await Net_1.Net.CallAsync(16527, r);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "vy_", ["", e]);
    }
    ModelManager_1.ModelManager.ShipTowerModel.SlashAndTowerScoreRewardResponse(e);
  }
  static async EndLessHistoryRequest() {
    var e = Protocol_1.Aki.Protocol.yy_.create();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "yy_");
    }
    var e = await Net_1.Net.CallAsync(20664, e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "Sy_", ["", e]);
    }
    ModelManager_1.ModelManager.ShipTowerModel.EndLessHistoryResponse(e);
  }
  static async SlashAndTowerSaveRecordRequest(e) {
    var o = new Protocol_1.Aki.Protocol.Iy_();
    o.s5n = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "Iy_", ["", o]);
    }
    var o = await Net_1.Net.CallAsync(15111, o);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "Ty_", ["", o]);
    }
    ModelManager_1.ModelManager.ShipTowerModel.SlashAndTowerSaveRecordResponse(e, o);
  }
  static async SlashAndTowerResetRequest(e) {
    var o = new Protocol_1.Aki.Protocol.by_();
    o.s5n = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "by_", ["", o]);
    }
    var o = await Net_1.Net.CallAsync(25424, o);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "Ly_", ["", o]);
    }
    ModelManager_1.ModelManager.ShipTowerModel.SlashAndTowerResetResponse(e, o);
  }
  static async SlashAndTowerRecommendRequest(e) {
    var o = new Protocol_1.Aki.Protocol.wy_();
    o.s5n = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "wy_", ["", o]);
    }
    var o = await Net_1.Net.CallAsync(27255, o);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "Ry_", ["", o]);
    }
    ModelManager_1.ModelManager.ShipTowerModel.SlashAndTowerRecommendResponse(e, o);
  }
  static async SlashAndTowerReviewRequest() {
    var e = Protocol_1.Aki.Protocol.lG_.create();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "lG_");
    }
    var e = await Net_1.Net.CallAsync(18902, e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "_G_", ["", e]);
    }
    ModelManager_1.ModelManager.ShipTowerModel.SlashAndTowerReviewResponse(e);
  }
}
(exports.ShipTowerController = ShipTowerController).Jn_ = () => {
  if (ModelManager_1.ModelManager.ShipTowerModel.CheckInBattleShipTower()) {
    UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag("ShipTower");
  }
  ModelManager_1.ModelManager.ShipTowerModel.CheckInitProto(true);
};
ShipTowerController.Wjd = () => {
  ModelManager_1.ModelManager.ShipTowerModel.CheckInitProto(true);
};
ShipTowerController.PG_ = e => {
  e.forEach(e => {
    var e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.s5n);
    if (e?.ItemType === 60005 && (e = ConfigManager_1.ConfigManager.ShipTowerConfig.GetBuffCfgByItemIdList(e.Id)?.filter(e => !ModelManager_1.ModelManager.ShipTowerModel.IsOldSeason(e.Season))[0])) {
      ModelManager_1.ModelManager.ShipTowerModel.AddShowBuffId(e.Id, e.Tips === 1);
    }
  });
  if (UiManager_1.UiManager.IsViewOpen("ShipTowerView")) {
    ModelManager_1.ModelManager.ShipTowerModel.CheckShowGetBuff();
  }
};
ShipTowerController.m7_ = (e, o) => {
  if (o && e === 10081) {
    ModelManager_1.ModelManager.ShipTowerModel.CheckInitProto(false);
  }
}; //# sourceMappingURL=ShipTowerController.js.map