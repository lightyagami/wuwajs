"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardExploreTargetReached = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreTargetReached extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.CreateThenShowByActor(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
    this.BtnBindInfo = [];
  }
  Refresh(e) {
    this.Rfi(e.IsReached);
    this.Ufi(e.DescriptionTextId, e.Target);
  }
  Rfi(e) {
    this.GetSprite(0).SetUIActive(e);
  }
  Ufi(e, t) {
    var i = this.GetText(1);
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      i.SetUIActive(false);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, e, ...t);
      i.SetUIActive(true);
    }
  }
}
exports.RewardExploreTargetReached = RewardExploreTargetReached;
//# sourceMappingURL=RewardExploreTargetReached.js.map