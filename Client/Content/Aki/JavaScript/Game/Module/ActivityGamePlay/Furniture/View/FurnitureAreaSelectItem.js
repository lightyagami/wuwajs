"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureAreaSelectItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FurnitureAreaSelectItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Leg = t => {
      if (t === 1 && this.Pe) {
        this.Pe.OnSelected(this.Pe.AreaId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UIText], [7, UE.UIText], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Leg]];
  }
  Refresh(t) {
    this.Pe = t;
    this.RefreshToggleState();
    this.RefreshProgress();
    this.RefreshRedDot();
    this.RefreshShowState();
  }
  RefreshToggleState() {
    if (this.Pe) {
      this.GetExtendToggle(0).SetToggleState(this.Pe.IsSelected ? 1 : 0);
    }
  }
  RefreshProgress() {
    var t;
    var i;
    if (this.Pe) {
      t = this.Pe.PlacedSlotCount === this.Pe.MaxSlotCount;
      (i = this.GetText(7)).SetChangeColor(t, i.changeColor);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "DIY_RegionAtmosphere_Content_1", this.Pe.PlacedSlotCount, this.Pe.MaxSlotCount);
    }
  }
  RefreshRedDot() {
    if (this.Pe) {
      this.GetItem(8).SetUIActive(this.Pe.RedDotShowState);
    }
  }
  RefreshShowState() {
    if (this.Pe) {
      this.GetItem(1).SetUIActive(!this.Pe.IsUnlock);
      this.GetItem(4).SetUIActive(this.Pe.IsUnlock);
      this.SetSpriteByPath(this.Pe.UnlockAreaIcon, this.GetSprite(5), false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), this.Pe.AreaName);
      this.SetSpriteByPath(this.Pe.LockAreaIcon, this.GetSprite(2), false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.Pe.AreaName);
    }
  }
}
exports.FurnitureAreaSelectItem = FurnitureAreaSelectItem;
//# sourceMappingURL=FurnitureAreaSelectItem.js.map