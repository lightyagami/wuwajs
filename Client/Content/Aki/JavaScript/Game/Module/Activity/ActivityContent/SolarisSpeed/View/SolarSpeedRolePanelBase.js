"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SolarSpeedRolePanelBase = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class SolarSpeedRolePanelBase extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.DataCache = undefined;
    this.RoleItem = undefined;
    this.HandleOnClickFunction = () => {
      if (this.DataCache?.PlayerId !== undefined) {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivitySolarSpeedController.HandleClickPlayerInResultView(this.DataCache.PlayerId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UISprite], [6, UE.UIText], [5, UE.UIText], [4, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UITexture], [9, UE.UINiagara], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UITexture], [15, UE.UITexture], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem]];
    this.BtnBindInfo = [[7, this.HandleOnClickFunction]];
  }
  async OnBeforeStartAsync() {
    this.RoleItem = new SolarSpeedRoleIconPanel();
    await this.RoleItem.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  slc(t) {
    var e = this.GetTexture(8);
    if (t && !StringUtils_1.StringUtils.IsBlank(t)) {
      e.SetUIActive(true);
      this.SetTextureByPath(t, e);
    } else {
      e.SetUIActive(false);
    }
  }
  Refresh(t, e, i) {
    this.DataCache = t;
    this.RoleItem.Refresh(t.IconData);
    this.GetButton(7)?.RootUIComp.SetUIActive(t.IsAddButtonAvailable);
    this.GetItem(10)?.SetUIActive(false);
    var s = UE.Color.FromHex(t.MedalColorHex);
    this.GetTexture(0)?.SetColor(s);
    var s = UE.Color.FromHex(t.FxColorHex);
    this.GetUiNiagara(9)?.SetColor(s);
    this.SetTextureByPath(t.BgPath, this.GetTexture(1));
    this.slc(t.MedalTexturePath);
    this.TrySetSpriteByPath(t.PlayerIndexIconPath, this.GetSprite(3), false);
    this.GetText(6)?.SetText(t.NameText);
    this.OnRefresh(t);
  }
  RefreshAddFriendByPlayerIdExternal(t) {
    var e = this.DataCache;
    if (e !== undefined && t === e.PlayerId && e.IsAddButtonAvailable) {
      this.GetItem(10)?.SetUIActive(true);
      this.GetButton(7)?.RootUIComp.SetUIActive(false);
    }
  }
  SetFriendItemState(t) {
    this.GetItem(17)?.SetUIActive(t);
  }
  OnRefresh(t) {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(5), t.DescTextId);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(4), t.TitleTextId);
  }
}
exports.SolarSpeedRolePanelBase = SolarSpeedRolePanelBase;
class SolarSpeedRoleIconPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(t) {
    this.SetTextureByPath(t.IconPath, this.GetTexture(0));
  }
}
//# sourceMappingURL=SolarSpeedRolePanelBase.js.map