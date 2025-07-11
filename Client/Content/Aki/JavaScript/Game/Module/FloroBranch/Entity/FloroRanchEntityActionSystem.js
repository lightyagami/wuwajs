"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEntityActionSystem = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const FloroRanchActionBase_1 = require("../Data/ActionData/FloroRanchActionBase");
const FloroRanchBuffUpdateActionData_1 = require("../Data/ActionData/FloroRanchBuffUpdateActionData");
const FloroRanchChangePointActionData_1 = require("../Data/ActionData/FloroRanchChangePointActionData");
const FloroRanchDayStartActionData_1 = require("../Data/ActionData/FloroRanchDayStartActionData");
const FloroRanchDebugInfoActionData_1 = require("../Data/ActionData/FloroRanchDebugInfoActionData");
const FloroRanchEatActionData_1 = require("../Data/ActionData/FloroRanchEatActionData");
const FloroRanchEatGroupActionData_1 = require("../Data/ActionData/FloroRanchEatGroupActionData");
const FloroRanchEntityActionData_1 = require("../Data/ActionData/FloroRanchEntityActionData");
const FloroRanchEntityChangeActionData_1 = require("../Data/ActionData/FloroRanchEntityChangeActionData");
const FloroRanchEvolveUpdateActionData_1 = require("../Data/ActionData/FloroRanchEvolveUpdateActionData");
const FloroRanchFusionActionData_1 = require("../Data/ActionData/FloroRanchFusionActionData");
const FloroRanchGroupActionData_1 = require("../Data/ActionData/FloroRanchGroupActionData");
const FloroRanchRemoveEntityActionData_1 = require("../Data/ActionData/FloroRanchRemoveEntityActionData");
const FloroRanchResourceChangeActionData_1 = require("../Data/ActionData/FloroRanchResourceChangeActionData");
const FloroRanchSacrificeActionData_1 = require("../Data/ActionData/FloroRanchSacrificeActionData");
const FloroRanchWageSettleAction_1 = require("../Data/ActionData/FloroRanchWageSettleAction");
const FloroRanchDefine_1 = require("../FloroRanchDefine");
class FloroRanchEntityActionSystem {
  static async DayStart(a) {
    var t;
    if (this.lGu() && (t = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView"))) {
      (t = t).SetMaskPanelActive(true);
      t.SetNewDayButtonActive(false);
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.OnDayStart(a);
      this.QPu = new FloroRanchDayStartActionData_1.FloroRanchDayStartAction(a);
      await this.QPu.ExecuteAction();
      this.QPu = undefined;
      await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_DAY_START_TASK_WAIT_TIME);
      t.SetMaskPanelActive(false);
    }
  }
  static async ExecuteActionList(a) {
    var t;
    var o;
    if (this.lGu() && (t = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView"))) {
      (t = t).SetMaskPanelActive(true);
      o = new FloroRanchGroupActionData_1.FloroRanchGroupActionData();
      (this.QPu = o).InitActionData(a);
      await o.ExecuteAction();
      this.QPu = undefined;
      await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_DAY_ACTION_WAIT_TIME);
      t.SetMaskPanelActive(false);
    }
  }
  static async ExecuteWageSettleAction(a) {
    var t;
    if (this.lGu() && (t = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView"))) {
      (t = t).SetMaskPanelActive(true);
      this.QPu = new FloroRanchWageSettleAction_1.FloroRanchWageSettleAction(a);
      await this.QPu.ExecuteAction();
      this.QPu = undefined;
      await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_DAY_WAGE_TASK_WAIT_TIME);
      t.SetMaskPanelActive(false);
    }
  }
  static lGu() {
    return !this.QPu || (Log_1.Log.CheckError() && Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanchEntityActionSystem ExecuteActionList 正在执行"), false);
  }
  static Pause() {
    if (this.QPu) {
      this.QPu.Pause();
    }
  }
  static Resume() {
    if (this.QPu) {
      this.QPu.Resume();
    }
  }
  static Exit() {
    if (this.QPu) {
      this.QPu.Exit();
      this.QPu = undefined;
    }
  }
  static CreateActionDataList(a) {
    var t = [];
    for (const n of a) {
      var o = this.CreateActionData(n);
      t.push(o);
    }
    return t;
  }
  static CreateActionData(a) {
    switch (a.Dyu) {
      case Protocol_1.Aki.Protocol.Fyu.Proto_OpBuff:
        return new FloroRanchBuffUpdateActionData_1.FloroRanchBuffUpdateActionData(a);
      case Protocol_1.Aki.Protocol.Fyu.Proto_OpUnit:
        return new FloroRanchEntityChangeActionData_1.FloroRanchEntityChangeActionData(a);
      case Protocol_1.Aki.Protocol.Fyu.Proto_UnitResourcesChange:
        return new FloroRanchResourceChangeActionData_1.FloroRanchResourceChangeActionData(a);
      case Protocol_1.Aki.Protocol.Fyu.Proto_Eating:
        return new FloroRanchEatGroupActionData_1.FloroRanchEatGroupActionData(a);
      case Protocol_1.Aki.Protocol.Fyu.$Ru:
        return new FloroRanchEvolveUpdateActionData_1.FloroRanchEvolveUpdateActionData(a);
      case Protocol_1.Aki.Protocol.Fyu.Proto_Mix:
        return new FloroRanchFusionActionData_1.FloroRanchFusionActionData(a);
      case Protocol_1.Aki.Protocol.Fyu.Proto_Sacrifice:
        return new FloroRanchSacrificeActionData_1.FloroRanchSacrificeActionData(a);
      case Protocol_1.Aki.Protocol.Fyu.Proto_DebugActionInfo:
        return new FloroRanchDebugInfoActionData_1.FloroRanchDebugInfoActionData(a);
      case Protocol_1.Aki.Protocol.Fyu.Proto_BeEat:
        return new FloroRanchEatActionData_1.FloroRanchEatActionData(a);
      case Protocol_1.Aki.Protocol.Fyu.Proto_ChangePoint:
        return new FloroRanchChangePointActionData_1.FloroRanchChangePointActionData(a);
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanchEntityActionSystem CreateActionData 未知的行为类型:" + a.Dyu);
        }
        return new FloroRanchActionBase_1.FloroRanchActionDataBase(a);
    }
  }
  static DayEnd() {
    var a = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
    if (a) {
      a.SetNewDayButtonActive(true);
    }
  }
  static async AddEntity(a) {
    if (this.lGu()) {
      var t = [];
      for (const n of a) {
        var o = new FloroRanchEntityActionData_1.FloroRanchEntityActionData(Protocol_1.Aki.Protocol.Wyu.Proto_UnitOpAdd, n);
        t.push(o.ExecuteAction());
        this.QPu = o;
      }
      await Promise.all(t);
      this.QPu = undefined;
    }
  }
  static async RemoveEntity(a) {
    if (this.lGu()) {
      a = new FloroRanchRemoveEntityActionData_1.FloroRanchRemoveEntityActionData(a);
      await (this.QPu = a).ExecuteAction();
      this.QPu = undefined;
    }
  }
}
(exports.FloroRanchEntityActionSystem = FloroRanchEntityActionSystem).QPu = undefined;
//# sourceMappingURL=FloroRanchEntityActionSystem.js.map