"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalChapterEntryView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CiacconaGalDefine_1 = require("../../CiacconaGalDefine");
const CiacconaGalTextConfig_1 = require("../../CiacconaGalTextConfig");
const CiacconaGalRewardButtonItem_1 = require("../CiacconaGalRewardButtonItem");
const CiacconaGalTitleItem_1 = require("../CiacconaGalTitleItem");
const CiacconaGalChapterEntryItem_1 = require("./CiacconaGalChapterEntryItem");
class CiacconaGalChapterEntryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Qyi = undefined;
    this.RO1 = undefined;
    this.sVc = undefined;
    this.lVc = undefined;
    this._Vc = undefined;
    this.Pe = undefined;
    this.MBc = () => {
      return new CiacconaGalChapterEntryItem_1.CiacconaGalChapterEntryItem();
    };
    this.k4c = () => {
      ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenEndingView();
    };
    this.O4c = () => {
      ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenRewardViewByActivityId(this.Pe.Id);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [2, UE.UIItem], [1, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    this.Qyi.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.sVc = new CiacconaGalTitleItem_1.CiacconaTitleInspirationItem(ModelManager_1.ModelManager.CiacconaGalModel.ActivityData);
    this.lVc = new CiacconaGalRewardButtonItem_1.CiacconaGalRewardButtonItem();
    this._Vc = new CiacconaGalRewardButtonItem_1.CiacconaGalRewardButtonItem();
    this._Vc.SetNeedRemainTime(true);
    var e = [];
    e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    e.push(this.sVc.CreateThenShowByResourceIdAsync("PnlTimeInfo", this.Qyi.GetToggleRootItem()));
    e.push(this.lVc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    e.push(this._Vc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    await Promise.all(e);
    this.lVc.SetOnClick(this.k4c);
    var e = CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_ENDING_REWARD);
    this.lVc.SetTitle(e);
    this._Vc.SetOnClick(this.O4c);
    var e = CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_PROGRESS_REWARD);
    this._Vc.SetTitle(e);
    var e = this.GetHorizontalLayout(1);
    if (e) {
      this.RO1 = new GenericLayout_1.GenericLayout(e, this.MBc);
      e = CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_CHAPTER_ENTRY_TITLE);
      this.Qyi.SetTitleByTextIdAndArgNew(e);
      e = CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_CHAPTER_ENTRY_INTERNAL_TITLE);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e);
    }
  }
  OnBeforeShow() {
    this.Og();
  }
  Og() {
    this.Pe = this.OpenParam;
    var e = [];
    for (const o of this.Pe.SlotIds) {
      var i = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterSlotDataById(o);
      if (i) {
        e.push(i);
      }
    }
    this.RO1.RefreshByData(e);
    this.lVc.SetRedDotVisible(ModelManager_1.ModelManager.CiacconaGalModel.HasAnyEndingReward());
    var [t, a] = ModelManager_1.ModelManager.CiacconaGalModel.GetEndingProgress();
    this.lVc.SetProgressText(t + "/" + a);
    this._Vc.SetRedDotVisible(ModelManager_1.ModelManager.CiacconaGalModel.HasAnyProgressReward());
    this._Vc.SetUiActive(ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.IsInRewardTime);
    var [t, a] = ModelManager_1.ModelManager.CiacconaGalModel.GetProgressRewardProgress();
    this._Vc.SetProgressText(t + "/" + a);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && (e = this.RO1?.GetGridByDisplayIndex(0))) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.CiacconaGalChapterEntryView = CiacconaGalChapterEntryView;
//# sourceMappingURL=CiacconaGalChapterEntryView.js.map