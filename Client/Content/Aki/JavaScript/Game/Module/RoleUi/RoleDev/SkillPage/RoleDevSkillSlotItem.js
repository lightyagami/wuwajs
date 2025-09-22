"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevSkillSlotItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RoleDevUtils_1 = require("../RoleDevUtils");
class RoleDevSkillSlotItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.Mmo = 0;
    this.Wft = 0;
    this.$Pd = 0;
    this.WPd = 0;
    this.QPd = false;
    this.KPd = false;
    this.NTt = undefined;
    this.OVd = () => {
      this.NTt?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.OVd]];
  }
  Refresh(i) {
    if (i) {
      this.dFe = i.RoleId;
      this.Mmo = i.SkillNodeId;
      this.Wft = i.CurrentLevel;
      this.$Pd = i.NormalTargetLevel;
      this.WPd = i.PerfectTargetLevel;
      this.KPd = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(this.dFe) === 0;
      this._do();
      this.uhd();
      this.wke();
      i = ModelManager_1.ModelManager.RoleModel?.IsRoleOwned(this.dFe) ?? false;
      this.GetButton(3)?.SetSelfInteractive(i);
    }
  }
  _do() {
    if (!this.KPd) {
      var e = ConfigManager_1.ConfigManager.RoleSkillConfig?.GetSkillTreeNode(this.Mmo);
      if (e) {
        var t = this.GetSprite(0);
        let i = undefined;
        if (i = e.SkillId > 0 ? ConfigManager_1.ConfigManager.RoleSkillConfig?.GetSkillConfigById(e.SkillId)?.Icon : e.PropertyNodeIcon) {
          this.SetSpriteByPath(i, t, false, undefined);
        }
      }
    }
  }
  uhd() {
    var i;
    var e = this.GetText(2);
    if (this.KPd) {
      LguiUtil_1.LguiUtil.SetLocalText(e, "LevelRichText", 1, 10);
    } else if (this.QPd) {
      i = `Lv.${this.Wft}/${this.WPd}`;
      if (this.Wft >= this.WPd) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "RoleProject_SkillLevel01", [i]);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "RoleProject_SkillLevel02", [i]);
      }
    } else {
      i = `Lv.${this.Wft}/${this.$Pd}`;
      if (this.Wft >= this.$Pd) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "RoleProject_SkillLevel01", [i]);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "RoleProject_SkillLevel02", [i]);
      }
    }
  }
  wke() {
    var i = this.KPd;
    var e = this.GetSprite(1);
    var t = this.GetSprite(0);
    e?.SetUIActive(i);
    t?.SetUIActive(!i);
    if (t) {
      t.SetChangeColor(i, t.changeColor);
    }
  }
  SetIsPerfectPlan(i) {
    this.QPd = i;
  }
  SetClickCallback(i) {
    this.NTt = i;
  }
}
exports.RoleDevSkillSlotItem = RoleDevSkillSlotItem;
//# sourceMappingURL=RoleDevSkillSlotItem.js.map