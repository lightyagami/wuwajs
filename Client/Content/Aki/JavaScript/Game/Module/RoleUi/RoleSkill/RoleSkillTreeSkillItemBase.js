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
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleSkillIconItem_1 = require("./RoleSkillIconItem");
class RoleSkillTreeSkillItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.pdo = undefined;
    this.ac = undefined;
    this.v_g = undefined;
    this.y_g = undefined;
    this.q$f = false;
    this.N8e = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillTreeNodeToggleClick, this);
    };
  }
  OnStart() {
    this.pdo = new RoleSkillIconItem_1.RoleSkillIconItem(this.GetSkillIconItem(), this.IsIconTexture());
    this.InitBranchSequencePlayer();
    this.SetToggleCallBack(this.N8e);
  }
  InitBranchSequencePlayer() {
    var e = this.GetLeftBranchItem();
    if (e) {
      this.v_g = new LevelSequencePlayer_1.LevelSequencePlayer(e);
    }
    var e = this.GetRightBranchItem();
    if (e) {
      this.y_g = new LevelSequencePlayer_1.LevelSequencePlayer(e);
    }
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
  GetLeftBranchItem() {}
  GetLeftBranchIcon() {}
  GetRightBranchItem() {}
  GetRightBranchIcon() {}
  GetStrongArrowUpItem() {}
  HasActiveBranchItem() {
    return this.GetLeftBranchItem()?.IsUIActiveSelf() || (this.GetRightBranchItem()?.IsUIActiveSelf() ?? false);
  }
  Refresh() {
    this.pdo.Refresh();
    this.RefreshName();
    this.RefreshLevel();
    this.RefreshState();
    this.RefreshSkillBranch();
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
  SetToggleState(e, t = false) {
    this.pdo.SetToggleState(e, t);
  }
  GetSkillIconToggleItem() {
    return this.pdo.GetToggleItem();
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
  TriggerToggle() {
    this.N8e();
  }
  RefreshSkillBranch(e = false) {
    var t;
    var i;
    var s;
    var h = this.GetLeftBranchItem();
    var r = this.GetRightBranchItem();
    if (this.Sug()) {
      s = this.GetRoleId();
      t = this.GetSkillNodeId();
      i = ModelManager_1.ModelManager.RoleModel.GetRoleCurrentBranchIndex(s);
      if (e && this.v_g && this.y_g) {
        h?.SetUIActive(true);
        r?.SetUIActive(true);
        this.v_g.StopCurrentSequence(false, true);
        this.y_g.StopCurrentSequence(false, true);
        this.v_g.PlayLevelSequenceByName(i === 0 ? "Start" : "Close", true);
        this.y_g.PlayLevelSequenceByName(i !== 0 ? "Start" : "Close", true);
      } else {
        this.B7g();
        h?.SetUIActive(i === 0);
        r?.SetUIActive(i !== 0);
      }
      if (e = i === 0 ? this.GetLeftBranchIcon() : this.GetRightBranchIcon()) {
        i = ModelManager_1.ModelManager.RoleModel.GetSkillNodeCurrentBranchId(s, t);
        s = ConfigManager_1.ConfigManager.RoleConfig.GetSkillBranchConfigById(i);
        this.SetSpriteByPath(s.Icon, e, false);
      }
    } else {
      h?.SetUIActive(false);
      r?.SetUIActive(false);
    }
  }
  B7g() {
    this.v_g?.PlayLevelSequenceByName("Start");
    this.v_g?.EndSequenceLastFrame("Start");
    this.y_g?.PlayLevelSequenceByName("Start");
    this.y_g?.EndSequenceLastFrame("Start");
  }
  Sug() {
    var e = this.GetRoleId();
    var t = this.GetSkillNodeId();
    return e !== 0 && t !== 0 && this.q$f && ModelManager_1.ModelManager.RoleModel.IsRoleHasBranch(e) && ModelManager_1.ModelManager.RoleModel.IsSkillNodeHasBranch(t);
  }
  OnSkillBranchChanged() {
    if (this.Sug()) {
      this.RefreshSkillBranch(true);
    }
  }
  SetSkillBranchEnable(e) {
    this.q$f = e;
  }
}
exports.RoleSkillTreeSkillItemBase = RoleSkillTreeSkillItemBase;
//# sourceMappingURL=RoleSkillTreeSkillItemBase.js.map