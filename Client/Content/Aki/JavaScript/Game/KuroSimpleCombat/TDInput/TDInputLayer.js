"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseInputLayer = undefined;
const Info_1 = require("../../../Core/Common/Info");
const InputEnums_1 = require("../../Input/InputEnums");
const InputLayer_1 = require("../../Input/InputLayer");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const KscEnv_1 = require("../KscEnv");
const KscLog_1 = require("../KscLog");
class TowerDefenseInputLayer extends InputLayer_1.InputLayer {
  constructor() {
    super(...arguments);
    this.Mku = undefined;
    this.Krd = false;
  }
  Init(e) {
    this.Mku = e;
  }
  Clear() {
    this.Mku = undefined;
  }
  GetLayerType() {
    return 5;
  }
  HandlePress(e, r) {
    switch (e) {
      case InputEnums_1.EInputAction.攻击:
        this.GHu(0, r);
        return TowerDefenseInputLayer.GetSwallowCommand();
      case InputEnums_1.EInputAction.跳跃:
        this.FHu();
        return TowerDefenseInputLayer.GetSwallowCommand();
      case InputEnums_1.EInputAction.闪避:
        this.VHu();
        return TowerDefenseInputLayer.GetSwallowCommand();
      case InputEnums_1.EInputAction.幻象1:
        this.Xrd();
        return TowerDefenseInputLayer.GetSwallowCommand();
      case InputEnums_1.EInputAction.走跑切换:
        return;
    }
    return TowerDefenseInputLayer.GetSwallowCommand();
  }
  HandleRelease(e, r) {
    switch (e) {
      case InputEnums_1.EInputAction.攻击:
        this.GHu(1, r);
        return TowerDefenseInputLayer.GetSwallowCommand();
      case InputEnums_1.EInputAction.幻象1:
        this.aed();
        return TowerDefenseInputLayer.GetSwallowCommand();
    }
    return TowerDefenseInputLayer.GetSwallowCommand();
  }
  HandleHold(e, r) {
    switch (e) {
      case InputEnums_1.EInputAction.攻击:
        this.GHu(2, r);
        return TowerDefenseInputLayer.GetSwallowCommand();
      case InputEnums_1.EInputAction.幻象1:
        this.Yrd();
        return TowerDefenseInputLayer.GetSwallowCommand();
    }
    return TowerDefenseInputLayer.GetSwallowCommand();
  }
  GHu(e, r) {
    ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.HandleTowerDefenseCommit(e, r);
  }
  VHu() {
    ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.HandleSprintStart();
  }
  aed() {
    if (!this.Krd) {
      ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.HandleUseItem();
    }
    this.Krd = false;
  }
  Xrd() {
    this.Krd = false;
  }
  Yrd() {
    if (Info_1.Info.IsInTouch()) {
      this.Krd = true;
    }
  }
  FHu() {
    ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.HandleJumpStart();
  }
}
exports.TowerDefenseInputLayer = TowerDefenseInputLayer;
//# sourceMappingURL=TDInputLayer.js.map