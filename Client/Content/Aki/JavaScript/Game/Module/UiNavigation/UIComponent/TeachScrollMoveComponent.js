"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeachScrollMoveComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const HotKeyComponent_1 = require("./HotKeyComponent");
const THRESHOLD = 0.1;
class TeachScrollMoveComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor(e) {
    super(e);
    this.BBo = 0;
    this.P0a = false;
    this.Nxo = undefined;
    this.RZe = (e, t) => {
      this.P0a = t === 0;
      this.RefreshActiveState();
    };
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
  }
  OnClear() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
  }
  OnInputAxis(e, t) {
    if (t !== 0 && this.Nxo) {
      if (Math.abs(t) <= THRESHOLD) {
        if (this.BBo !== 0) {
          this.BBo = 0;
          ControllerHolder_1.ControllerHolder.UiNavigationNewController.ScrollBarChangeScheduleByListener(this.Nxo, 0);
        }
      } else {
        this.BBo = t;
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.ScrollBarChangeScheduleByListener(this.Nxo, t);
      }
    }
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      this.Nxo = e.GetActiveListenerByTag(t);
      this.RefreshActiveState();
    }
  }
  RefreshActiveState() {
    if (this.P0a && this.cOd() && this.Nxo && this.Nxo.IsListenerActive()) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
  cOd() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    return e !== 0 && ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).InstSubType === 7;
  }
}
exports.TeachScrollMoveComponent = TeachScrollMoveComponent;
//# sourceMappingURL=TeachScrollMoveComponent.js.map