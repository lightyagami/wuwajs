"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalChapterEntryView = void 0;
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CiacconaGalDefine_1 = require("../../CiacconaGalDefine"),
  CiacconaGalTextConfig_1 = require("../../CiacconaGalTextConfig"),
  CiacconaGalRewardButtonItem_1 = require("../CiacconaGalRewardButtonItem"),
  CiacconaGalTitleItem_1 = require("../CiacconaGalTitleItem"),
  CiacconaGalChapterEntryItem_1 = require("./CiacconaGalChapterEntryItem");
class CiacconaGalChapterEntryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.Qyi = void 0, this.Yk1 = void 0, this.sVc = void 0, this.lVc = void 0, this._Vc = void 0, this.Pe = void 0, this.MBc = () => {
      return new CiacconaGalChapterEntryItem_1.CiacconaGalChapterEntryItem
    }, this.k4c = () => {
      ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenEndingView()
    }, this.O4c = () => {
      ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenRewardViewByActivityId(this.Pe.Id)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [2, UE.UIItem],
      [1, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText]
    ]
  }
  async OnBeforeStartAsync() {
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem, this.Qyi.SetCloseCallBack(() => {
      this.CloseMe()
    }), this.sVc = new CiacconaGalTitleItem_1.CiacconaTitleInspirationItem(ModelManager_1.ModelManager.CiacconaGalModel.ActivityData), this.lVc = new CiacconaGalRewardButtonItem_1.CiacconaGalRewardButtonItem, this._Vc = new CiacconaGalRewardButtonItem_1.CiacconaGalRewardButtonItem, this._Vc.SetNeedRemainTime(!0);
    var e = [],
      e = (e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())), e.push(this.sVc.CreateThenShowByResourceIdAsync("PnlTimeInfo", this.Qyi.GetToggleRootItem())), e.push(this.lVc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())), e.push(this._Vc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())), await Promise.all(e), this.lVc.SetOnClick(this.k4c), CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_ENDING_REWARD)),
      e = (this.lVc.SetTitle(e), this._Vc.SetOnClick(this.O4c), CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_PROGRESS_REWARD)),
      e = (this._Vc.SetTitle(e), this.GetHorizontalLayout(1));
    e && (this.Yk1 = new GenericLayout_1.GenericLayout(e, this.MBc), e = CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_CHAPTER_ENTRY_TITLE), this.Qyi.SetTitleByTextIdAndArgNew(e), e = CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_CHAPTER_ENTRY_INTERNAL_TITLE), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e))
  }
  OnBeforeShow() {
    this.Og()
  }
  Og() {
    this.Pe = this.OpenParam;
    var e = [];
    for (const o of this.Pe.SlotIds) {
      var i = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterSlotDataById(o);
      i && e.push(i)
    }
    this.Yk1.RefreshByData(e), this.lVc.SetRedDotVisible(ModelManager_1.ModelManager.CiacconaGalModel.HasAnyEndingReward());
    var [t, a] = ModelManager_1.ModelManager.CiacconaGalModel.GetEndingProgress(), [t, a] = (this.lVc.SetProgressText(t + "/" + a), this._Vc.SetRedDotVisible(ModelManager_1.ModelManager.CiacconaGalModel.HasAnyProgressReward()), this._Vc.SetUiActive(ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.IsInRewardTime), ModelManager_1.ModelManager.CiacconaGalModel.GetProgressRewardProgress());
    this._Vc.SetProgressText(t + "/" + a)
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return 0 !== e.length && (e = this.Yk1?.GetGridByDisplayIndex(0)) ? [e, e] : void 0
  }
}
exports.CiacconaGalChapterEntryView = CiacconaGalChapterEntryView;
//# sourceMappingURL=CiacconaGalChapterEntryView.js.map