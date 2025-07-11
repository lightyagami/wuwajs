"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardExploreBabelSuccessItem = undefined;
const UE = require("ue");
const BabelTowerBuffById_1 = require("../../../../Core/Define/ConfigQuery/BabelTowerBuffById");
const BabelTowerDeTermById_1 = require("../../../../Core/Define/ConfigQuery/BabelTowerDeTermById");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreBabelSuccessItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.U_c = undefined;
    this.gDo = () => {
      return new BabelTowerUnlockBuffItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIHorizontalLayout]];
  }
  OnStart() {
    this.U_c = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.gDo);
  }
  Refresh(e) {
    var i = e.StarTextParam;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.TextKey, ...i.Params);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.TipTextId);
    var i = e.NewBabelBuffIds;
    var e = e.NewBabelDeTermIds;
    this.GetText(1).SetUIActive(i.length !== 0 || e.length !== 0);
    if (i.length === 0 && e.length === 0) {
      this.GetItem(2).SetUIActive(false);
    } else {
      this.GetItem(2).SetUIActive(true);
      var r = [];
      for (const t of i) {
        const e = {
          Id: t,
          IsDeTerm: false,
          CanClick: false
        };
        r.push(e);
      }
      for (const s of e) {
        const e = {
          Id: s,
          IsDeTerm: true,
          CanClick: false
        };
        r.push(e);
      }
      r.sort((e, i) => e.IsDeTerm === i.IsDeTerm ? e.Id - i.Id : e.IsDeTerm ? 1 : -1);
      this.U_c?.RefreshByData(r);
    }
  }
}
exports.RewardExploreBabelSuccessItem = RewardExploreBabelSuccessItem;
class BabelTowerUnlockBuffItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.aFi = () => {
      var e = {
        IsDeTerm: this.Pe.IsDeTerm,
        ConfigId: this.Pe.Id,
        ShowWays: false
      };
      UiManager_1.UiManager.OpenView("BabelTowerItemInfoView", e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[2, this.aFi]];
  }
  Refresh(e, i, r) {
    let t = undefined;
    let s = undefined;
    var o = (this.Pe = e).IsDeTerm;
    var a = this.GetItem(5);
    a.SetChangeColor(!o, a.changeColor);
    s = (o ? (a = BabelTowerDeTermById_1.configBabelTowerDeTermById.GetConfig(e.Id), t = a.NameText, a) : (a = BabelTowerBuffById_1.configBabelTowerBuffById.GetConfig(e.Id), t = a.NameText, a)).Texture;
    this.GetItem(3).SetUIActive(!o);
    this.GetItem(4).SetUIActive(o);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t);
    this.SetTextureByPath(s, this.GetTexture(0));
  }
}
//# sourceMappingURL=RewardExploreBabelSuccessItem.js.map