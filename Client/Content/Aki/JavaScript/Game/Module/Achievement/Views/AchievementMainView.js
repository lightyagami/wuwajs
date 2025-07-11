"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementMainView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const AchievementCategoryItem_1 = require("./AchievementCategoryItem");
const AchievementSmallItem_1 = require("./AchievementSmallItem");
class AchievementMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Wqe = undefined;
    this.Kqe = undefined;
    this.lqe = undefined;
    this.xqe = undefined;
    this.Qqe = undefined;
    this.Xqe = () => {
      return new AchievementCategoryItem_1.AchievementCategoryItem();
    };
    this.Hbe = () => {
      this.$qe();
      this.aqe();
      this.Yqe();
    };
    this.Jqe = () => {
      return new AchievementSmallItem_1.AchievementSmallItem();
    };
    this.Awe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UILoopScrollViewComponent], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIItem], [6, UE.UIItem]];
  }
  async OnCreateAsync() {
    await ControllerHolder_1.ControllerHolder.AchievementController.RequestUpdateAchievementInfo();
  }
  OnStart() {
    this.Kqe = this.GetText(0);
    this.Wqe = this.GetText(1);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(2));
    this.lqe.SetCloseCallBack(this.Awe);
    this.Qqe = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(3), this.GetItem(5).GetOwner(), this.Jqe);
    var e = this.GetScrollViewWithScrollbar(4);
    this.xqe = new GenericLayout_1.GenericLayout(e.GetContent().GetComponentByClass(UE.UILayoutBase.StaticClass()), this.Xqe);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAchievementDataNotify, this.Hbe);
  }
  OnBeforeShow() {
    this.$qe();
    this.zqe();
    this.aqe();
    this.Yqe();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAchievementDataNotify, this.Hbe);
  }
  OnBeforeDestroy() {
    if (this.lqe) {
      this.lqe.Destroy();
      this.lqe = undefined;
    }
    if (this.Qqe) {
      this.Qqe.ClearGridProxies();
      this.Qqe = undefined;
    }
    this.Wqe &&= undefined;
    this.Kqe &&= undefined;
  }
  aqe() {
    var e = ModelManager_1.ModelManager.AchievementModel.GetAchievementFinishedStar();
    this.Kqe.SetText(e.toString());
  }
  Yqe() {
    var e = ModelManager_1.ModelManager.AchievementModel.GetFinishedAchievementNum();
    this.Wqe?.SetText(e.toString());
  }
  $qe() {
    const t = ModelManager_1.ModelManager.AchievementModel;
    var e = ModelManager_1.ModelManager.AchievementModel.GetRecentFinishedAchievementList();
    var i = e.length > 0;
    const r = new Array();
    e.forEach(e => {
      r.push(t.GetAchievementData(e));
    });
    this.Qqe.RefreshByData(r);
    this.Qqe.SetTargetRootComponentActive(i);
    this.GetItem(6).SetUIActive(!i);
  }
  zqe() {
    var e = ModelManager_1.ModelManager.AchievementModel.GetAchievementCategoryArray();
    this.xqe.RefreshByData(e);
  }
  OnBeforeHide() {
    this.Qqe.ClearGridProxies();
  }
}
exports.AchievementMainView = AchievementMainView;
//# sourceMappingURL=AchievementMainView.js.map