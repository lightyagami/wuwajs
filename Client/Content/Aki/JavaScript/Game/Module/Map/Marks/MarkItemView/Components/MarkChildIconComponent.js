"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkChildIconComponent = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const MarkPanelBase_1 = require("../MarkPanelBase");
class MarkChildIconComponent extends MarkPanelBase_1.MarkPanelBase {
  constructor() {
    super(...arguments);
    this.n8 = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnStart() {
    this.GetSprite(0).SetUIActive(false);
    this.ehi();
  }
  ehi() {
    if (StringUtils_1.StringUtils.IsEmpty(this.n8)) {
      this.GetSprite(0).SetUIActive(false);
    } else {
      this.SetSpriteByPath(this.n8, this.GetSprite(0), false, undefined, () => {
        this.GetSprite(0).SetUIActive(true);
      });
    }
  }
  set Icon(t) {
    this.n8 = t;
    if (this.GetSprite(0)) {
      this.ehi();
    }
  }
  get Icon() {
    return this.n8;
  }
}
exports.MarkChildIconComponent = MarkChildIconComponent;
//# sourceMappingURL=MarkChildIconComponent.js.map