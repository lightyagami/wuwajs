"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBattleSkillItem = undefined;
const Info_1 = require("../../../../../Core/Common/Info");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BattleSkillItem_1 = require("../../../BattleUi/Views/BattleSkillItem");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseBattleSkillItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments);
    this.Zud = false;
  }
  RefreshTrapDefenseSkillCoolDown() {
    var e;
    var t = ModelManager_1.ModelManager.TowerDefensePlayerModel?.CurrentFollowerProxyId;
    if (t && (e = ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.GetFollowerSkillRemainCD(t)) > 0) {
      this.PlaySkillCd(e, ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.GetFollowerSkillCD(t));
    }
  }
  IsNeedLongPress() {
    return !this.Zud && this.SkillButtonData.GetIsLongPressControlCamera();
  }
  RefreshSkillName() {
    var e = this.SkillButtonData.GetSkillIconName();
    if (!StringUtils_1.StringUtils.IsBlank(e) && Info_1.Info.IsInTouch()) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.SkillNameText, e);
      this.SkillNameText.SetUIActive(true);
    } else {
      this.SkillNameText.SetUIActive(false);
    }
  }
  SetIsBanLongPress(e) {
    this.Zud = e;
  }
}
exports.TrapDefenseBattleSkillItem = TrapDefenseBattleSkillItem;
//# sourceMappingURL=TrapDefenseBattleSkillItem.js.map