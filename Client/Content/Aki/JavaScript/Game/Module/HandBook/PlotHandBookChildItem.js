"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotHandBookChildItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class PlotHandBookChildItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e = undefined) {
    super();
    this.kZt = undefined;
    this.Lei = 0;
    this.ati = e => {
      const t = this.kZt.Config;
      if (this.kZt.IsLock) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CurPlotHandBookLock");
        this.GetTog()?.SetToggleStateForce(0, false, true);
      } else {
        if (this.kZt.IsNew) {
          HandBookController_1.HandBookController.SendIllustratedReadRequest(7, t.Id);
        }
        var i = t.Type;
        var o = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(i));
        o.sort(this.aei);
        var r = ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfig(i);
        var n = o.length;
        var s = [];
        var a = [];
        var l = [];
        var h = [];
        var g = [];
        var _ = [];
        for (let e = 0; e < n; e++) {
          const t = o[e];
          var u;
          var d = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(7, t.Id);
          if (d) {
            u = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
            s.push(u === 1 ? t.MaleTexture : t.FemaleTexture);
            g.push(d.CreateTime);
            a.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Descrtption));
            l.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name));
            h.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.TypeDescription));
            _.push(t.Id);
          }
        }
        i = new HandBookDefine_1.HandBookPhotoData();
        i.DescrtptionText = a;
        i.TypeText = h;
        i.NameText = l;
        i.HandBookType = 7;
        i.Index = this.Lei;
        i.TextureList = s;
        i.DateText = g;
        i.ConfigId = _;
        UiManager_1.UiManager.OpenView("HandBookPhotoView", i);
      }
    };
    this.OnHandBookRead = (e, t) => {
      if (e === 7 && t === this.kZt?.Config?.Id) {
        this.GetItem(2)?.SetUIActive(false);
      }
    };
    this.aei = (e, t) => e.Id - t.Id;
    if (e) {
      this.CreateThenShowByActor(e.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIExtendToggle]];
    this.BtnBindInfo = [[4, this.ati]];
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookRead, this.OnHandBookRead);
  }
  Refresh(e, t, i) {
    this.kZt = e;
    this.Lei = i;
    var i = this.kZt.Config;
    var o = e.IsNew;
    var e = e.IsLock;
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    this.SetTextureByPath(r === 1 ? i.MaleTexture : i.FemaleTexture, this.GetTexture(0));
    this.GetText(1).ShowTextNew(i.Name);
    this.GetItem(2).SetUIActive(o);
    this.GetItem(3).SetUIActive(e);
    this.GetTexture(0).SetUIActive(!e);
    this.GetTog()?.SetEnable(!e);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookRead, this.OnHandBookRead);
    this.kZt = undefined;
    this.Lei = 0;
  }
  GetTog() {
    return this.GetExtendToggle(4);
  }
  GetData() {
    return this.kZt;
  }
  GetIsUnlock() {
    return !!this.kZt && !this.kZt.IsLock;
  }
}
exports.PlotHandBookChildItem = PlotHandBookChildItem;
//# sourceMappingURL=PlotHandBookChildItem.js.map