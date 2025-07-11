"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInteractionPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const ItemInteractionPanelItemData_1 = require("../ItemInteractionPanelItemData");
const ItemInteractionMediumItemGrid_1 = require("./ItemInteractionMediumItemGrid");
const ItemInteractionPanelMainTypeItem_1 = require("./ItemInteractionPanelMainTypeItem");
class ItemInteractionPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.KPt = undefined;
    this.QPt = new Map();
    this.dgt = new Map();
    this.XPt = [];
    this.$Pt = [];
    this.YPt = new Map();
    this.JPt = undefined;
    this.zPt = undefined;
    this.ZPt = undefined;
    this.LPt = undefined;
    this.ext = undefined;
    this.aMa = undefined;
    this.cHe = () => {
      var t = new ItemInteractionMediumItemGrid_1.ItemInteractionMediumItemGrid();
      t.BindOnExtendToggleStateChanged(this.txt);
      t.BindOnCanExecuteChange(this.gke);
      t.BindReduceLongPress(this.ixt);
      return t;
    };
    this.ixt = (t, i, e) => {
      if (e && this.ZPt) {
        this.ZPt(e);
      }
    };
    this.txt = t => {
      t = t.Data;
      this.SetItemGridSelected(true, t);
      if (this.zPt) {
        this.zPt(t);
      }
    };
    this.gke = (t, i, e) => {
      return (!this.aMa || !this.aMa.IsSelected || t !== this.aMa) && !(this.$Pt.indexOf(t) < 0) && (!this.LPt || this.LPt(t));
    };
    this.oxt = t => {
      this.SelectedMainType(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UILoopScrollViewComponent], [6, UE.UIItem]];
  }
  OnStart() {
    this.JPt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(5), this.GetItem(6).GetOwner(), this.cHe);
  }
  async Refresh(t) {
    this.KPt = t;
    this.rxt();
    await this.nxt();
    t = this.XPt[0];
    if (t) {
      this.SelectedMainType(t);
    }
  }
  BindOnReduceButtonTrigger(t) {
    this.ZPt = t;
  }
  BindOnItemExtendToggleStateChanged(t) {
    this.zPt = t;
  }
  BindOnCanExecuteChange(t) {
    this.LPt = t;
  }
  OnBeforeDestroy() {
    this.XPt.length = 0;
    this.$Pt.length = 0;
    this.JPt = undefined;
    this.ext = undefined;
    this.QPt.clear();
    this.dgt.clear();
    this.zPt = undefined;
    this.ZPt = undefined;
    this.sxt();
  }
  rxt() {
    this.QPt.clear();
    this.dgt.clear();
    this.XPt.length = 0;
    this.$Pt.length = 0;
    var t = ConfigManager_1.ConfigManager.InventoryConfig;
    for (const n of this.KPt.ItemInfoList) {
      var i;
      var e;
      var s = n.ItemConfigId;
      var h = t.GetItemConfig(s);
      if (h) {
        i = h.MainTypeId;
        h = new ItemInteractionPanelItemData_1.ItemInteractionPanelItemData(n, h.QualityId);
        if (e = this.QPt.get(i)) {
          e.push(h);
        } else {
          this.QPt.set(i, [h]);
          this.XPt.push(i);
        }
        this.dgt.set(s, h);
      }
    }
    for (const r of this.QPt.values()) {
      r.sort((t, i) => {
        var e = t.GetQualityId();
        var s = i.GetQualityId();
        if (e !== s) {
          return e - s;
        } else if ((e = t.GetItemCount()) !== (s = i.GetItemCount())) {
          return s - e;
        } else {
          return t.ItemConfigId - i.ItemConfigId;
        }
      });
    }
  }
  async nxt() {
    this.sxt();
    var t = this.GetItem(4);
    var i = t.GetOwner();
    t.SetUIActive(true);
    var e = [];
    for (const n of this.XPt) {
      var s = LguiUtil_1.LguiUtil.DuplicateActor(i, this.GetItem(3));
      var h = new ItemInteractionPanelMainTypeItem_1.ItemInteractionPanelMainTypeItem();
      h.BindOnExtendToggleStateChanged(this.oxt);
      e.push(h.CreateByActorAsync(s, n));
      this.YPt.set(n, h);
    }
    await Promise.all(e);
    t.SetUIActive(false);
  }
  SelectedMainType(t) {
    this.RefreshItemPanel(this.QPt.get(t));
    this.ext?.SetSelected(false);
    t = this.YPt.get(t);
    if (t) {
      t.SetSelected(true);
      t.SetRedDotVisible(false);
      this.ext = t;
    }
  }
  SetMainTypeRedDotVisible(t, i) {
    this.YPt.get(t)?.SetRedDotVisible(i);
  }
  sxt() {
    for (const t of this.YPt.values()) {
      t.Destroy();
    }
    this.YPt.clear();
  }
  RefreshItemPanel(t) {
    this.JPt?.RefreshByData(t);
    this.$Pt = t;
    this.aMa = undefined;
  }
  RefreshItemGrid(t) {
    t = this.$Pt.indexOf(t);
    if (!(t < 0)) {
      this.JPt?.RefreshGridProxy(t);
    }
  }
  SetItemGridSelected(t, i) {
    var e = this.$Pt.indexOf(i);
    if (!(e < 0)) {
      i.IsSelected = t;
      this.aMa = t ? i : undefined;
      this.JPt?.RefreshGridProxy(e);
    }
  }
  GetCurrentItemDataList() {
    return this.$Pt;
  }
  GetItemData(t) {
    return this.dgt.get(t);
  }
  GetItemDataMainTypeMap() {
    return this.QPt;
  }
  GetMainTypeIdList() {
    return this.XPt;
  }
}
exports.ItemInteractionPanel = ItemInteractionPanel;
//# sourceMappingURL=ItemInteractionPanel.js.map