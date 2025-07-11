"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefensePhantomSkillItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class TowerDefensePhantomSkillItem extends GridProxyAbstract_1.GridProxyAbstract {
  Refresh(t, e, i) {
    var r = this.GetText(0);
    if (StringUtils_1.StringUtils.IsEmpty(t.SkillTextId)) {
      r?.SetUIActive(false);
    } else {
      r?.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.SkillTextId);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Text_InstanceDungeonRecommendLevel_Text", t.Level);
    if (t.DescriptionArgs) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.DescriptionTextId, ...t.DescriptionArgs);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.DescriptionTextId);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText]];
  }
}
exports.TowerDefensePhantomSkillItem = TowerDefensePhantomSkillItem;
//# sourceMappingURL=TowerDefencePhantomSkillItem.js.map