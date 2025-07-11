"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridDevelopRewardComponent = exports.DevelopRewardItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class DevelopRewardItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  SetIsUnlock(e) {
    this.GetItem(0).SetUIActive(e);
    this.GetItem(1).SetUIActive(!e);
  }
}
exports.DevelopRewardItem = DevelopRewardItem;
class MediumItemGridDevelopRewardComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.Swt = 0;
    this.ywt = 0;
    this.sGe = (e, t, i) => {
      const s = new DevelopRewardItem();
      s.CreateByActorAsync(t.GetOwner()).then(() => {
        s.SetIsUnlock(i < this.ywt);
        s.SetUiActive(true);
      }, () => {});
      return {
        Key: i,
        Value: s
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem]];
  }
  GetResourceId() {
    return "UiItem_ItemVisionMap";
  }
  OnActivate() {
    this.eGe = new GenericLayoutNew_1.GenericLayoutNew(this.GetLayoutBase(0), this.sGe, this.GetItem(1));
  }
  OnDeactivate() {
    this.eGe.ClearChildren();
    this.eGe = undefined;
  }
  OnRefresh(e) {
    if (e && e.IsUnlock) {
      this.Swt = e.DevelopRewardLevel;
      this.ywt = e.UnlockLevel;
      this.eGe.RebuildLayoutByDataNew(undefined, this.Swt);
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
}
exports.MediumItemGridDevelopRewardComponent = MediumItemGridDevelopRewardComponent;
//# sourceMappingURL=MediumItemGridDevelopRewardComponent.js.map