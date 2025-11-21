"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryTechnologyNodeItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class HonamiStoryTechnologyNodeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.cVd = undefined;
    this.Hea = undefined;
    this.OnClickToggleBack = undefined;
    this.kqe = () => {
      this.OnClickToggleBack?.(this, this.cVd, this.GetExtendToggle(0));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UISprite], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  async OnBeforeStartAsync() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  GetNodeDataConfig() {
    return this.cVd.GetConfig;
  }
  async RefreshNodeAsyncByData(e) {
    this.cVd = e;
    var e = this.cVd.GetNodeStatus;
    var t = ModelManager_1.ModelManager.HonamiStoryModel.CheckNodeCanActiveAndIsEnough(this.cVd);
    var s = [this.SetTextureAsync(this.cVd.GetConfig.Icon, this.GetTexture(2)), this.SetTextureAsync(this.cVd.GetConfig.GreyIcon, this.GetTexture(4))];
    await Promise.all(s);
    this.GetTexture(2).SetUIActive(e === 2);
    this.GetSprite(1).SetUIActive(e === 2);
    this.GetTexture(4).SetUIActive(e !== 2);
    this.GetSprite(3).SetUIActive(e !== 2);
    this.GetItem(5).SetUIActive(e === 0);
    this.GetItem(6).SetUIActive(t);
  }
  async RefreshNodeAsync() {
    await this.RefreshNodeAsyncByData(this.cVd);
  }
  SelectNode() {
    this.GetExtendToggle(0).SetToggleState(1, false);
    this.OnClickToggleBack?.(this, this.cVd, this.GetExtendToggle(0));
  }
  UnSelectNode() {
    this.GetExtendToggle(0).SetToggleState(0, false);
  }
  PlayActivateAnim() {
    this.Hea?.StopSequenceByKey("Activate");
    this.Hea?.PlayLevelSequenceByName("Activate");
  }
  get ToggleItem() {
    return this.GetExtendToggle(0);
  }
  OnBeforeDestroy() {
    this.Hea?.Clear();
    this.Hea = undefined;
  }
}
exports.HonamiStoryTechnologyNodeItem = HonamiStoryTechnologyNodeItem;
//# sourceMappingURL=HonamiStoryTechnologyNodeItem.js.map