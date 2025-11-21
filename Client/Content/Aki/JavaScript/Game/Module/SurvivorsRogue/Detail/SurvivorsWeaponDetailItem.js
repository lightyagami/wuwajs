"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsWeaponDetailItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class SurvivorsWeaponDetailItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fNd = undefined;
    this.qFd = () => new EntryItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UITexture], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UIText], [7, UE.UISprite], [8, UE.UITexture], [9, UE.UIVerticalLayout], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem], [15, UE.UITexture]];
  }
  OnStart() {
    this.fNd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), this.qFd, this.GetItem(10).GetOwner());
    var t = {
      UiText: this.GetText(11),
      ViewType: 0,
      ReportType: 10
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(t);
  }
  SetIsCurrentState(t) {
    this.GetItem(12)?.SetUIActive(t);
    this.GetTexture(15)?.SetUIActive(t);
  }
  SetIsLocked(t) {
    this.GetItem(14)?.SetUIActive(t);
  }
  Refresh(t, e, r) {
    this.RefreshByWeaponEvolveId(t);
  }
  RefreshByWeaponEvolveId(t) {
    var t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponEvolve(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.EvolveName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), t.Describe);
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(t.WeaponId);
    this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(8));
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetQualityConfig(t.Quality);
    this.gNd(e.WeaponColor);
    this.SetTextureShowUntilLoaded(e.WeaponEvolvePath, this.GetTexture(3));
    this.CNd(t);
  }
  CNd(s) {
    const o = [];
    Array.from(s.ConditionArgs.keys()).forEach((t, e) => {
      var r = s.ConditionArgs.get(t);
      var i = [];
      i.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(t).Name));
      i.push(r.toString());
      o.push({
        Text: s.UnlockDesc[e],
        Args: i,
        Color: ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetQualityConfig(s.Quality).WeaponColor
      });
    });
    this.fNd.RefreshByData(o);
  }
  gNd(t) {
    t = UE.Color.FromHex(t);
    this.GetSprite(0)?.SetColor(t);
    this.GetSprite(1)?.SetColor(t);
    this.GetSprite(2)?.SetColor(t);
    this.GetSprite(4)?.SetColor(t);
    this.GetSprite(5)?.SetColor(t);
    this.GetSprite(7)?.SetColor(t);
  }
}
exports.SurvivorsWeaponDetailItem = SurvivorsWeaponDetailItem;
class EntryItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UIText]];
  }
  OnStart() {
    var t = {
      UiText: this.GetText(2),
      ViewType: 0,
      ReportType: 10
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(t);
  }
  Refresh(t, e, r) {
    this.SetTextById(t.Text, t.Args);
    this.SetColorFromHex(t.Color);
  }
  SetTextById(t, e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t, ...e);
  }
  SetColorFromHex(t) {
    t = UE.Color.FromHex(t);
    this.GetTexture(0)?.SetColor(t);
    this.GetSprite(1)?.SetColor(t);
    this.GetText(2)?.SetColor(t);
  }
}
//# sourceMappingURL=SurvivorsWeaponDetailItem.js.map