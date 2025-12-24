"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisSubView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
class ArtemisSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.CommonInfoPanel = undefined;
    this.wSf = false;
    this.RSf = 0;
    this.LSf = (e, t) => {
      if (t === "Loop_Stop") {
        this.LevelSequencePlayer?.StopSequenceByKey("Loop");
        this.LevelSequencePlayer?.StopSequenceByKey("Loop_Last");
        this.GetItem(11)?.SetUIActive(!this.wSf);
        this.GetTexture(3)?.SetUIActive(this.wSf);
      }
      if (t === "Loop_Play") {
        this.LevelSequencePlayer?.PlaySequencePurely(this.wSf ? "Loop_Last" : "Loop");
      }
      if (t === "Day_Start" && (t = this.ActivityBaseData) && t.GetRewardedIndex > 0 && !this.eRf(t.GetRewardedIndex)) {
        this.LevelSequencePlayer?.PlaySequencePurely("Day" + t.GetRewardedIndex);
        this.tRf(t.GetRewardedIndex);
      }
    };
    this.Jk_ = () => {
      var e = this.ActivityBaseData.GetArtemisDefaultOpenIndex();
      var e = {
        Data: this.ActivityBaseData,
        DefaultIndex: e
      };
      UiManager_1.UiManager.OpenView("ArtemisActivityRoleChatView", e);
    };
    this.Vzm = () => {
      var e;
      var t = this.ActivityBaseData;
      if (t !== undefined) {
        e = ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisGroupByActivityId(t.GetCacheActivityId);
        this.RSf = e?.length ?? 0;
        this.wSf = t.GetRewardedIndex >= this.RSf;
        this.iRf(t.GetRewardedIndex);
        this.GetArtText(0)?.SetText("0" + t.GetRewardedIndex);
        this.GetArtText(1)?.SetText("0" + this.RSf);
        e = t?.GetCanReceive();
        this.CommonInfoPanel?.SetBtnText("FarmGoldEnterText");
        this.CommonInfoPanel?.GetFunctional()?.FunctionButton?.SetRedDotVisible(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UIArtText], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.RootActor?.OnSequencePlayEvent.Bind(this.LSf);
    await super.OnBeforeStartAsync();
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    this.CommonInfoPanel.SetClickFunc(this.Jk_);
    var e = this.GetItem(2).GetOwner();
    await this.CommonInfoPanel.CreateThenShowByActorAsync(e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnArtemisStateRefresh, this.Vzm);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnArtemisStateRefresh, this.Vzm);
  }
  OnBeforeShow() {
    this.Vzm();
  }
  OnBeforeDestroy() {
    this.RootActor?.OnSequencePlayEvent.Unbind();
  }
  iRf(e) {
    var t = this.eRf(e) ? e : e - 1;
    for (let e = 0; e < this.RSf; e++) {
      var i = t > e;
      this.GetItem(4 + e)?.SetAlpha(i ? 1 : 0);
    }
  }
  eRf(e) {
    var t;
    var i = this.ActivityBaseData;
    return !!i && !(i = i.GetCacheActivityId, !(t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FirstPlayArtemisPlaneAnimMap))) && !!t.has(i) && e <= (t.get(i) ?? 0);
  }
  tRf(e) {
    var t;
    var i = this.ActivityBaseData;
    if (i) {
      i = i.GetCacheActivityId;
      (t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FirstPlayArtemisPlaneAnimMap) ?? new Map()).set(i, e);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FirstPlayArtemisPlaneAnimMap, t);
    }
  }
}
exports.ArtemisSubView = ArtemisSubView;
//# sourceMappingURL=ArtemisSubView.js.map