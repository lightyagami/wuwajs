"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBattleSkillItem = undefined;
const Info_1 = require("../../../../../Core/Common/Info");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TDPlayerController_1 = require("../../../../KuroSimpleCombat/TD/TDPlayer/TDPlayerController");
const BattleSkillItem_1 = require("../../../BattleUi/Views/BattleSkillItem");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseBattleSkillItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments);
    this.FSd = false;
  }
  RefreshTrapDefenseSkillCoolDown() {
    var e;
    var t = TDPlayerController_1.TowerDefensePlayerController.GetFollowerProxyId();
    if (t && (e = TDPlayerController_1.TowerDefensePlayerController.GetFollowerSkillRemainCD(t)) > 0) {
      this.PlaySkillCd(e, TDPlayerController_1.TowerDefensePlayerController.GetFollowerSkillCD(t));
    }
  }
  IsNeedLongPress() {
    return !this.FSd && this.SkillButtonData.GetIsLongPressControlCamera();
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
    this.FSd = e;
  }
}
exports.TrapDefenseBattleSkillItem = TrapDefenseBattleSkillItem;
//# sourceMappingURL=TrapDefenseBattleSkillItem.js.map