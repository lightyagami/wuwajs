"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameBudgetCenterRoleController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
class GameBudgetCenterRoleController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.SK);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CameraModeChanged, this.IK);
    return super.OnInit();
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.SK);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CameraModeChanged, this.IK);
    this.ztf = undefined;
    return super.OnClear();
  }
  static Z5g(e) {
    var t;
    if (!this.eVg) {
      t = GameBudgetInterfaceController_1.GameBudgetInterfaceController.CenterRole ? new WeakRef(GameBudgetInterfaceController_1.GameBudgetInterfaceController.CenterRole) : undefined;
      this.ztf = {
        CenterActor: t,
        Model: GameBudgetInterfaceController_1.GameBudgetInterfaceController.BudgetMode
      };
      this.BK(e);
      this.eVg = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Game", 61, "[GameBudget]LockGameBudgetMode", ["gameBudgetMode", e]);
      }
    }
  }
  static tVg() {
    var e;
    var t;
    if (this.eVg && (this.eVg = false, e = this.ztf?.Model, t = this.ztf?.CenterActor?.deref(), this.ztf = undefined, e ? this.BK(e) : this.BK(1), t && this.hTf(t), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Game", 61, "[GameBudget]UnLockGameBudgetMode");
    }
  }
  static OpenStreamingSourceMode() {
    try {
      this.Z5g(3);
    } catch (e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Game", 61, "[GameBudget]OpenStreamingSourceMode Error: ", ["error", e]);
      }
      this.CloseStreamingSourceMode();
    }
  }
  static CloseStreamingSourceMode() {
    this.tVg();
  }
  static iVg(e = undefined, t = undefined) {
    if (this.eVg && (this.ztf ||= {
      CenterActor: undefined,
      Model: 1
    }, e && (this.ztf.Model = e), t)) {
      this.ztf.CenterActor = new WeakRef(t);
    }
    return this.eVg;
  }
  static SetCenterRole(e) {
    if (!!e && !this.iVg(undefined, e)) {
      this.hTf(e);
    }
  }
  static BK(e) {
    if (!this.iVg(e)) {
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.OnBudgetModelChange(e);
    }
  }
  static SetCenterOffset(e) {
    if (!this.iVg()) {
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.OnChangeCenterRole(undefined, e);
    }
  }
  static hTf(e, t = undefined) {
    let r = t;
    if (!t && e && e instanceof TsBaseCharacter_1.default && (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e.EntityId)?.Entity)) {
      r = t.GetComponent(308)?.GetCenterActorLocationOffset();
    }
    GameBudgetInterfaceController_1.GameBudgetInterfaceController.OnChangeCenterRole(e, r);
  }
}
exports.GameBudgetCenterRoleController = GameBudgetCenterRoleController;
(_a = GameBudgetCenterRoleController).ztf = undefined;
GameBudgetCenterRoleController.eVg = false;
GameBudgetCenterRoleController.SK = (e, t) => {
  _a.SetCenterRole(Global_1.Global.BaseCharacter);
};
GameBudgetCenterRoleController.IK = (e, t) => {
  if (e === 1 && ModelManager_1.ModelManager.PlotModel?.IsInPlot) {
    _a.BK(2);
  } else {
    _a.BK(1);
  }
}; //# sourceMappingURL=GameBudgetCenterRoleController.js.map