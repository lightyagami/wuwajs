"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcSystemViewItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const HelpController_1 = require("../../Module/Help/HelpController");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiManager_1 = require("../UiManager");
const CommonPopViewBehaviourBase_1 = require("./CommonPopViewBehaviourBase");
const PopupCaptionItem_1 = require("./PopupCaptionItem");
class NpcSystemViewItem extends CommonPopViewBehaviourBase_1.CommonPopViewBase {
  constructor() {
    super(...arguments);
    this.n6t = undefined;
    this.fcr = undefined;
    this.dtt = () => {
      var t = this.fcr.HelpGroupId;
      HelpController_1.HelpController.OpenHelpById(t);
    };
    this.Vgt = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Test", 36, "[CloseCookRootView]当点击关闭按钮时", ["viewName", this.ViewInfo.Name]);
      }
      UiManager_1.UiManager.CloseView(this.ViewInfo.Name);
    };
  }
  GetAttachParent() {
    return this.GetItem(4);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem]];
    this.BtnBindInfo = [[6, this.OnClickMaskButton]];
  }
  OnStart() {
    this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(5));
    var t;
    var i;
    var e;
    var s;
    var o;
    var r;
    var h;
    var l;
    var n;
    var a;
    var u;
    var g;
    var p;
    var S = this.ViewInfo.CommonPopBgKey;
    var U = ConfigManager_1.ConfigManager.UiCommonConfig.GetNpcSystemBackgroundByViewName(S);
    if (U) {
      h = (this.fcr = U).Title;
      t = U.TitleTexturePath;
      i = U.TitleBgTexturePath;
      e = U.TitleSymbolColor;
      s = U.CaptionTitle;
      o = U.CaptionTitleSpritePath;
      r = U.CostItemList;
      h = !StringUtils_1.StringUtils.IsEmpty(h);
      l = !StringUtils_1.StringUtils.IsEmpty(t);
      n = !StringUtils_1.StringUtils.IsEmpty(i);
      a = !StringUtils_1.StringUtils.IsEmpty(e);
      u = !StringUtils_1.StringUtils.IsEmpty(s);
      g = !StringUtils_1.StringUtils.IsEmpty(o);
      p = r?.length > 0;
      this.SetTitleVisible(h);
      if (h) {
        this.SetTitleText(U.Title);
      }
      this.SetTitleTextureVisible(l);
      if (l) {
        this.SetTitleTexture(t);
      }
      this.SetTitleBackgroundTextureVisible(n);
      if (n) {
        this.SetTitleBackgroundTexture(i);
      }
      this.SetTitleSymbolVisible(a);
      if (a) {
        this.SetTitleSymbolColor(e);
      }
      this.SetCaptionTitleVisible(u);
      if (u) {
        this.SetCaptionTitleText(s);
      }
      this.SetCaptionTitleIconVisible(g);
      if (g) {
        this.SetCaptionTitleSprite(o);
      }
      this.SetCurrencyItemVisible(p);
      if (p) {
        this.SetCostItemList(r);
      }
      this.SetHelpButtonVisible(U.IsHelpButtonVisible);
      this.n6t.SetHelpCallBack(this.dtt);
      this.n6t.SetCloseCallBack(this.Vgt);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Test", 36, "u.Ui表现表中配置了通用背景面板(CommonPopBg)为5，但是t.通用背景-Npc系统界面通用背景中没有配置对应界面", ["ViewName", S]);
    }
  }
  OnBeforeDestroy() {
    this.fcr = undefined;
    this.n6t = undefined;
  }
  SetTitleVisible(t) {
    this.GetText(0).SetUIActive(t);
  }
  SetTitleText(t) {
    var i = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
  }
  SetTitleTextureVisible(t) {
    this.GetTexture(2).SetUIActive(t);
  }
  SetTitleTexture(t) {
    const i = this.GetTexture(2);
    i.SetUIActive(false);
    this.SetTextureByPath(t, i, undefined, () => {
      i.SetUIActive(true);
    });
  }
  SetTitleBackgroundTextureVisible(t) {
    this.GetTexture(1).SetUIActive(t);
  }
  SetTitleBackgroundTexture(t) {
    const i = this.GetTexture(1);
    i.SetUIActive(false);
    this.SetTextureByPath(t, i, undefined, () => {
      i.SetUIActive(true);
    });
  }
  SetTitleSymbolVisible(t) {
    this.GetSprite(3).SetUIActive(t);
  }
  SetTitleSymbolColor(t) {
    this.GetSprite(3).SetColor(UE.Color.FromHex(t));
  }
  SetCaptionTitleText(t) {
    this.n6t.SetTitleLocalText(t);
  }
  SetCaptionTitleVisible(t) {
    this.n6t.SetTitleTextActive(t);
  }
  SetCurrencyItemVisible(t) {
    this.n6t.SetCurrencyItemVisible(t);
  }
  SetCaptionTitleSprite(t) {
    this.n6t.SetTitleIcon(t);
  }
  SetCaptionTitleIconVisible(t) {
    this.n6t.SetTitleIconVisible(t);
  }
  async SetCostItemList(t) {
    await this.n6t.SetCurrencyItemList(t);
  }
  SetHelpButtonVisible(t) {
    this.n6t.SetHelpBtnActive(t);
  }
  SetTexBgVisible(t) {
    this.GetItem(7).SetUIActive(t);
  }
}
exports.NpcSystemViewItem = NpcSystemViewItem;
//# sourceMappingURL=NpcSystemViewItem.js.map