"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkingDotItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class LinkingDotItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.wAe = undefined;
    this.BAe = undefined;
    this.bAe = undefined;
    this.qAe = undefined;
    this.GAe = undefined;
    this.NAe = undefined;
    this.OAe = undefined;
    this.kAe = undefined;
    this.Tia = undefined;
    this.Lia = undefined;
    this.oga = undefined;
    this.SPe = undefined;
    this.FAe = (i, t, e, n, o) => {};
  }
  OnRegisterComponent() {
    var i = ModelManager_1.ModelManager.SignalDeviceModel.ViewType === 1;
    this.ComponentRegisterInfos = i ? [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [6, UE.UISprite], [5, UE.UISprite], [4, UE.UIItem], [7, UE.UIItem], [8, UE.UISprite], [9, UE.UISprite], [10, UE.UISprite], [11, UE.UISprite], [12, UE.UIItem], [13, UE.UIExtendToggle]] : [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [6, UE.UISprite], [5, UE.UISprite], [4, UE.UIItem], [7, UE.UIItem]];
  }
  OnStart() {
    this.wAe = this.GetSprite(0);
    this.BAe = this.GetSprite(1);
    this.bAe = this.GetSprite(2);
    this.qAe = this.GetSprite(3);
    this.GAe = this.GetSprite(6);
    this.NAe = this.GetSprite(5);
    this.OAe = this.GetItem(4);
    this.kAe = this.GetItem(7);
    this.wAe.SetUIActive(false);
    this.BAe.SetUIActive(false);
    this.bAe.SetUIActive(false);
    this.qAe.SetUIActive(false);
    this.GAe.SetUIActive(false);
    this.NAe.SetUIActive(false);
    this.kAe.SetUIActive(false);
    if (ModelManager_1.ModelManager.SignalDeviceModel.ViewType === 1) {
      this.Tia = this.GetSprite(9);
      this.Lia = this.GetSprite(8);
      this.oga = this.GetSprite(10);
      this.Tia.SetUIActive(false);
      this.Lia.SetUIActive(false);
      this.oga.SetUIActive(false);
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignalDeviceLinking, this.FAe);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignalDeviceLinking, this.FAe);
  }
  InitIcon(i) {
    var t = ModelManager_1.ModelManager.SignalDeviceModel.ViewType === 1;
    let e = LinkingDotItem.VAe.get(i);
    let n = e + "Light";
    let o = LinkingDotItem.HAe.get(i);
    let s = LinkingDotItem.ColorRayIconMap.get(i);
    if (t) {
      e += "CM";
      n += "CM";
      o += "CM";
      s += "CM";
    }
    var h = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetSpriteByPath(h, this.wAe, false);
    var h = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(n);
    this.SetSpriteByPath(h, this.BAe, false);
    var h = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o);
    this.SetSpriteByPath(h, this.qAe, false);
    var h = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s);
    this.SetSpriteByPath(h, this.GAe, false);
    var h = LinkingDotItem.ColorMap.get(i);
    this.NAe.SetColor(UE.Color.FromHex(h));
    var h = LinkingDotItem.FxColorMap.get(i);
    this.kAe.SetColor(UE.Color.FromHex(h));
    if (t) {
      h = LinkingDotItem.Dia.get(i);
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(h);
      this.SetSpriteByPath(t, this.Tia, false);
      h = LinkingDotItem.nga.get(i);
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(h);
      this.SetSpriteByPath(t, this.oga, false);
      h = LinkingDotItem.CmColorMap.get(i);
      this.Lia.SetColor(UE.Color.FromHex(h));
      t = LinkingDotItem.CmAnimColorMap.get(i);
      this.GetSprite(11)?.SetColor(UE.Color.FromHex(t));
      this.GetSprite(11)?.SetUIActive(false);
      this.GetItem(12)?.SetColor(UE.Color.FromHex(t));
    }
    this.SetLight(false);
    this.ResetIcon();
  }
  async ResetIcon() {
    var i;
    if (ModelManager_1.ModelManager.SignalDeviceModel.ViewType === 1) {
      this.oga.SetUIActive(false);
      this.GetSprite(11)?.SetUIActive(false);
      i = new CustomPromise_1.CustomPromise();
      await this.SPe.PlaySequenceAsync("PressUp", i);
      this.GetExtendToggle(13).AllowEventBubbleUp = true;
    } else {
      this.SetLight(false);
    }
  }
  async OnPressed(i) {
    var t;
    var e;
    if (ModelManager_1.ModelManager.SignalDeviceModel.ViewType === 1) {
      this.oga.SetUIActive(true);
      t = i ? "PressDown" : "PressUp";
      e = new CustomPromise_1.CustomPromise();
      await this.SPe.PlaySequenceAsync(t, e);
    } else {
      this.SetLight(i);
    }
  }
  async OnLinked() {
    var i;
    if (ModelManager_1.ModelManager.SignalDeviceModel.ViewType === 1) {
      this.oga.SetUIActive(true);
      this.GetSprite(11)?.SetUIActive(true);
      i = new CustomPromise_1.CustomPromise();
      await this.SPe.PlaySequenceAsync("Activate", i);
      this.GetExtendToggle(13).AllowEventBubbleUp = false;
    } else {
      this.SetLight(true);
    }
  }
  SetLight(i) {
    this.wAe.SetUIActive(!i);
    this.BAe.SetUIActive(i);
    this.bAe.SetUIActive(!i);
    this.qAe.SetUIActive(i);
    if (!i) {
      this.SetFxBoost(false);
    }
  }
  SetFxBoost(i) {
    if (ModelManager_1.ModelManager.SignalDeviceModel.ViewType !== 1) {
      this.kAe.SetUIActive(i);
    }
  }
  RotateLine(i, t = 0) {
    this.GAe.SetUIActive(i);
    this.NAe.SetUIActive(i);
    i = ModelManager_1.ModelManager.SignalDeviceModel.RotateMap.get(t);
    t = ModelManager_1.ModelManager.SignalDeviceModel.CacheRotator;
    t.Yaw = i + 90;
    this.OAe.SetUIRelativeRotation(t.ToUeRotator());
  }
}
(exports.LinkingDotItem = LinkingDotItem).VAe = new Map([[IAction_1.EPieceColorType.Blue, "SP_DotBlue"], [IAction_1.EPieceColorType.Green, "SP_DotGreen"], [IAction_1.EPieceColorType.Red, "SP_DotRed"], [IAction_1.EPieceColorType.Yellow, "SP_DotYellow"]]);
LinkingDotItem.HAe = new Map([[IAction_1.EPieceColorType.Blue, "SP_CornerBlue"], [IAction_1.EPieceColorType.Green, "SP_CornerGreen"], [IAction_1.EPieceColorType.Red, "SP_CornerRed"], [IAction_1.EPieceColorType.Yellow, "SP_CornerYellow"]]);
LinkingDotItem.ColorRayIconMap = new Map([[IAction_1.EPieceColorType.Blue, "SP_LineBlue"], [IAction_1.EPieceColorType.Green, "SP_LineGreen"], [IAction_1.EPieceColorType.Red, "SP_LineRed"], [IAction_1.EPieceColorType.Yellow, "SP_LineYellow"]]);
LinkingDotItem.Dia = new Map([[IAction_1.EPieceColorType.Blue, "SP_AnimLineBlue"], [IAction_1.EPieceColorType.Green, "SP_AnimLineGreen"], [IAction_1.EPieceColorType.Red, "SP_AnimLineRed"], [IAction_1.EPieceColorType.Yellow, "SP_AnimLineYellow"]]);
LinkingDotItem.nga = new Map([[IAction_1.EPieceColorType.Blue, "SP_AnimDotBlue"], [IAction_1.EPieceColorType.Green, "SP_AnimDotGreen"], [IAction_1.EPieceColorType.Red, "SP_AnimDotRed"], [IAction_1.EPieceColorType.Yellow, "SP_AnimDotYellow"]]);
LinkingDotItem.ColorMap = new Map([[IAction_1.EPieceColorType.Blue, "3B82B9FF"], [IAction_1.EPieceColorType.Green, "64945FFF"], [IAction_1.EPieceColorType.Red, "B93B3CFF"], [IAction_1.EPieceColorType.Yellow, "B9823BFF"]]);
LinkingDotItem.CmColorMap = new Map([[IAction_1.EPieceColorType.Blue, "5CA1FF88"], [IAction_1.EPieceColorType.Green, "96FF5C88"], [IAction_1.EPieceColorType.Red, "FFA15C88"], [IAction_1.EPieceColorType.Yellow, "FFB85C88"]]);
LinkingDotItem.CmAnimColorMap = new Map([[IAction_1.EPieceColorType.Blue, "00FBE7FF"], [IAction_1.EPieceColorType.Green, "DFFF55FF"], [IAction_1.EPieceColorType.Red, "FFA73FFF"], [IAction_1.EPieceColorType.Yellow, "FAE56CFF"]]);
LinkingDotItem.FxColorMap = new Map([[IAction_1.EPieceColorType.Blue, "41AEFBFF"], [IAction_1.EPieceColorType.Green, "4F8040FF"], [IAction_1.EPieceColorType.Red, "F0477EFF"], [IAction_1.EPieceColorType.Yellow, "F8E56CFF"]]); //# sourceMappingURL=LinkingDotItem.js.map