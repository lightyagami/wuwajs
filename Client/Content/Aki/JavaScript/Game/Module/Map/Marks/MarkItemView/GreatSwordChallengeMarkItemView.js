"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GreatSwordChallengeMarkItemView = undefined;
const ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class GreatSwordChallengeMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
    this.tZu = undefined;
    this.tZu = e;
  }
  OnInitialize() {
    super.OnInitialize();
  }
  OnAfterShow() {
    this.tZu.UpdateIconPath?.();
    this.OnIconPathChanged(this.Holder.IconPath);
  }
  RegisterEvents() {}
  UnRegisterEvents() {}
  OnSafeUpdate(e, t, s) {
    this.tZu.UpdateIconPath?.();
    this.OnIconPathChanged(this.Holder.IconPath);
  }
  OnIconPathChanged(e) {
    super.OnIconPathChanged(this.Holder.IconPath);
  }
}
exports.GreatSwordChallengeMarkItemView = GreatSwordChallengeMarkItemView;
//# sourceMappingURL=GreatSwordChallengeMarkItemView.js.map