"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemTipsComponentUtilTool = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const ItemDefine_1 = require("../../Item/ItemDefine");
const ItemTipsDefine_1 = require("./ItemTipsDefine");
class ItemTipsComponentUtilTool {
  static GetItemItemType(e) {
    var t = ItemTipsComponentUtilTool.OXs.get(e);
    if (t) {
      return t;
    }
    t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e);
    if (t !== undefined) {
      let e = ItemTipsComponentUtilTool.fxt.get(t);
      return e = e || 0;
    }
  }
  static GetTipsDataById(e, t, i) {
    var n;
    var o = this.GetItemItemType(e);
    var o = ItemTipsComponentUtilTool.pxt[o];
    if (o) {
      (n = new ItemDefine_1.ItemTipsParam()).ItemId = e;
      n.ItemUid = t || 0;
      n.ExtraParam = i;
      return new o(n);
    }
  }
  static GetTipsDataByPram(e) {
    var t = this.GetItemItemType(e.ItemId);
    var t = ItemTipsComponentUtilTool.pxt[t];
    if (t) {
      return new t(e);
    }
  }
  static GetTipsUiType(e) {
    return ItemTipsComponentUtilTool.UDl[e];
  }
}
(exports.ItemTipsComponentUtilTool = ItemTipsComponentUtilTool).pxt = {
  [0]: ItemTipsDefine_1.TipsMaterialData,
  1: ItemTipsDefine_1.TipsWeaponData,
  2: ItemTipsDefine_1.TipsVisionData,
  3: ItemTipsDefine_1.TipsCharacterData,
  4: ItemTipsDefine_1.TipsOverPowerData,
  5: ItemTipsDefine_1.TipsCardData,
  6: ItemTipsDefine_1.TipsAbyssDangoData,
  7: ItemTipsDefine_1.TipsHonamiStoryData,
  8: ItemTipsDefine_1.TipsFurnitureData
};
ItemTipsComponentUtilTool.UDl = {
  [0]: "ItemTipsComponent",
  1: "ItemTipsComponent",
  2: "ItemTipsComponent",
  3: "ItemTipsComponent",
  4: "PowerTipsItem",
  5: "PersonalCardPreviewComponent",
  6: "ItemTipsComponent",
  7: "HonamiStoryTipsItem",
  8: "FurnitureTipsItem"
};
ItemTipsComponentUtilTool.fxt = new Map([[3, 2], [2, 1], [1, 3], [6, 5], [13, 6], [17, 7], [24, 8]]);
ItemTipsComponentUtilTool.OXs = new Map([[ItemDefines_1.EItemId.OverPower, 4]]); //# sourceMappingURL=ItemTipsUtilTool.js.map