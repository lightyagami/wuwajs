"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleAreaInfoView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const MoraleAreaInfoFlagDescPanel_1 = require("./MoraleAreaInfoFlagDescPanel");
const MoraleAreaInfoMapPanel_1 = require("./MoraleAreaInfoMapPanel");
const MoraleFlagMonsterInfoPanel_1 = require("./MoraleFlagMonsterInfoPanel");
const MoraleSumLvInfoPanel_1 = require("./MoraleSumLvInfoPanel");
class MoraleAreaInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.PopupCaption = undefined;
    this.SumLvInfoPanel = undefined;
    this.FlagMonsterInfoPanel = undefined;
    this.MapPanel = undefined;
    this.SmallFlagDescPanel = undefined;
    this.AreaData = undefined;
    this.FlagData = undefined;
    this.Model = undefined;
    this.LastLightBgPath = "";
    this.V2i = () => {
      this.CloseMe();
    };
    this.N$1 = t => {
      this.SelectFlagId(t);
    };
    this.G$1 = t => {
      this.SelectFlag(t);
      this.FlagMonsterInfoPanel.PlayEnter();
      this.Cau();
    };
    this.V$1 = () => {
      var t = ModelManager_1.ModelManager.MoraleModel?.IsMoraleGameOver() ? "Morale_title_39" : "Morale_title_21";
      this.SmallFlagDescPanel.SetActive(true);
      this.SmallFlagDescPanel.UpdateDesc(t);
    };
    this.sDu = () => {
      ModelManager_1.ModelManager.MoraleModel?.TrackAreaExploreBox(this.AreaData.Id);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UITexture], [11, UE.UITexture], [12, UE.UISprite], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIText], [16, UE.UIText], [17, UE.UIText], [18, UE.UIItem], [19, UE.UIButtonComponent]];
    this.BtnBindInfo = [[14, this.V$1], [19, this.sDu]];
  }
  Es_() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, this.constructor.name, ["DataParam", this.OpenParam]);
    }
    this.Model = ModelManager_1.ModelManager.MoraleModel;
    var t = this.OpenParam?.AreaId ?? this.Model.AreaDataList[0].Id;
    this.AreaData = this.Model.GetAreaData(t);
    var t = this.OpenParam?.FlagId ?? this.AreaData.GetDefaultSelectFlagId();
    this.FlagData = this.AreaData.GetFlag(t);
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.PopupCaption.SetCloseCallBack(this.V2i);
    this.PopupCaption.SetHelpBtnActive(false);
    var t = this.GetItem(1);
    this.SumLvInfoPanel = new MoraleSumLvInfoPanel_1.MoraleSumLvInfoPanel();
    await this.SumLvInfoPanel.Init(t);
    var t = this.GetItem(4);
    this.FlagMonsterInfoPanel = new MoraleFlagMonsterInfoPanel_1.MoraleFlagMonsterInfoPanel();
    await this.FlagMonsterInfoPanel.Init(t);
    var t = this.GetItem(13);
    this.SmallFlagDescPanel = new MoraleAreaInfoFlagDescPanel_1.MoraleAreaInfoFlagDescPanel();
    await this.SmallFlagDescPanel.Init(t);
    await this.UpdateMapData();
    await this.pau();
  }
  async OnPlayingStartSequenceAsync() {
    await super.OnPlayingStartSequenceAsync();
    this.MapPanel.PlayStartSequence();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MoraleAreaChangeFlag, this.N$1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MoraleAreaChangeFlag, this.N$1);
  }
  OnBeforeShow() {
    this.UpdateData();
  }
  OnBeforeDestroy() {}
  UpdateData() {
    this.SumLvInfoPanel.UpdateData();
    this.MapPanel.UpdateData();
    this.SelectFlag(this.FlagData);
    this.PopupCaption.SetTitleLocalText(this.AreaData.Config.Name);
    this.UpdateSmallFlagNumPercent();
    this.UpdateFlagBoxNumPercent();
    this.UpdateExploreBoxNumPercent();
  }
  UpdateSmallFlagNumPercent() {
    var t;
    if (ConfigManager_1.ConfigManager.MoraleConfig.GetMoraleIsShowSmallFlagProgress()) {
      t = this.Model.IsMoraleGameOver();
      this.GetItem(3)?.SetUIActive(!t);
      if (!t) {
        t = this.AreaData.GetAreaFlagTotalNum(0);
        t = this.AreaData.GetAreaFlagActiveNum(0) + "/" + t;
        this.GetText(17)?.SetText(t);
      }
    } else {
      this.GetItem(3)?.SetUIActive(false);
    }
  }
  UpdateFlagBoxNumPercent() {
    var t = this.AreaData.GetAllFlagBoxTotalCount();
    var t = this.AreaData.GetAllFlagBoxReceivedCount() + "/" + t;
    this.GetText(15)?.SetText(t);
  }
  UpdateExploreBoxNumPercent() {
    var t;
    var i;
    var e;
    var s = this.GetButton(19)?.RootUIComp;
    var a = this.GetItem(18);
    if (ConfigManager_1.ConfigManager.MoraleConfig.GetMoraleHighFlagUnFinishIsShowExploreBoxProgress() || this.AreaData.HighDifficultyFlagSomeActive()) {
      t = this.AreaData.ExploreBoxTotalCount;
      e = (i = this.AreaData.ExploreBoxReceivedCount) + "/" + t;
      this.GetText(16)?.SetText(e);
      a?.SetUIActive(true);
      s?.SetUIActive(i < t);
    } else {
      a?.SetUIActive(false);
      s?.SetUIActive(false);
    }
  }
  SelectFlag(t) {
    this.FlagData = t;
    this.UpdateSelectFlagState();
    this.FlagMonsterInfoPanel.UpdateData(this.FlagData);
    this.MapPanel.UpdateFlagState();
  }
  SelectFlagId(t) {
    this.FlagData = this.AreaData.GetFlag(t);
    this.SelectFlag(this.FlagData);
  }
  async UpdateMapData() {
    if (this.MapPanel) {
      this.MapPanel.Destroy();
      this.MapPanel = undefined;
    }
    var t = 5 + this.AreaData.Id - 1;
    this.GetItem(t)?.SetUIActive(true);
    this.MapPanel = new MoraleAreaInfoMapPanel_1.MoraleAreaInfoMapPanel();
    this.MapPanel.ClickCallback = this.G$1;
    await this.MapPanel.Init(this.AreaData, this.GetItem(t));
  }
  async pau() {
    var t = this.GetTexture(10);
    var i = this.GetSprite(12);
    var e = this.AreaData.Config.DescGridBgAddX;
    i.SetAnchorOffsetX(e);
    var e = this.AreaData.Config.DescBigBgPath;
    var s = this.AreaData.Config.DescGridBgPath;
    await this.SetTextureAsync(e, t);
    await this.SetSpriteAsync(s, i, false);
    await this.Cau();
  }
  async Cau() {
    var t;
    var i = this.FlagData.TypeConfig.DescLightPath;
    if (this.LastLightBgPath !== i) {
      this.LastLightBgPath = i;
      t = this.GetTexture(11);
      await this.SetTextureAsync(i, t);
    }
  }
  UpdateSelectFlagState() {
    const i = this.FlagData;
    this.AreaData.GetUiFlagList().forEach(t => {
      t.SetSelectState(t.Id === i.Id);
    });
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t && !(t.length <= 0) && t[0] === "BossFlag") {
      return this.MapPanel?.GetGuideUiItemAndUiItemForShowEx(t);
    } else {
      return undefined;
    }
  }
}
exports.MoraleAreaInfoView = MoraleAreaInfoView;
//# sourceMappingURL=MoraleAreaInfoView.js.map