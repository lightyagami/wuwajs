"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksRoleStateItem = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const GlobalData_1 = require("../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const LoadAsyncPromise_1 = require("../../../../UiComponent/LoadAsyncPromise");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const DrinksRoleRequireItem_1 = require("./DrinksRoleRequireItem");
class DrinksRoleStateItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Tweener = undefined;
    this.Delegate = undefined;
    this.Layout = undefined;
    this.LevelSequence = undefined;
    this.CurLikeness = 0;
    this.EndLikeness = 0;
    this.CurLikenessState = 1;
    this.MaxScore = 0;
    this.Curve = undefined;
    this.RXf = () => new DrinksRoleRequireItem_1.DrinksRoleRequireItem();
    this.cEo = i => {
      this.RefreshLikeTxt(i, false);
      this.GetItem(10)?.SetUIActive(i >= this.MaxScore);
      if (i >= 0) {
        this.GetSprite(6)?.SetFillAmount(0);
        this.GetSprite(7)?.SetFillAmount(i / this.MaxScore);
      } else {
        this.GetSprite(6)?.SetFillAmount(-i / this.MaxScore);
        this.GetSprite(7)?.SetFillAmount(0);
      }
      this.CurLikeness = i;
    };
    this.Mmu = () => {
      this.CurLikeness = this.EndLikeness;
      this.Tweener &&= undefined;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UITexture], [9, UE.UITexture], [10, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("DrinksCurve");
    var i = new LoadAsyncPromise_1.LoadAsyncPromise(i, UE.CurveFloat);
    this.Curve = await i.Promise;
  }
  OnStart() {
    this.LevelSequence = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(4));
    this.Layout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.RXf);
    this.GetSprite(6)?.SetFillAmount(0);
    this.GetSprite(7)?.SetFillAmount(0);
    var i = ModelManager_1.ModelManager.DrinksModel.GetRoleId();
    this.SetRoleIcon("", this.GetTexture(0), i);
    this.MaxScore = ModelManager_1.ModelManager.DrinksModel.GetLikenessMax();
    this.InitCurState();
    this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.cEo);
  }
  OnBeforeDestroy() {
    if (this.Delegate) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.cEo);
      this.Delegate = undefined;
    }
  }
  RefreshCurState() {
    var [i, e] = ModelManager_1.ModelManager.DrinksModel.GetRoleState();
    this.Layout?.RefreshByData(e);
    if (i !== this.EndLikeness && (this.EndLikeness = i, this.Tweener && (this.Tweener.Kill(), this.Tweener = undefined), this.Tweener = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.Delegate, this.CurLikeness, i, 0.5), this.Tweener)) {
      this.Tweener.OnCompleteCallBack.Bind(this.Mmu);
      this.Tweener.SetCurveFloat(this.Curve);
    }
  }
  InitCurState() {
    var [, i] = ModelManager_1.ModelManager.DrinksModel.GetRoleState();
    this.Layout?.RefreshByData(i);
    this.EndLikeness = 0;
    this.RefreshLikeTxt(0, true);
    this.GetSprite(6)?.SetFillAmount(0);
    this.GetSprite(7)?.SetFillAmount(0);
  }
  RefreshLikeTxt(e, t) {
    let s = 1;
    if ((s = e < 0 ? 0 : e === 0 ? 1 : e >= this.MaxScore ? 3 : 2) !== this.CurLikenessState || t) {
      this.CurLikenessState = s;
      let i = "";
      t = e < 0 ? 1 : 0.5;
      this.GetTexture(8)?.SetAlpha(t);
      t = e > 0 ? 1 : 0.5;
      this.GetTexture(9)?.SetAlpha(t);
      this.GetItem(10)?.SetUIActive(e >= this.MaxScore);
      t = e >= this.MaxScore ? "T_TiaoJiuIconLikeLevel03" : "T_TiaoJiuIconLikeLevel02";
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
      this.SetTextureByPath(t, this.GetTexture(9));
      i = e < 0 ? "DRINKS_Drinklist_likeStr_Dislike" : e === 0 ? "DRINKS_Drinklist_likeStr_Justlike" : e < this.MaxScore ? "DRINKS_Drinklist_likeStr_like" : "DRINKS_Drinklist_likeStr_Perferlike";
      if (e >= this.MaxScore) {
        this.LevelSequence?.PlayLevelSequenceByName("Max");
      } else if (this.LevelSequence?.IsPlayingSequence("Max")) {
        this.LevelSequence?.StopPlayingSequence(false, true);
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i);
    }
  }
}
exports.DrinksRoleStateItem = DrinksRoleStateItem;
//# sourceMappingURL=DrinksRoleStateItem.js.map