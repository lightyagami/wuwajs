"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeographyHandBookChildItem = undefined;
const UE = require("ue");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
class GeographyHandBookChildItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e = undefined) {
    super();
    this.kZt = undefined;
    this.mei = e => {
      this.ToggleClick();
    };
    this.aei = (e, t) => e.Type === t.Type ? e.Id - t.Id : e.Type - t.Type;
    if (e) {
      this.CreateThenShowByActor(e.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIExtendToggle]];
  }
  OnStart() {
    this.GetTog().SetToggleStateForce(0, false, true);
  }
  Refresh(e, t, i) {
    this.kZt = e;
    var r = this.kZt.Config;
    var o = e.IsNew;
    var e = e.IsLock;
    this.SetTextureByPath(r.Texture, this.GetTexture(0));
    this.GetText(1).ShowTextNew(r.Name);
    this.GetItem(2).SetUIActive(o);
    this.GetTexture(0).SetUIActive(!e);
    this.GetItem(3).SetUIActive(e);
    this.dfg();
    this.mfg();
    this.GetTog()?.SetEnable(!e);
  }
  ToggleClick() {
    var i = this.kZt.Config;
    if (this.kZt.IsLock) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CurGeographyHandBookLock");
      this.SetToggleState(0);
    } else {
      this.dei();
      var r = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyHandBookConfigByTabType(i.GeographyTabType));
      r.sort(this.aei);
      var o = r.length;
      var n = [];
      var a = [];
      var s = [];
      var l = [];
      var g = [];
      var h = [];
      let t = 0;
      for (let e = 0; e < o; e++) {
        var d = r[e];
        var _ = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(2, d.Id);
        if (_ && (n.push(d.Texture), g.push(_.CreateTime), a.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(d.Descrtption)), s.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(d.Name)), _ = ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyTypeConfig(d.Type), l.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(_.TypeDescription)), h.push(d.Id), d.Id === i.Id)) {
          t = n.length - 1;
        }
      }
      var e = new HandBookDefine_1.HandBookPhotoData();
      e.DescrtptionText = a;
      e.TypeText = l;
      e.NameText = s;
      e.HandBookType = 2;
      e.Index = t;
      e.TextureList = n;
      e.DateText = g;
      e.ConfigId = h;
      UiManager_1.UiManager.OpenView("HandBookPhotoView", e);
    }
  }
  GetData() {
    return this.kZt;
  }
  SetNewState(e) {
    this.GetItem(2).SetUIActive(e);
  }
  SetToggleState(e) {
    this.GetExtendToggle(4).SetToggleStateForce(e, false, true);
    if (e === 1) {
      this.dei();
    }
  }
  dei() {
    var e;
    if (this.kZt.IsNew) {
      e = this.kZt.Config;
      HandBookController_1.HandBookController.SendIllustratedReadRequest(2, e.Id);
    }
  }
  OnBeforeDestroy() {
    this.kZt = undefined;
  }
  GetTog() {
    return this.GetExtendToggle(4);
  }
  GetIsUnlock() {
    return !!this.kZt && !this.kZt.IsLock;
  }
  dfg() {
    var e = this.GetTog();
    e?.OnStateChange.Clear();
    e?.CanExecuteChange.Unbind();
  }
  mfg() {
    this.GetTog()?.OnStateChange.Add(this.mei);
  }
}
exports.GeographyHandBookChildItem = GeographyHandBookChildItem;
//# sourceMappingURL=GeographyHandBookChildItem.js.map