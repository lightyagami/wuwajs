"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaEntranceTaskTabView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  PhantomArenaEntranceTaskItem_1 = require("./PhantomArenaEntranceTaskItem");
class PhantomArenaEntranceTaskTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments), this.Mtu = void 0, this.xqe = void 0, this.Etu = 0, this.TabTypeList = [], this.ypt = [], this.ou_ = () => {
      var e = new PhantomArenaEntranceTaskItem_1.PhantomBattleTaskTabItem;
      return e.OnClickedCb = this.l6c, e
    }, this.l6c = t => {
      for (let e = 0; e < this.TabTypeList.length; e++) this.Mtu.GetLayoutItemByIndex(e).SetToggleState(t === this.TabTypeList[e], !1);
      this.Etu = t, this.Esi(this.Etu)
    }, this.H5c = () => {
      for (let e = 0; e < this.TabTypeList.length; e++) this.Mtu.GetLayoutItemByIndex(e).RefreshRedDot();
      this.Esi(this.Etu)
    }, this.Itu = () => {
      return new PhantomArenaEntranceTaskItem_1.PhantomBattleTaskItem
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem]
    ]
  }
  OnStart() {
    this.Mtu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.ou_), this.xqe = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.Itu)
  }
  OnBeforeDestroy() {
    this.Mtu = void 0, this.xqe = void 0
  }
  OnBeforeShow() {
    var e = this.cOn();
    this.Etu = 0 < e.length ? e[0] : 0, this.Mtu?.RefreshByData(e, () => {
      this.l6c(this.Etu)
    })
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaTaskAwardUpdate, this.H5c)
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaTaskAwardUpdate, this.H5c)
  }
  cOn() {
    return this.TabTypeList = ModelManager_1.ModelManager.PhantomArenaModel.GetTaskTabList(), this.Etu = 0, this.TabTypeList
  }
  Esi(e) {
    this.ypt.length = 0, this.ypt = ModelManager_1.ModelManager.PhantomArenaModel.GetTaskDataByTabId(e), this.xqe.RefreshByDataAsync(this.ypt, !1, !0).then(() => {
      this.xqe.ScrollToGridIndex(0)
    })
  }
}
exports.PhantomArenaEntranceTaskTabView = PhantomArenaEntranceTaskTabView;
//# sourceMappingURL=PhantomArenaEntranceTaskTabView.js.map