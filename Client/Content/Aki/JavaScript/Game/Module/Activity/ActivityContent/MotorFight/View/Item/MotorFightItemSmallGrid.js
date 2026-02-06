"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightItemSmallGrid = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const LoopScrollSmallItemGrid_1 = require("../../../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class MotorFightItemSmallGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.kqe = () => {
      this.GetExtendToggle(7)?.SetToggleState(0);
      UiManager_1.UiManager.OpenView("MotorFightItemTips", this.Data);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIText], [4, UE.UISprite], [6, UE.UIItem], [5, UE.UIItem], [7, UE.UIExtendToggle]];
    this.BtnBindInfo = [[7, this.kqe]];
  }
  OnRefresh(e, i, t) {
    this.Data = e;
    var r = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightQuality(e.Quality);
    this.SetSpriteByPath(r.SmallGridBg, this.GetSprite(0), false);
    this.SetTextureByPath(e.Icon, this.GetTexture(1));
    this.GetText(3)?.SetText(e.Count.toString());
    var r = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightItemType(e.Type);
    this.SetLeftTopIconVisible(r.Icon);
  }
}
exports.MotorFightItemSmallGrid = MotorFightItemSmallGrid;
//# sourceMappingURL=MotorFightItemSmallGrid.js.map