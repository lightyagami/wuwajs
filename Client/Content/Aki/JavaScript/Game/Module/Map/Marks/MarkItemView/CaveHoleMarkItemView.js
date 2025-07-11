"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaveHoleMarkItemView = undefined;
const ConfigMarkItemView_1 = require("./ConfigMarkItemView");
const CaveHoleMarkItemChildIconHandle_1 = require("./Handles/CaveHoleMarkItemChildIconHandle");
class CaveHoleMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
    this.cil = undefined;
    this.cil = e;
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    this.cil = undefined;
  }
  UpdateIcon() {
    var e = this.MarkConfig.UnlockMarkPic;
    this.OnIconPathChanged(e);
  }
  OnAfterShow() {
    super.OnAfterShow();
    this.UpdateIcon();
  }
  OnIconPathChanged(e) {
    var t;
    if (this.cil !== undefined) {
      (t = this.GetSprite(1)).SetUIActive(true);
      this.LoadIcon(t, e);
      this.MarkItemChildIconHandle.Update();
      this.MarkItemChildIconHandle.ApplyModified();
    }
  }
  CreateChildIconHandle(e) {
    return new CaveHoleMarkItemChildIconHandle_1.CaveHoleMarkItemChildIconHandle(e);
  }
}
exports.CaveHoleMarkItemView = CaveHoleMarkItemView;
//# sourceMappingURL=CaveHoleMarkItemView.js.map