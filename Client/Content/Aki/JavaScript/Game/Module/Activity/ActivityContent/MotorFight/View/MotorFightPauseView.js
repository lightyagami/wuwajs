"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightPauseView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const MotorcycleArrowCollectionGridItem_1 = require("../../../../GameMainView/MotorArrow/ChildItem/MotorcycleArrowCollectionGridItem");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const MotorFightSummaryAttrItem_1 = require("./Item/MotorFightSummaryAttrItem");
const HIGHEST_QUALITY = 5;
const LOWEST_QUALITY = 3;
class MotorFightPauseView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ItemNumMap = new Map();
    this.lqe = undefined;
    this.c4u = undefined;
    this.R0m = undefined;
    this.UMc = (t, e) => {
      if (t.Config.Type === e.Config.Type) {
        if (t.Config.Quality !== e.Config.Quality) {
          return e.Config.Quality - t.Config.Quality;
        } else {
          return t.Id - e.Id;
        }
      }
      var i = this.ItemNumMap.get(t.Config.Type);
      var r = this.ItemNumMap.get(e.Config.Type);
      if (i.size !== r.size) {
        return r.size - i.size;
      }
      for (let t = HIGHEST_QUALITY; t >= LOWEST_QUALITY; t--) {
        var o = i.get(t) ?? 0;
        var s = r.get(t) ?? 0;
        if (o !== s) {
          return s - o;
        }
      }
      return t.Config.Type - e.Config.Type;
    };
    this.Bco = t => {
      UiManager_1.UiManager.OpenView("MotorcycleArrowCollectionTipsView", t);
    };
    this.Bqe = () => {
      var t = new MotorcycleArrowCollectionGridItem_1.CollectionGridItemPanel();
      t.OnClickCallBack = this.Bco;
      t.NeedSelectedState = false;
      return t;
    };
    this.GLg = () => new MotorFightSummaryAttrItem_1.MotorFightSummaryAttrItem();
    this.FLg = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.LeaveInstanceDungeon();
    };
    this.NLg = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.RequestSettlement(true);
      this.CloseMe();
    };
    this.nbf = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.RequestSettlement(false, () => {
        ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.ReChallengeMotorFightDungeon();
      });
    };
    this.xMo = () => {
      this.CloseMe();
    };
    this.AYm = () => {
      UiManager_1.UiManager.OpenView("MotorFightAttrDetailView");
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIScrollViewWithScrollbarComponent], [8, UE.UIVerticalLayout], [10, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.FLg], [2, this.NLg], [3, this.nbf], [4, this.xMo], [10, this.AYm]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.AMo);
    this.c4u = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.Bqe);
    this.R0m = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(8), this.GLg);
    var t = [];
    var e = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel.ViewModeCollectionSelect.GetAllMotorFightItemData();
    for (const r of e) {
      var i = this.ItemNumMap.get(r.Config.Type) ?? new Map();
      i.set(r.Config.Quality, (i.get(r.Config.Type) ?? 0) + r.Num);
      this.ItemNumMap.set(r.Config.Type, i);
    }
    e.sort(this.UMc);
    t.push(this.c4u.RefreshByDataAsync(e));
    t.push(this.R0m.RefreshByDataAsync([0, 1]));
    await Promise.all(t);
    this.GetItem(5)?.SetUIActive(e.length === 0);
  }
}
exports.MotorFightPauseView = MotorFightPauseView;
//# sourceMappingURL=MotorFightPauseView.js.map