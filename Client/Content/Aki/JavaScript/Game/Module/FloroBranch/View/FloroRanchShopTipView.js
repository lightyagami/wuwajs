"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchShopTipView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FloroRanchCommonTipItem_1 = require("./Item/FloroRanchCommonTipItem");
const FloroRanchToyGridItem_1 = require("./Item/FloroRanchToyGridItem");
class FloroRanchShopTipView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.eAu = [];
    this.tAu = -1;
    this.YUu = () => {};
    this.cuu = undefined;
    this.yuu = async () => {
      var i = new FloroRanchToyGridItem_1.FloroRanchToyGridItem();
      i.BindClickCallback(this.Zcu);
      var t = this.GetItem(3);
      var e = this.GetItem(2);
      var t = LguiUtil_1.LguiUtil.CopyItem(t, e);
      await i.CreateThenShowByActorAsync(t.GetOwner());
      this.eAu.push(i);
    };
    this.GBu = i => {
      this.CloseMe();
      this.YUu?.(this.tAu);
    };
    this.Zcu = i => {
      this.hdu(i);
    };
    this.iAu = () => {
      var i;
      if (this.tAu !== -1 && (i = this.eAu[this.tAu])) {
        i.SetSelectState(false);
      }
    };
    this.lyt = () => {
      this.CloseMe();
      this.gPe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.lyt]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.eAu.length = 0;
    this.tAu = -1;
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnableToyCount;
    for (let i = 0; i < e; i++) {
      t.push(this.yuu());
    }
    await Promise.all(t);
    this.cuu = new FloroRanchCommonTipItem_1.FloroRanchCommonTipItem();
    var i = this.GetItem(1);
    await this.cuu.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnBeforeShow() {
    var i;
    var t = this.OpenParam;
    if (t && (i = t.ToyPoint, this.YUu = t.SellCallback, this.YUu)) {
      this.oAu();
      this.hdu(i);
    }
  }
  oAu() {
    var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnableToyCount;
    var e = [];
    for (let i = 0; i < t; i++) {
      var s = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetToyEntityByPoint(i);
      e.push(s || undefined);
    }
    for (let i = 0; i < this.eAu.length; i++) {
      var h = this.eAu[i];
      if (e[i]) {
        h.RefreshItemGrid(e[i]);
      } else {
        h.RefreshItemGrid(undefined);
      }
    }
  }
  hdu(i) {
    this.iAu();
    if (this.tAu !== i) {
      this.tAu = i;
    }
    var t = this.eAu[this.tAu];
    if (t) {
      t.SetSelectState(true);
    }
    var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetToyEntityByPoint(i);
    if (t) {
      this.cuu.RefreshInfoTipByParam({
        TipType: 0,
        EntityData: t,
        RemoveCallback: this.GBu
      });
    }
  }
  gPe() {
    this.tAu = -1;
  }
}
exports.FloroRanchShopTipView = FloroRanchShopTipView;
//# sourceMappingURL=FloroRanchShopTipView.js.map