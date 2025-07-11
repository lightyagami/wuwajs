"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialDataItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class TutorialDataItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RRo = undefined;
    this.URo = undefined;
    this.N8e = t => {
      if (t === 1) {
        t = this.GetExtendToggle(2);
        this.URo(this.RRo, t);
      }
    };
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
  }
  ClearItem() {}
  GetUsingItem(t) {
    return (t.IsTypeTitle ? this.GetItem(0) : this.GetRootItem()).GetOwner();
  }
  Update(t, i) {
    if ((this.RRo = t).IsTypeTitle) {
      this.kxt();
    } else {
      this.ARo();
    }
  }
  InitData(t) {
    this.RRo = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIExtendToggle], [3, UE.UIItem], [4, UE.UIText]];
    this.BtnBindInfo = [[2, this.N8e]];
  }
  SetOnToggleSelected(t) {
    this.URo = t;
  }
  kxt() {
    this.GetItem(0).SetUIActive(true);
    this.GetExtendToggle(2).RootUIComp.SetUIActive(false);
    var t = this.GetText(1);
    if (this.RRo.Text) {
      t.SetText(this.RRo.Text);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, this.RRo.TextId);
    }
  }
  ARo() {
    this.GetItem(0).SetUIActive(false);
    var t = this.GetExtendToggle(2);
    t.RootUIComp.SetUIActive(true);
    var i = this.GetText(4);
    if (this.RRo.Text) {
      i.SetText(this.RRo.Text);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, this.RRo.TextId);
    }
    this.RefreshRed();
    t.SetToggleState(0, false);
    if (this.RRo.Selected) {
      this.OnSelected(true);
    }
  }
  RefreshRed() {
    if (!this.RRo.IsTypeTitle) {
      this.GetItem(3).SetUIActive(this.RRo.SavedData.HasRedDot);
    }
  }
  OnSelected(t) {
    this.GetExtendToggle(2).SetToggleState(1, t);
    this.N8e(1);
  }
  OnBeforeDestroy() {
    this.RRo &&= undefined;
  }
}
exports.TutorialDataItem = TutorialDataItem;
//# sourceMappingURL=TutorialDataItem.js.map