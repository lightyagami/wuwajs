"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditMobileBattleView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const EditMobileBattleViewPanel_1 = require("./EditMobileBattleViewPanel");
class EditMobileBattleView extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Kot = new Map();
    this.CreateThenShowByResourceIdAsync("UiView_FightEdit", e);
  }
  async OnBeforeStartAsync() {
    await this.jgt();
  }
  OnAfterShow() {
    var e = ModelManager_1.ModelManager.BattleUiSetModel;
    for (const t of e.GetPanelItemDataMap().values()) {
      if (t.IsDefaultSelected) {
        e.SetPanelItemSelected(t);
        break;
      }
    }
  }
  async jgt() {
    var t = ModelManager_1.ModelManager.BattleUiSetModel.GetPanelDataMap();
    var a = this.RootActor.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass()).Components;
    var i = [];
    for (let e = 0; e < a.Num(); e++) {
      var r;
      var s;
      var n = a.Get(e);
      if (n && n.GetUIItem().IsUIActiveSelf() && (r = t.get(e))) {
        r = {
          PanelData: r,
          BattleViewBaseActor: this.RootActor
        };
        n = (s = new EditMobileBattleViewPanel_1.EditMobileBattleViewPanel()).CreateThenShowByActorAsync(n, r);
        i.push(n);
        this.Kot.set(e, s);
      }
    }
    await Promise.all(i);
  }
  ResetAllPanelItem() {
    for (const e of this.Kot.values()) {
      e.ResetAllPanelItem();
    }
  }
  SavePanelItem() {
    for (const e of this.Kot.values()) {
      e.SavePanelItem();
    }
  }
  GetPanel(e) {
    return this.Kot.get(e);
  }
  GetPanelItem(e) {
    var t = this.Kot.get(e.PanelIndex);
    if (t) {
      return t.GetPanelItem(e.PanelItemIndex);
    }
  }
  RefreshHierarchyIndex() {
    for (const a of this.Kot.values()) {
      var e = a.PanelData;
      var t = a.GetRootItem();
      if (e) {
        e = t.GetHierarchyIndex();
        a.RefreshHierarchyIndex(e);
      }
    }
  }
  IsAnyItemOverlap(e) {
    for (const t of this.Kot.values()) {
      if (t.IsAnyItemOverlap(e)) {
        return true;
      }
    }
    return false;
  }
}
exports.EditMobileBattleView = EditMobileBattleView;
//# sourceMappingURL=EditMobileBattleView.js.map