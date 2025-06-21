"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleComponentBase = void 0;
const UiManager_1 = require("../../../../Ui/UiManager"),
  HotKeyComponent_1 = require("../HotKeyComponent");
class PhantomArenaBattleComponentBase extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments), this.ProxyInternal = void 0
  }
  get Proxy() {
    var e;
    return this.ProxyInternal || (e = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView"), this.ProxyInternal = e?.OpenParam), this.ProxyInternal
  }
  OnRefreshSelfHotKeyState(e) {
    this.Proxy ? this.Proxy.IsInPanelInteract ? this.Proxy.IsMainInVisible ? this.OnRefreshSelfHotKeyStateIsMainInVisible() : this.SetVisibleMode(2, !1) : this.OnRefreshSelfHotKeyStateImplement() : this.SetVisibleMode(2, !1)
  }
  OnRefreshSelfHotKeyStateImplement() {
    this.SetVisibleMode(2, !0)
  }
  OnRefreshSelfHotKeyStateIsMainInVisible() {
    this.SetVisibleMode(2, !1)
  }
}
exports.PhantomArenaBattleComponentBase = PhantomArenaBattleComponentBase;
//# sourceMappingURL=PhantomArenaBattleComponentBase.js.map