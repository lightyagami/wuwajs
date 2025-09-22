"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorViewComponentBase = undefined;
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class RoleFavorViewComponentBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ContentData = undefined;
    this.IsActive = false;
  }
  SetData(e, t = true) {
    this.ContentData = e;
    this.IsActive = t;
    this.OnSetData(e);
    if (t) {
      this.OnRefreshView();
    }
    this.SetComponentActive(t);
  }
  OnSetData(e) {}
  OnRefreshView() {}
  SetComponentActive(e) {
    this.IsActive = e;
    if (this.RootItem) {
      this.RootItem.SetUIActive(e);
    }
  }
  GetContentData() {
    return this.ContentData;
  }
  OnBeforeDestroy() {
    this.ContentData = undefined;
    this.IsActive = false;
  }
}
exports.RoleFavorViewComponentBase = RoleFavorViewComponentBase;
//# sourceMappingURL=RoleFavorViewComponentBase.js.map