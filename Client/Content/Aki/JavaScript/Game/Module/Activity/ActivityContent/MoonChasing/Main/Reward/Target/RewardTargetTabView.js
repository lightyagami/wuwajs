"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardTargetTabView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../../../../Ui/Base/UiTabViewBase");
const UiTabSequence_1 = require("../../../../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
const GenericLayout_1 = require("../../../../../../Util/Layout/GenericLayout");
const LoopScrollView_1 = require("../../../../../../Util/ScrollView/LoopScrollView");
const TaskItem_1 = require("../../../../Common/TaskItem/TaskItem");
const MoonChasingRewardDefine_1 = require("../MoonChasingRewardDefine");
const RewardTargetTabItem_1 = require("./RewardTargetTabItem");
class RewardTargetTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.TabLayout = undefined;
    this.Cua = -1;
    this.LoopScroll = undefined;
    this.ypt = [];
    this.nxa = true;
    this.dOn = e => {
      if (ModelManager_1.ModelManager.MoonChasingRewardModel.GetTaskDataById(e)) {
        this.TabLayout.GetLayoutItemByIndex(this.Cua).RefreshRedDot();
        this.Eua(this.Cua);
      }
    };
    this.COn = () => new TaskItem_1.TaskItem();
    this.fqe = () => new RewardTargetTabItem_1.RewardTargetTabItem();
    this.Wwn = e => {
      if (this.Cua !== e && this.Cua !== -1) {
        this.TabLayout.GetLayoutItemByIndex(this.Cua)?.SetToggleState(false, false);
      }
      this.Cua = e;
      this.Eua(this.Cua);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem]];
  }
  OnStart() {
    this.nxa = this.ExtraParams ?? true;
    this.TabLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.fqe);
    this.LoopScroll = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(3).GetOwner(), this.COn);
  }
  cOn(t) {
    var i = [];
    for (let e = 0; e < t.length; e++) {
      var r = new MoonChasingRewardDefine_1.RewardTabData();
      r.NameTextId = t[e].Name;
      r.Index = e;
      r.ClickedCallback = this.Wwn;
      r.RefreshRedDot = e => ModelManager_1.ModelManager.MoonChasingRewardModel.GetTaskDataRedDotStateByTabId(e);
      i.push(r);
    }
    return i;
  }
  async OnBeforeShowAsyncImplement() {
    var e = ModelManager_1.ModelManager.MoonChasingRewardModel.GetRewardTargetTabList();
    await this.TabLayout.RefreshByDataAsync(this.cOn(e));
    this.TabLayout.GetLayoutItemByIndex(0).SetToggleState(true, true);
  }
  OnBeforeShow() {
    this.GetTabBehavior(UiTabSequence_1.UiTabSequence)?.GetLevelSequencePlayer()?.PlayLevelSequenceByName("Start");
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TakenRewardTargetData, this.dOn);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TakenRewardTargetData, this.dOn);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = this.LoopScroll.GetGrid(0);
    if (t !== undefined) {
      return [t, t];
    }
  }
  Eua(e) {
    this.ypt.length = 0;
    e = ModelManager_1.ModelManager.MoonChasingRewardModel.GetTaskDataByTabId(e + 1).sort(ModelManager_1.ModelManager.MoonChasingRewardModel.SortTaskData);
    if (this.nxa) {
      this.ypt = e;
    } else {
      for (const i of e) {
        var t = i.DeepCopy(i);
        t.JumpId = 0;
        t.DoingTextId = "Moonfiesta_TargetDone";
        this.ypt.push(t);
      }
    }
    this.LoopScroll.RefreshByDataAsync(this.ypt, false, true);
  }
}
exports.RewardTargetTabView = RewardTargetTabView;
//# sourceMappingURL=RewardTargetTabView.js.map