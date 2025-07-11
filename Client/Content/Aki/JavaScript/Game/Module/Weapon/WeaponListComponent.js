"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponListComponent = undefined;
const GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew");
const WeaponItemSmallItemGrid_1 = require("./WeaponItemSmallItemGrid");
class WeaponListComponent {
  constructor() {
    this.Dki = undefined;
    this.xqe = undefined;
    this.Iko = undefined;
    this.InitWeaponItem = () => {
      var t = new WeaponItemSmallItemGrid_1.WeaponItemSmallItemGrid();
      t.BindOnExtendToggleStateChanged(this.N8e);
      t.BindOnCanExecuteChange(this.A5e);
      return t;
    };
    this.A5e = (t, e, i) => this.GetCurSelectedData() !== t;
    this.N8e = t => {
      if (t.State === 1 && (t = t.MediumItemGrid) instanceof WeaponItemSmallItemGrid_1.WeaponItemSmallItemGrid) {
        this.Tko(t.GridIndex);
      }
    };
    this.Tko = t => {
      this.xqe.GetGenericLayout()?.DeselectCurrentGridProxy();
      this.xqe.GetGenericLayout()?.SelectGridProxy(t);
      this.Iko?.();
    };
  }
  Init(t) {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(t, this.InitWeaponItem);
  }
  SetWeaponChangeCallBack(t) {
    this.Iko = t;
  }
  async UpdateDataList(t) {
    this.Dki = t;
    this.xqe.SetActive(t.length > 1);
    await this.xqe.RefreshByDataAsync(this.Dki);
  }
  SetCurSelect(t) {
    var e;
    if (!!this.Dki && !(t < 0) && !(t >= this.Dki.length) && t !== this.xqe.GetGenericLayout().GetSelectedGridIndex()) {
      if (e = this.xqe.GetScrollItemByIndex(t)) {
        e?.SetSelected(true);
        this.Tko(t);
      }
    }
  }
  GetCurSelectedData() {
    var t = this.xqe.GetGenericLayout().GetSelectedGridIndex();
    if (!!this.Dki && !(t < 0) && !(t >= this.Dki.length)) {
      return this.Dki[t];
    }
  }
  CancelSelect() {
    this.xqe.GetGenericLayout()?.DeselectCurrentGridProxy();
  }
}
exports.WeaponListComponent = WeaponListComponent;
//# sourceMappingURL=WeaponListComponent.js.map