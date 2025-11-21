"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryTipsTextItem = exports.HonamiStoryTipsPropertyItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const HonamiStoryWeaponTagItem_1 = require("../../Items/HonamiStoryWeaponTagItem");
class HonamiStoryTipsPropertyItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText]];
  }
  Refresh(t, e, i) {
    var r = t.PropId;
    var r = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryProp(r);
    if (r) {
      var a = ConfigManager_1.ConfigManager.PropertyIndexConfig?.GetPropertyIndexName(r.PropId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), a);
      var a = ConfigManager_1.ConfigManager.PropertyIndexConfig?.GetPropertyIndexIcon(r.PropId);
      this.SetTextureByPath(a, this.GetTexture(1));
      var a = t.PropertyNumber ?? r.StandardProperty;
      let e = "";
      e = r.ShowPercent ? (a / 100).toFixed(1) + "%" : String(a);
      this.GetText(3)?.SetText(e);
    }
  }
}
exports.HonamiStoryTipsPropertyItem = HonamiStoryTipsPropertyItem;
class HonamiStoryTipsRoleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UISprite]];
  }
  OnStart() {
    this.RootItem?.SetPivot(new UE.Vector2D(0, 0));
  }
  Refresh(e) {
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    this.SetRoleIcon(t.RoleHeadIconCircle, this.GetTexture(0), e);
  }
}
class HonamiStoryTipsTextItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.It_ = undefined;
    this.x3_ = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    var e = {
      UiText: this.GetText(1),
      ViewType: 0,
      ReportType: 11
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(e);
  }
  async OnBeforeStartAsync() {
    this.It_ = new HonamiStoryWeaponTagItem_1.HonamiStoryWeaponTagItem();
    await this.It_.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    this.x3_ = new HonamiStoryTipsRoleItem();
    await this.x3_.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
  }
  Refresh(e, t, i) {
    var r = e.BuffId;
    var a = e.RoleId;
    var r = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryBuffTemp(r);
    if (a !== undefined) {
      this.GetItem(4)?.SetUIActive(false);
      o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(a);
      o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(o.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "HonamiStory_TipsCharacterEffect", o);
      this.GetText(3)?.SetUIActive(true);
      o = (o = ModelManager_1.ModelManager.RoleModel?.GetCorrectMainRoleConfig(a)) !== undefined ? o.Id : a;
      this.x3_.Refresh(o);
    } else {
      this.GetText(3)?.SetUIActive(false);
      this.GetItem(4)?.SetUIActive(true);
      this.GetText(0)?.ShowTextNew(r.Name);
      if (e.TagId) {
        this.It_?.SetUiActive(true);
        this.It_.Refresh(e.TagId, false, -1);
      } else {
        this.It_?.SetUiActive(false);
      }
    }
    var a = ModelManager_1.ModelManager.HonamiStoryModel.GetSkillDescMode();
    var o = a ? r.DescSimple : r.Desc;
    var e = a ? r.DescSimpleArgs : r.DescArgs;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), o, ...e);
  }
}
exports.HonamiStoryTipsTextItem = HonamiStoryTipsTextItem;
//# sourceMappingURL=HonamiStoryTipsPropertyItem.js.map