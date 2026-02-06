"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardElementCountItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const CardElementItem_1 = require("./CardElementItem");
class CardElementCountItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.zeu = undefined;
    this.SelectCallBack = undefined;
    this.kqe = t => {
      if (t !== 0 && this.Pe) {
        this.SelectCallBack?.(this.Pe.ElementId);
        this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIExtendToggle], [3, UE.UISprite], [4, UE.UISprite]];
  }
  async OnBeforeStartAsync() {
    this.zeu = new CardElementItem_1.CardElementItem();
    await this.zeu.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.GetExtendToggle(2)?.OnStateChange.Add(this.kqe);
  }
  Refresh(t, e = 0, s) {
    this.Pe = t;
    this.Hxt();
    this.d7s();
  }
  Hxt() {
    switch (this.Pe.ElementId) {
      case -1:
        this.GetSprite(4)?.SetUIActive(true);
        this.zeu.SetActive(false);
        break;
      case 0:
        this.GetSprite(3)?.SetUIActive(true);
        this.zeu.SetActive(false);
        break;
      default:
        this.zeu.Refresh(this.Pe.ElementId);
        this.zeu.SetActive(this.Pe.ElementId !== 0);
    }
  }
  d7s() {
    var t = this.Pe.Count.toString();
    var e = this.Pe.All.toString();
    this.GetText(1).SetText(StringUtils_1.StringUtils.Format("{0}/{1}", t, e));
  }
  OnSelected(t) {
    this.GetExtendToggle(2)?.SetToggleState(1, t);
  }
  OnDeselected(t) {
    this.GetExtendToggle(2)?.SetToggleState(0, t);
  }
  GetKey(t, e) {
    return t.ElementId;
  }
}
exports.CardElementCountItem = CardElementCountItem;
//# sourceMappingURL=CardElementCountItem.js.map