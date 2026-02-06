"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureSlotScrollItem = undefined;
const UE = require("ue");
const RomanNumeralUtils_1 = require("../../../../../Core/Utils/RomanNumeralUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class FurnitureSlotScrollItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.OnItemSelected = undefined;
    this.z8u = t => {
      if (t === 1) {
        this.OnItemSelected?.(this.GridIndex ?? 0);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.z8u]];
  }
  Refresh(t, s, e) {
    this.Pe = t;
    this.RefreshItemToggle();
    this.RefreshRedDot();
    this.RefreshLine();
    this.RefreshTagIndex();
    this.RefreshIcon();
  }
  RefreshItemToggle() {
    this.GetExtendToggle(0).SetToggleState(this.Pe?.IsSelected ? 1 : 0);
  }
  RefreshRedDot() {
    this.GetItem(2).SetUIActive(this.Pe?.RedDotShowState ?? false);
  }
  RefreshLine() {
    this.GetItem(5).SetUIActive(this.Pe?.LineShowState ?? false);
  }
  RefreshTagIndex() {
    var t = this.Pe?.ShowTagIndex ?? false;
    this.GetItem(3).SetUIActive(t);
    if (t) {
      t = RomanNumeralUtils_1.RomanNumeralUtils.ConvertToRoman(this.Pe?.TagIndex ?? 0);
      this.GetText(4).SetText(t);
    }
  }
  RefreshIcon() {
    var t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureTagConfig(this.Pe?.TagId ?? 0);
    if (t) {
      t = (this.Pe?.PlacedFurnitureId ?? 0) > 0 ? t.OccupiedIcon : t.EmptyIcon;
      this.SetSpriteByPath(t, this.GetSprite(1), false);
    }
  }
}
exports.FurnitureSlotScrollItem = FurnitureSlotScrollItem;
//# sourceMappingURL=FurnitureSlotScrollItem.js.map