"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsItemTabItem = exports.SurvivorsItemTabView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const SurvivorsRogueCardBase_1 = require("../../Card/SurvivorsRogueCardBase");
const SurvivorsRogueCardDataFactory_1 = require("../../Card/SurvivorsRogueCardDataFactory");
const SurvivorsTabViewBase_1 = require("./SurvivorsTabViewBase");
class SurvivorsItemTabView extends SurvivorsTabViewBase_1.SurvivorsTabViewBase {
  constructor() {
    super(...arguments);
    this.Xqd = undefined;
  }
  get ItemType() {
    return 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  async InitSubComponents() {
    this.Xqd = new SurvivorsRogueCardBase_1.SurvivorsRogueCardBase();
    await this.Xqd.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  OnBeforeDestroy() {
    this.Xqd?.Destroy();
    this.Xqd = undefined;
  }
  GetLoopItemIndex() {
    return 3;
  }
  GetLoopScrollComponentIndex() {
    return 1;
  }
  CreateLoopItem() {
    var e = new SurvivorsItemTabItem();
    e.BindOnCanExecuteChange(this.OnCanClickItem);
    e.OnClickCallBack = this.OnItemClick;
    return e;
  }
  GenerateItemUiDataList() {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.ActId;
    var r = [];
    for (const i of ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetAllSurvivorsItemByActId(e)) {
      var t = SurvivorsRogueCardDataFactory_1.SurvivorsRogueCardDataFactory.CreateGeneralItem(i.Id);
      if (!t) {
        return [];
      }
      t.LockState = ModelManager_1.ModelManager.SurvivorsRogueModel.GetItemIsLock(this.ItemType, i.Id);
      t.IsNew = ModelManager_1.ModelManager.SurvivorsRogueModel.GetItemIsNew(this.ItemType, i.Id);
      if (t.LockState) {
        t.TitleId = "Text_Unknown_Text";
        t.DescId = "SurvivorsItem_Lock_Desc";
      }
      r.push(t);
    }
    this.BMm(r);
    return r;
  }
  OnSelectItem(e, r = true) {
    var t = new UiAsyncTask_1.UiAsyncTask("SurvivorsRogueCardBase.Apply", async () => {
      await this.Xqd?.Apply(e);
    });
    this.RunAsyncTask(t);
    if (r) {
      this.UiViewSequence?.StopSequenceByKey("Switch");
      this.UiViewSequence?.PlaySequence("Switch");
    }
  }
  BMm(e) {
    if (e) {
      e.sort((e, r) => e.LockState !== r.LockState ? e.LockState ? 1 : -1 : e.QualityId !== r.QualityId ? r.QualityId - e.QualityId : e.Id - r.Id);
    }
  }
}
exports.SurvivorsItemTabView = SurvivorsItemTabView;
class SurvivorsItemTabItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.OnClickCallBack = undefined;
  }
  OnRefresh(e, r, t) {
    e = {
      Type: 4,
      Data: e,
      QualityId: e.QualityId,
      IconPath: ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsItem(e.Id).Icon,
      IsNewVisible: !e.LockState && e.IsNew,
      BottomTextId: e.TitleId,
      IsProhibit: e.LockState
    };
    this.Apply(e);
    this.SetSelected(r, true);
  }
  OnSelected(e) {
    this.SetSelected(true, true);
    if (e) {
      this.OnExtendToggleStateChanged(this.GetItemGridExtendToggle().ToggleState);
    }
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  OnExtendToggleStateChanged(e) {
    this.OnClickCallBack?.(this.Data, this);
  }
}
exports.SurvivorsItemTabItem = SurvivorsItemTabItem;
//# sourceMappingURL=SurvivorsItemTabView.js.map