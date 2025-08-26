"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseLevelItem = undefined;
const UE = require("ue");
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const TrapDefenseLevelStarItem_1 = require("./TrapDefenseLevelStarItem");
class TrapDefenseLevelItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
    this.OnSelectLevelCallBack = undefined;
    this.LayoutStar = undefined;
    this.CreateItemStar = () => new TrapDefenseLevelStarItem_1.TrapDefenseLevelStarItem();
    this.OnClickToggleSelf = () => {
      if (this.ScrollViewDelegate?.GetSelectedGridIndex() === this.GridIndex) {
        this.GetExtendToggle(0)?.SetToggleStateForce(1);
      } else {
        ModelManager_1.ModelManager.GuideModel.FinishFocusGuideGroupOnView("TrapDefenseMainLevelView");
        this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIExtendToggleTextureTransition], [2, UE.UIArtText], [3, UE.UIText], [4, UE.UILayoutBase], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickToggleSelf]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetLayoutBase(4);
    var t = this.GetItem(5)?.GetOwner();
    this.LayoutStar = new GenericLayout_1.GenericLayout(e, this.CreateItemStar, t);
  }
  async RefreshAsync(e) {
    this.ItemData = e;
    this.GetArtText(2)?.SetText(e.Position.toString());
    this.GetText(3)?.ShowTextNew(e.Config.Name);
    this.GetItem(8)?.SetUIActive(!e.IsUnlock);
    let t = true;
    for (const s of e.GetStarStateList()) {
      if (!s) {
        t = false;
        break;
      }
    }
    this.GetItem(7)?.SetUIActive(t);
    this.UpdateLevelBg();
    await this.LayoutStar.RefreshByDataAsync(e.GetStarStateList());
  }
  UpdateLevelBg() {
    var e = this.ItemData.IsEndless;
    var t = this.GetUiExtendToggleTextureTransition(1);
    t.RootUIComp.SetUIActive(!e);
    if (!e) {
      this.SetExtendToggleTextureTransitionByPath(this.ItemData.Config.LevelNameImage, t);
    }
    this.GetItem(6)?.SetUIActive(e);
  }
  OnSelected(e) {
    this.GetExtendToggle(0)?.SetToggleStateForce(1);
    this.OnSelectLevelCallBack?.(this);
  }
  OnDeselected(e) {
    this.GetExtendToggle(0)?.SetToggleStateForce(0);
  }
}
exports.TrapDefenseLevelItem = TrapDefenseLevelItem;
//# sourceMappingURL=TrapDefenseLevelItem.js.map