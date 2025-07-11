"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkMenuItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiTextAdapterProxy_1 = require("../../../../Ui/UiTextAdapterProxy");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const EnrichmentAreaItem_1 = require("../../../Map/Marks/MarkItem/EnrichmentAreaItem");
class MarkMenuItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.QWi = undefined;
    this.LevelSequencePlayer = undefined;
    this.Kp1 = undefined;
  }
  async Init(e, t) {
    e.SetUIActive(true);
    await this.CreateThenShowByActorAsync(e.GetOwner());
    this.QWi = t;
    this.MAi();
  }
  OnStart() {
    var e = this.GetExtendToggle(0).GetOwner().GetUIItem();
    this.Kp1 = new UiTextAdapterProxy_1.UiTextAdapterProxy(this.GetText(2));
    this.Kp1.Init();
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(e);
  }
  OnBeforeShow() {
    this.PlayAppearSequence();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIText], [3, UE.UISprite], [4, UE.UISprite]];
  }
  SetOnClick(e) {
    this.GetExtendToggle(0).OnStateChange.Add(e);
  }
  MAi() {
    this.SetSpriteByPath(this.QWi.IconPath, this.GetSprite(1), false);
    if (this.QWi instanceof EnrichmentAreaItem_1.EnrichmentAreaItem) {
      e = this.QWi.MarkConfig.MarkTitle;
      t = ConfigManager_1.ConfigManager.MapConfig.GetLocalText(this.QWi.GetEnrichmentItemNameId());
      this.Kp1.SetLocalText(e, t);
    } else {
      this.Kp1.SetText(this.QWi.GetTitleText());
    }
    var e = this.QWi.MarkItemEntity.ViewLifeCircle;
    var t = e.IsChildViewVisible(7);
    this.GetSprite(3).SetUIActive(t);
    if (t) {
      t = this.QWi.MarkItemEntity.Resource.ChildIconPath;
      this.SetSpriteByPath(t, this.GetSprite(3), false);
    }
    var t = e.IsChildViewVisible(1);
    this.GetSprite(4).SetUIActive(t);
    if (t) {
      e = this.QWi.MarkItemEntity.Resource.TopRightIconPath;
      this.SetSpriteByPath(e, this.GetSprite(4), false);
    }
  }
  async OnBeforeHideAsync() {
    return this.PlayDisappearSequence();
  }
  OnBeforeDestroy() {
    this.Kp1.Clear();
    this.GetExtendToggle(0).OnStateChange.Clear();
    if (this.LevelSequencePlayer) {
      this.LevelSequencePlayer.Clear();
    }
    this.LevelSequencePlayer = undefined;
  }
  async PlayReleaseSequence() {
    await this.LevelSequencePlayer.PlaySequenceAsync("Select", new CustomPromise_1.CustomPromise(), true);
  }
  PlayAppearSequence() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
  }
  async PlayDisappearSequence() {
    await this.LevelSequencePlayer.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise());
  }
}
exports.MarkMenuItem = MarkMenuItem;
//# sourceMappingURL=MarkMenuItem.js.map