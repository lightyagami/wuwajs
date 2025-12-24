"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaEntranceTaskTabView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const PhantomArenaEntranceTaskItem_1 = require("./PhantomArenaEntranceTaskItem");
class PhantomArenaEntranceTaskTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.ActivityId = 0;
    this.Dou = undefined;
    this.xqe = undefined;
    this.Bou = 0;
    this.TabTypeList = [];
    this.ypt = [];
    this.ou_ = () => {
      var e = new PhantomArenaEntranceTaskItem_1.PhantomBattleTaskTabItem();
      e.OnClickedCb = this.l6c;
      e.ActivityId = this.ActivityId;
      return e;
    };
    this.l6c = t => {
      for (let e = 0; e < this.TabTypeList.length; e++) {
        this.Dou.GetLayoutItemByIndex(e).SetToggleState(t === this.TabTypeList[e], false);
      }
      this.Bou = t;
      this.Esi(this.Bou);
    };
    this.H5c = () => {
      for (let e = 0; e < this.TabTypeList.length; e++) {
        this.Dou.GetLayoutItemByIndex(e).RefreshRedDot();
      }
      this.Esi(this.Bou);
    };
    this.kou = () => {
      return new PhantomArenaEntranceTaskItem_1.PhantomBattleTaskItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem]];
  }
  OnStart() {
    this.ActivityId = this.ExtraParams;
    this.Dou = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.ou_);
    this.xqe = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.kou);
  }
  OnBeforeDestroy() {
    this.Dou = undefined;
    this.xqe = undefined;
  }
  OnBeforeShow() {
    var e = this.cOn();
    this.Bou = e.length > 0 ? e[0] : 0;
    this.Dou?.RefreshByData(e, () => {
      this.l6c(this.Bou);
    });
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaTaskAwardUpdate, this.H5c);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaTaskAwardUpdate, this.H5c);
  }
  cOn() {
    this.TabTypeList = ModelManager_1.ModelManager.PhantomArenaModel.GetTaskTabList(this.ActivityId);
    this.Bou = 0;
    return this.TabTypeList;
  }
  Esi(e) {
    this.ypt.length = 0;
    this.ypt = ModelManager_1.ModelManager.PhantomArenaModel.GetTaskDataByTabId(e, this.ActivityId);
    this.xqe.RefreshByDataAsync(this.ypt, false, true).then(() => {
      this.xqe.ScrollToGridIndex(0);
    });
  }
}
exports.PhantomArenaEntranceTaskTabView = PhantomArenaEntranceTaskTabView;
//# sourceMappingURL=PhantomArenaEntranceTaskTabView.js.map