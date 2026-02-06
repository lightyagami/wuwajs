"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayShopUtil = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CommonGameplayShopExchangePopViewProxy_1 = require("./Data/CommonGameplayShopExchangePopViewProxy");
class GameplayShopUtil {
  static SetText(e, a) {
    if (e && a) {
      if (a.Content) {
        e.SetText(a.Content);
      } else if (a.Data) {
        this.SetTextByData(e, a.Data);
      }
    }
  }
  static SetTextByData(e, a) {
    var i;
    if (e && a && (i = a.TextKey)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, i, ...a.Params);
    }
  }
  static OpenExchangePopView(e) {
    var a = new CommonGameplayShopExchangePopViewProxy_1.CommonGameplayShopExchangePopViewProxy();
    a.UpdateFromPayShopGoods(e);
    UiManager_1.UiManager.OpenView("GameplayExchangePopView", a);
  }
}
exports.GameplayShopUtil = GameplayShopUtil;
//# sourceMappingURL=GameplayShopUtil.js.map