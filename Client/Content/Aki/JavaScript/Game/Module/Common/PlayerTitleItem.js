"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerTitleInfoTip = exports.PlayerTitleItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const PersonalDefine_1 = require("../Personal/Model/PersonalDefine");
const LguiUtil_1 = require("../Util/LguiUtil");
class PlayerTitleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Fac = undefined;
    this.L0 = false;
    this.qac = 0;
    this.CallBack = undefined;
    this.CanShowTip = true;
    this.eje = () => {
      var e;
      var t;
      var i;
      if (!this.L0) {
        e = this.GetItem(11);
        t = ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleInfoString(this.Fac.Id, this.qac);
        i = this.Fac.IconInTitleInfo;
        if (this.CanShowTip) {
          UiManager_1.UiManager.OpenView("PlayerTitleInfoTip", {
            ItemForLocation: e,
            PlayerTitleInfoString: t,
            PlayerTitleInfoIcon: i
          }, () => {
            var e = UiManager_1.UiManager.GetViewByName("PlayerTitleInfoTip");
            if (e) {
              e.BindCloseCallback(this.SetToggleState);
            }
          });
        }
        if (this.CallBack) {
          this.CallBack();
        }
      }
    };
    this.SetToggleState = () => {
      this.GetExtendToggle(12).SetToggleStateForce(0);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIText], [6, UE.UITexture], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIText], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UIExtendToggle], [13, UE.UINiagara], [14, UE.UINiagara], [15, UE.UINiagara], [16, UE.UIItem], [17, UE.UITexture]];
    this.BtnBindInfo = [[12, this.eje]];
  }
  Refresh(e, t, i) {
    if (e && e !== 0) {
      this.SetUiActive(true);
      this.Fac = ConfigManager_1.ConfigManager.InventoryConfig.GetPlayerTitleItemConfig(e);
      if (this.Fac) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), this.Fac.TitleName);
        if (e = this.Fac.TitleBgIcon) {
          this.SetTextureByPath(e, this.GetTexture(0));
        }
        e = this.Fac.SelectedIcon;
        this.SetTextureByPath(e, this.GetTexture(10));
        e = this.Fac.TitleStyle;
        this.GetItem(7)?.SetUIActive(false);
        this.GetItem(16)?.SetUIActive(false);
        this.GetItem(1)?.SetUIActive(false);
        if (e === 1) {
          this.RefreshCommonTitle(i === 0);
        } else if (e === 2) {
          this.RefreshStarTitle(t);
        }
        this.RefreshDecorate();
      }
    } else {
      this.SetUiActive(false);
    }
  }
  RefreshCommonTitle(t) {
    if (this.Fac.TitleIcon) {
      this.GetItem(7)?.SetUIActive(true);
      this.Nac(this.Fac.TitleIcon, this.GetTexture(8));
    }
    if (this.Fac.RoleHeadIcon) {
      this.GetItem(16)?.SetUIActive(true);
      let e = this.Fac.RoleHeadIcon;
      if (t) {
        e = this.Fac.FemaleRoleHeadIcon;
      }
      this.SetTextureShowUntilLoaded(e, this.GetTexture(17), () => {
        this.GetTexture(17)?.SetSizeFromTexture();
      });
    }
  }
  RefreshStarTitle(e) {
    this.GetItem(1)?.SetUIActive(true);
    this.Nac(this.Fac.TitleIcon, this.GetTexture(6));
    this.Nac(this.Fac.StarTitleBgIcon, this.GetTexture(2));
    this.Nac(this.Fac.StarTitleIcon, this.GetTexture(3));
    var t = this.GetText(4);
    var e = e ?? 0;
    if (t) {
      this.qac = e;
      t.SetText(e.toString());
      t.SetColor(UE.Color.FromHex(PersonalDefine_1.playerTitleQualityToColor[this.Fac.TitleQuality]));
    }
  }
  RefreshDecorate() {
    var e = this.Fac.DecorateLeftNiagara;
    var t = this.GetUiNiagara(13);
    if (e) {
      this.SetNiagaraSystemByPath(e, t);
      t.SetUIActive(true);
    } else {
      t.SetUIActive(false);
    }
    var e = this.Fac.DecorateRightNiagara;
    var t = this.GetUiNiagara(14);
    if (e) {
      this.SetNiagaraSystemByPath(e, t);
      t.SetUIActive(true);
    } else {
      t.SetUIActive(false);
    }
    var e = this.Fac.DecorateBgNiagara;
    var t = this.GetUiNiagara(15);
    if (e) {
      this.SetNiagaraSystemByPath(e, t);
      t.SetUIActive(true);
    } else {
      t.SetUIActive(false);
    }
  }
  Nac(e, t) {
    this.SetTextureByPath(e, t);
    e = this.Fac.TitleQuality;
    t?.SetColor(UE.Color.FromHex(PersonalDefine_1.playerTitleQualityToColor[e]));
  }
  SetIsPreview(e) {
    this.L0 = e;
  }
}
exports.PlayerTitleItem = PlayerTitleItem;
class PlayerTitleInfoTip extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Vac = undefined;
    this.jac = "";
    this.PNo = undefined;
    this.$St = () => {
      if (UiManager_1.UiManager.IsViewOpen("ChatView")) {
        this.kMc();
      }
    };
    this.kMc = () => {
      this.CloseMe();
    };
    this.eje = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UITexture]];
    this.BtnBindInfo = [[3, this.eje]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateNavigationListener, this.kMc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeModeFinish, this.kMc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnResetToBattleView, this.kMc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddChatContent, this.$St);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateNavigationListener, this.kMc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeModeFinish, this.kMc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnResetToBattleView, this.kMc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddChatContent, this.$St);
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    this.Vac = e.ItemForLocation;
    this.jac = e.PlayerTitleInfoString;
    this.GetItem(1).D_K2_SetWorldLocation(this.Vac.D_K2_GetComponentLocation(), false, undefined, true);
    this.UpdateText();
    var t = this.GetTexture(4);
    if (e.PlayerTitleInfoIcon) {
      t.SetUIActive(true);
      this.SetTextureByPath(e.PlayerTitleInfoIcon, t);
    } else {
      t.SetUIActive(false);
    }
  }
  OnBeforeDestroy() {
    if (this.PNo) {
      this.PNo();
    }
  }
  UpdateText() {
    this.GetText(2)?.SetText(this.jac);
  }
  BindCloseCallback(e) {
    this.PNo = e;
  }
}
exports.PlayerTitleInfoTip = PlayerTitleInfoTip;
//# sourceMappingURL=PlayerTitleItem.js.map