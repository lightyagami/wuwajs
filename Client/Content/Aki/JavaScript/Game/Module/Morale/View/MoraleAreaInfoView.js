"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleAreaInfoView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  MoraleAreaInfoFlagDescPanel_1 = require("./MoraleAreaInfoFlagDescPanel"),
  MoraleAreaInfoMapPanel_1 = require("./MoraleAreaInfoMapPanel"),
  MoraleFlagMonsterInfoPanel_1 = require("./MoraleFlagMonsterInfoPanel"),
  MoraleSumLvInfoPanel_1 = require("./MoraleSumLvInfoPanel");
class MoraleAreaInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.OpenParam = void 0, this.PopupCaption = void 0, this.SumLvInfoPanel = void 0, this.FlagMonsterInfoPanel = void 0, this.MapPanel = void 0, this.SmallFlagDescPanel = void 0, this.AreaData = void 0, this.FlagData = void 0, this.Model = void 0, this.LastLightBgPath = "", this.V2i = () => {
      this.CloseMe()
    }, this.o$1 = t => {
      this.SelectFlagId(t)
    }, this.i$1 = t => {
      this.SelectFlag(t), this.FlagMonsterInfoPanel.PlayEnter(), this.fru()
    }, this.n$1 = () => {
      var t = ModelManager_1.ModelManager.MoraleModel?.IsMoraleGameOver() ? "Morale_title_39" : "Morale_title_21";
      this.SmallFlagDescPanel.SetActive(!0), this.SmallFlagDescPanel.UpdateDesc(t)
    }, this.Imu = () => {
      ModelManager_1.ModelManager.MoraleModel?.TrackAreaExploreBox(this.AreaData.Id)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UITexture],
      [11, UE.UITexture],
      [12, UE.UISprite],
      [13, UE.UIItem],
      [14, UE.UIButtonComponent],
      [15, UE.UIText],
      [16, UE.UIText],
      [17, UE.UIText],
      [18, UE.UIItem],
      [19, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [14, this.n$1],
      [19, this.Imu]
    ]
  }
  Es_() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, this.constructor.name, ["DataParam", this.OpenParam]), this.Model = ModelManager_1.ModelManager.MoraleModel;
    var t = this.OpenParam?.AreaId ?? this.Model.AreaDataList[0].Id,
      t = (this.AreaData = this.Model.GetAreaData(t), this.OpenParam?.FlagId ?? this.AreaData.GetDefaultSelectFlagId());
    this.FlagData = this.AreaData.GetFlag(t)
  }
  async OnBeforeStartAsync() {
    this.Es_(), await super.OnBeforeStartAsync(), this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)), this.PopupCaption.SetCloseCallBack(this.V2i), this.PopupCaption.SetHelpBtnActive(!1);
    var t = this.GetItem(1),
      t = (this.SumLvInfoPanel = new MoraleSumLvInfoPanel_1.MoraleSumLvInfoPanel, await this.SumLvInfoPanel.Init(t), this.GetItem(4)),
      t = (this.FlagMonsterInfoPanel = new MoraleFlagMonsterInfoPanel_1.MoraleFlagMonsterInfoPanel, await this.FlagMonsterInfoPanel.Init(t), this.GetItem(13));
    this.SmallFlagDescPanel = new MoraleAreaInfoFlagDescPanel_1.MoraleAreaInfoFlagDescPanel, await this.SmallFlagDescPanel.Init(t), await this.UpdateMapData(), await this.gru()
  }
  async OnPlayingStartSequenceAsync() {
    await super.OnPlayingStartSequenceAsync(), this.MapPanel.PlayStartSequence()
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MoraleAreaChangeFlag, this.o$1)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MoraleAreaChangeFlag, this.o$1)
  }
  OnBeforeShow() {
    this.UpdateData()
  }
  OnBeforeDestroy() {}
  UpdateData() {
    this.SumLvInfoPanel.UpdateData(), this.MapPanel.UpdateData(), this.SelectFlag(this.FlagData), this.PopupCaption.SetTitleLocalText(this.AreaData.Config.Name), this.UpdateSmallFlagNumPercent(), this.UpdateFlagBoxNumPercent(), this.UpdateExploreBoxNumPercent()
  }
  UpdateSmallFlagNumPercent() {
    var t;
    ConfigManager_1.ConfigManager.MoraleConfig.GetMoraleIsShowSmallFlagProgress() ? (t = this.Model.IsMoraleGameOver(), this.GetItem(3)?.SetUIActive(!t), t || (t = this.AreaData.GetAreaFlagTotalNum(0), t = this.AreaData.GetAreaFlagActiveNum(0) + "/" + t, this.GetText(17)?.SetText(t))) : this.GetItem(3)?.SetUIActive(!1)
  }
  UpdateFlagBoxNumPercent() {
    var t = this.AreaData.GetAllFlagBoxTotalCount(),
      t = this.AreaData.GetAllFlagBoxReceivedCount() + "/" + t;
    this.GetText(15)?.SetText(t)
  }
  UpdateExploreBoxNumPercent() {
    var t, i, e, s = this.GetButton(19)?.RootUIComp,
      a = this.GetItem(18);
    ConfigManager_1.ConfigManager.MoraleConfig.GetMoraleHighFlagUnFinishIsShowExploreBoxProgress() || this.AreaData.HighDifficultyFlagSomeActive() ? (t = this.AreaData.ExploreBoxTotalCount, e = (i = this.AreaData.ExploreBoxReceivedCount) + "/" + t, this.GetText(16)?.SetText(e), a?.SetUIActive(!0), s?.SetUIActive(i < t)) : (a?.SetUIActive(!1), s?.SetUIActive(!1))
  }
  SelectFlag(t) {
    this.FlagData = t, this.UpdateSelectFlagState(), this.FlagMonsterInfoPanel.UpdateData(this.FlagData), this.MapPanel.UpdateFlagState()
  }
  SelectFlagId(t) {
    this.FlagData = this.AreaData.GetFlag(t), this.SelectFlag(this.FlagData)
  }
  async UpdateMapData() {
    this.MapPanel && (this.MapPanel.Destroy(), this.MapPanel = void 0);
    var t = 5 + this.AreaData.Id - 1;
    this.GetItem(t)?.SetUIActive(!0), this.MapPanel = new MoraleAreaInfoMapPanel_1.MoraleAreaInfoMapPanel, this.MapPanel.ClickCallback = this.i$1, await this.MapPanel.Init(this.AreaData, this.GetItem(t))
  }
  async gru() {
    var t = this.GetTexture(10),
      i = this.GetSprite(12),
      e = this.AreaData.Config.DescGridBgAddX,
      e = (i.SetAnchorOffsetX(e), this.AreaData.Config.DescBigBgPath),
      s = this.AreaData.Config.DescGridBgPath;
    await this.SetTextureAsync(e, t), await this.SetSpriteAsync(s, i, !1), await this.fru()
  }
  async fru() {
    var t, i = this.FlagData.TypeConfig.DescLightPath;
    this.LastLightBgPath !== i && (this.LastLightBgPath = i, t = this.GetTexture(11), await this.SetTextureAsync(i, t))
  }
  UpdateSelectFlagState() {
    const i = this.FlagData;
    this.AreaData.GetUiFlagList().forEach(t => {
      t.SetSelectState(t.Id === i.Id)
    })
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    return t && !(t.length <= 0) && "BossFlag" === t[0] ? this.MapPanel?.GetGuideUiItemAndUiItemForShowEx(t) : void 0
  }
}
exports.MoraleAreaInfoView = MoraleAreaInfoView;
//# sourceMappingURL=MoraleAreaInfoView.js.map