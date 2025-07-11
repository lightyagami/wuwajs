"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographTab = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class PhotographTab extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem]];
  }
  OnBeforeShow() {
    this.RefreshRedDot();
  }
  RefreshRedDot() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FilterRedPoint, true);
    this.GetItem(1)?.SetUIActive(e);
  }
}
exports.PhotographTab = PhotographTab;
//# sourceMappingURL=PhotographTab.js.map