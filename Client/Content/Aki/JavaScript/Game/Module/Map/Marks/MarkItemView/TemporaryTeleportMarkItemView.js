"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemporaryTeleportMarkItemView = undefined;
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const TemporaryTeleportMarkItemChildIconHandle_1 = require("./Handles/TemporaryTeleportMarkItemChildIconHandle");
const ServerMarkItemView_1 = require("./ServerMarkItemView");
class TemporaryTeleportMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e);
  }
  OnViewRefresh() {
    this.OnIconPathChanged(this.Holder.IconPath);
    this.iYa();
  }
  OnSelectedStateChange(e) {
    if (this.Holder.IsServerDisable) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Map_TeleportMark_Disable_Tips");
    }
  }
  OnSafeUpdate(e, r, t) {
    if (this.Holder) {
      this.iYa();
    }
  }
  iYa() {
    var e = this.Holder;
    this.GetSprite(2)?.SetUIActive(e.IsServerDisable);
  }
  CreateChildIconHandle(e) {
    return new TemporaryTeleportMarkItemChildIconHandle_1.TemporaryTeleportMarkItemChildIconHandle(e);
  }
  UpdateIcon() {
    this.MarkItemChildIconHandle.Update();
    this.MarkItemChildIconHandle.ApplyModified();
  }
}
exports.TemporaryTeleportMarkItemView = TemporaryTeleportMarkItemView;
//# sourceMappingURL=TemporaryTeleportMarkItemView.js.map