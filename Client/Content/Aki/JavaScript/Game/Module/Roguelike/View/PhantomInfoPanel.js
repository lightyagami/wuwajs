"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInfoPanel = exports.PhantomEntryItem = exports.PhantomElementItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RogueSelectResult_1 = require("../Define/RogueSelectResult");
const ElementItem_1 = require("./ElementItem");
class PhantomElementItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.kao = undefined;
    this.aho = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UISprite]];
  }
  async OnBeforeStartAsync() {
    this.aho = new ElementItem_1.ElementItem();
    await this.aho.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  Refresh(e, t, i) {
    this.Update(e);
  }
  Update(e) {
    this.kao = e;
    this.aho.Update(this.kao);
    this.RefreshPanel();
  }
  RefreshPanel(e = undefined) {
    var [e, t, i, s, r] = this.hho(e);
    this.GetSprite(2).SetUIActive(e);
    this.GetText(1).SetUIActive(!e);
    this.GetItem(0).SetUIActive(!e);
    let n = undefined;
    n = e ? RoguelikeDefine_1.ROGUELIKEVIEW_FINIST_TEXT : t ? RoguelikeDefine_1.ROGUELIKEVIEW_PREVIEW_TEXT : RoguelikeDefine_1.ROGUELIKEVIEW_NOTFINIST_TEXT;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), n, i, s, r);
    return e;
  }
  hho(e = undefined) {
    var t = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.ElementDict;
    var i = this.kao.Count;
    var s = t.get(this.kao.ElementId) ?? 0;
    s += t.get(7) ?? 0;
    let r = 0;
    let n = false;
    if (e && (r = (e.get(this.kao.ElementId) ?? 0) + (e.get(7) ?? 0), this.kao.ElementId === 9 && e.forEach(e => {
      r += e;
    }), r > 0)) {
      n = true;
    }
    return [s + r >= i, n, s, i, r];
  }
}
exports.PhantomElementItem = PhantomElementItem;
class PhantomEntryItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.lho = undefined;
    this._ho = undefined;
    this.SPe = undefined;
    this.uho = false;
    this.jli = () => {
      return new PhantomElementItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText]];
  }
  OnStart() {
    this._ho = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.jli);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  Refresh(e, t, i) {
    this.lho = e;
    var s;
    var e = this.lho.GetSortElementInfoArrayByCount();
    for (const r of e) {
      if (r.ElementId === 9) {
        r.Name = RoguelikeDefine_1.ROGUELIKEVIEW_16_TEXT;
      } else if (s = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(r.ElementId)) {
        r.Name = s.Name;
      }
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "Rogue_Phantom_Info_Index", i + 1);
    this._ho.RefreshByData(e);
  }
  RefreshPreview(e = undefined) {
    let t = true;
    for (const n of this._ho.GetLayoutItemList()) {
      if (!n.RefreshPanel(e)) {
        t = false;
      }
    }
    var i;
    var s = !this.lho.IsUnlock && t;
    if (s) {
      this.cho();
      this.uho = true;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueTermUnlock);
    } else if (this.uho) {
      this.SPe.PlayLevelSequenceByName("Disappear");
      this.uho = false;
    }
    this.GetItem(2).SetUIActive(s);
    var r = this.GetText(3);
    if (ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel() === 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(r, this.lho.GetAffixDesc());
    } else if (i = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueAffixConfig(this.lho.Id)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(r, this.lho.GetAffixDesc(), ...i.AffixDescParam);
    }
    r.SetChangeColor(s, r?.changeColor);
  }
  cho() {
    this.SPe.PlayLevelSequenceByName(RoguelikeDefine_1.COMPLETE);
  }
}
exports.PhantomEntryItem = PhantomEntryItem;
class PhantomInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.mho = undefined;
    this.dho = undefined;
    this.Cho = () => {
      UiManager_1.UiManager.OpenView("RoguePhantomSelectResultView", new RogueSelectResult_1.RogueSelectResult(this.mho, undefined, undefined));
    };
    this.CreatePhantomEntryItem = () => {
      return new PhantomEntryItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UITexture]];
    this.BtnBindInfo = [[5, this.Cho]];
  }
  OnStart() {
    this.dho = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.CreatePhantomEntryItem);
  }
  Update(e) {
    this.mho = e;
  }
  Refresh() {
    this.F7i();
    this.gho();
  }
  GetAttributeItem(e) {
    return this.dho?.GetItemByIndex(e);
  }
  F7i() {
    var e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(this.mho.ConfigId);
    if (e && (this.GetText(2).ShowTextNew(e.PokemonName), this.SetTextureByPath(e.PokemonIcon, this.GetTexture(1)), e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueQualityConfigByQualityId(e.Quality))) {
      this.SetTextureByPath(e.PhantomBgC, this.GetTexture(0));
      this.SetTextureByPath(e.PhantomBgB, this.GetTexture(6));
    }
  }
  gho() {
    this.dho.RefreshByData(this.mho.AffixEntryList ?? []);
  }
  RefreshPhantomEntryItemRefreshPreview(e = undefined) {
    for (const t of this.dho.GetLayoutItemList()) {
      t.RefreshPreview(e);
    }
  }
}
exports.PhantomInfoPanel = PhantomInfoPanel;
//# sourceMappingURL=PhantomInfoPanel.js.map