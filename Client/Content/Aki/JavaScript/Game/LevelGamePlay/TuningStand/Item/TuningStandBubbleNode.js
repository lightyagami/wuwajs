"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TuningStandLineItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TuningStandLineItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.MusicPath = e;
    this.MusicItem = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.MusicItem = new TuningStandLineNodeItem();
    await this.MusicItem.CreateThenShowByResourceIdAsync(this.MusicPath, this.GetItem(0));
  }
  OnBeforeDestroy() {
    this.MusicItem = undefined;
  }
  OnStartAnim() {
    this.MusicItem?.OnStartAnim();
  }
  async OnLinkComplete() {
    await this.MusicItem?.OnLinkComplete();
  }
  async OnBeforeLinkComplete() {
    await this.MusicItem?.OnBeforeLinkComplete();
  }
  GetActiveNode(e) {
    return this.MusicItem.GetActiveNode(e);
  }
}
exports.TuningStandLineItem = TuningStandLineItem;
class TuningStandLineNodeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SequencePlayer = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(0));
  }
  OnStartAnim() {
    this.SequencePlayer?.PlayLevelSequenceByName("In");
  }
  async OnLinkComplete() {
    await this.SequencePlayer?.PlaySequenceAsync("Start", new CustomPromise_1.CustomPromise());
  }
  async OnBeforeLinkComplete() {
    await this.SequencePlayer?.PlaySequenceAsync("Up", new CustomPromise_1.CustomPromise());
  }
  OnBeforeDestroy() {
    this.SequencePlayer = undefined;
  }
  GetActiveNode(e) {
    e = e === IAction_1.ETuningStandGridType.Start1 ? 2 : 1;
    return this.GetItem(e);
  }
}
//# sourceMappingURL=TuningStandBubbleNode.js.map