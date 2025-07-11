"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelExperienceComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../Util/LguiUtil");
const ExpTweenComponent_1 = require("./ExpTween/ExpTweenComponent");
const LevelSequencePlayer_1 = require("./LevelSequencePlayer");
class LevelExperienceComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, s = false) {
    super();
    this.ParentTemp = i;
    this.IsAddUp = s;
    this.ArrivedLevel = 0;
    this.ArrivedFillAmount = 0;
    this.ArrivedExp = 0;
    this.MaxExpCacheMap = new Map();
    this.GetMaxExpFunction = undefined;
    this.NextItem = undefined;
    this.NextLevelText = undefined;
    this.CurrentLevelText = undefined;
    this.AddExp = undefined;
    this.ExpText = undefined;
    this.MaxItem = undefined;
    this.CurrentMaxItem = undefined;
    this.NextLevelArrow = undefined;
    this.ExpTweenComponent = undefined;
    this.ExpTweenFinishFunction = undefined;
    this.CurrentLevel = 0;
    this.CurrentExp = 0;
    this.CurrentMaxExp = 0;
    this.CurrentMaxLevel = 0;
    this.LimitLevel = 0;
    this.FrontExp = 0;
    this.NeedPreviewTween = true;
    this.SPe = undefined;
    this.wLt = () => {
      this.FrontExp = 0;
      if (this.ExpTweenFinishFunction) {
        this.ExpTweenFinishFunction();
      }
      this.PlayEndLevelUpSequence();
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UIText], [8, UE.UIText], [3, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
  }
  OnStart() {
    this.ExpTweenComponent = new ExpTweenComponent_1.ExpTweenComponent(this.GetSprite(4), this.GetSprite(5), this.GetSprite(6), this.ParentTemp, this.wLt);
    this.NextItem = this.GetItem(2);
    this.CurrentLevelText = this.GetText(0);
    this.NextLevelText = this.GetText(1);
    this.AddExp = this.GetText(7);
    this.ExpText = this.GetText(8);
    this.MaxItem = this.GetItem(3);
    this.CurrentMaxItem = this.GetItem(9);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.NextLevelArrow = this.GetItem(10);
  }
  UpdateCurrentExpState(t) {
    this.ExpTweenComponent.SetCurrentSpriteActive(true);
    this.ExpTweenComponent.SetAddFillAmount(t);
    this.ExpTweenComponent.SetNextSpriteActive(false);
  }
  UpdateNextExp(i, s) {
    if (s >= this.CurrentMaxLevel) {
      this.UpdateNextState(i, i, s);
    } else {
      let t = this.MaxExpCacheMap.get(s);
      if (!t) {
        t = this.GetMaxExpFunction(s);
        this.MaxExpCacheMap.set(s, t);
      }
      if (i >= t) {
        this.UpdateNextExp(i - t, s + 1);
      } else {
        this.UpdateNextState(i, t, s);
      }
    }
  }
  PlayStartLevelUpSequence(t) {
    if (this.ArrivedLevel !== t) {
      this.SPe.PlayLevelSequenceByName("Sle");
    }
  }
  PlayEndLevelUpSequence() {
    this.SPe.PlayLevelSequenceByName("Sle02");
  }
  PlayPreviewExp(t, i) {
    this.ExpTweenComponent.PlayPreviewExpTween(this.CurrentLevel, this.ArrivedLevel, t, this.CurrentMaxLevel, i);
  }
  UpdateNextState(t, i, s) {
    this.PlayStartLevelUpSequence(s);
    this.SetNextLevel(s);
    i = t / i;
    this.SetMaxItemActive(s === this.CurrentMaxLevel);
    if (this.NeedPreviewTween) {
      this.PlayPreviewExp(s, i);
    } else {
      this.UpdateNextExpState(i);
    }
    this.ArrivedExp = t;
    this.ArrivedFillAmount = i;
    this.ArrivedLevel = s;
  }
  UpdateCurrentExp(t) {
    this.SetNextLevelActive(false);
    var t = this.CurrentExp + t;
    var i = t / this.CurrentMaxExp;
    if (this.NeedPreviewTween) {
      this.PlayPreviewExp(this.CurrentLevel, i);
    } else {
      this.UpdateCurrentExpState(i);
    }
    this.ArrivedLevel = this.CurrentLevel;
    this.ArrivedFillAmount = i;
    this.ArrivedExp = t;
  }
  UpdateNextExpState(t) {
    this.ExpTweenComponent.SetCurrentSpriteActive(false);
    this.ExpTweenComponent.SetAddFillAmount(1);
    this.ExpTweenComponent.SetNextSpriteActive(true);
    this.ExpTweenComponent.SetNextFillAmount(t);
  }
  SetNextLevelActive(t) {
    this.NextItem.SetUIActive(t);
    if (this.NextLevelArrow) {
      this.NextLevelArrow.SetUIActive(t);
    }
  }
  SetNextLevel(t) {
    this.SetNextLevelActive(true);
    this.NextLevelText.SetText(t.toString());
  }
  SetMaxItemActive(t) {
    this.MaxItem.SetUIActive(t);
  }
  SetCurrentMaxItemActive(t) {
    this.CurrentMaxItem.SetUIActive(t);
  }
  StageMaxExp(t) {
    if (!this.GetMaxExpFunction) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelExperienceComponent", 10, "Unregistered SetMaxExpFunction CallBack");
      }
      return 0;
    }
    let i = this.MaxExpCacheMap.get(t);
    return i = i || this.GetMaxExpFunction(t);
  }
  AddUpMaxExp(i) {
    let s = 0;
    for (let t = 1; t <= i; t++) {
      s += this.StageMaxExp(t);
    }
    return s;
  }
  GetMaxExp(t) {
    if (this.IsAddUp) {
      return this.AddUpMaxExp(t);
    } else {
      return this.StageMaxExp(t);
    }
  }
  UpdateViewState() {
    var t;
    var i;
    this.CurrentLevelText.SetText(this.CurrentLevel.toString());
    this.ExpTweenComponent.SetCurrentSpriteActive(true);
    this.ExpTweenComponent.SetNextSpriteActive(false);
    this.SetNextLevelActive(false);
    this.AddExp.SetUIActive(false);
    this.SetMaxItemActive(false);
    this.SetCurrentMaxItemActive(this.CurrentLevel === this.LimitLevel);
    if (this.CurrentLevel === this.CurrentMaxLevel) {
      this.ExpTweenComponent.SetCurrentFillAmount(1);
      this.ExpTweenComponent.SetAddFillAmount(1);
      this.CurrentMaxExp = this.StageMaxExp(this.CurrentLevel - 1);
      t = this.GetMaxExp(this.CurrentLevel - 1);
      LguiUtil_1.LguiUtil.SetLocalText(this.ExpText, "ExpShow", t, t);
    } else {
      this.CurrentMaxExp = this.StageMaxExp(this.CurrentLevel);
      t = this.CurrentExp / this.CurrentMaxExp;
      this.ExpTweenComponent.SetCurrentFillAmount(t);
      this.ExpTweenComponent.SetAddFillAmount(t);
      t = this.GetMaxExp(this.CurrentLevel);
      i = this.IsAddUp ? this.AddUpMaxExp(this.CurrentLevel - 1) + this.CurrentExp : this.CurrentExp;
      LguiUtil_1.LguiUtil.SetLocalText(this.ExpText, "ExpShow", i, t);
    }
  }
  UpdateComponent(t, i, s, h = undefined) {
    this.ArrivedLevel = t;
    this.CurrentLevel = t;
    this.CurrentMaxLevel = i;
    this.CurrentExp = s;
    this.LimitLevel = h;
    this.UpdateViewState();
  }
  UpdateExp(t, i = true) {
    return (!this.IsInMax() || !(t > this.FrontExp)) && !(this.Wxt(t, i), 0);
  }
  Wxt(t, i = true) {
    this.NeedPreviewTween = i;
    this.FrontExp = t;
    LguiUtil_1.LguiUtil.SetLocalText(this.AddExp, "AddExp", Math.floor(t));
    this.AddExp.SetUIActive(t > 0);
    if (this.CurrentExp + t >= this.CurrentMaxExp) {
      i = this.CurrentExp + t - this.CurrentMaxExp;
      this.UpdateNextExp(i, this.CurrentLevel + 1);
    } else {
      this.UpdateCurrentExp(t);
    }
  }
  PlayExpTween() {
    let t = 1;
    var i = this.CurrentExp / this.CurrentMaxExp;
    if (this.ArrivedLevel > this.CurrentLevel && (this.ArrivedFillAmount !== 1 || i != 0)) {
      t++;
    }
    this.ExpTweenComponent.PlayExpTween(t, this.ArrivedFillAmount);
  }
  IsInMax() {
    return this.ArrivedLevel === this.CurrentMaxLevel;
  }
  GetArrivedExp() {
    return this.ArrivedExp;
  }
  GetArrivedLevel() {
    return this.ArrivedLevel;
  }
  GetCurrentLevel() {
    return this.CurrentLevel;
  }
  GetCurrentMaxLevel() {
    return this.CurrentMaxLevel;
  }
  SetTweenFinishFunction(t) {
    this.ExpTweenFinishFunction = t;
  }
  SetMaxExpFunction(t) {
    this.GetMaxExpFunction = t;
  }
  ClearMaxExpCache() {
    this.MaxExpCacheMap.clear();
  }
  OnBeforeDestroy() {
    this.MaxExpCacheMap.clear();
    if (this.ExpTweenComponent) {
      this.ExpTweenComponent.Destroy();
    }
    this.NextItem = undefined;
    this.NextLevelText = undefined;
    this.CurrentLevelText = undefined;
    this.AddExp = undefined;
    this.ExpText = undefined;
    this.MaxItem = undefined;
    this.SPe = undefined;
  }
}
exports.LevelExperienceComponent = LevelExperienceComponent;
//# sourceMappingURL=LevelExperienceComponent.js.map