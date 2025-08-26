"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineCrossEntranceView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const UiNavigationNewController_1 = require("../../../UiNavigation/New/UiNavigationNewController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const LineCrossClawItem_1 = require("./LineCrossClawItem");
const LineCrossDetailViewModel_1 = require("./LineCrossDetailViewModel");
class LineCrossEntranceView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Ied = undefined;
    this.lqe = undefined;
    this.ScrollView = undefined;
    this.Bqe = () => {
      return new LineCrossItem();
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Ied = this.OpenParam;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetTitle(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LineCrossTitle") ?? "");
    this.lqe.SetHelpBtnActive(true);
    this.lqe.SetCloseCallBack(this.AMo);
    this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.Bqe);
    await Promise.resolve();
  }
  OnBeforeShow() {
    this.Og();
  }
  Og() {
    this.bqe();
  }
  async bqe() {
    var i = ModelManager_1.ModelManager.LineCrossModel.GetShowGroupList(this.Ied.Id);
    var e = [];
    for (const o of i) {
      var t = new ItemData();
      t.GroupId = o;
      t.Data = this.Ied;
      e.push(t);
    }
    await this.ScrollView?.RefreshByDataAsync(e, true);
    var r = i.length;
    let s = 0;
    for (let e = 0; e < r; e++) {
      if (!ModelManager_1.ModelManager.LineCrossModel.GetGroupRewardState(this.Ied.Id, i[e])) {
        s = e;
        break;
      }
    }
    this.ScrollView.BindLateUpdate(e => {
      var i = this.ScrollView.GetItemByIndex(s);
      UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(i, true);
      this.ScrollView.UnBindLateUpdate();
      this.ScrollView.LateScrollTo(i);
    });
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Ied.Id);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "FirstLevel" && (e = this.ScrollView?.GetItemByIndex(0))) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.LineCrossEntranceView = LineCrossEntranceView;
class ItemData {
  constructor() {
    this.GroupId = 0;
    this.Data = undefined;
  }
}
class LineCrossItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.CurrentData = undefined;
    this.Ted = undefined;
    this.YP = () => {
      var e = this.CurrentData.Data.Id;
      var i = this.CurrentData.GroupId;
      if (ModelManager_1.ModelManager.LineCrossModel.GetGroupUnlockState(e, i)) {
        (e = new LineCrossDetailViewModel_1.LineCrossDetailViewModel()).GroupId = i;
        e.LineCrossActivityData = this.CurrentData.Data;
        e.GridIndex = this.GridIndex;
        UiManager_1.UiManager.OpenView("LineCrossDetailView", e);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("LineCross_Challenge_LockTime");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this.YP]];
  }
  async OnBeforeStartAsync() {
    this.Ted = new LineCrossClawItem_1.LineCrossClawItem();
    await this.Ted.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  Refresh(e, i, t) {
    this.CurrentData = e;
    var r = ModelManager_1.ModelManager.LineCrossModel.GetGroupState(e.Data.Id, e.GroupId);
    var s = ModelManager_1.ModelManager.LineCrossModel.GetIfHiddenGroup(e.Data.Id, e.GroupId);
    switch (r) {
      case 0:
        this.fed();
        break;
      case 1:
        this.ged();
        break;
      case 2:
        this.Rxt();
        break;
      default:
        this.fed();
    }
    this.Wbe(e.GroupId);
    this.Qbe(r, e);
    this.bed(t);
    this.v9i(r === 2);
    this.BNe(e.GroupId);
    this.wed(s, r);
  }
  wed(e, i) {
    this.Ted.Refresh(e, i);
  }
  BNe(e) {
    RedDotController_1.RedDotController.UnBindGivenUi("LineCrossGroupRedDot", this.GetItem(9), e);
    RedDotController_1.RedDotController.BindRedDot("LineCrossGroupRedDot", this.GetItem(9), undefined, e);
  }
  bed(e) {
    this.GetText(6).SetText((e + 1).toString());
  }
  v9i(e) {
    this.GetSprite(7).SetUIActive(e);
  }
  Qbe(e, i) {
    let t = "";
    switch (e) {
      case 0:
        t = ModelManager_1.ModelManager.LineCrossModel.GetGroupRewardProgress(i.Data.Id, i.GroupId);
        break;
      case 1:
        t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LineCrossPass") ?? "";
        break;
      case 2:
        t = ModelManager_1.ModelManager.LineCrossModel.GetLockDescription(i.Data.Id, i.GroupId);
        break;
      default:
        t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LineCrossPass") ?? "";
    }
    this.GetText(5).SetText(t);
  }
  Wbe(e) {
    e = ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossGroupByGroupId(e).Name;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e);
  }
  fed() {
    this.GetTexture(1).SetColor(UE.Color.FromHex("3c187d"));
    this.GetSprite(3).SetColor(UE.Color.FromHex("a591b7"));
    this.GetText(5).SetColor(UE.Color.FromHex("ffffff"));
    this.GetSprite(8).SetColor(UE.Color.FromHex("ffffff"));
  }
  ged() {
    this.GetTexture(1).SetColor(UE.Color.FromHex("1a5e45"));
    this.GetSprite(3).SetColor(UE.Color.FromHex("84c991"));
    this.GetText(5).SetColor(UE.Color.FromHex("93de9e"));
    this.GetSprite(8).SetColor(UE.Color.FromHex("00ffc4"));
  }
  Rxt() {
    this.GetTexture(1).SetColor(UE.Color.FromHex("881e32"));
    this.GetSprite(3).SetColor(UE.Color.FromHex("5c4949"));
    this.GetText(5).SetColor(UE.Color.FromHex("ff4141"));
    this.GetSprite(8).SetColor(UE.Color.FromHex("ff4e4e"));
  }
}
//# sourceMappingURL=LineCrossEntranceView.js.map