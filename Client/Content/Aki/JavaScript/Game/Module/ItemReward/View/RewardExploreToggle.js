"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardExploreToggle = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreToggle extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Afi = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIExtendToggle], [0, UE.UIText]];
  }
  OnStart() {
    this.Afi = this.GetExtendToggle(1);
  }
  OnBeforeDestroy() {
    this.Afi = undefined;
  }
  Refresh(e) {
    if (e.OnToggleClick) {
      this.Afi.OnStateChange.Add(e.OnToggleClick);
    }
    if (!StringUtils_1.StringUtils.IsEmpty(e.DescriptionTextId)) {
      this.Ubt(e.DescriptionTextId);
    }
  }
  Ubt(e) {
    var t;
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      t = this.GetText(0);
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
    }
  }
  GetToggleState() {
    return this.Afi?.GetToggleState();
  }
}
exports.RewardExploreToggle = RewardExploreToggle;
//# sourceMappingURL=RewardExploreToggle.js.map