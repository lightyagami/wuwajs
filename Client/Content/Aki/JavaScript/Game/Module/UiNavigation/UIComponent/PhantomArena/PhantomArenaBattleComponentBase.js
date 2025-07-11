"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleComponentBase = undefined;
const UiManager_1 = require("../../../../Ui/UiManager");
const HotKeyComponent_1 = require("../HotKeyComponent");
class PhantomArenaBattleComponentBase extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.ProxyInternal = undefined;
  }
  get Proxy() {
    var e;
    if (!this.ProxyInternal) {
      e = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
      this.ProxyInternal = e?.OpenParam;
    }
    return this.ProxyInternal;
  }
  OnRefreshSelfHotKeyState(e) {
    if (this.Proxy) {
      if (this.Proxy.IsInPanelInteract) {
        if (this.Proxy.IsMainInVisible) {
          this.OnRefreshSelfHotKeyStateIsMainInVisible();
        } else {
          this.SetVisibleMode(2, false);
        }
      } else {
        this.OnRefreshSelfHotKeyStateImplement();
      }
    } else {
      this.SetVisibleMode(2, false);
    }
  }
  OnRefreshSelfHotKeyStateImplement() {
    this.SetVisibleMode(2, true);
  }
  OnRefreshSelfHotKeyStateIsMainInVisible() {
    this.SetVisibleMode(2, false);
  }
}
exports.PhantomArenaBattleComponentBase = PhantomArenaBattleComponentBase;
//# sourceMappingURL=PhantomArenaBattleComponentBase.js.map