"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymLordEntranceSelectView = undefined;
const UE = require("ue");
const LordGymEntranceSetById_1 = require("../../../../Core/Define/ConfigQuery/LordGymEntranceSetById");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const HelpController_1 = require("../../Help/HelpController");
const PayShopDefine_1 = require("../../PayShop/PayShopDefine");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const LordGymController_1 = require("../LordGymController");
const LordGymLordEntranceItem_1 = require("./LordGymLordEntranceItem");
class LordGymLordEntranceSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CaptionItem = undefined;
    this.LordEntranceScrollView = undefined;
    this.EntranceSetId = 0;
    this.SelectedEntranceId = 0;
    this.LordEntranceList = undefined;
    this.ConfirmButtonItem = undefined;
    this.ShopTextId = "Text_GymShopNew_Text";
    this.ConfirmTextId = "NewChallenge_Start";
    this.ShopTabIndex = PayShopDefine_1.NEW_LORD_GYM_TAB_INDEX;
    this.AMo = () => {
      this.CloseMe();
    };
    this.dpt = () => {
      var e = LordGymEntranceSetById_1.configLordGymEntranceSetById.GetConfig(this.EntranceSetId).HelpId;
      HelpController_1.HelpController.OpenHelpById(e);
    };
    this.$xl = () => this.CreateItem();
    this.OnLordEntranceToggleClick = e => {
      if (this.CanLordEntranceToggleChange(e)) {
        this.SelectLordEntranceByIndex(e);
      }
    };
    this.CanLordEntranceToggleChange = e => e !== this.LordEntranceScrollView.GetGenericLayout().GetSelectedGridIndex();
    this.zxl = () => {
      ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(5, this.ShopTabIndex);
    };
    this.xco = () => {
      this.OpenSelectView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.zxl]];
  }
  async OnBeforeStartAsync() {
    await LordGymController_1.LordGymController.LordGymInfoRequest();
    var e = this.OpenParam;
    if (e && (this.EntranceSetId = e.EntranceSetId, e = LordGymEntranceSetById_1.configLordGymEntranceSetById.GetConfig(this.EntranceSetId))) {
      this.LordEntranceList = e.LordEntranceList;
      this.ReBuildLordEntranceList();
      this.LordEntranceScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.$xl, this.GetItem(2).GetOwner());
      this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem();
      this.ConfirmButtonItem = new ButtonItem_1.ButtonItem();
      await Promise.all([this.LordEntranceScrollView?.RefreshByDataAsync(this.LordEntranceList), this.CaptionItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.ConfirmButtonItem.CreateThenShowByActorAsync(this.GetButton(5).RootUIComp.GetOwner())]);
      this.ConfirmButtonItem.SetFunction(this.xco);
      this.ConfirmButtonItem.SetLocalTextNew(this.ConfirmTextId);
      this.CaptionItem.SetCloseCallBack(this.AMo);
      this.CaptionItem.SetTitleByTextIdAndArgNew(e.Title);
      this.CaptionItem.SetHelpCallBack(this.dpt);
      this.InitSelect();
    }
  }
  InitSelect() {
    let t = 0;
    var i = ModelManager_1.ModelManager.LordGymModel.LastChallengeLordEntranceId;
    if (i > 0) {
      for (let e = 0; e < this.LordEntranceList.length; e++) {
        if (this.LordEntranceList[e] === i) {
          t = e;
          break;
        }
      }
    }
    this.SelectLordEntranceByIndex(t);
    this.RefreshLordGymCurrency();
    var e = ModelManager_1.ModelManager.LordGymModel;
    for (const r of this.LordEntranceList) {
      e.RecordNewLordGymEntrance(r);
    }
  }
  ReBuildLordEntranceList() {}
  OnHandleLoadScene() {
    UiSceneManager_1.UiSceneManager.InitLordSkeletalHandle();
    ControllerHolder_1.ControllerHolder.LordGymController.CreateLordModelByEntranceId();
    ControllerHolder_1.ControllerHolder.LordGymController.LoadLordModelByEntranceId(this.SelectedEntranceId);
  }
  OnHandleReleaseScene() {
    UiSceneManager_1.UiSceneManager.DestroyLordSkeletalHandle();
  }
  CreateItem() {
    var e = new LordGymLordEntranceItem_1.LordGymLordEntranceItem();
    e.OnToggleClick = this.OnLordEntranceToggleClick;
    e.CanExecuteChangeCallBack = this.CanLordEntranceToggleChange;
    return e;
  }
  SelectLordEntranceByIndex(e) {
    this.LordEntranceScrollView?.GetGenericLayout()?.SelectGridProxy(e);
    this.SelectedEntranceId = this.LordEntranceList[e];
    this.rPl();
  }
  rPl() {
    ControllerHolder_1.ControllerHolder.LordGymController.LoadLordModelByEntranceId(this.SelectedEntranceId);
  }
  RefreshLordGymCurrency() {
    var e = ModelManager_1.ModelManager.LordGymModel.GetLordGymCurrencyRewardAndTotalCount(this.EntranceSetId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), this.ShopTextId, e[0], e[1]);
  }
  OpenSelectView() {
    var e = {
      LordEntranceSetId: this.EntranceSetId,
      LordEntranceId: this.SelectedEntranceId,
      IsPlaySpecialSequence: false
    };
    UiManager_1.UiManager.OpenView("LordGymDifficultySelectView", e);
  }
}
exports.LordGymLordEntranceSelectView = LordGymLordEntranceSelectView;
//# sourceMappingURL=LordGymLordEntranceSelectView.js.map