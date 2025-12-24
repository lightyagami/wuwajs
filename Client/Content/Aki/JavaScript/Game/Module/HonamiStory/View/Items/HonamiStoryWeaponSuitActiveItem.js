"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryWeaponSuitActiveItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const START_SHOW_MIN_COUNT = 2;
class HonamiStoryWeaponSuitActiveItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.yvm = undefined;
    this.E0i = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnBeforeCreateImplement() {
    this.yvm = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.yvm);
  }
  Refresh(e) {
    var i;
    var t = e.SuitId;
    var e = e.EquipData?.IsSuitActivate(t);
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponSuitData(t);
    var t = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetPluginSubType(t.WeaponPluginType);
    let r = 0;
    if (e) {
      i = e.NeedCount - START_SHOW_MIN_COUNT;
      i = e.CurCount - i;
      if ((e = e.CurCount >= e.NeedCount) && e !== this.E0i) {
        this.yvm?.PlaySequence("Burst");
      }
      this.E0i = e;
      r = i >= 2 ? 2 : i >= 1 ? 1 : 0;
    }
    e = {
      [0]: t.ActiveSpritePath,
      1: t.ActiveOneSpritePath,
      2: t.ActiveAllSpritePath
    }[r] || t.ActiveSpritePath;
    if (e.length > 0) {
      this.SetSpriteByPath(e, this.GetSprite(0), true);
    }
  }
}
exports.HonamiStoryWeaponSuitActiveItem = HonamiStoryWeaponSuitActiveItem;
//# sourceMappingURL=HonamiStoryWeaponSuitActiveItem.js.map