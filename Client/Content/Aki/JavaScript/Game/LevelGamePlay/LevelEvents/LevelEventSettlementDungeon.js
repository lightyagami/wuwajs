"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventSettlementDungeon = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityDoubleRewardController_1 = require("../../Module/Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine"),
  UiManager_1 = require("../../Ui/UiManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSettlementDungeon extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    if (1 !== ModelManager_1.ModelManager.InstanceDungeonModel.InstanceFinishSuccess) Log_1.Log.CheckInfo() && Log_1.Log.Info("InstanceDungeon", 5, "副本结算行为触发时，副本未成功"), this.FinishExecute(!0);
    else {
      var o, n, l, a, t, i, g, _ = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
      const M = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(_);
      M ? ModelManager_1.ModelManager.InstanceDungeonModel.InstanceRewardHaveTake ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("HaveReceiveRewrad"), this.FinishExecute(!0)) : ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen() ? this.FinishExecute(!0) : ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanReward(_) && ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(_) ? (t = !!ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceFirstRewardId(_), g = ModelManager_1.ModelManager.InstanceDungeonModel.CurrentInstanceIsFinish, t && !g ? this.FinishExecute(!0) : (t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(_), g = ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(t.CustomTypes), [_, o, n, l, a] = ModelManager_1.ModelManager.ActivityRegressModel.GetDungeonDoubleDropTuple(_), i = g && 0 < g.LeftUpCount, !_ && !i && ModelManager_1.ModelManager.FunctionModel.IsOpen(10071) && CommonParamById_1.configCommonParamById.GetIntArrayConfig("MultiExchangeInstType")?.includes(t.InstSubType) ? (t = {
        SinglePowerCost: M,
        RewardCallBack: e => {
          ControllerHolder_1.ControllerHolder.InstanceDungeonController.GetInstExchangeRewardRequest(e)
        }
      }, UiManager_1.UiManager.OpenView("PowerMagnificationRewardPopView", t), this.FinishExecute(!0)) : ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(64)).ShowPowerItem = !0, t.CanExecuteCloseFunc = e => 2 !== e || ModelManager_1.ModelManager.PowerModel.IsPowerEnough(M), t.SetTextArgs(M.toString()), t.FunctionMap.set(2, () => {
        var e;
        ModelManager_1.ModelManager.PowerModel.IsPowerEnough(M) ? ControllerHolder_1.ControllerHolder.InstanceDungeonController.GetInstExchangeRewardRequest(1) : (e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("ReceiveLevelPlayPowerNotEnough"), ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText(e), ControllerHolder_1.ControllerHolder.PowerController.OpenPowerView(2, ModelManager_1.ModelManager.PowerModel.GetCurrentNeedPower(M)))
      }), i && (t.Tip = g.GetFullTip()), _ && (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a), g = StringUtils_1.StringUtils.FormatStaticBuilder(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(l), o, n), t.Tip = "" + i + g), this.FinishExecute(!0), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t)))) : (this.OpenInstanceRewardTimesNotEnoughConfirmBox(), this.FinishExecute(!0)) : this.FinishExecute(!0)
    }
  }
  OpenInstanceRewardTimesNotEnoughConfirmBox() {
    const e = ModelManager_1.ModelManager.GameModeModel?.IsMulti;
    var r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e ? 218 : 217);
    r.IsEscViewTriggerCallBack = !1, r.FunctionMap.set(1, () => {
      e || ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon()
    }), r.FunctionMap.set(2, () => {
      e ? ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon() : ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon()
    }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r)
  }
}
exports.LevelEventSettlementDungeon = LevelEventSettlementDungeon;
//# sourceMappingURL=LevelEventSettlementDungeon.js.map