"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSelectItem = exports.RoleAttrItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RoleAttrItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.AffixEntry = undefined;
  }
  Refresh(t, e, i) {
    this.Update(t);
  }
  Update(t) {
    this.AffixEntry = t;
    this.RefreshPanel();
  }
  SetSecondColor() {
    var t = this.GetText(0);
    t.SetChangeColor(true, t.changeColor);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  RefreshPanel() {
    var t = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterBuffConfig(this.AffixEntry.Id);
    if (t) {
      if (ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel() === 0) {
        this.GetText(0).ShowTextNew(t.AffixDescSimple);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.AffixDesc, ...t.AffixDescParam);
      }
    }
  }
}
exports.RoleAttrItem = RoleAttrItem;
class RoleSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.mho = undefined;
    this.Rlo = undefined;
    this.Ulo = undefined;
    this.Cho = () => {};
    this.Alo = () => {
      return new RoleAttrItem();
    };
  }
  Refresh(t, e, i) {
    this.Update(t);
  }
  Update(t) {
    this.mho = t;
    this.RefreshPanel();
  }
  SetLevelUpItem(t) {
    this.GetItem(7).SetUIActive(t);
  }
  SetSecondColorForAttrItem(t) {
    this.Ulo = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UISprite], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UINiagara], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIVerticalLayout], [13, UE.UIScrollViewWithScrollbarComponent]];
    this.BtnBindInfo = [[5, this.Cho]];
  }
  OnStart() {
    this.Rlo = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(12), this.Alo);
  }
  RefreshPanel() {
    this.Ake();
    this.Sho();
    this.WTt();
  }
  Ake() {
    var e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterConfig(this.mho.ConfigId);
    if (e) {
      var i = Math.min(5, this.mho.AffixEntryList.length + 1);
      var r = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(i);
      var i = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueQualityConfigByQualityId(i);
      if (r) {
        r = UE.Color.FromHex(r.DropColor);
        this.GetTexture(0).SetColor(r);
        this.GetTexture(2).SetColor(r);
        this.GetSprite(3).SetColor(r);
      }
      if (i) {
        r = new UE.LinearColor(UE.Color.FromHex(i.RoleNiagaraColor));
        this.GetUiNiagara(9).SetNiagaraVarLinearColor("Color", r);
      }
      var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.RoleId);
      if (i) {
        this.GetText(4).ShowTextNew(i.Name);
        let t = i.FormationRoleCard;
        r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.RoleId).GetRoleSkinId();
        if (r !== -1) {
          i = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(r);
          t = i.FormationRoleCard;
        }
        this.SetTextureByPath(t, this.GetTexture(1));
      }
    }
  }
  Sho() {
    this.Rlo.RefreshByDataAsync(this.mho.AffixEntryList ?? []).then(() => {
      if (this.Ulo) {
        let o = undefined;
        for (const t of this.Rlo.GetLayoutItemList()) {
          if (this.Ulo?.has(t.AffixEntry.Id)) {
            t.SetSecondColor();
            t.RefreshPanel();
            o = t;
          }
        }
        if (o !== undefined) {
          const a = this.GetScrollViewWithScrollbar(13);
          let s = 0;
          a.OnLateUpdate.Bind(t => {
            if (++s === 2) {
              let t = 0;
              var e = o.GetRootItem().GetHeight();
              var i = a.GetViewport().GetUIItem().GetHeight();
              var r = a.ContentUIItem.GetHeight();
              t = i < e ? r - i * Math.trunc(e / i) - e % i - 10 : r - i;
              t = Math.max(t, 0);
              a.ContentUIItem.SetAnchorOffsetY(t);
              a.OnLateUpdate.Unbind();
            }
          });
        }
      }
    });
  }
  WTt() {
    this.GetItem(8).SetUIActive((this.mho.AffixEntryList?.length ?? 0) <= 0);
  }
}
exports.RoleSelectItem = RoleSelectItem;
//# sourceMappingURL=RoleSelectItem.js.map