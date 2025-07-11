"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDifficultyItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const FloroRanchController_1 = require("../../FloroRanchController");
const FloroRanchDefine_1 = require("../../FloroRanchDefine");
class FloroRanchDifficultyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.OnToggleCallBack = undefined;
    this.kqe = () => {
      if (this.OnToggleCallBack) {
        this.OnToggleCallBack(this.Pe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(t, e, i) {
    var r = (this.Pe = t).Difficulty;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), FloroRanchDefine_1.floroRanchDifficultyTextId[r]);
    this.GetSprite(3)?.SetUIActive(!t.IsUnLock);
    this.GetSprite(2)?.SetUIActive(t.IsFinished);
    this.GetItem(4)?.SetUIActive(t.HasRedDot);
  }
  SetToggleCallBack(t) {
    this.OnToggleCallBack = t;
  }
  SetToggleState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t);
  }
  GetKey(t, e) {
    return t.Id;
  }
  OnSelected(t) {
    this.SetToggleState(true);
    this.GetItem(4)?.SetUIActive(false);
    if (this.Pe.HasRedDot) {
      FloroRanchController_1.FloroRanchController.RequestSubDungeonRead(this.Pe.Id);
    }
  }
  OnDeselected(t) {
    this.SetToggleState(false);
  }
}
exports.FloroRanchDifficultyItem = FloroRanchDifficultyItem;
//# sourceMappingURL=FloroRanchDifficultyItem.js.map