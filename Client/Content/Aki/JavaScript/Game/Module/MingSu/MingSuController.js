"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MingSuController = undefined;
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
const ItemRewardController_1 = require("../ItemReward/ItemRewardController");
const MingSuDefine_1 = require("./MingSuDefine");
class MingSuController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished, this.Lbi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAntiqueShopLevelMaxSequenceFinished, this.NGn);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished, this.Lbi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAntiqueShopLevelMaxSequenceFinished, this.NGn);
  }
  static OpenView(e, n) {
    var o = ConfigManager_1.ConfigManager.CollectItemConfig.GetDragonPoolConfigById(e);
    if (!o) {
      return false;
    }
    const r = ModelManager_1.ModelManager.MingSuModel;
    r.SetCurrentDragonPoolId(e);
    r.SetCollectItemConfigId(o.CoreId);
    if (e === MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID) {
      MingSuController.SendOpenDarkCoastDeliveryRequest(e, () => {
        UiManager_1.UiManager.OpenView("DarkCoastDeliveryMainView", r.GetDragonPoolInstanceById(e), n);
      });
    } else {
      MingSuController.SendOpenDragonPoolRequest(e, () => {
        switch (e) {
          case MingSuDefine_1.MING_SU_POOL_CONFIG_ID:
            UiManager_1.UiManager.OpenView("MingSuView", undefined, n);
            break;
          case MingSuDefine_1.CHENG_XIAO_SHAN_POOL_CONFIG_ID:
            UiManager_1.UiManager.OpenView("CollectItemView", undefined, n);
            break;
          case MingSuDefine_1.PUPU_VILLAGE_POOL_CONFIG_ID:
            UiManager_1.UiManager.OpenView("PupuVillageItemView", undefined, n);
            break;
          case MingSuDefine_1.PUPU_VILLAGE_QIQIU_POOL_CONFIG_ID:
            UiManager_1.UiManager.OpenView("PupuVillageItemViewQIQIU", undefined, n);
            break;
          case MingSuDefine_1.LAHAILUOSHENGXIA_POOL_CONFIG_ID:
          case MingSuDefine_1.RILINGCOLLECT_POOL_CONFIG_ID:
            UiManager_1.UiManager.OpenView("LaHaiLuoCollectView", undefined, n);
        }
      });
    }
    return true;
  }
  static SendOpenDragonPoolRequest(e, n) {
    var o = new Protocol_1.Aki.Protocol.Chs();
    o.k7n = e;
    Net_1.Net.Call(18162, Protocol_1.Aki.Protocol.Chs.create(o), e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolDropItems(e.jE_);
          if (n) {
            n();
          }
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27502);
        }
      }
    });
  }
  static SendOpenDarkCoastDeliveryRequest(n, o) {
    var e = new Protocol_1.Aki.Protocol.Nf_();
    e.k7n = n;
    Net_1.Net.Call(15837, Protocol_1.Aki.Protocol.Nf_.create(e), e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolDropItems(e.jE_);
          ModelManager_1.ModelManager.MingSuModel.RefreshDarkCoastGuardInfo(n, e.$E_, e.WE_);
          ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolLevelGains(n, e.HE_);
          if (o) {
            o();
          }
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25900);
        }
      }
    });
  }
  static async SendDarkCoastDeliveryRequestAsync() {
    var e = new Protocol_1.Aki.Protocol.Nf_();
    e.k7n = MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID;
    var e = await Net_1.Net.CallAsync(15837, Protocol_1.Aki.Protocol.Nf_.create(e));
    if (e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
      ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolDropItems(e.jE_);
      ModelManager_1.ModelManager.MingSuModel.RefreshDarkCoastGuardInfo(MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID, e.$E_, e.WE_);
      ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolLevelGains(MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID, e.HE_);
    }
  }
  static SendHandInMingSuRequest(a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("MingSuTi", 58, "HandInMingSuRequest", ["dragonPoolId", a]);
    }
    var e = new Protocol_1.Aki.Protocol.uhs();
    e.k7n = a;
    e.AVn = ModelManager_1.ModelManager.MingSuModel.CurrentInteractCreatureDataLongId;
    Net_1.Net.Call(25429, Protocol_1.Aki.Protocol.uhs.create(e), e => {
      var n;
      var o;
      var r;
      if (e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("MingSuTi", 58, "[CollectionItemDisplay]HandInMingSuResponse", ["dragonPoolId", a], ["提交数量", e.KSs], ["提交后的等级", e.F6n], ["提交后已领取的等级", e.HE_]);
        }
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (r = ModelManager_1.ModelManager.MingSuModel.GetDragonPoolInstanceById(e.k7n)) {
            n = e.F6n;
            o = r.GetDragonPoolLevel();
            r = r.GetDragonPoolMaxLevel();
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("MingSuTi", 58, "[CollectionItemDisplay]广播等级提升事件", ["dragonPoolId", a], ["currentLevel", o], ["newLevel", n], ["maxLevel", r]);
            }
            if (r <= n) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("MingSuTi", 58, "[CollectionItemDisplay]当提交物品等级升至满级时", ["dragonPoolId", a]);
              }
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSubmitItemLevelMax);
            } else if (o < n) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("MingSuTi", 58, "[CollectionItemDisplay]当提交物品等级提升时", ["dragonPoolId", a]);
              }
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSubmitItemLevelUp);
            } else {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("MingSuTi", 58, "[CollectionItemDisplay]当提交物品成功时", ["dragonPoolId", a]);
              }
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSubmitItemSuccess);
            }
          }
          ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolActiveStatus(e.k7n, e.HE_);
          ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolLevel(e.k7n, e.F6n);
          ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolHadCoreCount(e.k7n, e.KSs);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateDragonPoolView);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26651);
          ItemRewardController_1.ItemRewardController.Close();
        }
      }
    });
  }
  static SendMingSuHandRewardRequest(o) {
    var e = new Protocol_1.Aki.Protocol.Lf_();
    e.k7n = o;
    e.AVn = ModelManager_1.ModelManager.MingSuModel.CurrentInteractCreatureDataLongId;
    Net_1.Net.Call(23649, Protocol_1.Aki.Protocol.Lf_.create(e), e => {
      var n;
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolLevelGains(o, e.HE_);
          n = ModelManager_1.ModelManager.MingSuModel.GetDragonPoolInstanceById(o).GetActivityRewardViewData();
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, n);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21687);
        }
      }
    });
  }
}
(exports.MingSuController = MingSuController).Lbi = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("MingSuTi", 58, "[CollectionItemDisplay]当提交物品等级提升时,开始打开结算界面", ["CurrentDragonPoolId", ModelManager_1.ModelManager.MingSuModel.GetCurrentDragonPoolId()]);
  }
  switch (ModelManager_1.ModelManager.MingSuModel.GetCurrentDragonPoolId()) {
    case MingSuDefine_1.MING_SU_POOL_CONFIG_ID:
      ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2006, true);
      break;
    case MingSuDefine_1.PUPU_VILLAGE_POOL_CONFIG_ID:
    case MingSuDefine_1.PUPU_VILLAGE_QIQIU_POOL_CONFIG_ID:
      ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2008, true);
      break;
    case MingSuDefine_1.CHENG_XIAO_SHAN_POOL_CONFIG_ID:
      ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2007, true);
      break;
    case MingSuDefine_1.LAHAILUOSHENGXIA_POOL_CONFIG_ID:
      ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2009, true);
      break;
    case MingSuDefine_1.RILINGCOLLECT_POOL_CONFIG_ID:
      ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2010, true);
  }
};
MingSuController.NGn = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("MingSuTi", 58, "[CollectionItemDisplay]当提交物品等级升至满级时,开始打开结算界面", ["CurrentDragonPoolId", ModelManager_1.ModelManager.MingSuModel.GetCurrentDragonPoolId()]);
  }
  switch (ModelManager_1.ModelManager.MingSuModel.GetCurrentDragonPoolId()) {
    case MingSuDefine_1.MING_SU_POOL_CONFIG_ID:
      ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2006, true);
      break;
    case MingSuDefine_1.PUPU_VILLAGE_POOL_CONFIG_ID:
    case MingSuDefine_1.PUPU_VILLAGE_QIQIU_POOL_CONFIG_ID:
      ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2008, true);
      break;
    case MingSuDefine_1.CHENG_XIAO_SHAN_POOL_CONFIG_ID:
      ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2007, true);
      break;
    case MingSuDefine_1.LAHAILUOSHENGXIA_POOL_CONFIG_ID:
      ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2009, true);
      break;
    case MingSuDefine_1.RILINGCOLLECT_POOL_CONFIG_ID:
      ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2010, true);
  }
}; //# sourceMappingURL=MingSuController.js.map