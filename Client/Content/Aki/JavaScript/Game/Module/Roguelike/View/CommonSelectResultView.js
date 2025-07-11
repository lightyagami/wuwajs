"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonSelectResultView = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const UiActorPool_1 = require("../../../Ui/UiActorPool");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const CommonSelectItem_1 = require("./CommonSelectItem");
const PhantomSelectItem_1 = require("./PhantomSelectItem");
const RogueSelectResultBaseView_1 = require("./RogueSelectResultBaseView");
class CommonSelectResultView extends RogueSelectResultBaseView_1.RogueSelectResultBaseView {
  constructor() {
    super(...arguments);
    this.jao = undefined;
    this.Wao = undefined;
    this.Kao = undefined;
    this.woa = undefined;
    this.Boa = undefined;
    this.Qao = undefined;
    this.Xao = undefined;
    this.OnDescModelChange = () => {
      this.Refresh();
    };
  }
  OnCloseBtnClick() {
    if (!this.Kao.GetRootItem().IsUIActiveInHierarchy() || (this.Kao.GetRootItem().SetUIActive(false), this.Boa.GetRootItem().SetUIActive(false), this.jao.GetNewUnlockAffixEntry().size <= 0)) {
      this.CloseMe(this.jao?.CallBack);
    } else {
      this.Xao.GetRootItem().SetUIActive(true);
      this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_21_TEXT);
      this.$ao();
    }
  }
  async OnBeforeStartAsync() {
    var e = this.GetHorizontalLayout(3).GetRootComponent();
    this.Xao = new PhantomSelectItem_1.PhantomSelectItem();
    await this.Xao.CreateThenShowByResourceIdAsync(RoguelikeDefine_1.PHANTOM_SELECT_ITEM, e);
    this.Kao = new CommonSelectItem_1.CommonSelectItem();
    await this.Kao.CreateThenShowByResourceIdAsync(RoguelikeDefine_1.COMMON_SELECT_ITEM, e);
    this.Boa = new CommonSelectItem_1.CommonSelectItem();
    await this.Boa.CreateThenShowByResourceIdAsync(RoguelikeDefine_1.COMMON_SELECT_ITEM, e);
    this.jao = this.OpenParam;
    if (this.jao.IsShowCommon) {
      this.Yao();
    }
    var e = this.jao.GetNewUnlockAffixEntry().size > 0 && !this.jao.IsShowCommon;
    if (e) {
      this.$ao();
    }
    this.Kao.SetActive(this.jao.IsShowCommon);
    this.Boa.SetActive(this.jao.ExtraRogueGainEntry !== undefined && this.jao.IsShowCommon);
    this.Xao.SetActive(e);
    this.Xao.SetUnlockAttrSet(this.jao.GetNewUnlockAffixEntry());
    this.RefreshTitleText();
  }
  Yao() {
    if (this.jao.SelectRogueGainEntry) {
      this.Kao.Update(this.jao.SelectRogueGainEntry);
      this.Kao.SetToggleUnDetermined();
    }
    if (this.jao.ExtraRogueGainEntry) {
      this.Boa.Update(this.jao.ExtraRogueGainEntry);
      this.Boa.SetToggleUnDetermined();
    }
  }
  $ao() {
    this.Xao.Update(this.jao.NewRogueGainEntry);
    this.Xao.SetToggleUnDetermined();
  }
  OnBeforeDestroy() {
    this.Kao?.Destroy();
    if (this.Wao) {
      UiActorPool_1.UiActorPool.RecycleAsync(this.Wao, RoguelikeDefine_1.COMMON_SELECT_ITEM);
    }
    this.Boa?.Destroy();
    if (this.woa) {
      UiActorPool_1.UiActorPool.RecycleAsync(this.woa, RoguelikeDefine_1.COMMON_SELECT_ITEM);
    }
    this.Xao?.Destroy();
    if (this.Qao) {
      UiActorPool_1.UiActorPool.RecycleAsync(this.Qao, RoguelikeDefine_1.PHANTOM_SELECT_ITEM);
    }
  }
  Refresh() {
    this.Kao.RefreshPanel();
    this.Boa.RefreshPanel();
    this.Xao.RefreshPanel();
    this.RefreshTitleText();
  }
  RefreshTitleText() {
    let e = undefined;
    if (this.jao.IsShowCommon) {
      e = RoguelikeDefine_1.ROGUELIKEVIEW_20_TEXT;
    } else if (this.jao.GetNewUnlockAffixEntry().size > 0) {
      e = RoguelikeDefine_1.ROGUELIKEVIEW_21_TEXT;
    }
    this.GetText(4).ShowTextNew(e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", e]);
      }
    } else if (e[0] === "Sub") {
      e = this.Xao?.GetSubItem();
      if (e) {
        return [e, e];
      }
    }
  }
}
exports.CommonSelectResultView = CommonSelectResultView;
//# sourceMappingURL=CommonSelectResultView.js.map