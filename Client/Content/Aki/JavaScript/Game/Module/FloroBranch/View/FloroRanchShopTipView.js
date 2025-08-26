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
    this.RAu = [];
    this.wAu = -1;
    this.LDu = () => {};
    this.uod = () => {};
    this.Xuu = undefined;
    this.rcu = async () => {
      var i = new FloroRanchToyGridItem_1.FloroRanchToyGridItem();
      i.BindClickCallback(this.kdu);
      var t = this.GetItem(3);
      var e = this.GetItem(2);
      var t = LguiUtil_1.LguiUtil.CopyItem(t, e);
      await i.CreateThenShowByActorAsync(t.GetOwner());
      this.RAu.push(i);
    };
    this.mqu = i => {
      this.CloseMe();
      this.LDu?.(this.wAu);
    };
    this.kdu = i => {
      this.$du(i);
    };
    this.LAu = () => {
      var i;
      if (this.wAu !== -1 && (i = this.RAu[this.wAu])) {
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
    this.RAu.length = 0;
    this.wAu = -1;
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnableToyCount;
    for (let i = 0; i < e; i++) {
      t.push(this.rcu());
    }
    await Promise.all(t);
    this.Xuu = new FloroRanchCommonTipItem_1.FloroRanchCommonTipItem();
    this.Xuu.TermGroup = 4;
    var i = this.GetItem(1);
    await this.Xuu.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnBeforeShow() {
    var i;
    var t = this.OpenParam;
    if (t && (i = t.ToyPoint, this.LDu = t.SellCallback, this.uod = t.ShowToyListCallback, this.LDu) && this.uod) {
      this.uod(false);
      this.PAu();
      this.$du(i);
    }
  }
  OnBeforeHide() {
    this.uod(true);
  }
  PAu() {
    var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnableToyCount;
    var e = [];
    for (let i = 0; i < t; i++) {
      var s = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetToyEntityByPoint(i);
      e.push(s || undefined);
    }
    for (let i = 0; i < this.RAu.length; i++) {
      var h = this.RAu[i];
      if (e[i]) {
        h.RefreshItemGrid(e[i]);
      } else {
        h.RefreshItemGrid(undefined);
      }
    }
  }
  $du(i) {
    this.LAu();
    if (this.wAu !== i) {
      this.wAu = i;
    }
    var t = this.RAu[this.wAu];
    if (t) {
      t.SetSelectState(true);
    }
    var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetToyEntityByPoint(i);
    if (t) {
      this.Xuu.RefreshInfoTipByParam({
        TipType: 0,
        EntityData: t,
        RemoveCallback: this.mqu
      });
    }
  }
  gPe() {
    this.wAu = -1;
  }
}
exports.FloroRanchShopTipView = FloroRanchShopTipView;
//# sourceMappingURL=FloroRanchShopTipView.js.map