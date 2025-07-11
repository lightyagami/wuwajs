"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSelectResultView = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiActorPool_1 = require("../../../Ui/UiActorPool");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RogueSelectResultBaseView_1 = require("./RogueSelectResultBaseView");
const RoleSelectItem_1 = require("./RoleSelectItem");
class RoleSelectResultView extends RogueSelectResultBaseView_1.RogueSelectResultBaseView {
  constructor() {
    super(...arguments);
    this.jao = undefined;
    this.Plo = undefined;
    this.UiPoolActorPrivate = undefined;
    this.xlo = () => {
      return new RoleSelectItem_1.RoleSelectItem();
    };
    this.OnDescModelChange = () => {
      this.Refresh();
    };
    this.wlo = () => {
      var e = this.jao.NewRogueGainEntry;
      var t = this.jao.OldRogueGainEntry;
      var i = new Set();
      if (e) {
        for (const s of e.AffixEntryList) {
          if (!t?.AffixEntryList?.find(e => e.Id === s.Id) && !i.has(s.Id)) {
            i.add(s.Id);
          }
        }
      }
      if (!(i.size <= 0)) {
        if (e = this.Plo.GetLayoutItemByIndex(0)) {
          e.SetSecondColorForAttrItem(i);
        }
      }
    };
  }
  async OnCreateAsync() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(RoguelikeDefine_1.ROLE_SELECT_ITEM);
    this.UiPoolActorPrivate = await UiActorPool_1.UiActorPool.GetAsync(e);
  }
  OnStart() {
    super.OnStart();
    this.UiPoolActorPrivate.UiItem.SetUIParent(this.GetHorizontalLayout(3).GetRootComponent());
    this.jao = this.OpenParam;
    this.Plo = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.xlo);
  }
  OnBeforeDestroy() {
    if (this.UiPoolActorPrivate) {
      UiActorPool_1.UiActorPool.RecycleAsync(this.UiPoolActorPrivate, RoguelikeDefine_1.ROLE_SELECT_ITEM);
    }
  }
  OnCloseBtnClick() {
    this.CloseMe(this.jao?.CallBack);
  }
  OnBeforeShow() {
    this.Refresh();
  }
  Refresh() {
    this.Lho();
    this.RefreshTitleText();
  }
  Lho() {
    this.Plo.RefreshByDataAsync([this.jao.NewRogueGainEntry]).then(() => {
      this.wlo();
    });
  }
  RefreshTitleText() {
    this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_18_TEXT);
  }
}
exports.RoleSelectResultView = RoleSelectResultView;
//# sourceMappingURL=RoleSelectResultView.js.map