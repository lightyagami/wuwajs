"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CollectBadgeSkillItem = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class CollectBadgeSkillItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText]
    ]
  }
  Refresh(e, r, t) {
    var i = e.GroupId,
      e = e.SkillId,
      i = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeCollectCountByGroupId(i),
      i = i.Now >= i.Need,
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleSkillConfig(e),
      a = this.GetText(1),
      l = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name), a.SetChangeColor(!i, a.changeColor), this.GetText(2));
    l.SetChangeColor(!i, a.changeColor), LguiUtil_1.LguiUtil.SetLocalTextNew(l, e.Desc, ...e.DescParams), this.GetSprite(0).SetUIActive(i)
  }
  OnSelected(e) {}
  OnDeselected(e) {}
}
exports.CollectBadgeSkillItem = CollectBadgeSkillItem;
//# sourceMappingURL=CollectBadgeSkillItem.js.map