"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillTreeSkillItemBase = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleSkillIconItem_1 = require("./RoleSkillIconItem");
class RoleSkillTreeSkillItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.pdo = undefined;
    this.ac = undefined;
    this.N8e = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillTreeNodeToggleClick, this);
    };
  }
  OnStart() {
    this.pdo = new RoleSkillIconItem_1.RoleSkillIconItem(this.GetSkillIconItem(), this.IsIconTexture());
    this.SetToggleCallBack(this.N8e);
  }
  Update(e, t) {
    this.pdo.SetId(e, t);
    this.Refresh();
  }
  GetRoleId() {
    return this.pdo.GetRoleId();
  }
  GetSkillNodeId() {
    return this.pdo.GetSkillNodeId();
  }
  GetSkillId() {
    return this.pdo.GetSkillId();
  }
  GetUpgradeSkillId() {
    return this.pdo.GetUpgradeSkillId();
  }
  GetSkillTreeNodeConfig() {
    return this.pdo.GetSkillTreeNodeConfig();
  }
  GetSkillConfig() {
    return this.pdo.GetSkillConfig();
  }
  GetUpgradeSkillConfig() {
    return this.pdo.GetUpgradeSkillConfig();
  }
  GetSkillIconItem() {}
  GetLevelText() {}
  GetNameText() {}
  GetLockItem() {}
  GetStrongArrowUpItem() {}
  Refresh() {
    this.pdo.Refresh();
    this.RefreshName();
    this.RefreshLevel();
    this.RefreshState();
  }
  RefreshName() {
    var e;
    var t;
    var i = this.GetNameText();
    if (i && (e = this.GetUpgradeSkillConfig(), t = this.GetSkillConfig(), e = e || t, t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTypeNameLocalText(e.SkillType))) {
      i.SetText(t);
    }
  }
  RefreshLevel() {
    var e = this.GetRoleId();
    var t = this.GetSkillNodeId();
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(e, t);
    var i = this.GetLevelText();
    if (i) {
      t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillMaxLevelBySkillNodeId(t);
      LguiUtil_1.LguiUtil.SetLocalText(i, "LevelRichText", e, t);
    }
  }
  SetToggleCallBack(e) {
    this.pdo.SetToggleCallBack(e);
  }
  SetToggleState(e) {
    this.pdo.SetToggleState(e);
  }
  RefreshState() {
    var e;
    var t = this.GetLockItem();
    var i = this.GetStrongArrowUpItem();
    this.ac = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeState(this.GetRoleId(), this.GetSkillNodeId());
    if (this.ac === 1) {
      t?.SetUIActive(true);
      i?.SetUIActive(false);
    } else if (this.ac === 3) {
      t?.SetUIActive(false);
      i?.SetUIActive(false);
    } else if (this.ac === 2) {
      e = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeConsumeSatisfied(this.GetRoleId(), this.GetSkillNodeId());
      t?.SetUIActive(false);
      i?.SetUIActive(e);
    }
  }
  OnOtherNodeLevelChange() {
    if (this.ac !== 3) {
      this.pdo.RefreshState();
      this.RefreshState();
    }
  }
  OnSelfNodeLevelChange() {
    this.pdo.RefreshState();
    this.RefreshLevel();
    this.RefreshState();
  }
  OnNodeLevelChange(e) {
    if (e === this.GetSkillNodeId()) {
      this.OnSelfNodeLevelChange();
    } else {
      this.OnOtherNodeLevelChange();
    }
  }
  GetType() {}
  IsIconTexture() {
    return false;
  }
  GetState() {
    return this.ac;
  }
}
exports.RoleSkillTreeSkillItemBase = RoleSkillTreeSkillItemBase;
//# sourceMappingURL=RoleSkillTreeSkillItemBase.js.map