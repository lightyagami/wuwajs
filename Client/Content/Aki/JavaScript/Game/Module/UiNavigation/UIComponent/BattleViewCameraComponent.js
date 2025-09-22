"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleViewCameraComponent = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const HotKeyComponent_1 = require("./HotKeyComponent");
class BattleViewCameraComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor(e) {
    super(e);
    this.P0a = false;
    this.RZe = (e, t) => {
      this.P0a = t === 0;
      this.SetVisibleMode(2, this.P0a);
    };
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
  }
  OnClear() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
  }
  OnRefreshSelfHotKeyState(e) {
    this.SetVisibleMode(2, this.P0a);
  }
  OnIsOccupancyFightInput() {
    return false;
  }
}
exports.BattleViewCameraComponent = BattleViewCameraComponent;
//# sourceMappingURL=BattleViewCameraComponent.js.map