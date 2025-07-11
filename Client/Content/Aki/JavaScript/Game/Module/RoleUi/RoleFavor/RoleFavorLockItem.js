"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorLockItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleFavorLockItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, s) {
    super();
    this.huo = s;
    if (e) {
      this.CreateThenShowByActor(e.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText]];
  }
  OnStart() {
    var e;
    var s;
    if (this.huo) {
      e = this.huo.Desc;
      s = this.huo.IsLock;
      this.GetText(3).SetText(e);
      this.GetText(2).SetText(e);
      this.GetItem(1).SetUIActive(s);
      this.GetItem(0).SetUIActive(!s);
    }
  }
  OnBeforeDestroy() {
    this.huo = undefined;
  }
}
exports.RoleFavorLockItem = RoleFavorLockItem;
//# sourceMappingURL=RoleFavorLockItem.js.map