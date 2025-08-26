"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridTagsComponent = undefined;
const UE = require("ue");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridTagsComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments);
    this.nUc = [];
    this.mQt = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UISprite]];
  }
  OnStart() {
    this.GetSprite(1)?.SetUIActive(false);
  }
  GetResourceId() {
    return "UiItem_EnemyItemState";
  }
  OnRefresh(t) {
    var e = !!t?.length;
    this.SetActive(e);
    if (e) {
      this.mQt = t;
      this.lKu();
    }
  }
  lKu() {
    for (let t = this.mQt.length; t < this.nUc.length; t++) {
      this.nUc[t].SetUIActive(false);
    }
    this.mQt.forEach((t, e) => {
      const i = this._Ku(e);
      i.SetUIActive(true);
      i.SetAlpha(0);
      this.SetSpriteAsync(t, i, false).then(() => {
        i.SetAlpha(1);
      });
    });
  }
  _Ku(t) {
    var e;
    return this.nUc[t] || (t = this.GetSprite(1), e = this.GetLayoutBase(0).RootUIComp, t = LguiUtil_1.LguiUtil.CopyItem(t, e), this.nUc.push(t), t);
  }
}
exports.MediumItemGridTagsComponent = MediumItemGridTagsComponent;
//# sourceMappingURL=MediumItemGridTagsComponent.js.map