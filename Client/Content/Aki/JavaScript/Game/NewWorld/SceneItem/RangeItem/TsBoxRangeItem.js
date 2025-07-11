"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
class TsBoxRangeItem extends UE.KuroEffectActor {
  constructor() {
    super(...arguments);
    this.RangeId = "";
    this.BoxComp = undefined;
  }
  Constructor() {}
  EditorInit() {
    super.EditorInit();
    this.RangeId = this.ActorGuid?.ToString();
  }
  ReceiveBeginPlay() {
    if (ModelManager_1.ModelManager.RangeItemModel && this.RangeId) {
      ModelManager_1.ModelManager.RangeItemModel.AddBoxRange(this.RangeId, this);
      this.SetActorTickEnabled(false);
    } else {
      this.SetActorTickEnabled(true);
    }
  }
  ReceiveTick(e) {
    if (ModelManager_1.ModelManager.RangeItemModel && this.RangeId) {
      ModelManager_1.ModelManager.RangeItemModel.AddBoxRange(this.RangeId, this);
      this.SetActorTickEnabled(false);
    }
  }
  ReceiveEndPlay() {
    if (this.RangeId) {
      ModelManager_1.ModelManager.RangeItemModel.RemoveBoxRange(this.RangeId);
    }
  }
}
exports.default = TsBoxRangeItem;
//# sourceMappingURL=TsBoxRangeItem.js.map