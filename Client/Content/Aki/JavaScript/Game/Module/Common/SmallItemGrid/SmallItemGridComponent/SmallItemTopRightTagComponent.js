"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmallItemTopRightTagComponent = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemTopRightTagComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  OnRefresh(t) {
    var e = t.TopRightTextId;
    var i = t.TopRightText;
    var r = StringUtils_1.StringUtils.IsEmpty(e);
    var o = StringUtils_1.StringUtils.IsEmpty(i);
    var l = !r || !o;
    this.SetActive(l);
    if (l && (l = this.GetText(1), e && !r ? (r = t.TopRightTextParameter, LguiUtil_1.LguiUtil.SetLocalTextNew(l, e, r)) : i && !o && l.SetText(i), (e = t.TopRightTextBgColor) && this.GetSprite(0).SetColor(UE.Color.FromHex(e)), r = t.TopRightTextColor)) {
      this.GetText(1).SetColor(UE.Color.FromHex(r));
    }
  }
  GetResourceId() {
    return "UiItem_ItemTopRightText";
  }
  GetLayoutLevel() {
    return 1;
  }
}
exports.SmallItemTopRightTagComponent = SmallItemTopRightTagComponent;
//# sourceMappingURL=SmallItemTopRightTagComponent.js.map