"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementSearchItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const AchievementSearchResultDynItem_1 = require("./AchievementSearchResultDynItem");
const AchievementSearchResultItem_1 = require("./AchievementSearchResultItem");
class AchievementSearchItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.xqe = undefined;
    this.dGe = undefined;
    this.CGe = false;
    this.gGe = "";
    this.wqe = undefined;
    this.fGe = (e, t, i) => {
      return new AchievementSearchResultItem_1.AchievementSearchResultItem();
    };
    this.pGe = () => {
      if (ModelManager_1.ModelManager.AchievementModel.AchievementSearchState) {
        this.vGe();
      }
    };
    this.Hbe = () => {
      ModelManager_1.ModelManager.AchievementModel.RefreshSearchResult();
      this.Hqe();
    };
    this.wqe = e;
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDynScrollViewComponent], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.dGe = new AchievementSearchResultDynItem_1.AchievementSearchResultDynItem();
    this.xqe = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(0), this.GetItem(1), this.dGe, this.fGe);
    await this.xqe.Init();
  }
  OnStart() {
    this.GetUIDynScrollViewComponent(0).GetRootComponent().SetUIActive(this.CGe);
    this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetAchievementSearchTextChange, this.pGe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAchievementDataNotify, this.Hbe);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetAchievementSearchTextChange, this.pGe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAchievementDataNotify, this.Hbe);
  }
  OnBeforeDestroy() {
    if (this.xqe) {
      this.xqe.ClearChildren();
      this.xqe = undefined;
    }
    if (this.dGe) {
      this.dGe.ClearItem();
      this.dGe = undefined;
    }
    this.RemoveEventListener();
  }
  Update() {
    this.vGe();
  }
  ResetSearchState() {
    this.gGe = "";
  }
  vGe() {
    var e = ModelManager_1.ModelManager.AchievementModel.CurrentSearchText;
    if (this.gGe !== e) {
      this.Hqe();
    }
  }
  Hqe() {
    var e;
    var t;
    var i = ModelManager_1.ModelManager.AchievementModel;
    if (i.AchievementSearchState) {
      t = i.CurrentSearchText;
      e = i.GetSearchResult();
      this.gGe = t;
      t = i.GetSearchResultIfNull();
      this.GetUIDynScrollViewComponent(0).GetRootComponent().SetUIActive(!t);
      this.CGe = !t;
      t = i.GetSearchResultData(e);
      i.CurrentCacheSearchData = t;
      this.xqe.RefreshByData(t);
    }
  }
}
exports.AchievementSearchItem = AchievementSearchItem;
//# sourceMappingURL=AchievementSearchItem.js.map