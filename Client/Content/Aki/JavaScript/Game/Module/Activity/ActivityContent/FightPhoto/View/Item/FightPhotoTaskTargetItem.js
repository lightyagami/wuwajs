"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoTaskTargetItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class FightPhotoTaskTargetItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText]];
  }
  Refresh(t, e, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t);
  }
  SetIsFinished(t) {
    this.GetSprite(1).SetUIActive(t);
    this.GetSprite(0).SetUIActive(!t);
  }
}
exports.FightPhotoTaskTargetItem = FightPhotoTaskTargetItem;
//# sourceMappingURL=FightPhotoTaskTargetItem.js.map