"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleMapRoleAttributeNameItem = exports.RougeBattleAttributeStarItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class RougeBattleAttributeStarItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  Refresh(e, t, r) {
    this.GetItem(1)?.SetUIActive(e);
  }
}
exports.RougeBattleAttributeStarItem = RougeBattleAttributeStarItem;
class RogueBattleMapRoleAttributeNameItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$be = undefined;
    this.Fao = () => new RougeBattleAttributeStarItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIHorizontalLayout], [5, UE.UIItem]];
  }
  OnStart() {
    this.$be = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.Fao);
  }
  OnBeforeDestroy() {
    this.$be = undefined;
  }
  Refresh(e) {
    var t = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e);
    if (t) {
      this.GetText(0).SetText(t.GetName());
      const s = t.GetElementInfo();
      const n = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfoLocalName(s.Name);
      this.GetText(3).SetText(n);
      this.SetElementIcon(s.Icon, this.GetTexture(2), t.GetRoleConfig().ElementId);
      t = ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(e);
      this.GetText(1)?.SetUIActive(t);
      this.GetHorizontalLayout(4)?.RootUIComp.SetUIActive(t);
      if (t) {
        var t = ModelManager_1.ModelManager.RogueBattleModel.GetIncIdByRoleId(e);
        var t = ModelManager_1.ModelManager.RogueBattleModel.GetRoleInfoById(t);
        var r = ModelManager_1.ModelManager.MapRogueModel.GetRogueRoleLevel();
        this.GetText(1).SetText("Lv." + r);
        var a = ModelManager_1.ModelManager.MapRogueModel.GetRogueRoleMaxStar();
        var i = t.F6n;
        var o = new Array(a);
        for (let e = 0; e < a; e++) {
          o[e] = e < i;
        }
        this.$be?.RefreshByData(o);
      }
    } else {
      r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      if (!r) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RogueBattle", 77, "没有角色数据", ["roleId", e]);
        }
        return;
      }
      this.GetText(0).SetText(ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(r.Name));
      const s = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(r.ElementId);
      const n = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfoLocalName(s.Name);
      this.GetText(3).SetText(n);
      this.SetElementIcon(s.Icon, this.GetTexture(2), r.ElementId);
      this.GetText(1)?.SetUIActive(false);
      this.GetHorizontalLayout(4)?.RootUIComp.SetUIActive(false);
    }
  }
}
exports.RogueBattleMapRoleAttributeNameItem = RogueBattleMapRoleAttributeNameItem;
//# sourceMappingURL=RogueBattleMapRoleAttrNameItem.js.map