"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMsgPhraseItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PhoneMsgPhraseItem extends GridProxyAbstract_1.GridProxyAbstract {
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
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
  }
  OnStart() {
    super.OnStart();
    var t = this.GetText(1);
    t.bGameRichText = true;
    t.richText = true;
    var t = this.GetExtendToggle(0);
    t.OnPointDownCallBack.Bind(this.kqe);
    t.CanExecuteChange.Bind(this.Lke);
  }
  Refresh(t, s, e) {
    this.Data = t;
    this.GetText(1).SetText(t);
  }
}
exports.PhoneMsgPhraseItem = PhoneMsgPhraseItem;
//# sourceMappingURL=PhoneMsgPhraseItem.js.map