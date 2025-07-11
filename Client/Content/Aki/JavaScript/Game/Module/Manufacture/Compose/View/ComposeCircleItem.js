"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeCircleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AutoAttachItem_1 = require("../../../AutoAttach/AutoAttachItem");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const tempVector = new UE.Vector();
class ComposeCircleItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.ButtonFunction = undefined;
    this.CheckToggleCanClick = undefined;
    this.$8i = undefined;
    this.ItemCurve = undefined;
    this.Xpt = () => {
      this.ButtonFunction?.(this.$8i, this.$8i.MainType, true);
      this.GetExtendToggle(1)?.SetToggleStateForce(1, false);
    };
    this.UHl = () => !this.CheckToggleCanClick || this.CheckToggleCanClick();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIExtendToggle], [2, UE.UISprite], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIText]];
    this.BtnBindInfo = [[1, this.Xpt]];
  }
  OnStart() {
    this.GetExtendToggle(1)?.CanExecuteChange.Bind(this.UHl);
  }
  OnMoveItem() {
    var t = this.GetCurrentMovePercentage();
    var t = this.ItemCurve.GetFloatValue(t);
    tempVector.X = t;
    tempVector.Y = t;
    tempVector.Z = 1;
    this.GetExtendToggle(1)?.RootUIComp.SetUIItemScale(tempVector);
  }
  OnRefreshItem(t) {
    var e;
    var i;
    if ((this.$8i = t) && (e = t.MainType === 4 ? t.ConfigId : ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(t.ConfigId)?.ItemId, i = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(e), LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "ItemTipsHaveNum", i), i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e)) && (this.SetTextureByPath(i.Icon, this.GetTexture(3)), e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(i.QualityId))) {
      this.SetSpriteByPath(e.ComposeQualityBg, this.GetSprite(2), false);
      i = ModelManager_1.ModelManager.ComposeModel.GetSameGroupItem(this.$8i);
      if (this.$8i?.ConfigId === i[0].ConfigId) {
        this.GetSprite(0)?.SetUIActive(false);
      }
      if (!t.IsUnlock) {
        this.GetItem(4).SetUIActive(true);
      }
    }
  }
  OnSelect() {
    this.ButtonFunction?.(this.$8i, this.$8i.MainType);
    this.GetExtendToggle(1)?.SetToggleStateForce(1, false);
  }
  OnUnSelect() {
    this.GetExtendToggle(1)?.SetToggleStateForce(0, false);
  }
}
exports.ComposeCircleItem = ComposeCircleItem;
//# sourceMappingURL=ComposeCircleItem.js.map