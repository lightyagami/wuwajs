"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePassController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const InputManager_1 = require("../../../Ui/Input/InputManager");
const UiManager_1 = require("../../../Ui/UiManager");
const FeatureRestrictionTemplate_1 = require("../../Common/FeatureRestrictionTemplate");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const RewardData_1 = require("../../ItemReward/RewardData/RewardData");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
class BattlePassController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    InputManager_1.InputManager.RegisterOpenViewFunc("BattlePassMainView", BattlePassController._ki);
    InputManager_1.InputManager.RegisterCloseViewFunc("BattlePassMainView", BattlePassController.uki);
    return true;
  }
  static OnClear() {
    this.cki();
    return true;
  }
  static RequestBattlePassDataForTask() {
    var e = Protocol_1.Aki.Protocol.bYn.create();
    Net_1.Net.Call(26391, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.BattlePassModel.SetDataFromBattlePassResponse(e);
          if (ModelManager_1.ModelManager.BattlePassModel.GetInTimeRange()) {
            BattlePassController.RequestBattlePassTask();
          }
          this.mki();
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25394);
        }
      }
    });
  }
  static OpenBattlePassView() {
    if (!ModelManager_1.ModelManager.BattlePassModel.IsRequiringViewData && !UiManager_1.UiManager.IsViewOpen("BattlePassMainView") && !UiManager_1.UiManager.IsViewOpen("BattlePassFirstOpenView")) {
      this.dki().finally(() => {
        ModelManager_1.ModelManager.BattlePassModel.IsRequiringViewData = false;
      });
    }
  }
  static async dki() {
    ModelManager_1.ModelManager.BattlePassModel.IsRequiringViewData = true;
    var e = Protocol_1.Aki.Protocol.bYn.create();
    var e = await Net_1.Net.CallAsync(26391, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25394);
      } else {
        ModelManager_1.ModelManager.BattlePassModel.SetDataFromBattlePassResponse(e);
        if (ModelManager_1.ModelManager.BattlePassModel.GetInTimeRange()) {
          var t = Protocol_1.Aki.Protocol.HYn.create();
          var t = await Net_1.Net.CallAsync(18032, t);
          if (t) {
            if (ModelManager_1.ModelManager.LoadingModel?.IsLoading) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Pay", 27, "[BattlePassController.DoOpenBattlePassView] 在Loading中,打开界面取消");
              }
            } else if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 25305);
            } else {
              ModelManager_1.ModelManager.BattlePassModel.BattlePassTaskMap.clear();
              for (const a of t.cMs) {
                ModelManager_1.ModelManager.BattlePassModel.AddTaskDataFromProtocol(a);
              }
              ModelManager_1.ModelManager.BattlePassModel.SetDayEndTime(t.rEs);
              ModelManager_1.ModelManager.BattlePassModel.SetWeekEndTime(t.oEs);
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ReceiveBattlePassTaskEvent, false);
              if (e.iEs.YSs) {
                if (e.iEs.tEs) {
                  UiManager_1.UiManager.OpenView("BattlePassMainView");
                } else {
                  UiManager_1.UiManager.OpenView("BattlePassFirstOpenView");
                }
              } else {
                ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("BattlePassNotInTime");
              }
            }
          }
        } else {
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(new ConfirmBoxDefine_1.ConfirmBoxDataNew(150));
        }
      }
    }
  }
  static SetBattlePassEnter() {
    var e = Protocol_1.Aki.Protocol.XYn.create();
    Net_1.Net.Send(15324, e);
    ModelManager_1.ModelManager.BattlePassModel.HadEnter = true;
  }
  static RequestTakeBattlePassReward(t, a, r, o) {
    var e = Protocol_1.Aki.Protocol.GYn.create();
    e.h5n = t;
    e.F6n = a;
    e.L8n = r;
    Net_1.Net.Call(23269, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.BattlePassModel.OnResponseTakeReward(t, a, r, o);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24638);
        }
      }
    });
    ModelManager_1.ModelManager.BattlePassModel?.TryAssignRemindLevel(a);
  }
  static RequestTakeAllRewardResponse() {
    var e = Protocol_1.Aki.Protocol.FYn.create();
    Net_1.Net.Call(28100, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.BattlePassModel.UpdateRewardDataFromBattlePassTakeAllRewardResponse(e);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15914);
        }
      }
    });
    ModelManager_1.ModelManager.BattlePassModel?.TryAssignRemindLevel();
  }
  static RequestBattlePassTask() {
    var e = Protocol_1.Aki.Protocol.HYn.create();
    Net_1.Net.Call(18032, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.BattlePassModel.BattlePassTaskMap.clear();
          for (const a of e.cMs) {
            ModelManager_1.ModelManager.BattlePassModel.AddTaskDataFromProtocol(a);
          }
          var t = ModelManager_1.ModelManager.BattlePassModel.GetWeekEndTime() !== e.oEs;
          ModelManager_1.ModelManager.BattlePassModel.SetWeekEndTime(e.oEs);
          ModelManager_1.ModelManager.BattlePassModel.SetDayEndTime(e.rEs);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ReceiveBattlePassTaskEvent, t);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25305);
        }
      }
    });
  }
  static TryRequestTaskList(e) {
    ModelManager_1.ModelManager.BattlePassModel.TryRequestTaskList(e);
  }
  static RequestBattlePassTaskTake(e) {
    var t = Protocol_1.Aki.Protocol.KYn.create();
    t.BVn = e;
    Net_1.Net.Call(28438, t, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.BattlePassModel.UpdateTaskDataFromBattlePassTaskTakeResponse(e.BVn);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27297);
        }
      }
    });
  }
  static RequestBuyBattlePassLevel(e) {
    var t = Protocol_1.Aki.Protocol.YYn.create();
    t.F6n = e;
    Net_1.Net.Call(22065, t, () => {});
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(15330, BattlePassController.Cki);
    Net_1.Net.Register(25580, BattlePassController.gki);
    Net_1.Net.Register(21913, BattlePassController.fki);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15330);
    Net_1.Net.UnRegister(25580);
    Net_1.Net.UnRegister(21913);
  }
  static mki() {
    BattlePassController.pki ||= TimerSystem_1.GameplayTimerSystem.Forever(() => {
      if (TimeUtil_1.TimeUtil.GetServerTime() >= ModelManager_1.ModelManager.BattlePassModel.GetBattlePassEndTime()) {
        ModelManager_1.ModelManager.BattlePassModel.SetInTimeRange(false);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBattlePassExpireEvent);
        this.cki();
      }
    }, 500);
  }
  static ShowTimePassConfirm() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(145);
    e.SetCloseFunction(() => {
      UiManager_1.UiManager.ResetToBattleView();
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  static cki() {
    if (BattlePassController.pki) {
      TimerSystem_1.GameplayTimerSystem.Remove(BattlePassController.pki);
      BattlePassController.pki = undefined;
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.TJt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.vki);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CrossDay, this.oOe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.TJt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.vki);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CrossDay, this.oOe);
  }
  static TryShowUpLevelView(e) {
    return !(ModelManager_1.ModelManager.BattlePassModel.IncreasedLevelToShow <= 0) && !UiManager_1.UiManager.IsViewOpen("BattlePassUnlockView") && !(e = {
      IncreasedLevel: ModelManager_1.ModelManager.BattlePassModel.IncreasedLevelToShow,
      FirstUnlockPass: e
    }, UiManager_1.UiManager.OpenView("BattlePassUpLevelView", e), ModelManager_1.ModelManager.BattlePassModel.IncreasedLevelToShow = 0);
  }
  static PopHighUnlockReward() {
    var e;
    var t;
    var a = CommonParamById_1.configCommonParamById.GetIntConfig("PrimaryBattlePassGiftPack");
    var r = [];
    for ([e, t] of ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(a).Content) {
      r.push(new RewardItemData_1.RewardItemData(e, t));
    }
    ItemRewardController_1.ItemRewardController.OpenCommonRewardView(1009, r, () => {
      this.TryShowUpLevelView(true);
    });
  }
  static PayPrimaryBattlePass() {
    var e;
    var t;
    if (FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check()) {
      e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    } else {
      e = ModelManager_1.ModelManager.BattlePassModel.GetPrimaryBattlePassGoodsId();
      if ((t = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(e))?.InSellTime()) {
        if (!this.Mki(e)) {
          ControllerHolder_1.ControllerHolder.PayGiftController.SdkPay(t.GetGoodsData().Id);
        }
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("BattlePassShopNotInTime");
      }
    }
  }
  static PayHighBattlePass() {
    var e;
    var t;
    if (FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check()) {
      e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    } else if ((e = ModelManager_1.ModelManager.BattlePassModel.PayType) === Protocol_1.Aki.Protocol.PNs.Proto_NoPaid) {
      t = ModelManager_1.ModelManager.BattlePassModel.GetHighBattlePassGoodsId();
      if (ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(t)?.InSellTime()) {
        if (!this.Mki(t)) {
          ControllerHolder_1.ControllerHolder.PayGiftController.SdkPay(t);
        }
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("BattlePassShopNotInTime");
      }
    } else if (e === Protocol_1.Aki.Protocol.PNs.Proto_Paid) {
      t = ModelManager_1.ModelManager.BattlePassModel.GetSupplyBattlePassGoodsId();
      if (ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(t)?.InSellTime()) {
        ControllerHolder_1.ControllerHolder.PayGiftController.SdkPay(t);
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("BattlePassShopNotInTime");
      }
    }
  }
  static Mki(e) {
    var t;
    return !!ModelManager_1.ModelManager.BattlePassModel.InBattlePassInWarningTime() && ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(147)).FunctionMap.set(2, () => {
      ControllerHolder_1.ControllerHolder.PayGiftController.SdkPay(e);
    }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t), true);
  }
  static CloseView() {
    if (!UiManager_1.UiManager.IsViewOpen("BattlePassFirstOpenView")) {
      UiManager_1.UiManager.CloseView("BattlePassMainView");
    }
  }
  static BuildExtraRewardData(e) {
    e = {
      Type: 4,
      ViewName: "BattlePassExtraRewardView",
      CommonItems: e,
      ExtraItems: ModelManager_1.ModelManager.BattlePassModel.GetExtraRewardItems(),
      LeftAction: () => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NotifyBattlePassToBuyEvent);
      },
      RightAction: () => {}
    };
    return new RewardData_1.RewardData(e);
  }
  static IsNeedExtraRewardView() {
    return ModelManager_1.ModelManager.BattlePassModel?.RemindLevel !== undefined;
  }
}
(exports.BattlePassController = BattlePassController)._ki = () => {
  BattlePassController.OpenBattlePassView();
};
BattlePassController.uki = () => {
  BattlePassController.CloseView();
};
BattlePassController.Cki = e => {
  for (const t of e.cMs) {
    ModelManager_1.ModelManager.BattlePassModel.AddTaskDataFromProtocol(t);
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateBattlePassTaskEvent);
};
BattlePassController.gki = e => {
  ModelManager_1.ModelManager.BattlePassModel.UpdateExpDataFromBattlePassExpUpdateNotify(e.F6n, e.U8n, e.JSs);
};
BattlePassController.fki = t => {
  if (ModelManager_1.ModelManager.BattlePassModel.GetInTimeRange()) {
    var a = ModelManager_1.ModelManager.BattlePassModel.PayType;
    ModelManager_1.ModelManager.BattlePassModel.PayType = t.zSs;
    let e = t.zSs === Protocol_1.Aki.Protocol.PNs.Proto_Paid ? 1 : 3;
    if (a === Protocol_1.Aki.Protocol.PNs.Proto_NoPaid && a !== t.zSs) {
      ModelManager_1.ModelManager.BattlePassModel.UpdateRewardDataFormFreeToPay();
      e = e === 3 ? 2 : e;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ReceiveBattlePassDataEvent);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnReceiveBattlePassPaid);
    UiManager_1.UiManager.OpenView("BattlePassUnlockView", e);
  }
};
BattlePassController.pki = undefined;
BattlePassController.vki = (e, t) => {
  if (e === 10040 && t) {
    BattlePassController.RequestBattlePassDataForTask();
  }
};
BattlePassController.TJt = () => {
  if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10040)) {
    BattlePassController.RequestBattlePassDataForTask();
  }
};
BattlePassController.oOe = () => {
  if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10040) && ModelManager_1.ModelManager.BattlePassModel.GetInTimeRange()) {
    BattlePassController.RequestBattlePassTask();
  }
}; //# sourceMappingURL=BattlePassController.js.map