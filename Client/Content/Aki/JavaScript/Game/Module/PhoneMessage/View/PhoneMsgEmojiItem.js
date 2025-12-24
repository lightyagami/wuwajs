"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMsgEmojiItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PhoneMsgEmojiItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.OnClickDelegate = undefined;
    this.kqe = () => {
      this.OnClickDelegate?.(this.GridIndex);
    };
    this.Lke = () => false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture]];
  }
  OnStart() {
    super.OnStart();
    var t = this.GetExtendToggle(0);
    t.OnPointDownCallBack.Bind(this.kqe);
    t.CanExecuteChange.Bind(this.Lke);
  }
  Refresh(t, r, s) {
    this.Data = t;
    var e = this.GetTexture(1);
    var t = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(t);
    if (t) {
      t = t.ExpressionTexturePath;
      this.SetTextureByPath(t, e, undefined);
    }
  }
}
exports.PhoneMsgEmojiItem = PhoneMsgEmojiItem;
//# sourceMappingURL=PhoneMsgEmojiItem.js.map