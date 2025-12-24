"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryQuestItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const HonamiStoryQuestItemChildItem_1 = require("./HonamiStoryQuestItemChildItem");
class HonamiStoryQuestItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.V5d = 1;
    this.qoh = undefined;
    this.a1m = [];
    this.Hc_ = -1;
    this.Z6c = undefined;
    this.sam = () => {
      var e = new HonamiStoryQuestItemChildItem_1.HonamiStoryQuestItemChildItem();
      if (this.Z6c) {
        e.BindOnClickTask(this.Z6c);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "HonamiStoryQuestItem do not have callback");
      }
      this.a1m.push(e);
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  OnStart() {
    this.qoh = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.sam);
  }
  async RefreshAsync(e, t, i) {
    this.V5d = e;
    this.sbi();
    e = ModelManager_1.ModelManager.HonamiStoryModel.GetQuestDataListByQuestType(this.V5d);
    await this.qoh.RefreshByDataAsync(e);
    if (!(this.Hc_ < 0)) {
      this.qoh.GetLayoutItemByIndex(this.Hc_)?.OnSelected();
      this.Hc_ = -1;
    }
  }
  BindOnClickTask(e) {
    this.Z6c = e;
  }
  sbi() {
    if (this.V5d === 1) {
      this.GetText(2).ShowTextNew("HonamiStory_MainMission");
    } else {
      this.GetText(2).ShowTextNew("HonamiStory_SideMission");
    }
  }
  GetTaskChildItemList() {
    return this.a1m;
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.HonamiStoryQuestItem = HonamiStoryQuestItem;
//# sourceMappingURL=HonamiStoryQuestItem.js.map