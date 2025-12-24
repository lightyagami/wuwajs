"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymExitHandler = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const LordGymDefine_1 = require("../../../LordGym/LordGymDefine");
const InstanceDungeonExitHandlerBase_1 = require("./InstanceDungeonExitHandlerBase");
class LordGymExitHandler extends InstanceDungeonExitHandlerBase_1.InstanceDungeonExitHandlerBase {
  Checker() {
    return ControllerHolder_1.ControllerHolder.LordGymController.IsInLordGymDungeon();
  }
  HandleExit(e) {
    var r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(416);
    r.IsEscViewTriggerCallBack = false;
    r.FunctionMap.set(0, e?.CancelBack);
    r.FunctionMap.set(1, () => {
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.EnterEntrance(LordGymDefine_1.THRID_ENTRANCE_ID);
    });
    r.FunctionMap.set(2, () => {
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon().finally(() => {
        if (e?.CancelBack) {
          e.CancelBack();
        }
      });
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
  }
}
exports.LordGymExitHandler = LordGymExitHandler;
//# sourceMappingURL=LordGymExitHanlder.js.map