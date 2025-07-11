"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasicGraphicSettingView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../../../GameSettings/GameSettingsDefine");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const BasicGraphicSettingData_1 = require("./BasicGraphicSettingData");
const BasicGraphicSettingSliderItem_1 = require("./BasicGraphicSettingSliderItem");
class BasicGraphicSettingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lcc = undefined;
    this._cc = [];
    this.lqe = undefined;
    this.ccc = undefined;
    this.ucc = undefined;
    this.dcc = false;
    this.mcc = undefined;
    this.$An = t => {
      this.lcc.SetActive(true);
      this.Gti(t);
    };
    this.hBi = () => {
      for (const t of this._cc) {
        t.OnChangeValue(t.DefaultCurValue);
      }
      this.lcc.RefreshByData(this._cc);
    };
    this.Mke = () => {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ImageColorSetting");
      this.dcc = true;
      this.CloseMe();
    };
    this.fcc = () => {
      return new BasicGraphicSettingSliderItem_1.BasicGraphicSettingSliderItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIVerticalLayout], [7, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(3);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.ccc = new ButtonItem_1.ButtonItem();
    this.ucc = new ButtonItem_1.ButtonItem();
    await Promise.all([this.lqe.CreateThenShowByActorAsync(t.GetOwner()), this.ccc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.ucc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())]);
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.ccc.SetFunction(this.hBi);
    this.ccc.SetLocalTextNew("ImageColorSettingBtn_Text1");
    this.ucc.SetFunction(this.Mke);
    this.ucc.SetLocalTextNew("ImageColorSettingBtn_Text2");
  }
  OnStart() {
    this.lcc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(6), this.fcc);
    this._cc = BasicGraphicSettingData_1.BasicGraphicSettingData.GetBasicGraphicSettingSliderDataList();
    this.lcc.RefreshByData(this._cc);
    this.mcc = ModelManager_1.ModelManager.MenuModel.GetMenuDataByFunctionId(GameSettingsDefine_1.EFunction.BasicGraphicSetting);
    this.lqe.SetTitleByTextIdAndArgNew(this.mcc.FunctionName);
    this.lqe.SetHelpBtnActive(false);
    this.lcc.SetActive(false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnBeforeDestroy() {
    if (this.dcc) {
      for (const t of this._cc) {
        t.OnApplyValue();
      }
    }
  }
  Gti(t) {
    this.lcc.GetUiAnimController()?.Play(t);
  }
}
exports.BasicGraphicSettingView = BasicGraphicSettingView;
//# sourceMappingURL=BasicGraphicSettingView.js.map