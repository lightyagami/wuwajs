"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameBudgetCenterRoleController = undefined;
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
    this.uZm = undefined;
    return super.OnClear();
  }
  static OpenStreamingSourceMode() {
    var e = GameBudgetInterfaceController_1.GameBudgetInterfaceController.CenterRole ? new WeakRef(GameBudgetInterfaceController_1.GameBudgetInterfaceController.CenterRole) : undefined;
    this.uZm = {
      CenterActor: e,
      Model: GameBudgetInterfaceController_1.GameBudgetInterfaceController.BudgetMode
    };
    this.BK(3);
  }
  static CloseStreamingSourceMode() {
    var e = this.uZm?.Model;
    var t = this.uZm?.CenterActor?.deref();
    if (e) {
      this.BK(e);
    } else {
      this.BK(1);
    }
    if (t) {
      this.aMf(t);
    }
    this.uZm = undefined;
  }
  static SetCenterRole(e) {
    if (e) {
      if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.BudgetMode === 3 && this.uZm) {
        this.uZm.CenterActor = new WeakRef(e);
      } else {
        this.aMf(e);
      }
    }
  }
  static BK(e) {
    if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.BudgetMode === 3 && this.uZm) {
      this.uZm.Model = e;
    } else {
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.OnBudgetModelChange(e);
    }
  }
  static SetCenterOffset(e) {
    if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.BudgetMode !== 3) {
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.OnChangeCenterRole(undefined, e);
    }
  }
  static aMf(e, t = undefined) {
    let r = t;
    if (!t && e && e instanceof TsBaseCharacter_1.default && (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e.EntityId)?.Entity)) {
      r = t.GetComponent(306)?.GetCenterActorLocationOffset();
    }
    GameBudgetInterfaceController_1.GameBudgetInterfaceController.OnChangeCenterRole(e, r);
  }
}
exports.GameBudgetCenterRoleController = GameBudgetCenterRoleController;
(_a = GameBudgetCenterRoleController).uZm = undefined;
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