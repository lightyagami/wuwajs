"use strict";

var __decorate = this && this.__decorate || function (e, o, n, t) {
  var a;
  var r = arguments.length;
  var i = r < 3 ? o : t === null ? t = Object.getOwnPropertyDescriptor(o, n) : t;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, o, n, t);
  } else {
    for (var c = e.length - 1; c >= 0; c--) {
      if (a = e[c]) {
        i = (r < 3 ? a(i) : r > 3 ? a(o, n, i) : a(o, n)) || i;
      }
    }
  }
  if (r > 3 && i) {
    Object.defineProperty(o, n, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchUiPopupRewardComponent = undefined;
const UiManager_1 = require("../../../../Ui/UiManager");
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchEntityComponentBase_1 = require("./FloroRanchEntityComponentBase");
let FloroRanchUiPopupRewardComponent = class FloroRanchUiPopupRewardComponent extends FloroRanchEntityComponentBase_1.FloroRanchEntityComponentBase {
  async ShowPopupReward(e, o) {
    var n = this.OwnerEntity.GetUiItemComponent();
    var t = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
    if (t && (n = n.GetUiItem())) {
      await t.ShowPopupReward(n, e, o);
    }
  }
};
FloroRanchUiPopupRewardComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(6)], FloroRanchUiPopupRewardComponent);
exports.FloroRanchUiPopupRewardComponent = FloroRanchUiPopupRewardComponent; //# sourceMappingURL=FloroRanchUiPopupRewardComponent.js.map