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
      var i = this.kZt.Config;
      if (this.kZt.IsLock) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CurGeographyHandBookLock");
        this.SetToggleState(0);
      } else {
        this.dei();
        var o = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig());
        o.sort(this.aei);
        var t = o.length;
        var n = [];
        var a = [];
        var s = [];
        var l = [];
        var h = [];
        var g = [];
        let r = 0;
        for (let e = 0; e < t; e++) {
          var d = o[e];
          var u = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(2, d.Id);
          if (u && (n.push(d.Texture), h.push(u.CreateTime), a.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(d.Descrtption)), s.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(d.Name)), u = ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyTypeConfig(d.Type), l.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(u.TypeDescription)), g.push(d.Id), d.Id === i.Id)) {
            r = n.length - 1;
          }
        }
        var _ = new HandBookDefine_1.HandBookPhotoData();
        _.DescrtptionText = a;
        _.TypeText = l;
        _.NameText = s;
        _.HandBookType = 2;
        _.Index = r;
        _.TextureList = n;
        _.DateText = h;
        _.ConfigId = g;
        UiManager_1.UiManager.OpenView("HandBookPhotoView", _);
      }
    };
    this.aei = (e, r) => e.Type === r.Type ? e.Id - r.Id : e.Type - r.Type;
    if (e) {
      this.CreateThenShowByActor(e.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIExtendToggle]];
    this.BtnBindInfo = [[4, this.mei]];
  }
  Refresh(e, r, i) {
    this.kZt = e;
    var o = this.kZt.Config;
    var t = e.IsNew;
    var e = e.IsLock;
    this.SetTextureByPath(o.Texture, this.GetTexture(0));
    this.GetText(1).ShowTextNew(o.Name);
    this.GetItem(2).SetUIActive(t);
    this.GetTexture(0).SetUIActive(!e);
    this.GetItem(3).SetUIActive(e);
    this.GetTog()?.SetEnable(!e);
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
}
exports.GeographyHandBookChildItem = GeographyHandBookChildItem;
//# sourceMappingURL=GeographyHandBookChildItem.js.map