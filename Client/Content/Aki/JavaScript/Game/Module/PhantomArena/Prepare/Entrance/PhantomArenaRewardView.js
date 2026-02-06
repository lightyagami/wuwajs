"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaRewardView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const PhantomArenaController_1 = require("../../PhantomArenaController");
const PhantomArenaEntranceTaskItem_1 = require("./PhantomArenaEntranceTaskItem");
class PhantomArenaRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.LOe = 0;
    this.B7t = undefined;
    this.qoh = undefined;
    this.Bou = 0;
    this.TabTypeList = [];
    this.ypt = [];
    this.LYm = undefined;
    this.PYm = () => {
      var e = new PhantomArenaEntranceTaskItem_1.PhantomBattleTaskTabItem();
      e.OnClickedCb = this.l6c;
      e.ActivityId = this.LOe;
      return e;
    };
    this.l6c = t => {
      for (let e = 0; e < this.TabTypeList.length; e++) {
        this.B7t.GetLayoutItemByIndex(e).SetToggleState(t === this.TabTypeList[e], false);
      }
      this.Bou = t;
      this.Esi(this.Bou);
    };
    this.H5c = () => {
      for (let e = 0; e < this.TabTypeList.length; e++) {
        this.B7t.GetLayoutItemByIndex(e).RefreshRedDot();
      }
      this.Esi(this.Bou);
      this.wyl();
    };
    this.VOe = () => {
      return new PhantomArenaEntranceTaskItem_1.PhantomBattleTaskItem();
    };
    this.AYm = () => {
      var e = ModelManager_1.ModelManager.PhantomArenaModel.GetRewardItemId(this.LOe);
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
    };
    this.g6e = () => {
      if (this.LYm) {
        PhantomArenaController_1.PhantomArenaController.TaskRewardRequest(this.LYm.s5n);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 71, "特殊奖励不存在");
      }
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIHorizontalLayout], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIText]];
    this.BtnBindInfo = [[6, this.AYm], [5, this.g6e]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaTaskAwardUpdate, this.H5c);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaTaskAwardUpdate, this.H5c);
  }
  async OnBeforeStartAsync() {
    this.LOe = this.OpenParam;
    var e = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    e.SetHelpBtnActive(false);
    e.SetCloseCallBack(this.AMo);
    this.B7t = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.PYm);
    this.qoh = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.VOe);
    this.TabTypeList = ModelManager_1.ModelManager.PhantomArenaModel.GetTaskTabList(this.LOe);
    await this.B7t.RefreshByDataAsync(this.TabTypeList);
    this.Bou = this.TabTypeList[0];
    this.l6c(this.Bou);
    this.GetText(7)?.SetUIActive(false);
    this.wyl();
  }
  wyl() {
    var e;
    this.LYm = ModelManager_1.ModelManager.PhantomArenaModel.GetSpecialTask(this.LOe);
    if (this.LYm) {
      this.GetButton(6)?.RootUIComp.SetUIActive(this.LYm.H6n !== Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish);
      this.GetButton(5)?.RootUIComp.SetUIActive(this.LYm.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish);
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskConfigById(this.LYm.s5n);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Desc);
    }
  }
  Esi(e) {
    this.ypt.length = 0;
    this.ypt = ModelManager_1.ModelManager.PhantomArenaModel.GetTaskDataByTabId(e, this.LOe);
    this.qoh.RefreshByData(this.ypt, () => {
      this.qoh.ScrollToTop(0);
    }, true);
  }
}
exports.PhantomArenaRewardView = PhantomArenaRewardView;
//# sourceMappingURL=PhantomArenaRewardView.js.map