"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CostContentItemContext = exports.RoleBreakPreviewContext = exports.RoleBreakPreviewViewModel = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const CostMediumItemGrid_1 = require("../RoleBreach/CostMediumItemGrid");
const RoleBreakPreviewView_1 = require("./RoleBreakPreviewView");
class RoleBreakPreviewViewModel {
  constructor() {
    this.OLn = undefined;
    this.kLn = undefined;
    this.FLn = undefined;
    this.VLn = -1;
    this.CreateLevelLayoutGrid = () => new RoleBreakPreviewView_1.LevelLayoutGrid(this);
    this.aPn = t => {
      var e = t.Data;
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.ItemId);
      t.MediumItemGrid.SetSelected(true, true);
    };
    this.CreateItemLayoutGrid = () => {
      var t = new CostMediumItemGrid_1.CostMediumItemGrid();
      t.BindOnExtendToggleClicked(this.aPn);
      return t;
    };
  }
  Dispose() {
    this.VLn = -1;
    this.UnbindView();
    this.UnbindCostContentItem();
  }
  get CachedRoleInstance() {
    return this.FLn;
  }
  set CachedRoleInstance(t) {
    if (!this.FLn || !t) {
      this.FLn = t;
    }
  }
  get ChosenLevel() {
    return this.VLn;
  }
  set ChosenLevel(t) {
    var e = this.CachedRoleInstance.GetLevelData().GetMaxBreachLevel();
    let s = t;
    if (s < 1) {
      s = 1;
    } else if (s > e) {
      s = e;
    }
    this.VLn = s;
    this.OLn.ChosenLevel = s;
    this.kLn.ChosenLevel = s;
  }
  BindView(t) {
    this.OLn = new RoleBreakPreviewContext(this, t);
  }
  UnbindView() {
    this.OLn?.Dispose();
    this.OLn = undefined;
  }
  BindCostContentItem(t) {
    this.kLn = new CostContentItemContext(this, t);
  }
  UnbindCostContentItem() {
    this.kLn?.Dispose();
    this.kLn = undefined;
  }
  HandleViewOnStart() {
    var t = this.CachedRoleInstance.GetLevelData().GetBreachLevel();
    this.ChosenLevel = t + 1;
  }
  HandleCostContentItemOnStart() {
    var t = this.CachedRoleInstance.GetLevelData();
    this.kLn.ChosenLevel = t.GetBreachLevel();
  }
  HandleViewClosePromise(t) {
    t.then(() => {
      this.CachedRoleInstance = undefined;
    }).catch(() => {});
  }
  HandleItemOnClickToggle(t) {
    this.ChosenLevel = t + 1;
  }
  HandleClickLeft() {
    this.ChosenLevel = this.ChosenLevel - 1;
  }
  HandleClickRight() {
    this.ChosenLevel = this.ChosenLevel + 1;
  }
  BuildLevelLayoutData(e) {
    var s = [];
    var i = this.CachedRoleInstance.GetLevelData();
    var o = i.GetBreachLevel();
    for (let t = 0; t < i.GetMaxBreachLevel(); t++) {
      var h = t + 1;
      s.push({
        IsChosen: h === e,
        IsAvailable: t < o,
        LevelContent: h
      });
    }
    return s;
  }
  BuildItemLayoutData(t) {
    var e;
    var s;
    var i = this.CachedRoleInstance.GetLevelData();
    var o = i.GetBreachLevel() >= t;
    var h = [];
    for ([e, s] of i.GetBreachConfig(t).BreachConsume) {
      if (e !== ItemDefines_1.EItemId.Gold) {
        h.push({
          ItemId: e,
          Count: s,
          IncId: 0,
          SelectedCount: o ? 0 : ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e),
          OnlyTextFlag: o
        });
      }
    }
    return h;
  }
  BuildCostContentItemData(t) {
    var e;
    var s;
    let i = 0;
    for ([e, s] of this.CachedRoleInstance.GetLevelData().GetBreachConfig(t).BreachConsume) {
      if (e === ItemDefines_1.EItemId.Gold) {
        i = s;
        break;
      }
    }
    return {
      CostNum: i,
      CostType: ItemDefines_1.EItemId.Gold
    };
  }
}
exports.RoleBreakPreviewViewModel = RoleBreakPreviewViewModel;
class RoleBreakPreviewContext {
  constructor(t, e) {
    this.HLn = undefined;
    this.jLn = undefined;
    this.WLn = -1;
    this.KLn = [];
    this.QLn = undefined;
    this.VLn = -1;
    this.HLn = t;
    this.jLn = e;
  }
  Dispose() {}
  get LevelContent() {
    return this.WLn;
  }
  set LevelContent(t) {
    this.WLn = t;
    this.jLn.RefreshLevelContent(t);
  }
  get LevelLayout() {
    return this.KLn;
  }
  set LevelLayout(t) {
    this.KLn = t;
    this.jLn.RefreshLevelLayout(t);
  }
  get ItemLayout() {
    return this.QLn;
  }
  set ItemLayout(t) {
    if (this.QLn = t) {
      this.jLn.RefreshItemLayout(t);
    }
  }
  get ChosenLevel() {
    return this.VLn;
  }
  set ChosenLevel(t) {
    this.VLn = t;
    var e = this.HLn.CachedRoleInstance.GetLevelData();
    var s = e.GetBreachLevel();
    var i = e.GetMaxBreachLevel();
    var e = e.GetBreachConfig(t).MaxLevel;
    if (t <= s) {
      this.jLn.RefreshLevelContentItem(false);
      this.jLn.RefreshHasBrokenTip(true);
    } else {
      this.jLn.RefreshLevelContentItem(true);
      this.jLn.RefreshHasBrokenTip(false);
      this.LevelContent = e;
    }
    this.jLn.RefreshLeftButton(t !== 1);
    this.jLn.RefreshRightButton(t !== i);
    this.LevelLayout = this.HLn.BuildLevelLayoutData(t);
    this.ItemLayout = this.HLn.BuildItemLayoutData(t);
  }
}
exports.RoleBreakPreviewContext = RoleBreakPreviewContext;
class CostContentItemContext {
  constructor(t, e) {
    this.HLn = undefined;
    this.XLn = undefined;
    this.$Ln = 0;
    this.YLn = ItemDefines_1.EItemId.Gold;
    this.VLn = -1;
    this.HLn = t;
    this.XLn = e;
  }
  Dispose() {}
  get CostNumber() {
    return this.$Ln;
  }
  set CostNumber(t) {
    this.$Ln = t;
    this.XLn.RefreshCostNumber(t.toString());
  }
  get MoneyIcon() {
    return this.YLn;
  }
  set MoneyIcon(t) {
    this.YLn = t;
    this.XLn.RefreshMoneyIcon(t);
  }
  get ChosenLevel() {
    return this.VLn;
  }
  set ChosenLevel(t) {
    this.VLn = t;
    t = this.HLn.BuildCostContentItemData(t);
    if (t) {
      this.CostNumber = t.CostNum;
      this.MoneyIcon = t.CostType;
      this.XLn.Show();
    } else {
      this.XLn.Hide();
    }
  }
}
exports.CostContentItemContext = CostContentItemContext;
//# sourceMappingURL=RoleBreakPreviewViewModel.js.map