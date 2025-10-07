"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillIconItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleSkillIconItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, i = false) {
    super();
    this.vmo = i;
    this.dFe = 0;
    this.Mmo = 0;
    this.wmo = 0;
    this.B9l = 0;
    this.q9l = undefined;
    this.ESo = undefined;
    this.k9l = undefined;
    this.pqe = undefined;
    this.cFe = () => {
      if (this.pqe) {
        this.pqe();
      }
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [3, UE.UIItem], [2, UE.UIItem], [4, UE.UIItem]];
    if (this.vmo) {
      this.ComponentRegisterInfos.push([1, UE.UITexture]);
      this.ComponentRegisterInfos.push([5, UE.UITexture]);
      this.ComponentRegisterInfos.push([6, UE.UITexture]);
      this.ComponentRegisterInfos.push([7, UE.UIExtendToggleTextureTransition]);
    } else {
      this.ComponentRegisterInfos.push([1, UE.UISprite]);
      this.ComponentRegisterInfos.push([5, UE.UISprite]);
      this.ComponentRegisterInfos.push([6, UE.UISprite]);
      this.ComponentRegisterInfos.push([7, UE.UIExtendToggleSpriteTransition]);
    }
    this.BtnBindInfo = [[0, this.cFe]];
  }
  Update(t, i) {
    this.SetId(t, i);
    this.Refresh();
  }
  SetId(t, i) {
    this.dFe = t;
    this.Mmo = i;
    this.q9l = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(this.Mmo);
    i = this.q9l.SkillId;
    this.wmo = i;
    this.ESo = this.wmo > 0 ? ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(i) : undefined;
    this.B9l = i > 0 ? ModelManager_1.ModelManager.RoleModel.GetUpgradeSkillIdIfUpgraded(i, t) : 0;
    this.k9l = this.B9l > 0 ? ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(this.B9l) : undefined;
  }
  Refresh() {
    this.RefreshSkillIcon();
    this.RefreshState();
  }
  RefreshState() {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(this.dFe, this.Mmo);
    this.GetItem(2)?.SetUIActive(t > 0);
    let i = this.vmo ? this.GetTexture(1) : this.GetSprite(1);
    i?.SetChangeColor(t > 0, i.changeColor);
    (i = this.vmo ? this.GetTexture(5) : this.GetSprite(5))?.SetChangeColor(t > 0, i.changeColor);
    (i = this.vmo ? this.GetTexture(6) : this.GetSprite(6))?.SetChangeColor(t > 0, i.changeColor);
    var s = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeState(this.dFe, this.Mmo);
    this.GetItem(4)?.SetUIActive(s === 1);
    this.GetItem(3)?.SetUIActive(s !== 1 && t === 0);
  }
  RefreshSkillIcon() {
    var t = this.wmo;
    let i = undefined;
    if (i = t && t > 0 && this.ESo ? this.ESo.Icon : this.q9l.PropertyNodeIcon) {
      this.Emo(i);
    }
  }
  Emo(t) {
    if (this.vmo) {
      this.Smo(1, t);
      this.Smo(5, t);
      this.Smo(6, t);
    } else {
      this.ymo(1, t);
      this.ymo(5, t);
      this.ymo(6, t);
    }
  }
  Smo(t, i) {
    const s = this.GetTexture(t);
    if (s) {
      const e = this.GetUiExtendToggleTextureTransition(7);
      let t = undefined;
      if (e) {
        t = () => {
          e?.SetAllTransitionStateTexture(s.GetTexture());
        };
      }
      this.SetTextureByPath(i, s, undefined, t);
    }
  }
  ymo(t, i) {
    const s = this.GetSprite(t);
    if (s) {
      const e = this.GetUiExtendToggleSpriteTransition(7);
      let t = undefined;
      if (e) {
        t = () => {
          e?.SetAllStateSprite(s.GetSprite());
        };
      }
      this.SetSpriteByPath(i, s, false, undefined, t);
    }
  }
  GetRoleId() {
    return this.dFe;
  }
  GetSkillNodeId() {
    return this.Mmo;
  }
  GetSkillId() {
    return this.wmo;
  }
  GetUpgradeSkillId() {
    return this.B9l;
  }
  GetSkillTreeNodeConfig() {
    return this.q9l;
  }
  GetSkillConfig() {
    return this.ESo;
  }
  GetUpgradeSkillConfig() {
    return this.k9l;
  }
  SetToggleCallBack(t) {
    this.pqe = t;
  }
  SetToggleState(t, i = false) {
    this.GetExtendToggle(0).SetToggleState(t, i);
  }
}
exports.RoleSkillIconItem = RoleSkillIconItem;
//# sourceMappingURL=RoleSkillIconItem.js.map