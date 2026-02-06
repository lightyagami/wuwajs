"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPickRoleRolePanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const RoleDescribeComponent_1 = require("../../../../../Gacha/GachaMainView/RoleDescribeComponent");
const SpineRoleGachaPoolItem_1 = require("../../../../../Gacha/GachaMainView/SpineRoleGachaPoolItem");
const TotalTopUpDefine_1 = require("../../TotalTopUpDefine");
class TotalTopUpPickRoleRolePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$hu = new Map();
    this.mWt = undefined;
    this.ko_ = 0;
    this.M8g = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIText], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.mWt = new RoleDescribeComponent_1.RoleDescribeComponent();
    var i = this.mWt.CreateByActorAsync(this.GetItem(1).GetOwner());
    e.push(i);
    await Promise.all(e);
    this.mWt?.SetUiActive(true);
    this.mWt?.SetLookBtnActive(true);
    if (this.mWt) {
      this.mWt.OnClickLookCallback = () => {
        this.M8g?.();
      };
    }
  }
  Refresh(e) {
    var i;
    if (!(e.CurrentRoleId <= 0)) {
      this.ko_ = e.CurrentRoleId;
      this.M8g = e.PreviewAllRoles;
      this.skg(e.CurrentRoleId);
      this.mWt?.Update(e.CurrentRoleId);
      i = e.CurrentRoleChainNum;
      this.GetItem(6)?.SetUIActive(!e.CurrentRoleOwned);
      this.GetItem(2)?.SetUIActive(e.CurrentRoleOwned);
      this.QGg(e.CurrentIsFullChain);
      this.GetText(5)?.SetText(i.toString());
    }
  }
  async skg(e) {
    const i = this.$hu.get(e);
    if (!i) {
      var o = ConfigManager_1.ConfigManager.TotalTopUpConfig?.GetRoleViewConfigByRoleIdOrItemId(e);
      if (!o) {
        TotalTopUpDefine_1.TotalTopUpUtil.Error("TotalTopUpPickRoleRolePanel.RefreshRoleSpineItem 找不到角色卡池配置", ["RoleId", e]);
        return;
      }
      o = o.SpinePrefabResource;
      if (!o || o.length === 0) {
        TotalTopUpDefine_1.TotalTopUpUtil.Error("TotalTopUpPickRoleRolePanel.RefreshRoleSpineItem 角色卡池配置缺少SpinePrefabResource", ["RoleId", e]);
        return;
      }
      TotalTopUpDefine_1.TotalTopUpUtil.Debug("TotalTopUpPickRoleRolePanel.RefreshRoleSpineItem 创建Spine角色", ["RoleId", e], ["Resource", o]);
      const i = new SpineRoleGachaPoolItem_1.SpineRoleGachaPoolItem(4);
      await i.CreateByResourceIdAsync(o, this.GetItem(0));
      i.SetUiActive(true);
      i.SetDescUiActive(false);
      this.$hu.set(e, i);
    }
    this.akg(this.ko_);
  }
  akg(o) {
    this.$hu.forEach((e, i) => {
      i = i === o;
      e.SetUiActive(i);
      if (i) {
        e.RefreshAnimation();
      }
    });
  }
  QGg(e) {
    var i = this.GetText(3);
    i?.SetChangeColor(e, i.changeColor);
    var i = this.GetSprite(4);
    i?.SetChangeColor(e, i.changeColor);
    var i = this.GetText(5);
    i?.SetChangeColor(e, i.changeColor);
  }
}
exports.TotalTopUpPickRoleRolePanel = TotalTopUpPickRoleRolePanel;
//# sourceMappingURL=TotalTopUpPickRoleRolePanel.js.map