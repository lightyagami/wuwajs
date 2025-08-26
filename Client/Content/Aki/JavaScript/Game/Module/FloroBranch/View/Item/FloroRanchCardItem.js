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
    this.nY1 = 0;
    this.CardType = 0;
    this.CardData = undefined;
    this.UnlockConditionText = "";
    this.OverrideTermViewType = 0;
    this.OnToggleCallBack = undefined;
    this.yPu = undefined;
    this.SPe = undefined;
    this.kqe = () => {
      if (this.OnToggleCallBack) {
        this.OnToggleCallBack(this.GridIndex, this.nY1);
      }
    };
    this.gke = () => !this.yPu || this.yPu(this.GridIndex);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIText], [6, UE.UIText], [4, UE.UITexture], [5, UE.UITexture], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIItem], [11, UE.UITexture], [12, UE.UIText], [13, UE.UIText], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UITexture], [17, UE.UIItem], [18, UE.UITexture], [19, UE.UIItem], [20, UE.UITexture], [21, UE.UITexture], [22, UE.UIItem], [23, UE.UITexture]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.gke);
    this.pqu();
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  OnBeforeDestroy() {
    this.vqu();
  }
  Refresh(t, i, s) {
    this.GetItem(19).SetAlpha(0);
    this.nY1 = t;
    if (this.CardType === 0) {
      this.RefreshPhantomCardData();
    } else {
      this.RefreshToyCardData();
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.CardData.GetName());
    this.GetText(13).SetText(this.CardData.Desc);
    this.GetText(13).bBestFit = false;
    t = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchRarity(this.CardData.GetRarity());
    this.GetTexture(5)?.SetUIActive(true);
    this.SetTextureShowUntilLoaded(this.CardData.GetIcon(), this.GetTexture(5));
    this.SetTextureShowUntilLoaded(this.CardData.GetIcon(), this.GetTexture(18));
    this.SetTextureShowUntilLoaded(t.GetRarityDetailCardBigBg(), this.GetTexture(1));
    this.SetTextureShowUntilLoaded(t.GetRarityDetailCardSmallBg(), this.GetTexture(2));
    this.SetTextureShowUntilLoaded(t.GetSelectTexture(), this.GetTexture(16));
    t = t.IsGoldRarity();
    this.GetTexture(20)?.SetUIActive(false);
    this.GetTexture(21)?.SetUIActive(t);
    this.GetTexture(1)?.SetIsGray(false);
    this.GetTexture(2)?.SetIsGray(false);
    t = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(3);
    this.SetTextureShowUntilLoaded(t.GetIcon(), this.GetTexture(11));
    this.GetItem(17)?.SetUIActive(false);
    this.UnlockConditionText = this.CardData.ConditionText;
  }
  RefreshPhantomCardData() {
    var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    this.CardData = t.GetFloroRanchCardData(this.nY1);
    this.GetText(12)?.SetText(this.CardData.GetBasicSalary().toString());
    var t = t.GetFloroRanchRaceData(this.CardData.GetRace());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.GetRaceName());
    this.SetTextureShowUntilLoaded(t.SmallIcon, this.GetTexture(8));
    this.GetItem(14)?.SetUIActive(this.CardData.IsSpecialPhantom);
    this.GetItem(15)?.SetUIActive(this.CardData.HasNewLabel);
    this.GetText(6)?.ShowTextNew("Farm_CardType1");
    this.GetItem(22)?.SetUIActive(false);
  }
  RefreshToyCardData() {
    var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    this.CardData = t.GetFloroRanchToyData(this.nY1);
    this.GetItem(7)?.SetUIActive(false);
    this.GetItem(10)?.SetUIActive(false);
    this.GetItem(14)?.SetUIActive(false);
    this.GetItem(15)?.SetUIActive(false);
    this.GetText(6)?.ShowTextNew("Farm_CardType2");
    this.GetItem(22)?.SetUIActive(true);
    var t = this.CardData.GetToyRaceData();
    if (t) {
      this.GetItem(22)?.SetUIActive(true);
      this.SetTextureShowUntilLoaded(t.SmallIcon, this.GetTexture(23));
    } else {
      this.GetItem(22)?.SetUIActive(false);
    }
  }
  HideNewLabel() {
    this.GetItem(15)?.SetUIActive(false);
  }
  SetLock() {
    this.GetText(3)?.SetText("??");
    this.GetText(12)?.SetText("+?");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), this.UnlockConditionText);
    this.GetText(13).bBestFit = false;
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
    this.yPu = t;
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
  pqu() {
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
  vqu() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(13));
  }
  PlayAppearAnim() {
    if (ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchRarity(this.CardData.GetRarity()).IsGoldRarity()) {
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