"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessTipsResultView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../../../../Core/Audio/AudioSystem");
const TimerSystem_1 = require("../../../../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../../../../Util/LguiUtil");
const BusinessTipsCurrencyItem_1 = require("./BusinessTipsCurrencyItem");
const BusinessTipsInvestModule_1 = require("./BusinessTipsInvestModule");
const BusinessTipsSettlementModule_1 = require("./BusinessTipsSettlementModule");
const ANIM_TIME = 2000;
class BusinessTipsResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.InvestModule = undefined;
    this.SettlementModule = undefined;
    this.TimerHandle = undefined;
    this.CurrencyItem = undefined;
    this.t2e = () => {
      if (this.TimerHandle) {
        this.GAn();
        this.loa();
      }
    };
    this.zke = () => {
      this.InvestModule?.SetActive(false);
      this.GetItem(1)?.SetUIActive(false);
      this.GetItem(6)?.SetUIActive(true);
      this.VAn("working", 0.1);
      AudioSystem_1.AudioSystem.PostEvent("play_ui_zuiyuejie_loading");
      this.tBa();
      this.PlaySequenceAsync("Run").finally(() => {
        this.GetButton(5)?.RootUIComp.SetUIActive(true);
        this.HAn();
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.SpineSkeletonAnimationComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[5, this.t2e]];
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.Zke(), this.UAr(), this.AAr(), this.iBa()]);
    this.jta();
    this.GetButton(5)?.RootUIComp.SetUIActive(false);
    this.GetItem(6)?.SetUIActive(false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BusinessInvestResult, this.zke);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BusinessInvestResult, this.zke);
  }
  OnBeforeDestroy() {
    this.GAn();
  }
  async Zke() {
    var e = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(e.TriggerEventRoleId);
    await this.SetSpineAssetByPath(e.SmallSpineAtlas, e.SmallSpineSkeletonData, this.GetSpine(0));
    this.GetSpine(0).SetAnimation(0, "idle", true);
  }
  async iBa() {
    this.CurrencyItem = new BusinessTipsCurrencyItem_1.BusinessTipsCurrencyItem();
    await this.CurrencyItem.CreateThenShowByActorAsync(this.GetItem(7).GetOwner());
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId();
    this.CurrencyItem.RefreshTemp(e);
  }
  jta() {
    var e = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(e.TriggerEventRoleId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.InvestDialog);
  }
  async UAr() {
    this.InvestModule = new BusinessTipsInvestModule_1.BusinessTipsInvestModule();
    await this.InvestModule.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  async AAr() {
    this.SettlementModule = new BusinessTipsSettlementModule_1.BusinessTipsSettlementModule();
    await this.SettlementModule.CreateByActorAsync(this.GetItem(4).GetOwner());
  }
  HAn() {
    this.TimerHandle = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.TimerHandle = undefined;
      this.loa();
    }, ANIM_TIME);
  }
  GAn() {
    if (this.TimerHandle) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TimerHandle);
      this.TimerHandle = undefined;
    }
  }
  loa() {
    AudioSystem_1.AudioSystem.ExecuteAction("play_ui_zuiyuejie_loading", 0);
    var e = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(e.TriggerEventRoleId);
    var i = e.IsInvestSuccess ? i.InvestSuccessDialog : i.InvestFailDialog;
    this.GetItem(1)?.SetUIActive(true);
    this.GetItem(6)?.SetUIActive(false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i);
    var i = e.IsInvestSuccess ? "happy" : "fail";
    this.VAn(i, 0.1);
    this.SettlementModule?.SetActive(true);
    if (e.IsInvestSuccess) {
      this.PlaySequence("Success", () => {
        this.SettlementModule?.StartCharacterAnim();
      });
    } else {
      this.PlaySequence("Fail");
    }
  }
  VAn(e, i) {
    this.GetSpine(0).SetAnimation(0, e, true)?.SetMixDuration(i);
  }
  tBa() {
    var e = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
    var i = e.OriginGold - e.CostGold;
    this.CurrencyItem.PlayReduceTweener(e.OriginGold, i);
  }
}
exports.BusinessTipsResultView = BusinessTipsResultView;
//# sourceMappingURL=BusinessTipsResultView.js.map