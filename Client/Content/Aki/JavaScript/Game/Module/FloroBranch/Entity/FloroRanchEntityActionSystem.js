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
const FloroRanchActionStopActionData_1 = require("../Data/ActionData/FloroRanchActionStopActionData");
const FloroRanchBuffUpdateActionData_1 = require("../Data/ActionData/FloroRanchBuffUpdateActionData");
const FloroRanchChangePointActionData_1 = require("../Data/ActionData/FloroRanchChangePointActionData");
const FloroRanchDayStartActionData_1 = require("../Data/ActionData/FloroRanchDayStartActionData");
const FloroRanchDebugInfoActionData_1 = require("../Data/ActionData/FloroRanchDebugInfoActionData");
const FloroRanchEatActionData_1 = require("../Data/ActionData/FloroRanchEatActionData");
const FloroRanchEatGroupActionData_1 = require("../Data/ActionData/FloroRanchEatGroupActionData");
const FloroRanchEntityChangeActionData_1 = require("../Data/ActionData/FloroRanchEntityChangeActionData");
const FloroRanchEvolveUpdateActionData_1 = require("../Data/ActionData/FloroRanchEvolveUpdateActionData");
const FloroRanchFusionActionData_1 = require("../Data/ActionData/FloroRanchFusionActionData");
const FloroRanchGroupActionData_1 = require("../Data/ActionData/FloroRanchGroupActionData");
const FloroRanchResourceChangeActionData_1 = require("../Data/ActionData/FloroRanchResourceChangeActionData");
const FloroRanchSacrificeActionData_1 = require("../Data/ActionData/FloroRanchSacrificeActionData");
const FloroRanchWageSettleAction_1 = require("../Data/ActionData/FloroRanchWageSettleAction");
const FloroRanchDefine_1 = require("../FloroRanchDefine");
class FloroRanchEntityActionSystem {
  static async DayStart(a) {
    var t;
    if (this.o3u()) {
      (t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetGamePlayView()).SetMaskPanelActive(true);
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.OnDayStart(a);
      this.vxu = new FloroRanchDayStartActionData_1.FloroRanchDayStartAction(a);
      await this.vxu.ExecuteAction();
      this.vxu = undefined;
      await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_DAY_START_TASK_WAIT_TIME);
      t.SetMaskPanelActive(false);
    }
  }
  static async ExecuteActionList(a) {
    var t;
    var o;
    if (this.o3u()) {
      (t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetGamePlayView()).SetMaskPanelActive(true);
      o = new FloroRanchGroupActionData_1.FloroRanchGroupActionData();
      (this.vxu = o).InitActionData(a);
      await o.ExecuteAction();
      this.vxu = undefined;
      await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_DAY_ACTION_WAIT_TIME);
      t.SetMaskPanelActive(false);
    }
  }
  static async ExecuteWageSettleAction(a) {
    var t;
    if (this.o3u()) {
      (t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetGamePlayView()).SetMaskPanelActive(true);
      this.vxu = new FloroRanchWageSettleAction_1.FloroRanchWageSettleAction(a);
      await this.vxu.ExecuteAction();
      this.vxu = undefined;
      a = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetWageSettleWaitTime() + ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetBezierCurveTime() + ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetPopupRewardStayTime();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("FloroRanchGamePlay", 78, "ExecuteWageSettleAction 等待时间", ["speed", ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTimeDilation()], ["waitTime", a]);
      }
      await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(a);
      t.SetMaskPanelActive(false);
    }
  }
  static o3u() {
    return !this.vxu || (Log_1.Log.CheckError() && Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanchEntityActionSystem ExecuteActionList 正在执行"), false);
  }
  static Pause() {
    if (this.vxu) {
      this.vxu.Pause();
    }
  }
  static Resume() {
    if (this.vxu) {
      this.vxu.Resume();
    }
  }
  static Exit() {
    if (this.vxu) {
      this.vxu.Exit();
      this.vxu = undefined;
    }
  }
  static CreateActionData(a) {
    switch (a.ASu) {
      case Protocol_1.Aki.Protocol.kSu.Proto_OpBuff:
        return new FloroRanchBuffUpdateActionData_1.FloroRanchBuffUpdateActionData(a);
      case Protocol_1.Aki.Protocol.kSu.Proto_OpUnit:
        return new FloroRanchEntityChangeActionData_1.FloroRanchEntityChangeActionData(a);
      case Protocol_1.Aki.Protocol.kSu.Proto_UnitResourcesChange:
        return new FloroRanchResourceChangeActionData_1.FloroRanchResourceChangeActionData(a);
      case Protocol_1.Aki.Protocol.kSu.Proto_Eating:
        return new FloroRanchEatGroupActionData_1.FloroRanchEatGroupActionData(a);
      case Protocol_1.Aki.Protocol.kSu.mLu:
        return new FloroRanchEvolveUpdateActionData_1.FloroRanchEvolveUpdateActionData(a);
      case Protocol_1.Aki.Protocol.kSu.Proto_Mix:
        return new FloroRanchFusionActionData_1.FloroRanchFusionActionData(a);
      case Protocol_1.Aki.Protocol.kSu.Proto_Sacrifice:
        return new FloroRanchSacrificeActionData_1.FloroRanchSacrificeActionData(a);
      case Protocol_1.Aki.Protocol.kSu.Proto_DebugActionInfo:
        return new FloroRanchDebugInfoActionData_1.FloroRanchDebugInfoActionData(a);
      case Protocol_1.Aki.Protocol.kSu.Proto_BeEat:
        return new FloroRanchEatActionData_1.FloroRanchEatActionData(a);
      case Protocol_1.Aki.Protocol.kSu.Proto_ChangePoint:
        return new FloroRanchChangePointActionData_1.FloroRanchChangePointActionData(a);
      case Protocol_1.Aki.Protocol.kSu.Vrd:
        return new FloroRanchActionStopActionData_1.FloroRanchActionStopActionData(a);
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanchEntityActionSystem CreateActionData 未知的行为类型:" + a.ASu);
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
  static async AddEntities(a) {
    var t = [];
    for (const o of a) {
      t.push(this.AddEntity(o));
    }
    await Promise.all(t);
  }
  static async AddEntity(a) {
    var a = ModelManager_1.ModelManager.FloroRanchGamePlayModel.AddEntity(a);
    var t = a.GetUiItemComponent();
    if (t && a.CheckGetComponent(0).Point >= 0) {
      await t.PlayShowAnim();
    }
  }
  static async RemoveEntity(a) {
    var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(a);
    if (t) {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.RemoveOwnEntityData(t);
      if (t = t.GetUiItemComponent()) {
        await t.PlayHideAnim();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 78, "FloroRanchEntityActionSystem RemoveEntity 实体不存在", ["entityId", a]);
    }
  }
}
(exports.FloroRanchEntityActionSystem = FloroRanchEntityActionSystem).vxu = undefined;
//# sourceMappingURL=FloroRanchEntityActionSystem.js.map