"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerNormalLevelChoseView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const PayShopViewData_1 = require("../../../PayShop/PayShopData/PayShopViewData");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const BabelTowerController_1 = require("./BabelTowerController");
const BabelTowerNormalLevelChoseItem_1 = require("./BabelTowerNormalLevelChoseItem");
class BabelTowerNormalLevelChoseView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.lqe = undefined;
    this.vVt = undefined;
    this.rfc = [];
    this.u6c = undefined;
    this.AMo = () => {
      var e;
      if (this.Pe?.IfReturnToBabelTowerMainView) {
        e = {
          IfLeaveInstanceDungeonWhenClose: this.Pe.IfLeaveInstanceDungeonWhenMainViewClose
        };
        UiManager_1.UiManager.OpenView("BabelTowerMainView", e, () => {
          this.CloseMe();
        });
      } else {
        this.CloseMe();
      }
    };
    this.zDo = () => {
      var e = new PayShopViewData_1.PayShopViewData();
      e.PayShopId = 213;
      e.ShowShopIdList = [213];
      ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(e);
    };
    this.Ud_ = () => {
      if (BabelTowerController_1.BabelTowerController.GetBabelTowerData().CheckIfInOpenTime()) {
        UiManager_1.UiManager.OpenView("BabelTowerQuestView");
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("BabelTowerIsNotOpen");
      }
    };
    this.Voc = e => {
      BabelTowerController_1.BabelTowerController.SaveNewLevelClickData(e, 0);
      UiManager_1.UiManager.OpenView("BabelTowerDeTermSelectView", e);
    };
    this.sGe = () => {
      var e = new BabelTowerNormalLevelChoseItem_1.BabelTowerNormalLevelChoseItem();
      e.OnClickButtonCallBack = this.Voc;
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [8, UE.UILoopScrollViewComponent], [9, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIText], [1, UE.UIText]];
    this.BtnBindInfo = [[4, this.zDo], [2, this.Ud_]];
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(this.AMo);
    this.vVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(8), this.GetItem(9).GetOwner(), this.sGe);
  }
  OnBeforeShow() {
    var r = ModelManager_1.ModelManager.BabelTowerModel.LevelChoseHandle;
    if (r) {
      for (let e = 0; e < this.rfc.length; e++) {
        if (this.rfc[e].ELl === r) {
          this.vVt?.ScrollToGridIndex(e);
          const o = this.vVt.UnsafeGetGridProxy(e);
          this.vVt?.BindLateUpdate(() => {
            if (o) {
              ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(o.GetRootItem(), true);
              if (this.u6c !== o) {
                this.u6c?.StopLoopSequence();
                o.PlayLoopSequence();
              } else if (!this.u6c.IsPlayingSequence()) {
                this.u6c.PlayLoopSequence();
              }
              this.u6c = o;
            }
            this.vVt?.UnBindLateUpdate();
          });
        }
      }
    }
    var e = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    this.GetText(7).SetText(e.CurrentItemCount + "");
    this.GetText(6).SetText("/" + ModelManager_1.ModelManager.BabelTowerModel.ItemCountMax);
  }
  OnStart() {
    this.GetItem(5).SetUIActive(false);
    RedDotController_1.RedDotController.BindRedDot("BabelTowerQuestRedDot", this.GetItem(3));
    this.Og();
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("BabelTowerQuestRedDot", this.GetItem(3));
  }
  Og() {
    var e;
    var r = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    this.rfc = [];
    let o = 0;
    for ([, e] of r.NormalLevelDataMap) {
      this.rfc.push(e);
      if (e.dMs) {
        o++;
      }
    }
    this.vVt?.RefreshByData(this.rfc);
    this.GetText(1).SetText(o + "/" + r.NormalLevelDataMap.size);
    this.GetLoopScrollViewComponent(8).Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())?.Play();
  }
  OnBeforeHide() {
    ModelManager_1.ModelManager.BabelTowerModel.LevelChoseHandle = 0;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && !(e.length <= 0) && e[0] === "FirstEntry" && (e = this.vVt?.GetGridByDisplayIndex(0))) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.BabelTowerNormalLevelChoseView = BabelTowerNormalLevelChoseView;
//# sourceMappingURL=BabelTowerNormalLevelChoseView.js.map