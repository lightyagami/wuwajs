"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseInputLayer = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const InputEnums_1 = require("../../../Input/InputEnums");
const InputLayer_1 = require("../../../Input/InputLayer");
const KscEnv_1 = require("../../KscEnv");
const KscLog_1 = require("../../KscLog");
const TDPlayerController_1 = require("../TDPlayer/TDPlayerController");
class TowerDefenseInputLayer extends InputLayer_1.InputLayer {
  constructor() {
    super(...arguments);
    this.qsd = false;
  }
  GetLayerType() {
    return 7;
  }
  HandlePress(e, r) {
    switch (e) {
      case InputEnums_1.EInputAction.攻击:
        this.tWu(0, r);
        return TowerDefenseInputLayer.GetSwallowCommand();
      case InputEnums_1.EInputAction.跳跃:
        return new UE.SInputCommand(2, 1, undefined);
      case InputEnums_1.EInputAction.闪避:
        return new UE.SInputCommand(4, 1, undefined);
      case InputEnums_1.EInputAction.幻象1:
        this.Gsd();
        return TowerDefenseInputLayer.GetSwallowCommand();
      case InputEnums_1.EInputAction.走跑切换:
        return;
    }
    return TowerDefenseInputLayer.GetSwallowCommand();
  }
  HandleRelease(e, r) {
    switch (e) {
      case InputEnums_1.EInputAction.攻击:
        this.tWu(1, r);
        return TowerDefenseInputLayer.GetSwallowCommand();
      case InputEnums_1.EInputAction.幻象1:
        this.cid();
        return TowerDefenseInputLayer.GetSwallowCommand();
    }
    return TowerDefenseInputLayer.GetSwallowCommand();
  }
  HandleHold(e, r) {
    switch (e) {
      case InputEnums_1.EInputAction.攻击:
        this.tWu(2, r);
        return TowerDefenseInputLayer.GetSwallowCommand();
      case InputEnums_1.EInputAction.幻象1:
        this.Fsd();
        return TowerDefenseInputLayer.GetSwallowCommand();
    }
    return TowerDefenseInputLayer.GetSwallowCommand();
  }
  tWu(e, r) {
    TDPlayerController_1.TowerDefensePlayerController.HandleTowerDefenseCommit(e, r);
  }
  cid() {
    if (!this.qsd) {
      TDPlayerController_1.TowerDefensePlayerController.HandleUseItem();
    }
    this.qsd = false;
  }
  Gsd() {
    this.qsd = false;
  }
  Fsd() {
    if (Info_1.Info.IsInTouch()) {
      this.qsd = true;
    }
  }
}
exports.TowerDefenseInputLayer = TowerDefenseInputLayer;
//# sourceMappingURL=TDInputLayer.js.map