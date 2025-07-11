"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyBuffActiveView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const DangoMonopolyBuffActiveGetPanel_1 = require("./DangoMonopolyBuffActiveGetPanel");
const DangoMonopolyBuffActiveShowPanel_1 = require("./DangoMonopolyBuffActiveShowPanel");
const DangoMonopolyViewBase_1 = require("./DangoMonopolyViewBase");
class DangoMonopolyBuffActiveView extends DangoMonopolyViewBase_1.DangoMonopolyViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.ShowPanel = undefined;
    this.GetPanel = undefined;
    this.DangoActorList = [];
    this.EVc = () => {
      this.SetBtnEmptyActive(true);
      this.PlayDangoAni();
    };
    this.OnClickClose = () => {
      if (this.GetPanel?.IsShow) {
        this.CloseMe();
      }
    };
    this.kVc = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.kVc]];
  }
  Es_() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, ["BoardId", this.OpenParam?.BoardId], ["GridId", this.OpenParam?.GridData.Id]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    this.ShowPanel = new DangoMonopolyBuffActiveShowPanel_1.DangoMonopolyBuffActiveShowPanel();
    this.GetPanel = new DangoMonopolyBuffActiveGetPanel_1.DangoMonopolyBuffActiveGetPanel();
    var o = this.OpenParam.GridData;
    await this.ShowPanel.Init(this.GetItem(0), o);
    await this.GetPanel.Init(this.GetItem(1), o);
    this.SetBtnEmptyActive(false);
  }
  async InitDangoActorList() {
    var o = {
      UiModelUseWay: 13,
      DangoId: this.ct1(),
      Odds: 0,
      DangoPointCase: "DangoMonopolyMeet",
      DangoCamera: StringUtils_1.EMPTY_STRING,
      DangoOffset: 0
    };
    this.DangoActorList = await UiSceneManager_1.UiSceneManager.LoadDangoActorList([o]);
  }
  PlayDangoAni() {
    var o = this.DangoActorList[0];
    var [e, t] = ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetActiveDangoAniInfo();
    if (e) {
      o.SetState(e, t);
    }
    var o = DangoManager_1.DangoManager.GetDangoData(this.ct1());
    if (o.DangoVoice) {
      AudioSystem_1.AudioSystem.PostEvent(o.DangoVoice);
    }
  }
  ct1() {
    return this.OpenParam.GridData.GetDangoData()?.Id ?? 0;
  }
  a3c() {
    for (const o of this.DangoActorList) {
      UiSceneManager_1.UiSceneManager.DestroyDangoActor(o);
    }
    this.DangoActorList = [];
  }
  OnStart() {
    this.ActivityData.UpdateBoardGridUiInfoShow(false);
  }
  OnBeforeShow() {
    this.UpdateData();
  }
  OnBeforeDestroy() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "MoveDango=>关闭激活特性");
    }
    this.a3c();
    this.OpenParam?.Promise?.SetResult();
    this.ActivityData.UpdateBoardGridUiInfoShow(true);
  }
  OnAfterDestroy() {}
  async UpdateData() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "MoveDango=>展示激活特性");
    }
    this.ShowPanel?.SetActive(true);
    this.GetPanel?.SetActive(true);
    await Promise.all([this.PlaySequenceAsync("Start01"), this.InitDangoActorList()]);
    this.EVc();
  }
  OnHandleLoadScene() {}
  SetBtnEmptyActive(o) {
    this.GetButton(3)?.RootUIComp.SetUIActive(o);
  }
}
exports.DangoMonopolyBuffActiveView = DangoMonopolyBuffActiveView;
//# sourceMappingURL=DangoMonopolyBuffActiveView.js.map