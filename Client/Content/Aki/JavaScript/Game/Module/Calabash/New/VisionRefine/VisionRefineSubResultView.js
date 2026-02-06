"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineBatchResultViewData = exports.VisionRefineSubResultView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const VisionRefineAttributeItem_1 = require("./VisionRefineAttributeItem");
const VisionRefineSlotItem_1 = require("./VisionRefineSlotItem");
class VisionRefineSubResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.B1c = undefined;
    this.dRg = undefined;
    this.mRg = undefined;
    this.ohd = undefined;
    this.nhd = undefined;
    this.OWe = () => new VisionRefineAttributeItem_1.VisionRefineAttributeItem();
    this.rki = () => {
      this.Kkg();
    };
    this.p5t = () => {
      this.Xkg();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var i;
    var t;
    var e = this.OpenParam;
    this.B1c = new VisionRefineSlotItem_1.VisionRefineSlotItem();
    await this.B1c.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.B1c.SetBtnInteractive(false);
    if (e.UniqueId === undefined) {
      this.B1c.SetUiActive(false);
    } else {
      this.B1c.SetUiActive(true);
      i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(e.UniqueId);
      t = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(e.UniqueId);
      this.B1c.RefreshByData(t, true, i.GetCost());
    }
    this.dRg = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.OWe);
    await this.dRg.RefreshByDataAsync(e.LeftAttrList);
    this.mRg = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.OWe, this.GetItem(3)?.GetOwner());
    await this.mRg.RefreshByDataAsync(e.RightAttrList);
    this.ohd = new VisionRefineBatchResultButton();
    this.ohd.OnClickCallback = this.rki;
    await this.ohd.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    this.ohd.SetText("Text_Cancel_Text");
    this.nhd = new VisionRefineBatchResultButton();
    this.nhd.OnClickCallback = this.p5t;
    await this.nhd.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.nhd.SetText("Text_Confirm_Text");
    if (e.ConfirmTipTextId) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.ConfirmTipTextId);
    }
  }
  async Kkg() {
    var i = this.OpenParam;
    if (i.OnClickCancel) {
      await i.OnClickCancel();
    }
    this.CloseMe();
  }
  async Xkg() {
    var i;
    var t = this.OpenParam;
    var e = t.UniqueId;
    if (e !== undefined) {
      if ((i = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e)) === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Calabash", 75, "Proto_PhantomPolishResponse.Proto_UpdateInfo为空");
        }
      } else {
        if (i.CanLock() && !i.GetIsLock()) {
          ControllerHolder_1.ControllerHolder.InventoryController.ItemLockRequest(e, true);
        }
        if (t.OnClickConfirm) {
          await t.OnClickConfirm();
        }
        this.CloseMe();
      }
    }
  }
}
exports.VisionRefineSubResultView = VisionRefineSubResultView;
class VisionRefineBatchResultViewData {
  constructor() {
    this.OnClickConfirm = undefined;
    this.OnClickCancel = undefined;
    this.LeftAttrList = [];
    this.RightAttrList = [];
    this.UniqueId = undefined;
    this.ConfirmTipTextId = undefined;
  }
}
exports.VisionRefineBatchResultViewData = VisionRefineBatchResultViewData;
class VisionRefineBatchResultButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickCallback = undefined;
    this.eTt = () => {
      if (this.OnClickCallback !== undefined) {
        this.OnClickCallback();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  SetText(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i);
  }
}
//# sourceMappingURL=VisionRefineSubResultView.js.map