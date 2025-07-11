"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkingLineItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class LinkingLineItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super();
    this.LineType = 3;
    this.SprBg = undefined;
    this.SprLine = undefined;
    this.SprLineHalf = undefined;
    this.SprSpot = undefined;
    this.SprRay = undefined;
    this.SprRayHalf = undefined;
    this.LineType = i;
  }
  static Create(i) {
    return new LinkingLineItem(i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UISprite]];
  }
  OnStart() {
    this.SprBg = this.GetSprite(0);
    this.SprLine = this.GetSprite(1);
    this.SprLineHalf = this.GetSprite(2);
    this.SprSpot = this.GetSprite(3);
    this.SprRay = this.GetSprite(4);
    this.SprRayHalf = this.GetSprite(5);
    this.SprBg.SetUIActive(false);
    this.SprLine.SetUIActive(false);
    this.SprLineHalf.SetUIActive(false);
    this.SprSpot.SetUIActive(false);
    this.SprRay.SetUIActive(false);
    this.SprRayHalf.SetUIActive(false);
  }
  InitIcon(i, e = false) {
    var t = ModelManager_1.ModelManager.SignalDeviceModel.ViewType === 1;
    var n = ModelManager_1.ModelManager.SignalDeviceModel.CurrentColor;
    let s = LinkingLineItem.ColorSpotIconMap.get(n);
    if (t) {
      s += "CM";
    }
    var o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s);
    this.SetSpriteByPath(o, this.SprSpot, false);
    let a = LinkingLineItem.ColorRayIconMap.get(n);
    if (t) {
      a += "CM";
    }
    var o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(a);
    this.SetSpriteByPath(o, this.SprRay, false);
    this.SetSpriteByPath(o, this.SprRayHalf, false);
    var t = LinkingLineItem.ColorMap.get(n);
    if (ModelManager_1.ModelManager.SignalDeviceModel.ViewType === 1) {
      o = LinkingLineItem.ColorSprBgMap.get(n);
      n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o);
      this.SetSpriteByPath(n, this.SprBg, false);
    } else {
      this.SprBg.SetColor(UE.Color.FromHex(t));
    }
    this.SprLine.SetColor(UE.Color.FromHex(t));
    this.SprLineHalf.SetColor(UE.Color.FromHex(t));
    this.RotateLine(i);
    var o = this.LineType === 3 || this.LineType === 4;
    this.SprBg.SetUIActive(true);
    this.SprLine.SetUIActive(!e);
    this.SprLineHalf.SetUIActive(e);
    this.SprRay.SetUIActive(!e);
    this.SprRayHalf.SetUIActive(e || !o);
    this.SprSpot.SetUIActive(true);
  }
  RotateLine(i) {
    var i = ModelManager_1.ModelManager.SignalDeviceModel.RotateMap.get(i);
    var e = ModelManager_1.ModelManager.SignalDeviceModel.CacheRotator;
    e.Yaw = i;
    this.GetRootItem().SetUIRelativeRotation(e.ToUeRotator());
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 35, "RotateLine", ["angle", i]);
    }
  }
  SetLineHalf(i) {
    this.SprLine.SetUIActive(false);
    this.SprLineHalf.SetUIActive(true);
    this.SprRay.SetUIActive(false);
    this.SprRayHalf.SetUIActive(true);
    var e = ModelManager_1.ModelManager.SignalDeviceModel.CacheRotator;
    var i = ModelManager_1.ModelManager.SignalDeviceModel.RotateMap.get(i);
    e.Yaw = i;
    this.GetRootItem().SetUIRelativeRotation(e.ToUeRotator());
  }
}
(exports.LinkingLineItem = LinkingLineItem).ColorSpotIconMap = new Map([[IAction_1.EPieceColorType.Blue, "SP_SpotBlue"], [IAction_1.EPieceColorType.Green, "SP_SpotGreen"], [IAction_1.EPieceColorType.Red, "SP_SpotRed"], [IAction_1.EPieceColorType.Yellow, "SP_SpotYellow"]]);
LinkingLineItem.ColorRayIconMap = new Map([[IAction_1.EPieceColorType.Blue, "SP_LineBlue"], [IAction_1.EPieceColorType.Green, "SP_LineGreen"], [IAction_1.EPieceColorType.Red, "SP_LineRed"], [IAction_1.EPieceColorType.Yellow, "SP_LineYellow"]]);
LinkingLineItem.ColorSprBgMap = new Map([[IAction_1.EPieceColorType.Blue, "SP_GridBgCMBlue"], [IAction_1.EPieceColorType.Green, "SP_GridBgCMGreen"], [IAction_1.EPieceColorType.Red, "SP_GridBgCMRed"], [IAction_1.EPieceColorType.Yellow, "SP_GridBgCMYellow"]]);
LinkingLineItem.ColorMap = new Map([[IAction_1.EPieceColorType.Blue, "3B82B9FF"], [IAction_1.EPieceColorType.Green, "64945FFF"], [IAction_1.EPieceColorType.Red, "B93B3CFF"], [IAction_1.EPieceColorType.Yellow, "B9823BFF"]]); //# sourceMappingURL=SignalLineItem.js.map