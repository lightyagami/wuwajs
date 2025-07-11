"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleLevelUpCostItem = undefined;
const UE = require("ue");
const LongPressButtonItem_1 = require("../../Common/Button/LongPressButtonItem");
const ItemGridVariantSelect_1 = require("../../Common/ItemGrid/ItemGridVariantSelect");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RoleLevelUpCostItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = undefined, e, s, i, r, h = undefined) {
    super();
    this.Buo = e;
    this.buo = s;
    this.Ruo = i;
    this.Uuo = r;
    this.BelongView = h;
    this.ebt = undefined;
    this.quo = undefined;
    this.Guo = undefined;
    if (t) {
      this.CreateThenShowByActor(t.GetOwner());
    }
  }
  Nuo() {
    return this.ebt.GetConfigId();
  }
  Refresh(t, e, s) {
    this.RefreshBySelectedData(t);
  }
  OnStart() {
    this.ebt = new ItemGridVariantSelect_1.ItemGridVariantSelect(this.RootItem.GetOwner(), undefined, this.BelongView);
    this.quo = new LongPressButtonItem_1.LongPressButtonItem(this.ebt.GetClickToggle(), 1, () => {
      this.Buo?.(this.Nuo());
    });
    this.quo.SetTickConditionDelegate(() => this.Ruo?.(this.Nuo()) ?? false);
    this.Guo = new LongPressButtonItem_1.LongPressButtonItem(this.ebt.GetReduceButton(), 1, () => {
      this.buo?.(this.Nuo());
    });
    this.Guo.SetTickConditionDelegate(() => this.Uuo?.(this.Nuo()) ?? false);
    this.ebt.SetToggleClickEvent((t, e) => {
      this.ebt.GetClickToggle().SetToggleState(0, false);
    });
    this.ebt.GetAddButton().RootUIComp.SetUIActive(false);
    this.ebt.RefreshItemShowState(true);
  }
  RefreshBySelectedData(t) {
    this.ebt.RefreshByItemId(t.ItemId);
    this.RefreshCountBySelectedData(t);
  }
  RefreshCountBySelectedData(t) {
    var e = t.SelectedCount;
    var t = t.Count;
    this.ebt.RefreshTextDown(true, e + "/" + t);
    this.ebt.GetReduceButton().RootUIComp.SetUIActive(e > 0);
  }
  OnBeforeDestroy() {
    this.quo.Clear();
    this.Guo.Clear();
  }
  GetUiItemForGuide() {
    return this.ebt?.GetClickToggle()?.GetOwner().GetComponentByClass(UE.UIItem.StaticClass());
  }
}
exports.RoleLevelUpCostItem = RoleLevelUpCostItem;
//# sourceMappingURL=RoleLevelUpCostItem.js.map