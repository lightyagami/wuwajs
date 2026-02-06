"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightGridMediumItemGrid = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const MediumItemGrid_1 = require("../../../../../Common/MediumItemGrid/MediumItemGrid");
class MotorFightGridMediumItemGrid extends MediumItemGrid_1.MediumItemGrid {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.OnClickCallBack = t => {};
    this.kqe = () => {
      this.Data.ReadItemRedDot();
      this.SetNewVisible(false);
      this.OnClickCallBack(this.Data);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MotorFightActivity", 71, "摩托战斗藏品界面点击了物品", ["itemId", this.Data.Id]);
      }
    };
  }
  OnStart() {
    this.GetItemGridExtendToggle().bLockStateOnSelect = true;
    this.BindOnExtendToggleStateChanged(this.kqe);
    this.SetUseFixedAsync(true);
  }
  Refresh(t) {
    t = {
      Type: 4,
      Data: this.Data = t,
      QualityIcon: ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightQuality(t.Quality).SmallGridBg,
      IconPath: t.Icon,
      BottomTextId: t.Name,
      IsLockVisible: !t.IsUnLock,
      IsDisable: !t.IsUnLock,
      IsNewVisible: t.HasItemRedDot
    };
    this.Apply(t);
  }
  SetToggleState(t) {
    t = t ? 1 : 0;
    this.GetItemGridExtendToggle().SetToggleState(t);
  }
}
exports.MotorFightGridMediumItemGrid = MotorFightGridMediumItemGrid;
//# sourceMappingURL=MotorFightGridMediumItemGrid.js.map