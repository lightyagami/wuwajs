"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardDetailAttributeItem = exports.CardDetailAttributeItemData = void 0;
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class CardDetailAttributeItemData {
  constructor() {
    this.AttributeName = "", this.AttributeValue = 0, this.IsHighLight = !1
  }
}
exports.CardDetailAttributeItemData = CardDetailAttributeItemData;
const HIGH_LIGHT_BG_PATH = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity24/SoundRemnantArena/Outside/SP_CardAttrBg1.SP_CardAttrBg1",
  BG_PATH = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity24/SoundRemnantArena/Outside/SP_CardAttrBg2.SP_CardAttrBg2";
class CardDetailAttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.wWl = !0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText]
    ]
  }
  Refresh(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.AttributeName), this.GetText(2).SetText(t.AttributeValue.toString()), this.RefreshHighLightState(t.IsHighLight)
  }
  RefreshHighLightState(t) {
    var i, e, r, s;
    this.wWl !== t && (this.wWl = t, i = this.GetSprite(0), e = this.GetText(1), r = this.GetText(2), s = t ? HIGH_LIGHT_BG_PATH : BG_PATH, this.SetSpriteByPath(s, i, !1), i.SetChangeColor(s = !t, i.changeColor), e.SetChangeColor(s, e.changeColor), r.SetChangeColor(s, r.changeColor))
  }
}
exports.CardDetailAttributeItem = CardDetailAttributeItem;
//# sourceMappingURL=CardDetailAttributeItem.js.map