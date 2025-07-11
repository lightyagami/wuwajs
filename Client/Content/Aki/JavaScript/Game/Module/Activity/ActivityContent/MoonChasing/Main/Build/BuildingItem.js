"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class BuildingItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.BuildingId = e;
    this.$pt = undefined;
    this.ODn = () => {
      ControllerHolder_1.ControllerHolder.MoonChasingController.OpenBuildingTipsInfoView(this.BuildingId);
    };
    this.Rca = e => {
      if (e === "Close") {
        e = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(this.BuildingId).IsBuild;
        this.SetTipsActive(false);
        this.GetItem(9).SetUIActive(e);
        this.GetTexture(0).SetUIActive(e);
      }
    };
    this.BNe = () => {
      this.esi();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISpriteTransition], [2, UE.UISpriteTransition], [3, UE.UISpriteTransition], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem]];
    this.BtnBindInfo = [[6, this.ODn]];
  }
  OnStart() {
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.$pt.BindSequenceCloseEvent(this.Rca);
  }
  OnBeforeShow() {
    this.AddEventListener();
    this.Refresh();
  }
  OnBeforeHide() {
    this.RemoveEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MoonChasingRefreshBuildingRedDot, this.BNe);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MoonChasingRefreshBuildingRedDot, this.BNe);
  }
  OnBeforeDestroy() {
    this.$pt.Clear();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = this.GetButton(6).GetRootComponent();
    if (t !== undefined) {
      return [t, t];
    }
  }
  SetTipsActive(e) {
    this.GetItem(7)?.SetUIActive(e);
  }
  SetExhibitionMode(e) {
    var t = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(this.BuildingId).IsBuild;
    this.SetTipsActive(!e);
    this.GetTexture(0).SetUIActive(!e || !!t);
    this.GetItem(9).SetUIActive(!e);
  }
  SetBuildingItemActive(e) {
    var t = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(this.BuildingId).IsBuild;
    this.BNe();
    if (e) {
      this.$pt.StopSequenceByKey(t ? "Close" : "Close01", false);
      this.SetTipsActive(true);
      this.GetTexture(0).SetUIActive(true);
      this.GetItem(9).SetUIActive(true);
      this.$pt.PlayLevelSequenceByName(t ? "Start" : "Start01");
    } else {
      this.$pt.PlayLevelSequenceByName(t ? "Close" : "Close01");
    }
    this.SetInteractive(e);
  }
  SetInteractive(e) {
    this.GetButton(6)?.SetSelfInteractive(e);
  }
  Dma() {
    var e = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(this.BuildingId);
    var t = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(this.BuildingId);
    if (e.IsUnlock) {
      if (e.IsBuild) {
        this.SetTextureByPath(t.BuildingTexture, this.GetTexture(0));
      } else {
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_BuildItemBUnlock");
        this.SetTextureByPath(e, this.GetTexture(0));
      }
    }
  }
  Ama() {
    var e = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(this.BuildingId);
    let t = undefined;
    t = e.IsMax ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_TogPointMaxNor") : e.IsUnlock ? e.Level === 0 ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_TogPointUnLock") : ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_TogPointNor") : ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_TogPointNorLock");
    e = this.GetUiSpriteTransition(3);
    this.SetSpriteTransitionByPath(t, e, 0);
  }
  Rma() {
    var e = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(this.BuildingId);
    var t = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(this.BuildingId);
    var i = this.GetUiSpriteTransition(1);
    i.RootUIComp.SetUIActive(e.IsUnlock);
    let r = undefined;
    r = e.IsMax ? UE.Color.FromHex("#ecb138") : e.IsUnlock ? e.Level === 0 ? UE.Color.FromHex("#595854") : UE.Color.FromHex("#b49570") : UE.Color.FromHex("#ffffff");
    this.SetSpriteTransitionByPath(t.TipsSprite, i);
    i.TransitionInfo.NormalTransition.Color = r;
  }
  zBa() {
    var e = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(this.BuildingId);
    this.GetUiSpriteTransition(2).RootUIComp.SetUIActive(!e.IsUnlock);
  }
  xma() {
    var e = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(this.BuildingId);
    this.GetItem(4)?.SetUIActive(e.IsAvailableLevelUp);
  }
  esi() {
    var e = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(this.BuildingId);
    var e = ModelManager_1.ModelManager.MoonChasingBuildingModel.CheckBuildingRedDotState(e);
    this.GetItem(5)?.SetUIActive(e);
  }
  qWe() {
    var e = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(this.BuildingId);
    var t = this.GetText(8);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Name);
  }
  Refresh() {
    this.Dma();
    this.Rma();
    this.zBa();
    this.Ama();
    this.xma();
    this.esi();
    this.qWe();
  }
}
exports.BuildingItem = BuildingItem;
//# sourceMappingURL=BuildingItem.js.map