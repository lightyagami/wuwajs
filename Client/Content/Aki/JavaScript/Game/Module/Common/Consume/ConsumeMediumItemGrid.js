"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsumeMediumItemGrid = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../MediumItemGrid/LoopScrollMediumItemGrid");
class ConsumeMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, o, t) {
    var i = ConfigManager_1.ConfigManager.InventoryConfig;
    var r = e[0].ItemId;
    var n = e[0].IncId;
    var s = e[1];
    if (r === 0) {
      const l = {
        Type: 1
      };
      this.Apply(l);
    } else {
      var a = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(r);
      if (a) {
        i = i.GetItemDataTypeByConfigId(r);
        if (i === 3) {
          var d = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(n);
          const l = {
            Type: 4,
            Data: e,
            ItemConfigId: d.GetConfigId(true),
            BottomTextId: a.Name,
            StarLevel: a.QualityId,
            Level: d.GetCost(),
            IsLevelTextUseChangeColor: true,
            ReduceButtonInfo: {
              IsVisible: true,
              LongPressConfigId: 1
            }
          };
          l.BottomTextId = "VisionLevel";
          l.BottomTextParameter = [d.GetPhantomLevel()];
          l.VisionFetterGroupId = d.GetFetterGroupId();
          this.Apply(l);
        } else if (i === 2) {
          d = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(n);
          const l = {
            Type: 4,
            Data: e,
            ItemConfigId: r,
            BottomTextId: "Text_LevelShow_Text",
            BottomTextParameter: [d.GetLevel()],
            StarLevel: a.QualityId,
            Level: d.GetResonanceLevel(),
            ReduceButtonInfo: {
              IsVisible: true,
              LongPressConfigId: 1
            }
          };
          this.Apply(l);
        } else {
          const l = {
            Type: 4,
            Data: e,
            ItemConfigId: r,
            StarLevel: a.QualityId,
            ReduceButtonInfo: {
              IsVisible: true,
              LongPressConfigId: 1
            }
          };
          if (n !== undefined && n > 0) {
            l.BottomTextId = a.Name;
          } else {
            l.BottomText = s.toString();
          }
          this.Apply(l);
        }
      }
    }
  }
}
exports.ConsumeMediumItemGrid = ConsumeMediumItemGrid;
//# sourceMappingURL=ConsumeMediumItemGrid.js.map