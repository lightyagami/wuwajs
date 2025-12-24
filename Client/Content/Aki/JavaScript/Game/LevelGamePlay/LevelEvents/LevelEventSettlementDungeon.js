"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSettlementDungeon = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityDoubleRewardController_1 = require("../../Module/Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine");
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSettlementDungeon extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    if (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceFinishSuccess !== 1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InstanceDungeon", 5, "副本结算行为触发时，副本未成功");
      }
      this.FinishExecute(true);
    } else {
      var o;
      var n;
      var l;
      var a;
      var t;
      var i;
      var g;
      var _ = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
      const M = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(_);
      if (M) {
        if (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceRewardHaveTake) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("HaveReceiveRewrad");
          this.FinishExecute(true);
        } else if (ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()) {
          this.FinishExecute(true);
        } else if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanReward(_) && ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(_)) {
          t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(_);
          g = !!ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceFirstRewardId(_);
          o = ModelManager_1.ModelManager.InstanceDungeonModel.CurrentInstanceIsFinish;
          if (g && !o && t.InstSubType !== 49) {
            this.FinishExecute(true);
          } else {
            g = ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(t.CustomTypes);
            [o, _, n, l, a] = ModelManager_1.ModelManager.ActivityRegressModel.GetRegressDoubleDropTuple(_);
            i = g && g.LeftUpCount > 0;
            if (!o && ModelManager_1.ModelManager.FunctionModel.IsOpen(10071) && CommonParamById_1.configCommonParamById.GetIntArrayConfig("MultiExchangeInstType")?.includes(t.InstSubType)) {
              t = {
                SinglePowerCost: M,
                RewardCallBack: e => {
                  ControllerHolder_1.ControllerHolder.InstanceDungeonController.GetInstExchangeRewardRequest(e);
                }
              };
              if (i) {
                t.Tip = g.GetFullTip();
              }
              UiManager_1.UiManager.OpenView("PowerMagnificationRewardPopView", t);
              this.FinishExecute(true);
            } else {
              (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(64)).ShowPowerItem = true;
              t.CanExecuteCloseFunc = e => e !== 2 || ModelManager_1.ModelManager.PowerModel.IsPowerEnough(M);
              t.SetTextArgs(M.toString());
              t.FunctionMap.set(2, () => {
                var e;
                if (ModelManager_1.ModelManager.PowerModel.IsPowerEnough(M)) {
                  ControllerHolder_1.ControllerHolder.InstanceDungeonController.GetInstExchangeRewardRequest(1);
                } else {
                  e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("ReceiveLevelPlayPowerNotEnough");
                  ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText(e);
                  ControllerHolder_1.ControllerHolder.PowerController.OpenPowerView(2, ModelManager_1.ModelManager.PowerModel.GetCurrentNeedPower(M));
                }
              });
              if (i) {
                t.Tip = g.GetFullTip();
              }
              if (o) {
                i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a);
                g = StringUtils_1.StringUtils.FormatStaticBuilder(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(l), _, n);
                t.Tip = "" + i + g;
              }
              this.FinishExecute(true);
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
            }
          }
        } else {
          this.OpenInstanceRewardTimesNotEnoughConfirmBox();
          this.FinishExecute(true);
        }
      } else {
        this.FinishExecute(true);
      }
    }
  }
  OpenInstanceRewardTimesNotEnoughConfirmBox() {
    const e = ModelManager_1.ModelManager.GameModeModel?.IsMulti;
    var r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e ? 218 : 217);
    r.IsEscViewTriggerCallBack = false;
    r.FunctionMap.set(1, () => {
      if (!e) {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      }
    });
    r.FunctionMap.set(2, () => {
      if (e) {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      } else {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon();
      }
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
  }
}
exports.LevelEventSettlementDungeon = LevelEventSettlementDungeon;
//# sourceMappingURL=LevelEventSettlementDungeon.js.map