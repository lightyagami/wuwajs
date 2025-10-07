"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsTabViewBase = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
class SurvivorsTabViewBase extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.ItemScroll = undefined;
    this.CurrentItemId = -1;
    this.$An = e => {
      if (e === "Start") {
        this.OnTriggerSequenceStartEvent();
      }
    };
    this.OnCanClickItem = (e, t, i) => {
      return e.Id !== this.CurrentItemId;
    };
    this.OnItemClick = (e, t) => {
      if (e.Id !== this.CurrentItemId) {
        e = t.GridIndex;
        this.sWt(e, true);
      }
    };
  }
  async InitSubComponents() {}
  OnTriggerSequenceStartEvent() {}
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  async OnBeforeStartAsync() {
    var e = [];
    e.push(this.InitSubComponents());
    e.push(this.Bkd());
    await Promise.all(e);
  }
  OnShowUiTabViewFromToggle() {
    this.ItemScroll?.ResetGridController();
    this.UiViewSequence?.PlaySequence("Start");
  }
  OnShowUiTabViewFromView() {
    this.ItemScroll?.ResetGridController();
    this.UiViewSequence?.PlaySequence("Start");
  }
  async Bkd() {
    this.ItemScroll = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(this.GetLoopScrollComponentIndex()), this.GetItem(this.GetLoopItemIndex()).GetOwner(), this.CreateLoopItem.bind(this), true);
    var e = this.GenerateItemUiDataList();
    this.SortUiDataList(e);
    this.mGe(e);
    await this.ItemScroll.RefreshByDataAsync(e, false, true);
    const t = this.ExtraParams;
    let i = 0;
    if (t !== undefined && (e = e.findIndex(e => e.Id === t)) !== -1) {
      i = e;
    }
    this.ItemScroll.SelectGridProxy(i, false);
    this.sWt(i, false);
  }
  SortUiDataList(e) {
    e.sort((e, t) => e.LockState !== t.LockState ? e.LockState ? 1 : -1 : e.Id - t.Id);
  }
  sWt(e, t = true) {
    this.ItemScroll.SelectGridProxy(e);
    var i = this.ItemScroll.TryGetCachedData(e);
    this.CurrentItemId = i.Id;
    if (i.IsNew) {
      ModelManager_1.ModelManager.SurvivorsRogueModel.SetItemClicked(this.ItemType, i.Id);
      i.IsNew = false;
      this.ItemScroll?.RefreshGridProxy(e);
    }
    this.OnSelectItem(i, t);
  }
  mGe(e) {
    let t = 0;
    for (const i of e) {
      if (!i.LockState) {
        t++;
      }
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "WeaponEvolveTitle_UnlockedNum", t, e.length);
  }
}
exports.SurvivorsTabViewBase = SurvivorsTabViewBase;
//# sourceMappingURL=SurvivorsTabViewBase.js.map