"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomSelectResultView = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiActorPool_1 = require("../../../Ui/UiActorPool");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const PhantomSelectItem_1 = require("./PhantomSelectItem");
const RogueSelectResultBaseView_1 = require("./RogueSelectResultBaseView");
class PhantomSelectResultView extends RogueSelectResultBaseView_1.RogueSelectResultBaseView {
  constructor() {
    super(...arguments);
    this.jao = undefined;
    this.yho = undefined;
    this.Iho = undefined;
    this.Tho = () => {
      return new PhantomSelectItem_1.PhantomSelectItem(false);
    };
    this.OnDescModelChange = () => {
      this.Refresh();
    };
  }
  async OnCreateAsync() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(RoguelikeDefine_1.PHANTOM_SELECT_ITEM);
    this.Iho = await UiActorPool_1.UiActorPool.GetAsync(e);
  }
  OnStart() {
    super.OnStart();
    this.jao = this.OpenParam;
    this.Iho.UiItem.SetUIParent(this.GetHorizontalLayout(3).GetRootComponent());
    this.yho = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.Tho);
  }
  OnBeforeDestroy() {
    if (this.Iho) {
      UiActorPool_1.UiActorPool.RecycleAsync(this.Iho, RoguelikeDefine_1.PHANTOM_SELECT_ITEM);
    }
  }
  OnBeforeShow() {
    this.Refresh();
  }
  Refresh() {
    this.Lho();
    this.RefreshTitleText();
  }
  Lho() {
    this.yho.RefreshByData([this.jao.NewRogueGainEntry]);
  }
  RefreshTitleText() {
    if (this.jao.OldRogueGainEntry === undefined) {
      this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_25_TEXT);
    } else {
      this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_19_TEXT);
    }
  }
}
exports.PhantomSelectResultView = PhantomSelectResultView;
//# sourceMappingURL=PhantomSelectResultView.js.map