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
      var a;
      var l;
      var t;
      var i;
      var g;
      var _;
      var M = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
      const d = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(M);
      if (d) {
        if (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceRewardHaveTake) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("HaveReceiveRewrad");
          this.FinishExecute(true);
        } else if (ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()) {
          this.FinishExecute(true);
        } else if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanReward(M) && ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(M)) {
          o = !!ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceFirstRewardId(M);
          a = ModelManager_1.ModelManager.InstanceDungeonModel.CurrentInstanceIsFinish;
          if (o && !a) {
            this.FinishExecute(true);
          } else {
            o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(M);
            a = ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(o.CustomTypes);
            [M, i, g, t, l] = ModelManager_1.ModelManager.ActivityRegressModel.GetDungeonDoubleDropTuple(M);
            _ = a && a.LeftUpCount > 0;
            if (!M && !_ && ModelManager_1.ModelManager.FunctionModel.IsOpen(10071) && CommonParamById_1.configCommonParamById.GetIntArrayConfig("MultiExchangeInstType")?.includes(o.InstSubType)) {
              n = {
                SinglePowerCost: d,
                RewardCallBack: e => {
                  ControllerHolder_1.ControllerHolder.InstanceDungeonController.GetInstExchangeRewardRequest(e);
                }
              };
              UiManager_1.UiManager.OpenView("PowerMagnificationRewardPopView", n);
              this.FinishExecute(true);
            } else {
              (n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(64)).ShowPowerItem = true;
              n.CanExecuteCloseFunc = e => e !== 2 || ModelManager_1.ModelManager.PowerModel.IsPowerEnough(d);
              n.SetTextArgs(d.toString());
              n.FunctionMap.set(2, () => {
                var e;
                if (ModelManager_1.ModelManager.PowerModel.IsPowerEnough(d)) {
                  ControllerHolder_1.ControllerHolder.InstanceDungeonController.GetInstExchangeRewardRequest(1);
                } else {
                  e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("ReceiveLevelPlayPowerNotEnough");
                  ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText(e);
                  ControllerHolder_1.ControllerHolder.PowerController.OpenPowerView(2, ModelManager_1.ModelManager.PowerModel.GetCurrentNeedPower(d));
                }
              });
              if (_) {
                n.Tip = a.GetFullTip();
              }
              if (M) {
                _ = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(l);
                a = StringUtils_1.StringUtils.FormatStaticBuilder(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t), i, g);
                n.Tip = "" + _ + a;
              }
              this.FinishExecute(true);
              if ((M = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(o.RewardId)?.SharedId) && (l = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(M), t = ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(M), (_ = (g = (i = l.MaxCount) - t) >= 0 ? g : 0) > 0)) {
                n.SetTableTextArgNew("Text_ReceivedCountWindowTips_Text", _, i);
              }
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(n);
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