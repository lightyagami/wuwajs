"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleViewCameraComponent = undefined;
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const HotKeyComponent_1 = require("./HotKeyComponent");
class BattleViewCameraComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor(t) {
    super(t);
    this.P0a = false;
    this.RZe = (t, e) => {
      this.P0a = e === 0;
      this.SetVisibleMode(2, this.P0a);
    };
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
  }
  OnClear() {
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
  }
  OnRefreshSelfHotKeyState(t) {
    this.SetVisibleMode(2, this.P0a);
  }
  OnIsOccupancyFightInput() {
    return false;
  }
}
exports.BattleViewCameraComponent = BattleViewCameraComponent;
//# sourceMappingURL=BattleViewCameraComponent.js.map