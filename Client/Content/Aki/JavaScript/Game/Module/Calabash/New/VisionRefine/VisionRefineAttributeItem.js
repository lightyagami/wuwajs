"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineAttributeItemData = exports.VisionRefineAttributeItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionRefineAttributeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnSelectedCallback = undefined;
    this.OnDeselectedCallback = undefined;
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.eTt = () => {
      var i = this.GetExtendToggle(0)?.GetToggleState();
      if (i !== undefined) {
        switch (i) {
          case 1:
            this.OnSelected(false);
            break;
          case 0:
            this.OnDeselected(false);
        }
      }
    };
  }
  Refresh(i, t, s) {
    var e = this.GetExtendToggle(0);
    e.SetSelfInteractive(i.CanInteractive);
    e.SetToggleState(i.IsChosen ? 1 : 0, false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.NameTextId);
    this.GetText(3)?.SetText(i.NumberText ?? "");
    if (i.ForceCheckboxActive !== undefined) {
      this.GetUiExtendToggleSpriteTransition(4)?.RootUIComp.SetUIActive(i.ForceCheckboxActive);
    }
    if (i.HasNewIcon === undefined) {
      this.GetItem(5)?.SetUIActive(false);
    } else {
      this.GetItem(5)?.SetUIActive(true);
      this.GetItem(5)?.SetAlpha(i.HasNewIcon ? 1 : 0);
    }
    this.GetItem(6)?.SetUIActive(false);
    this.GetTexture(1)?.SetUIActive(i.IsRecommend);
    if (i.HasNewIcon) {
      this.GetItem(6)?.SetUIActive(true);
    }
  }
  Clear() {}
  OnSelected(i) {
    if (this.OnSelectedCallback !== undefined && !this.OnSelectedCallback(this.GridIndex)) {
      this.GetExtendToggle(0)?.SetToggleState(0);
    }
  }
  OnDeselected(i) {
    if (this.OnDeselectedCallback !== undefined && !this.OnDeselectedCallback(this.GridIndex)) {
      this.GetExtendToggle(0)?.SetToggleState(1);
    }
  }
  GetKey(i, t) {
    return i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIExtendToggleSpriteTransition], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  async OnBeforeStartAsync() {
    this.GetItem(6)?.SetUIActive(false);
    return Promise.resolve();
  }
}
exports.VisionRefineAttributeItem = VisionRefineAttributeItem;
class VisionRefineAttributeItemData {
  constructor() {
    this.NameTextId = "";
    this.NumberText = undefined;
    this.ForceCheckboxActive = undefined;
    this.CanInteractive = true;
    this.IsChosen = false;
    this.HasNewIcon = undefined;
    this.IsRecommend = false;
  }
}
exports.VisionRefineAttributeItemData = VisionRefineAttributeItemData;
//# sourceMappingURL=VisionRefineAttributeItem.js.map