"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponReplaceMediumItemGrid = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class WeaponReplaceMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnSelected(e) {
    if (e) {
      this.SetSelected(true, true);
    }
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  OnRefresh(e, o, t) {
    var r = e.IncId;
    var r = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(r);
    var d = r.GetWeaponConfig();
    var d = {
      Type: 4,
      Data: e,
      ItemConfigId: e.ItemId,
      IsLockVisible: e.GetIsLock(),
      StarLevel: d.QualityId,
      Level: r.GetResonanceLevel(),
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [r.GetLevel()],
      RoleHeadInfo: {
        RoleConfigId: e.RoleId
      }
    };
    this.Apply(d);
    this.SetSelected(o, true);
  }
}
exports.WeaponReplaceMediumItemGrid = WeaponReplaceMediumItemGrid;
//# sourceMappingURL=WeaponReplaceMediumItemGrid.js.map