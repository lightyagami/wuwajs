"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectBadgeSkillItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class CollectBadgeSkillItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText]];
  }
  Refresh(e, r, t) {
    var i = e.GroupId;
    var e = e.SkillId;
    var i = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeCollectCountByGroupId(i);
    var i = i.Now >= i.Need;
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleSkillConfig(e);
    var a = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name);
    a.SetChangeColor(!i, a.changeColor);
    var l = this.GetText(2);
    l.SetChangeColor(!i, a.changeColor);
    LguiUtil_1.LguiUtil.SetLocalTextNew(l, e.Desc, ...e.DescParams);
    this.GetSprite(0).SetUIActive(i);
  }
  OnSelected(e) {}
  OnDeselected(e) {}
}
exports.CollectBadgeSkillItem = CollectBadgeSkillItem;
//# sourceMappingURL=CollectBadgeSkillItem.js.map