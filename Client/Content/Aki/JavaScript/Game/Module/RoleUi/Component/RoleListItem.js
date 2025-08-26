"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleListItem = exports.RoleListItemData = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RoleListItemData {
  constructor() {
    this.RoleDataId = 0;
    this.NeedShowTrial = true;
    this.NeedRedDot = false;
    this.TeamPositionType = 0;
  }
}
exports.RoleListItemData = RoleListItemData;
const ROLE_MAX_POSITION = 4;
class RoleListItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.DataId = 0;
    this.RoleIconItem = undefined;
    this.ToggleCallBack = undefined;
    this.CanToggleExecuteChange = undefined;
    this.cFe = () => {
      if (this.ToggleCallBack) {
        this.ToggleCallBack(this.GridIndex);
      }
    };
    this.CanToggleExecuteChangeInternal = () => !this.CanToggleExecuteChange || this.CanToggleExecuteChange(this.GridIndex);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.cFe]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(1);
    this.RoleIconItem = new RoleIconItem();
    await this.RoleIconItem.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnStart() {
    var e = this.GetExtendToggle(0);
    if (e) {
      e.CanExecuteChange.Unbind();
      e.CanExecuteChange.Bind(this.CanToggleExecuteChangeInternal);
    }
  }
  s1o(e, t = true) {
    this.RoleIconItem.Refresh(e);
    if (t) {
      this.GetItem(4).SetUIActive(e.IsTrialRole());
    } else {
      this.GetItem(4).SetUIActive(false);
    }
  }
  a1o(e) {
    var t = this.DataId;
    switch (e.TeamPositionType) {
      case 1:
        this.jH_(t);
        break;
      case 2:
        this.UNu(t);
        break;
      default:
        this.HH_(t);
    }
  }
  HH_(t) {
    var e;
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true);
    let o = undefined;
    let s = 1;
    for (let e = 0; e < i.length; e++) {
      var r = i[e];
      if (r.GetConfigId === t) {
        o = r;
        s = e + 1;
      }
    }
    if (o !== undefined) {
      e = Math.min(s, ROLE_MAX_POSITION);
      this.$H_("SP_RoleFormationPosition" + e);
    } else {
      this.$H_();
    }
  }
  jH_(e) {
    var e = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(e);
    if (e <= 0) {
      this.$H_();
    } else {
      e = Math.ceil(e / EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM);
      this.$H_("SP_TeamEditFormation_" + e, true);
    }
  }
  UNu(e) {
    e = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(e);
    if (e <= 0) {
      this.$H_();
    } else {
      this.$H_("SP_RoleFormationPosition" + e, true);
    }
  }
  c7c() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.DataId);
    this.GetItem(7).SetUIActive(e.GetIsNew());
  }
  $H_(e, t = false) {
    var i = e !== undefined;
    this.GetItem(2).SetUIActive(i);
    this.GetItem(5).SetUIActive(i);
    if (i) {
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      this.SetSpriteByPath(i, this.GetSprite(3), t);
    }
  }
  GetRedDotItem() {
    return this.GetItem(6);
  }
  SetToggleState(e, t = false) {
    var i = this.GetExtendToggle(0);
    if (t) {
      i.SetToggleStateForce(e);
    } else {
      i.SetToggleState(e);
    }
  }
  Refresh(e, t, i) {
    this.DataId = e.RoleDataId;
    var o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.DataId);
    this.s1o(o, e.NeedShowTrial);
    this.a1o(e);
    this.c7c();
    if (e.NeedRedDot) {
      RedDotController_1.RedDotController.BindRedDot("RoleSystemRoleList", this.GetRedDotItem(), undefined, this.DataId);
    } else {
      this.GetRedDotItem().SetUIActive(false);
    }
    if (t) {
      this.OnSelected(false);
    } else {
      this.OnDeselected(false);
    }
  }
  OnSelected(e) {
    this.SetToggleState(1, true);
    this.N1l(this.DataId);
    this.c7c();
  }
  N1l(e) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    if (e !== undefined && e.TryRemoveNewFlag()) {
      ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleSelectionListUpdate);
    }
  }
  OnDeselected(e) {
    this.SetToggleState(0, true);
  }
  GetToggleForGuide() {
    return this.GetExtendToggle(0);
  }
}
exports.RoleListItem = RoleListItem;
class RoleIconItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite]];
  }
  Refresh(e) {
    this.SetRoleSkinIcon(e.GetRoleConfig().RoleHeadIconBig, this.GetTexture(0), e.GetRoleSkinId(), "RoleRootView");
    this.mFe(e.GetRoleConfig().QualityId);
  }
  mFe(e) {
    var t = this.GetSprite(1);
    var i = this.GetSprite(2);
    var o = this.GetSprite(3);
    var s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_RoleIconBgUnCheckedUnHover" + e);
    this.SetSpriteByPath(s, o, false);
    var s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_RoleIconBgUnCheckedHover" + e);
    this.SetSpriteByPath(s, i, false);
    var o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_RoleIconBgChecked" + e);
    this.SetSpriteByPath(o, t, false);
  }
}
//# sourceMappingURL=RoleListItem.js.map