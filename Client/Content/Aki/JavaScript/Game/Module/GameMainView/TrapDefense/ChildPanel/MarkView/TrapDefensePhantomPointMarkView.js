"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefensePhantomPointMarkView = undefined;
const UE = require("ue");
const TrapDefenseDefine_1 = require("../../../../TrapDefense/TrapDefenseDefine");
const TrapDefenseMarkView_1 = require("./TrapDefenseMarkView");
class TrapDefensePhantomPointMarkView extends TrapDefenseMarkView_1.TrapDefenseMarkView {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnBeforeShow() {
    this.Kbe();
  }
  Kbe() {
    const e = this.GetSprite(0);
    if (this.GetMarkData().IsActivated()) {
      this.SetSpriteByPath(TrapDefenseDefine_1.PHANTOM_POINT_ACTIVATED_ICON_PATH, e, true, undefined, () => {
        e.SetUIActive(true);
      });
    } else {
      this.SetSpriteByPath(TrapDefenseDefine_1.PHANTOM_POINT_ICON_PATH, e, true, undefined, () => {
        e.SetUIActive(true);
      });
    }
  }
  OnTowerDefenseStepUpdate(e) {
    if (e === 1) {
      this.Kbe();
    }
  }
}
exports.TrapDefensePhantomPointMarkView = TrapDefensePhantomPointMarkView;
//# sourceMappingURL=TrapDefensePhantomPointMarkView.js.map