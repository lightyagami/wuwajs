"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionInputLayer = undefined;
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils");
const InputEnums_1 = require("../../../../../../Input/InputEnums");
const InputLayer_1 = require("../../../../../../Input/InputLayer");
class VisionInputLayer extends InputLayer_1.InputLayer {
  constructor() {
    super(...arguments);
    this.won = undefined;
    this.pZo = undefined;
  }
  Init(t) {
    this.won = t.Entity?.GetComponent(43);
    this.pZo = t.Entity?.GetComponent(18);
  }
  Clear() {
    this.won = undefined;
    this.pZo = undefined;
  }
  GetLayerType() {
    return 2;
  }
  HandlePress(t, e) {
    switch (t) {
      case InputEnums_1.EInputAction.攻击:
        this.pZo.SendGameplayEventToActor(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(933547498));
        if (this.won.HandlePress(t, e) ?? false) {
          return VisionInputLayer.GetSwallowCommand();
        }
        break;
      case InputEnums_1.EInputAction.幻象2:
        this.pZo.SendGameplayEventToActor(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(945753440));
        if (this.won.HandlePress(t, e) ?? false) {
          return VisionInputLayer.GetSwallowCommand();
        }
    }
  }
  HandleRelease(t, e) {
    if (t === InputEnums_1.EInputAction.幻象2) {
      this.pZo.SendGameplayEventToActor(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(1688962249));
    }
  }
}
exports.VisionInputLayer = VisionInputLayer;
//# sourceMappingURL=VisionInputLayer.js.map