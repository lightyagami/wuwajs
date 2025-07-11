"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractSystemViewItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const HelpController_1 = require("../../Module/Help/HelpController");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiManager_1 = require("../UiManager");
const CommonPopViewBehaviourBase_1 = require("./CommonPopViewBehaviourBase");
const PopupCaptionItem_1 = require("./PopupCaptionItem");
class InteractSystemViewItem extends CommonPopViewBehaviourBase_1.CommonPopViewBase {
  constructor() {
    super(...arguments);
    this.n6t = undefined;
    this.gcr = undefined;
    this.dtt = () => {
      var t = this.gcr.HelpGroupId;
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
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UISprite], [4, UE.UIItem], [3, UE.UIItem]];
  }
  OnStart() {
    this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(3));
    var t;
    var i;
    var e;
    var s;
    var o;
    var r;
    var n;
    var h;
    var a = this.ViewInfo.CommonPopBgKey;
    var l = ConfigManager_1.ConfigManager.UiCommonConfig.GetInteractBackgroundByViewName(a);
    if (l) {
      t = (this.gcr = l).Title;
      i = l.TitleSpritePath;
      e = l.ContentSpritePath;
      s = l.CostItemList;
      o = !StringUtils_1.StringUtils.IsEmpty(t);
      r = !StringUtils_1.StringUtils.IsEmpty(i);
      n = !StringUtils_1.StringUtils.IsEmpty(e);
      h = s?.length > 0;
      this.SetTitleVisible(o);
      if (o) {
        this.SetTitleText(t);
      }
      this.SetTitleSpriteVisible(r);
      if (r) {
        this.SetTitleSprite(i);
      }
      this.SetContentSpriteVisible(n);
      if (n) {
        this.SetContentSprite(e);
      }
      this.SetCurrencyItemVisible(h);
      if (h) {
        this.SetCostItemList(s);
      }
      this.SetHelpButtonVisible(l.IsHelpButtonVisible);
      this.n6t.SetHelpCallBack(this.dtt);
      this.n6t.SetCloseCallBack(this.Vgt);
      this.n6t.SetTitleTextActive(false);
      this.n6t.SetTitleIconVisible(false);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Test", 36, "u.Ui表现表中配置了通用背景面板(CommonPopBg)为5，但是t.通用背景-Npc系统界面通用背景中没有配置对应界面", ["ViewName", a]);
    }
  }
  OnBeforeDestroy() {
    this.gcr = undefined;
    this.n6t = undefined;
  }
  SetTitleVisible(t) {
    this.GetText(1).SetUIActive(t);
  }
  SetTitleText(t) {
    var i = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
  }
  SetTitleSpriteVisible(t) {
    this.GetSprite(0).SetUIActive(t);
  }
  SetTitleSprite(t) {
    const i = this.GetSprite(0);
    i.SetUIActive(false);
    this.SetSpriteByPath(t, i, false, undefined, () => {
      i.SetUIActive(true);
    });
  }
  SetContentSpriteVisible(t) {
    this.GetSprite(2).SetUIActive(t);
  }
  SetContentSprite(t) {
    const i = this.GetSprite(2);
    i.SetUIActive(false);
    this.SetSpriteByPath(t, i, false, undefined, () => {
      i.SetUIActive(true);
    });
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
}
exports.InteractSystemViewItem = InteractSystemViewItem;
//# sourceMappingURL=InteractSystemViewItem.js.map