"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookQuestChildItem = undefined;
const UE = require("ue");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../Util/LguiUtil");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
class HandBookQuestChildItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.kZt = undefined;
    this.Lei = 0;
    this.mei = () => {
      var e = this.kZt?.Config;
      if (e.QuestId) {
        this.HBn(e.Type);
      } else {
        this.Oxn(e.Type);
      }
    };
    this.aei = (e, t) => e.Id - t.Id;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UISprite], [7, UE.UITexture], [3, UE.UIExtendToggle]];
    this.BtnBindInfo = [[3, this.mei]];
  }
  Refresh(e, t, i) {
    this.SetUiActive(false);
    this.kZt = e;
    this.Lei = i;
    var i = this.kZt.Config;
    var r = e.IsNew;
    var e = e.IsLock;
    var o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    this.SetTextureByPath(o === 1 ? i.MaleTexture : i.FemaleTexture, this.GetTexture(0), undefined, () => {
      this.SetUiActive(true);
    });
    this.GetText(1).ShowTextNew(i.Name);
    this.GetItem(2).SetUIActive(r);
    this.GetTexture(0).SetUIActive(!e);
    this.GetTog()?.SetEnable(!e);
    if (i.AreaIcon || i.AreaNumber) {
      this.GetItem(4)?.SetUIActive(true);
      this.SetSpriteByPath(i.AreaIcon, this.GetSprite(6), false);
      this.SetTextureByPath(i.AreaNumber, this.GetTexture(7));
    } else {
      this.GetItem(4)?.SetUIActive(false);
    }
    if (i.RoleName) {
      this.GetText(5)?.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.RoleName);
    } else {
      this.GetText(5)?.SetUIActive(false);
    }
  }
  GetData() {
    return this.kZt;
  }
  SetNewState(e) {
    this.GetItem(2).SetUIActive(e);
  }
  SetToggleState(e) {
    this.GetExtendToggle(3).SetToggleStateForce(e, false, true);
    if (e === 1) {
      this.dei();
    }
  }
  dei() {
    var e;
    var t;
    if (this.kZt.IsNew) {
      t = (e = this.kZt.Config).Type;
      t = ConfigManager_1.ConfigManager.HandBookConfig?.GetPlotTypeConfig(t)?.Type;
      HandBookController_1.HandBookController.SendIllustratedReadRequest(t, e.Id);
    }
  }
  OnBeforeDestroy() {
    this.kZt = undefined;
  }
  GetTog() {
    return this.GetExtendToggle(3);
  }
  GetIsUnlock() {
    return !!this.kZt && !this.kZt.IsLock;
  }
  Oxn(e) {
    this.dei();
    var t = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(e));
    t.sort(this.aei);
    var i = ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfig(e);
    var r = t.length;
    var o = [];
    var n = [];
    var a = [];
    var s = [];
    var h = [];
    var g = [];
    for (let e = 0; e < r; e++) {
      var _;
      var l = t[e];
      var u = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(7, l.Id);
      if (u) {
        _ = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
        o.push(_ === 1 ? l.MaleTexture : l.FemaleTexture);
        h.push(u.CreateTime);
        n.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(l.Descrtption));
        a.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(l.Name));
        s.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.TypeDescription));
        g.push(l.Id);
      }
    }
    e = new HandBookDefine_1.HandBookPhotoData();
    e.DescrtptionText = n;
    e.TypeText = s;
    e.NameText = a;
    e.HandBookType = 7;
    e.Index = this.Lei;
    e.TextureList = o;
    e.DateText = h;
    e.ConfigId = g;
    UiManager_1.UiManager.OpenView("HandBookPhotoView", e);
  }
  HBn(e) {
    this.dei();
    var t = this.kZt?.Config.QuestId;
    var i = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(e));
    i?.sort((e, t) => e.Id - t.Id);
    var r = ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfig(e);
    var o = i.length;
    var n = [];
    var a = new HandBookDefine_1.HandBookQuestViewOpenParam();
    for (let e = 0; e < o; e++) {
      var s = i[e];
      if (ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(r.Type, s.Id) && (n.push(s.Id), t === s.QuestId)) {
        a.Index = n.indexOf(s.Id);
      }
    }
    a.ConfigIdList = n;
    UiManager_1.UiManager.OpenView("HandBookQuestPlotView", a);
  }
}
exports.HandBookQuestChildItem = HandBookQuestChildItem;
//# sourceMappingURL=HandBookQuestChildItem.js.map