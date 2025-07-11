"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreasureBoxDetectorMarkItemView = undefined;
const UE = require("ue");
const TreasureBoxDetectorItemRangeHandle_1 = require("./Handles/TreasureBoxDetectorItemRangeHandle");
const ServerMarkItemView_1 = require("./ServerMarkItemView");
class TreasureBoxDetectorMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e);
    this.KRi = undefined;
    this.kh_ = undefined;
    this.KRi = new UE.VectorDouble();
  }
  OnInitialize() {
    super.OnInitialize();
    this.kh_.SetVisible(true);
  }
  OnReset() {
    super.OnReset();
    this.kh_.SetVisible(true);
  }
  CreateComponentHandles() {
    super.CreateComponentHandles();
    this.kh_ = this.Oh_(this.MarkComponentContext);
    this.MarkItemComponentHandleMap.set(2, this.kh_);
  }
  Oh_(e) {
    return new TreasureBoxDetectorItemRangeHandle_1.TreasureBoxDetectorItemRangeHandle(e);
  }
  SetScale(e) {
    if (this.IsHolderValid()) {
      this.KRi.Set(e, e, e);
      this.RootItem.D_SetWorldScale3D(this.KRi);
      this.kh_?.UpdateRangeScale();
    }
  }
}
exports.TreasureBoxDetectorMarkItemView = TreasureBoxDetectorMarkItemView;
//# sourceMappingURL=TreasureBoxDetectorMarkItemView.js.map