"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueMoodBar = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const POSITIVE_TEXTURE_PATH = "/Game/Aki/UI/UIResources/UiRogue/Image/RogueView/T_RogueIconPositive.T_RogueIconPositive";
const NEGATIVE_TEXTURE_PATH = "/Game/Aki/UI/UIResources/UiRogue/Image/RogueView/T_RogueIconNegative.T_RogueIconNegative";
const MOOD_HELP_ID = 262;
class MapRogueMoodBar extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.PanelBarL = undefined;
    this.PanelBarR = undefined;
    this.WP1 = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(MOOD_HELP_ID);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.WP1]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(1).SetUIActive(false);
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.PanelBarL = new PanelBar();
    this.PanelBarL.SetDirection(-1);
    e.push(this.PanelBarL.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    this.PanelBarR = new PanelBar();
    this.PanelBarR.SetDirection(1);
    e.push(this.PanelBarR.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    await Promise.all(e);
  }
  async OnShowAsyncImplementImplement() {
    var e = new CustomPromise_1.CustomPromise();
    await this.LevelSequencePlayer.PlaySequenceAsync("Start", e);
  }
  async OnHideAsyncImplementImplement() {
    var e = new CustomPromise_1.CustomPromise();
    await this.LevelSequencePlayer.PlaySequenceAsync("Close", e);
  }
  SetMoodRuleId(e) {
    e = ConfigManager_1.ConfigManager.MapRogueConfig.GetMoodRuleById(e);
    if (e) {
      switch (e.Type) {
        case 1:
          this.LevelSequencePlayer.PlayLevelSequenceByName("Light");
          break;
        case 2:
          this.LevelSequencePlayer.PlayLevelSequenceByName("LightRed");
      }
    }
  }
  SetLimit(e, t) {
    this.PanelBarL.SetLimit(e);
    this.PanelBarR.SetLimit(t);
  }
  SetCurrentValue(e) {
    this.GetText(6).SetText(e.toString());
    var t = this.GetTexture(0);
    var i = e >= 0 ? POSITIVE_TEXTURE_PATH : NEGATIVE_TEXTURE_PATH;
    this.SetTextureShowUntilLoaded(i, t);
    this.PanelBarL.SetCurrentValue(e);
    this.PanelBarR.SetCurrentValue(e);
  }
  ShowPreviewValue(t, i) {
    var e;
    if (t !== 0) {
      e = new UiAsyncTask_1.UiAsyncTask("MapRogueMoodBar.ShowPreviewValue", async () => {
        this.GetText(2).SetText(t.toString());
        this.GetItem(1).SetUIActive(true);
        var e = this.GetText(6);
        e.SetChangeColor(t < 0, e.changeColor);
        this.PanelBarL.SetPreviewValue(t);
        this.PanelBarR.SetPreviewValue(t);
        this.LevelSequencePlayer.StopCurrentSequence(false, true);
        if (t > 0) {
          await this.LevelSequencePlayer.PlaySequenceAsync("Light", new CustomPromise_1.CustomPromise());
        } else {
          await this.LevelSequencePlayer.PlaySequenceAsync("LightRed", new CustomPromise_1.CustomPromise());
        }
        this.ClosePreviewValue();
        this.SetCurrentValue(i);
      });
      this.RunAsyncTask(e);
    }
  }
  ClosePreviewValue() {
    this.GetItem(1).SetUIActive(false);
    var e = this.GetText(6);
    e.SetChangeColor(false, e.changeColor);
    this.PanelBarL.ClosePreviewValue();
    this.PanelBarR.ClosePreviewValue();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && !(e.length < 2) && (e = this.GetGuideUiItem(e[1]))) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.MapRogueMoodBar = MapRogueMoodBar;
class PanelBar extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Direction = 1;
    this.Limit = 0;
    this.Current = 0;
  }
  get IsActive() {
    return this.Direction > 0 && this.Current > 0 || this.Direction < 0 && this.Current < 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIItem]];
  }
  OnStart() {
    this.GetSprite(1).SetUIActive(false);
  }
  SetDirection(e) {
    this.Direction = e;
  }
  SetLimit(e) {
    this.Limit = e;
    this.GetText(0).SetText(e.toString());
  }
  SetCurrentValue(e) {
    var t = this.GetSprite(2);
    var i = this.GetItem(3);
    this.Current = e;
    var s = this.IsActive;
    i.SetUIActive(s);
    t.SetUIActive(s);
    if (s) {
      s = MathUtils_1.MathUtils.Clamp(e / this.Limit, 0, 1);
      t.SetFillAmount(s);
      e = t.GetWidth() * s * this.Direction;
      i.SetAnchorOffsetX(e);
    }
  }
  SetPreviewValue(e) {
    var t;
    var i;
    var s;
    var h;
    if (!(e > 0)) {
      t = this.IsActive ? this.Current / this.Limit : 0;
      i = this.GetSprite(2);
      s = this.GetSprite(1);
      if (this.Direction > 0) {
        h = MathUtils_1.MathUtils.Clamp(this.Current + e, 0, this.Limit) / this.Limit;
        i.SetFillAmount(h);
        i.SetUIActive(h > 0);
        s.SetFillAmount(t);
        s.SetUIActive(t > 0);
      } else {
        h = MathUtils_1.MathUtils.Clamp(this.Current + e, this.Limit, 0) / this.Limit;
        i.SetFillAmount(t);
        i.SetUIActive(t > 0);
        s.SetFillAmount(h);
        s.SetUIActive(h > 0);
      }
    }
  }
  ClosePreviewValue() {
    this.GetSprite(1).SetUIActive(false);
    this.SetCurrentValue(this.Current);
  }
}
//# sourceMappingURL=MapRogueMoodBar.js.map