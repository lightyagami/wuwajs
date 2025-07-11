"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessTipsTravelView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../../../../../Core/Audio/AudioSystem");
const TimerSystem_1 = require("../../../../../../../../Core/Timer/TimerSystem");
const GlobalData_1 = require("../../../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../../../Util/LguiUtil");
const BusinessDefine_1 = require("../BusinessDefine");
const CharacterItemWithAdd_1 = require("../Common/Character/CharacterItemWithAdd");
const CharacterListModule_1 = require("../Common/Character/CharacterListModule");
const BusinessTravelRoleItem_1 = require("./BusinessTravelRoleItem");
const TWEEN_TIME = 1;
const VALUE_TIME = 0.5;
const RUN_TIME = 2000;
const LAST_SHOW = 2000;
const NORMAL_SHOW = 1000;
const SKIP_RESULT_DELAY = 800;
class BusinessTipsTravelView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CharacterListModule = undefined;
    this.RoleLayout = undefined;
    this.RoleIdList = [];
    this.DelegateId = 0;
    this.ShowIndex = -1;
    this.e2e = [];
    this.ExpTweener = undefined;
    this.Delegate = undefined;
    this.ValueDelegate = undefined;
    this.SkipAnimDelayTimerHandle = undefined;
    this.RunTimerHandle = undefined;
    this.IsLastFinishShow = false;
    this.IsInResult = false;
    this.SkipResultTimeHandle = undefined;
    this.TimerHandle = undefined;
    this.i2e = () => new CharacterItemWithAdd_1.CharacterItemWithAdd();
    this.nFe = () => new BusinessTravelRoleItem_1.BusinessTravelRoleItem();
    this.OAn = i => {
      for (const t of this.CharacterListModule.GetItemList()) {
        t.RefreshProgressAdd(i);
        if (i === 1) {
          t.RefreshProgress(i);
          t.SetLightProgressWidth();
        }
      }
    };
    this.$pa = i => {
      for (const t of this.CharacterListModule.GetItemList()) {
        t.RefreshCurrentValue(i);
      }
    };
    this.afa = () => {
      this.RunTimerHandle = undefined;
      this.Xpa();
      this.Ypa();
      this.ExpTweener = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.Delegate, 0, 1, TWEEN_TIME);
      this.ExpTweener?.OnCompleteCallBack.Bind(this.rBa);
      AudioSystem_1.AudioSystem.PostEvent("play_ui_figure_up_1s");
    };
    this.rBa = () => {
      this.q1a(false);
    };
    this.t2e = () => {
      if (this.IsLastFinishShow) {
        this.GAn();
        this.Dsa();
      } else if (this.IsInResult) {
        this.oBa();
        const i = this.GAn();
        if (i) {
          if (this.SNn()) {
            this.Zpa();
            return;
          }
          this.qva();
          this.ShowAddCharacter();
        } else {
          if (this.ExpTweener) {
            this.ExpTweener.Kill();
            this.ExpTweener = undefined;
          }
          this.q1a(true);
        }
      } else {
        const i = this.mfa();
        if (i) {
          this.afa();
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UILayoutBase], [4, UE.UIItem]];
    this.BtnBindInfo = [[2, this.t2e]];
  }
  async PAr() {
    this.CharacterListModule = new CharacterListModule_1.CharacterListModule(this.i2e);
    await this.CharacterListModule.CreateByActorAsync(this.GetItem(1).GetOwner());
  }
  async V1a() {
    var i = this.OpenParam;
    var t = i.RoleList;
    this.DelegateId = i.DelegateId;
    this.RoleLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(3), this.nFe, this.GetItem(4).GetOwner());
    await this.RoleLayout.RefreshByDataAsync(t);
    var e = [];
    for (const s of this.RoleLayout.GetLayoutItemList()) {
      e.push(s.RefreshAsync());
    }
    await Promise.all(e);
  }
  async mJs() {
    await this.V1a();
  }
  async OnBeforeStartAsync() {
    this.GetButton(2)?.RootUIComp.SetUIActive(false);
    this.GetLayoutBase(3)?.RootUIComp.SetUIActive(false);
    this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.OAn);
    this.ValueDelegate = (0, puerts_1.toManualReleaseDelegate)(this.$pa);
    await Promise.all([this.PAr(), this.mJs()]);
  }
  async OnBeforeShowAsyncImplementImplement() {
    await this.n2e();
  }
  OnAfterPlayStartSequence() {
    this.ShowAddCharacter();
  }
  OnBeforeDestroy() {
    this.GAn();
    if (this.Delegate) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.OAn);
      this.Delegate = undefined;
    }
    if (this.ValueDelegate) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.$pa);
      this.ValueDelegate = undefined;
    }
    this.gzi();
    this.Cfa();
    this.mfa();
    this.nBa();
  }
  ShowAddCharacter() {
    if (!this.SNn()) {
      this.ShowIndex++;
      var i = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
      this.RoleIdList = i.GetRoleIdList();
      var t = this.RoleIdList[this.ShowIndex];
      var e = i.GetRoleResultDataById(t);
      for (let i = 0; i < BusinessDefine_1.CHARACTER_MAX; ++i) {
        var s = this.e2e[i].CurrentValue + e.CharacterValueList[i];
        this.e2e[i].SetCurrentValue(s);
      }
      this.Gva();
      this.Ova();
      this.gfa();
      this.ffa();
    }
  }
  async n2e() {
    this.e2e = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetCharacterValueListByRoleIds([], true);
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(this.DelegateId);
    for (const t of this.e2e) {
      t.SetMaxValue(i.AttributeMaxValue);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Moonfiesta_PartnerTip3");
    this.GetLayoutBase(3)?.RootUIComp.SetUIActive(true);
    await this.CharacterListModule.RefreshByDataAsync(this.e2e);
    this.CharacterListModule?.SetActive(true);
  }
  gzi() {
    if (this.ExpTweener) {
      this.ExpTweener.Kill();
      this.ExpTweener = undefined;
    }
  }
  Gva() {
    this.RoleLayout.GetLayoutItemByKey(this.ShowIndex)?.PlayStartAction();
  }
  Ova() {
    for (const i of this.CharacterListModule.GetItemList()) {
      i.PlayStartAction();
    }
  }
  Xpa() {
    var i = this.RoleLayout.GetLayoutItemByKey(this.ShowIndex);
    var t = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
    var e = i.GetRoleId();
    var t = t.GetRoleResultDataById(e);
    var e = this.OpenParam.LastLevelList;
    i?.PlayRunFinishAction(t.SuccessResult, e[this.ShowIndex]);
    this.sBa();
  }
  oBa() {
    this.RoleLayout.GetLayoutItemByKey(this.ShowIndex)?.StopRunToLastFrame();
  }
  Ypa() {
    for (const i of this.CharacterListModule.GetItemList()) {
      i.PlayAddAction();
      i.RefreshAddText();
    }
  }
  qva() {
    this.IsInResult = false;
    this.RoleLayout.GetLayoutItemByKey(this.ShowIndex)?.PlayEndAction();
  }
  Jpa() {
    for (const i of this.CharacterListModule.GetItemList()) {
      i.PlayEndAction();
    }
  }
  SNn() {
    var i = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData().GetRoleIdList();
    return this.ShowIndex >= i.length - 1;
  }
  Dsa() {
    this.GetButton(2)?.RootUIComp.SetUIActive(false);
    ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData().SetResultCharacterList(this.e2e);
    ControllerHolder_1.ControllerHolder.MoonChasingController.TipsTravelSkipToNextStep();
  }
  gfa() {
    this.GetButton(2)?.RootUIComp.SetUIActive(false);
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetSkipAnimDelayTime();
    this.SkipAnimDelayTimerHandle = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.GetButton(2)?.RootUIComp.SetUIActive(true);
      this.SkipAnimDelayTimerHandle = undefined;
    }, i);
  }
  Cfa() {
    if (this.SkipAnimDelayTimerHandle) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.SkipAnimDelayTimerHandle);
      this.SkipAnimDelayTimerHandle = undefined;
    }
  }
  ffa() {
    this.RunTimerHandle = TimerSystem_1.GameplayTimerSystem.Delay(this.afa, RUN_TIME);
  }
  mfa() {
    return !!this.RunTimerHandle && !(TimerSystem_1.GameplayTimerSystem.Remove(this.RunTimerHandle), this.RunTimerHandle = undefined);
  }
  sBa() {
    this.SkipResultTimeHandle = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.nBa();
      this.IsInResult = true;
    }, SKIP_RESULT_DELAY);
  }
  nBa() {
    return !!this.SkipResultTimeHandle && !(TimerSystem_1.GameplayTimerSystem.Remove(this.SkipResultTimeHandle), this.SkipResultTimeHandle = undefined);
  }
  zpa() {
    this.ExpTweener = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.ValueDelegate, 0, 1, VALUE_TIME);
  }
  q1a(i) {
    this.Jpa();
    this.zpa();
    this.GAn();
    if (i) {
      if (this.SNn()) {
        this.Zpa();
      } else {
        this.qva();
        this.ShowAddCharacter();
      }
    } else {
      this.TimerHandle = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.TimerHandle = undefined;
        if (this.SNn()) {
          this.Zpa();
        } else {
          this.qva();
          this.ShowAddCharacter();
        }
      }, NORMAL_SHOW);
    }
  }
  Zpa() {
    this.IsLastFinishShow = true;
    this.IsInResult = false;
    this.TimerHandle = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.TimerHandle = undefined;
      this.Dsa();
    }, LAST_SHOW);
  }
  GAn() {
    return !!this.TimerHandle && !(TimerSystem_1.GameplayTimerSystem.Remove(this.TimerHandle), this.TimerHandle = undefined);
  }
}
exports.BusinessTipsTravelView = BusinessTipsTravelView;
//# sourceMappingURL=BusinessTipsTravelView.js.map