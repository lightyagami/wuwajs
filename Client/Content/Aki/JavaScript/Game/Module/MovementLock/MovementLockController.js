"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovementLockController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const UeMovementTickManageComponent_1 = require("../../NewWorld/Common/Component/UeMovementTickManageComponent");
const GameBudgetCenterRoleController_1 = require("../GameBudget/GameBudgetCenterRoleController");
class MovementLockController extends ControllerBase_1.ControllerBase {
  static OnLeaveLevel() {
    if (this.LockMode !== 0) {
      this.Unlock();
    }
    return true;
  }
  static Lock(e) {
    if (this.LockMode !== 0) {
      this.Unlock();
    }
    if (e === 1) {
      UeMovementTickManageComponent_1.UeMovementTickController.SetTickManageMode(0);
    } else if (e === 2) {
      UeMovementTickManageComponent_1.UeMovementTickController.SetTickManageMode(2);
      GameBudgetCenterRoleController_1.GameBudgetCenterRoleController.OpenStreamingSourceMode();
    }
    this.LockMode = e;
  }
  static Unlock() {
    if (this.LockMode !== 0) {
      if (this.LockMode === 2) {
        GameBudgetCenterRoleController_1.GameBudgetCenterRoleController.CloseStreamingSourceMode();
      }
      UeMovementTickManageComponent_1.UeMovementTickController.SetTickManageMode(1);
      this.LockMode = 0;
    }
  }
}
(exports.MovementLockController = MovementLockController).LockMode = 0;
//# sourceMappingURL=MovementLockController.js.map