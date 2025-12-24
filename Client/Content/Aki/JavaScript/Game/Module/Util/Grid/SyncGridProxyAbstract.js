"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SyncGridProxyAbstract = undefined;
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class SyncGridProxyAbstract extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.GridIndex = 0;
  }
  Refresh(e) {}
  Clear() {}
  async OnCreateAsync() {}
  async OnBeforeStartAsync() {}
}
exports.SyncGridProxyAbstract = SyncGridProxyAbstract;
//# sourceMappingURL=SyncGridProxyAbstract.js.map