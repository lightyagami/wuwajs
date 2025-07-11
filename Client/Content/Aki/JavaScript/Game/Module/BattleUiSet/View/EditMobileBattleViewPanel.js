"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditMobileBattleViewPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const EditMobileBattleViewPanelItem_1 = require("./EditMobileBattleViewPanelItem");
class EditMobileBattleViewPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Wgt = new Map();
    this.Kgt = undefined;
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    await this.Qgt(e.PanelData, e.BattleViewBaseActor);
  }
  OnBeforeDestroy() {
    this.Kgt = undefined;
    this.PanelData = undefined;
    this.Xgt = undefined;
    this.Wgt.clear();
  }
  async Qgt(e, t) {
    this.PanelData = e;
    this.Xgt = t;
    this.Kgt = this.RootActor.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass());
    var i = [];
    var a = e?.GetPanelItemDataMap();
    if (e?.IsOnlyPanelEdit) {
      t = {
        PanelItemData: a.get(-1),
        PanelItem: this.RootItem,
        BattleViewBaseActor: this.Xgt
      };
      t = (e = new EditMobileBattleViewPanelItem_1.EditMobileBattleViewPanelItem()).CreateThenShowByActorAsync(this.RootActor, t);
      i.push(t);
      this.Wgt.set(-1, e);
    } else {
      var s = this.Kgt.Components;
      for (let e = 0; e < s.Num(); e++) {
        var r;
        var l;
        var n = s.Get(e);
        if (n && n.GetUIItem().IsUIActiveSelf() && n.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass())) {
          r = {
            PanelItemData: a?.get(e),
            PanelItem: this.RootItem,
            BattleViewBaseActor: this.Xgt
          };
          n = (l = new EditMobileBattleViewPanelItem_1.EditMobileBattleViewPanelItem()).CreateThenShowByActorAsync(n, r);
          i.push(n);
          this.Wgt.set(e, l);
        }
      }
      await Promise.all(i);
    }
  }
  ResetAllPanelItem() {
    for (const e of this.Wgt.values()) {
      if (e.PanelItemData) {
        e.Reset();
      }
    }
  }
  SavePanelItem() {
    for (const e of this.Wgt.values()) {
      e.OnSave();
    }
  }
  GetPanelItem(e) {
    return this.Wgt.get(e);
  }
  RefreshHierarchyIndex(e) {
    for (const a of this.Wgt.values()) {
      var t;
      var i = a.PanelItemData;
      if (i) {
        t = a.GetRootItem();
        i.EditorHierarchyIndex = t.GetHierarchyIndex();
      }
    }
  }
  IsAnyItemOverlap(t) {
    var i = this.Kgt.Components;
    for (let e = 0; e < i.Num(); e++) {
      var a = this.GetPanelItem(e);
      if (a) {
        a = a.PanelItemData;
        if (!a || a.IsCheckOverlap) {
          a = i.Get(e);
          if (a && a instanceof UE.UIBaseActor) {
            a = a.GetUIItem();
            if (a.IsUIActiveInHierarchy() && a.IsRaycastTarget() && a !== t && a.GetOverlapWith(t)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
}
exports.EditMobileBattleViewPanel = EditMobileBattleViewPanel;
//# sourceMappingURL=EditMobileBattleViewPanel.js.map