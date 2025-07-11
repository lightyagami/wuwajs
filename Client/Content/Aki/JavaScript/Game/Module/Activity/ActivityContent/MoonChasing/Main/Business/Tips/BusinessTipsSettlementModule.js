"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessTipsSettlementModule = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../../../../../Core/Audio/AudioSystem");
const GlobalData_1 = require("../../../../../../../GlobalData");
const ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../../../Util/LguiUtil");
const CharacterItemWithAdd_1 = require("../Common/Character/CharacterItemWithAdd");
const CharacterListModule_1 = require("../Common/Character/CharacterListModule");
const TWEEN_TIME = 1;
const VALUE_TIME = 0.5;
class BusinessTipsSettlementModule extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CharacterListModule = undefined;
    this.ExpTweener = undefined;
    this.Delegate = undefined;
    this.ValueDelegate = undefined;
    this.Mke = () => {
      ControllerHolder_1.ControllerHolder.MoonChasingController.OpenTipsFinishView();
    };
    this.i2e = () => new CharacterItemWithAdd_1.CharacterItemWithAdd();
    this.OAn = t => {
      for (const e of this.CharacterListModule.GetItemList()) {
        e.RefreshProgressAdd(t);
        if (t === 1) {
          e.RefreshProgress(t);
          e.SetLightProgressWidth();
        }
      }
    };
    this.$pa = t => {
      for (const e of this.CharacterListModule.GetItemList()) {
        e.RefreshCurrentValue(t);
      }
    };
    this.q1a = () => {
      this.Jpa();
      this.zpa();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem]];
    this.BtnBindInfo = [[2, this.Mke]];
  }
  async PAr() {
    this.CharacterListModule = new CharacterListModule_1.CharacterListModule(this.i2e);
    await this.CharacterListModule.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    var t = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData().GetResultCharacterList();
    await this.CharacterListModule.RefreshByDataAsync(t);
  }
  async OnBeforeStartAsync() {
    this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.OAn);
    this.ValueDelegate = (0, puerts_1.toManualReleaseDelegate)(this.$pa);
    await this.PAr();
  }
  OnBeforeShow() {
    var t = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
    if (t.IsInvestSuccess) {
      this.GetText(1)?.SetText(t.Ratio + "%");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Moonfiesta_EventSuccess");
    } else {
      this.GetText(1)?.SetText("100%");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Moonfiesta_EventFail");
    }
  }
  OnBeforeDestroy() {
    if (this.Delegate) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.OAn);
      this.Delegate = undefined;
    }
    if (this.ValueDelegate) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.$pa);
      this.ValueDelegate = undefined;
    }
    this.gzi();
  }
  gzi() {
    if (this.ExpTweener) {
      this.ExpTweener.Kill();
      this.ExpTweener = undefined;
    }
  }
  Ypa() {
    for (const t of this.CharacterListModule.GetItemList()) {
      t.SetLightProgressWidth();
      t.PlayAddAction();
      t.RefreshAddText();
    }
    this.ExpTweener = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.Delegate, 0, 1, TWEEN_TIME);
    this.ExpTweener?.OnCompleteCallBack.Bind(this.q1a);
    AudioSystem_1.AudioSystem.PostEvent("play_ui_figure_up_1s");
  }
  Jpa() {
    for (const t of this.CharacterListModule.GetItemList()) {
      t.PlayEndAction();
    }
  }
  zpa() {
    this.ExpTweener = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.ValueDelegate, 0, 1, VALUE_TIME);
  }
  StartCharacterAnim() {
    ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData().UseInvestProperData();
    this.Ypa();
  }
}
exports.BusinessTipsSettlementModule = BusinessTipsSettlementModule;
//# sourceMappingURL=BusinessTipsSettlementModule.js.map