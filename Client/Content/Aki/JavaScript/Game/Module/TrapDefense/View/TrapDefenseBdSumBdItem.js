"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdSumBdItem = undefined;
const UE = require("ue");
const Macro_1 = require("../../../../Core/Preprocessor/Macro");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const TrapDefenseBdSumBdProgressItem_1 = require("./TrapDefenseBdSumBdProgressItem");
class TrapDefenseBdSumBdItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
    this.ClickCallBack = undefined;
    this.LayoutProgress = undefined;
    this.CreateItemLayoutProgress = () => new TrapDefenseBdSumBdProgressItem_1.TrapDefenseBdSumBdProgressItem();
    this.OnClickToggleRoot = e => {
      if (e === 1) {
        this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UILayoutBase], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickToggleRoot]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetLayoutBase(6);
    var t = this.GetItem(7)?.GetOwner();
    this.LayoutProgress = new GenericLayout_1.GenericLayout(e, this.CreateItemLayoutProgress, t);
  }
  async RefreshAsync(e) {
    var t = !(this.ItemData = e).IsUnlockInTheUi();
    this.GetItem(9)?.SetUIActive(t);
    this.GetItem(8)?.SetUIActive(!t);
    this.GetText(3)?.ShowTextNew(e.Config.Name);
    this.SetTextureByPath(e.Config.Icon, this.GetTexture(2));
    await this.UpdateProgress();
  }
  async UpdateProgress() {
    var e;
    var t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBdSum.IsInstance;
    var s = this.GetText(5);
    var i = this.GetText(4);
    this.LayoutProgress.SetActive(t);
    s.SetUIActive(t);
    if (t) {
      t = this.ItemData.GetCurActiveQualityPool();
      i?.ShowTextNew("TrapDefense_BdSumBdItemDescQuality" + t);
      e = this.ItemData.GetCurrentActiveProgressNum();
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, "TrapDefense_BdSumBdItem_ProgressRichText", e, this.ItemData.SumProgress);
      s = this.GetTexture(1);
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_GangsItemLight_" + t);
      this.SetTextureByPath(e, s);
      await this.LayoutProgress.RefreshByDataAsync(this.ItemData.GetBdProgressInfoList());
    } else {
      i?.ShowTextNew(this.ItemData.Config.SimpleDesc);
    }
  }
  OnSelected() {
    this.GetExtendToggle(0)?.SetToggleState(1);
    this.ClickCallBack?.(this.ItemData);
    this.LayoutProgress.GetLayoutItemList().forEach(e => {
      e.SetQualityArrowShow(true);
    });
  }
  OnDeselected() {
    this.GetExtendToggle(0)?.SetToggleState(0);
    this.LayoutProgress.GetLayoutItemList().forEach(e => {
      e.SetQualityArrowShow(false);
    });
  }
}
exports.TrapDefenseBdSumBdItem = TrapDefenseBdSumBdItem;
//# sourceMappingURL=TrapDefenseBdSumBdItem.js.map