"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrArchiveMenuItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class InfrArchiveMenuItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.SelectedCallBack = undefined;
    this.Bke = t => {
      if (t === 1) {
        this.SelectedCallBack(this.Pe.CardType);
      } else {
        this.GetExtendToggle(0).SetToggleState(1, false);
      }
    };
  }
  get CardType() {
    return this.Pe.CardType;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.Bke]];
  }
  Refresh(t) {
    this.Pe = t;
    this.GetText(1).ShowTextNew(t.DesText);
  }
  SetToggleClickCb(t) {
    this.SelectedCallBack = t;
  }
  SetToggleSelected(t) {
    this.GetExtendToggle(0).SetToggleState(t);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e = this.GetExtendToggle(0)?.GetRootComponent();
    if (e) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.InfrArchiveMenuItem = InfrArchiveMenuItem;
//# sourceMappingURL=InfrArchiveMenuItem.js.map