"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryTechnologyView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const HonamiStoryBozaiTalkPanel_1 = require("./Items/HonamiStoryBozaiTalkPanel");
const HonamiStoryTechnologyAreaItem_1 = require("./Items/HonamiStoryTechnologyAreaItem");
const HonamiStoryTechnologyInfoPanel_1 = require("./Items/HonamiStoryTechnologyInfoPanel");
const HonamiStoryTechnologyNodeItem_1 = require("./Items/HonamiStoryTechnologyNodeItem");
const COST_ITEM_ID = 80600001;
class HonamiStoryTechnologyView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.hem = undefined;
    this.lem = undefined;
    this._em = undefined;
    this.ebl = undefined;
    this.uem = undefined;
    this.cem = false;
    this.jLm = -1;
    this.gVd = e => {
      if (e) {
        e.OnClickToggleBack ||= this.jbe;
        if (!this.cem) {
          if (this.jLm === this.hem.GetNodeDataConfig().Id) {
            this.hem.SelectNode();
            ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(this.hem.ToggleItem.RootUIComp);
            this.cem = true;
          } else if (this.jLm === e.GetNodeDataConfig().Id) {
            e.SelectNode();
            ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(e.ToggleItem.RootUIComp);
            if (e = this.lem.GetItemByIndex(e.GetNodeDataConfig().Area - 1)) {
              this.lem.LateScrollTo(e);
            }
            this.cem = true;
          }
        }
      }
    };
    this.mem = () => {
      var e;
      new UiAsyncTask_1.UiAsyncTask("TechNodeUpdate", async () => {
        await this.Pjd();
      }).Run();
      if (this.uem) {
        e = ModelManager_1.ModelManager.HonamiStoryModel.GetRandomDialogData(5);
        this.uem.SetTalkInfoTextAndPlayAudio(e);
      }
    };
    this.CVd = () => {
      var e = new HonamiStoryTechnologyAreaItem_1.HonamiStoryTechnologyAreaItem();
      e.OnAfterRefreshOneNode = this.gVd;
      return e;
    };
    this.jbe = (e, i, t) => {
      if (this.ebl) {
        this.ebl.SetToggleState(0);
      }
      this.ebl = t;
      ModelManager_1.ModelManager.HonamiStoryModel.CurrentSelectNode = i;
      ModelManager_1.ModelManager.HonamiStoryModel.CurrentSelectNodeItem = e;
      this._em.Refresh(i);
    };
    this.Jvt = () => {
      this.CloseMe();
    };
    this.Cjo = e => {
      var i = ModelManager_1.ModelManager.HonamiStoryModel;
      if (i.CurrentSelectNode && i.CurrentSelectNode.GetConfig.Type === 1) {
        UiManager_1.UiManager.ResetToBattleView();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.hem = new HonamiStoryTechnologyNodeItem_1.HonamiStoryTechnologyNodeItem();
    this._em = new HonamiStoryTechnologyInfoPanel_1.HonamiStoryTechnologyInfoPanel();
    this.uem = new HonamiStoryBozaiTalkPanel_1.HonamiStoryBozaiTalkPanel();
    this.lem = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.CVd, this.GetItem(1).GetOwner());
    var e = [this.lqe.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()), this.hem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this._em.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.uem.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())];
    await Promise.all(e);
    this.lqe.SetCloseCallBack(this.Jvt);
    this.hem.OnClickToggleBack = this.jbe;
    ModelManager_1.ModelManager.HonamiStoryModel.CheckCurrentTalentTreeNode();
    this.jLm = ModelManager_1.ModelManager.HonamiStoryModel.CurrentSelectNode?.GetConfig.Id ?? -1;
    await this.hem.RefreshNodeAsyncByData(ModelManager_1.ModelManager.HonamiStoryModel.GetFirstTechnologyNode());
    var e = [this.lqe.SetCurrencyItemList([COST_ITEM_ID]), this.lem.RefreshByDataAsync(ModelManager_1.ModelManager.HonamiStoryModel.GetTechAreaDataList)];
    await Promise.all(e);
    this.lem.GetScrollItemByIndex(ModelManager_1.ModelManager.HonamiStoryModel.GetTechAreaDataList.length - 1).CloseLineRight();
    var i = this.lem.GetScrollItemList();
    for (let e = 0; e < i.length; e++) {
      this.lem.GetItemByIndex(e).SetUIParent(this.GetItem(4));
    }
    e = ModelManager_1.ModelManager.HonamiStoryModel.GetRandomDialogData(4);
    this.uem.SetTalkInfoTextAndPlayAudio(e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryTechNodeLevelUpdate, this.mem);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.Cjo);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryTechNodeLevelUpdate, this.mem);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.Cjo);
  }
  async Pjd() {
    var e = [];
    if (this.hem) {
      e.push(this.hem.RefreshNodeAsync());
    }
    var i = this.lem.GetScrollItemList();
    for (const t of i) {
      for (const o of t.GetNodeItemMap.values()) {
        e.push(o.RefreshNodeAsync());
      }
    }
    this._em.Refresh(ModelManager_1.ModelManager.HonamiStoryModel.CurrentSelectNode);
    await Promise.all(e);
  }
}
exports.HonamiStoryTechnologyView = HonamiStoryTechnologyView;
//# sourceMappingURL=HonamiStoryTechnologyView.js.map