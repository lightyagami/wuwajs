"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryWeaponPanelItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const HonamiStoryUtil_1 = require("../../HonamiStoryUtil");
const HonamiStoryWeaponToggleItem_1 = require("./HonamiStoryWeaponToggleItem");
const BARSPRITE_MAP = new Map([[1, "SP_Offensive"], [2, "SP_Exploration"], [3, "SP_Survivability"]]);
class HonamiStoryWeaponPanelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.izd = undefined;
    this.rzd = undefined;
    this.oam = [];
    this.ozd = () => {
      var e = new HonamiStoryWeaponToggleItem_1.HonamiStoryWeaponToggleItem();
      e.BindWeaponToggleClick(this.izd);
      this.oam.push(e);
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIText], [3, UE.UISprite]];
  }
  OnStart() {
    this.rzd = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.ozd);
  }
  async RefreshAsync(e, t, i) {
    var a = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponDataListByType(e);
    var o = [];
    var n = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(BARSPRITE_MAP.get(e)) ?? "";
    this.SetSpriteByPath(n, this.GetSprite(3), false);
    var n = "HonamiStory_Weapon_Type_" + e;
    this.GetText(2)?.ShowTextNew(n);
    var r = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
    a.sort((e, t) => e.WeaponId - t.WeaponId);
    for (const s of a) {
      if (!r || ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponEquipState(s.WeaponId) !== undefined) {
        o.push({
          WeaponId: s.WeaponId,
          UseWay: 1
        });
      }
    }
    await this.rzd.RefreshByDataAsync(o);
  }
  BindWeaponToggleClick(e) {
    this.izd = e;
  }
  GetWeaponToggleList() {
    return this.oam;
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.HonamiStoryWeaponPanelItem = HonamiStoryWeaponPanelItem;
//# sourceMappingURL=HonamiStoryWeaponPanelItem.js.map