"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseCampMarkView = undefined;
const UE = require("ue");
const TrapDefenseDefine_1 = require("../../../../TrapDefense/TrapDefenseDefine");
const TrapDefenseMarkView_1 = require("./TrapDefenseMarkView");
class TrapDefenseCampMarkView extends TrapDefenseMarkView_1.TrapDefenseMarkView {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnBeforeShow() {
    const e = this.GetSprite(0);
    this.SetSpriteByPath(TrapDefenseDefine_1.CAMP_ICON_PATH, e, true, undefined, () => {
      e.SetUIActive(true);
    });
  }
}
exports.TrapDefenseCampMarkView = TrapDefenseCampMarkView;
//# sourceMappingURL=TrapDefenseCampMarkView.js.map