"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchCardItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FloroRanchCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.UX1 = 0;
    this.CardType = 0;
    this.CardData = undefined;
    this.UnlockConditionText = "";
    this.OverrideTermViewType = 0;
    this.OnToggleCallBack = undefined;
    this.QAu = undefined;
    this.SPe = undefined;
    this.kqe = () => {
      if (this.OnToggleCallBack) {
        this.OnToggleCallBack(this.GridIndex, this.UX1);
      }
    };
    this.gke = () => !this.QAu || this.QAu(this.GridIndex);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIText], [6, UE.UIText], [4, UE.UITexture], [5, UE.UITexture], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIItem], [11, UE.UITexture], [12, UE.UIText], [13, UE.UIText], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UITexture], [17, UE.UIItem], [18, UE.UITexture], [19, UE.UIItem], [20, UE.UITexture], [21, UE.UITexture]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.gke);
    this.Oku();
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  OnBeforeDestroy() {
    this.qku();
  }
  Refresh(t, i, e) {
    this.GetItem(19).SetAlpha(0);
    this.UX1 = t;
    var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    if (this.CardType === 0) {
      this.CardData = t.GetFloroRanchCardData(this.UX1);
      this.GetText(12)?.SetText(this.CardData.GetBasicSalary().toString());
      s = t.GetFloroRanchRaceData(this.CardData.GetCardRace());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), s.GetRaceName());
      this.SetTextureShowUntilLoaded(s.SmallIcon, this.GetTexture(8));
      this.GetItem(14)?.SetUIActive(this.CardData.IsSpecialPhantom);
      this.GetItem(15)?.SetUIActive(this.CardData.HasNewLabel);
      this.GetText(6)?.ShowTextNew("Farm_CardType1");
    } else {
      this.CardData = t.GetFloroRanchToyData(this.UX1);
      this.GetItem(7)?.SetUIActive(false);
      this.GetItem(10)?.SetUIActive(false);
      this.GetItem(14)?.SetUIActive(false);
      this.GetItem(15)?.SetUIActive(false);
      this.GetText(6)?.ShowTextNew("Farm_CardType2");
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.CardData.GetName());
    this.GetText(13).SetText(this.CardData.Desc);
    var s = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchRarity(this.CardData.GetCardRarity());
    this.GetTexture(5)?.SetUIActive(true);
    this.SetTextureShowUntilLoaded(this.CardData.GetIcon(), this.GetTexture(5));
    this.SetTextureShowUntilLoaded(this.CardData.GetIcon(), this.GetTexture(18));
    this.SetTextureShowUntilLoaded(s.GetRarityDetailCardBigBg(), this.GetTexture(1));
    this.SetTextureShowUntilLoaded(s.GetRarityDetailCardSmallBg(), this.GetTexture(2));
    this.SetTextureShowUntilLoaded(s.GetSelectTexture(), this.GetTexture(16));
    var t = s.IsGoldRarity();
    this.GetTexture(20)?.SetUIActive(false);
    this.GetTexture(21)?.SetUIActive(t);
    this.GetTexture(1)?.SetIsGray(false);
    this.GetTexture(2)?.SetIsGray(false);
    var s = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(3);
    this.SetTextureShowUntilLoaded(s.GetIcon(), this.GetTexture(11));
    this.GetItem(17)?.SetUIActive(false);
    this.UnlockConditionText = this.CardData.ConditionText;
  }
  HideNewLabel() {
    this.GetItem(15)?.SetUIActive(false);
  }
  SetLock() {
    this.GetText(3)?.SetText("??");
    this.GetText(12)?.SetText("+?");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), this.UnlockConditionText);
    this.GetItem(17)?.SetUIActive(true);
    this.GetTexture(5)?.SetUIActive(false);
  }
  SetInteractive(t) {
    this.GetExtendToggle(0)?.SetSelfInteractive(t);
  }
  SetToggleCallBack(t) {
    this.OnToggleCallBack = t;
  }
  SetCanToggleExecuteFunction(t) {
    this.QAu = t;
  }
  OnSelected(t) {
    this.SetToggleState(true);
  }
  OnDeselected(t) {
    this.SetToggleState(false);
  }
  SetToggleState(t) {
    this.GetExtendToggle(0).SetToggleStateForce(t ? 1 : 0);
  }
  Oku() {
    var t = this.OverrideTermViewType ?? 0;
    var t = {
      UiText: this.GetText(13),
      ViewType: t,
      ReportType: 8,
      AttachDirection: t === 1 ? 1 : undefined,
      AttachItem: this.GetRootItem(),
      Group: 3,
      Style: 2
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(t);
  }
  qku() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(13));
  }
  PlayAppearAnim() {
    if (ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchRarity(this.CardData.GetCardRarity()).IsGoldRarity()) {
      this.SPe.PlayLevelSequenceByName("GoldCard");
    } else {
      this.SPe.PlayLevelSequenceByName("Start");
    }
  }
  StopAppearAnim() {
    this.SPe.StopCurrentSequence();
    this.GetItem(19).SetAlpha(0);
  }
  SetItemAlpha(t) {
    this.GetItem(19).SetAlpha(t);
  }
}
exports.FloroRanchCardItem = FloroRanchCardItem;
//# sourceMappingURL=FloroRanchCardItem.js.map