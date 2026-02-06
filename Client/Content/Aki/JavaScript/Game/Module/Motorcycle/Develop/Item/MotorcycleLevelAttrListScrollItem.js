"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleLevelAttrListScrollItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class MotorcycleLevelAttrListScrollItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.Zdf = "";
    this.pHe = () => !StringUtils_1.StringUtils.IsBlank(this.Zdf);
    this.ToggleEvent = t => {
      t = t === 1;
      this.GetText(8).SetUIActive(t);
      this.GetItem(7).SetUIActive(t);
      t = t ? "Show" : "Hide";
      if (this.SPe) {
        this.SPe.StopCurrentSequence();
        this.SPe.PlayLevelSequenceByName(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText]];
    this.BtnBindInfo = [[0, this.ToggleEvent]];
  }
  OnStart() {
    var t = this.GetExtendToggle(0);
    t.RootUIComp.SetUIActive(true);
    t.CanExecuteChange.Unbind();
    t.CanExecuteChange.Bind(this.pHe);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(7).SetUIActive(false);
  }
  OnBeforeDestroy() {
    if (this.SPe) {
      this.SPe.Clear();
      this.SPe = undefined;
    }
  }
  Refresh(r, t, i) {
    var s = ConfigManager_1.ConfigManager.MotorConfig.GetMotorAttrConfig(r.AttrId);
    if (s) {
      this.GetSprite(1).useChangeColor = !r.IsShowBg;
      this.Zdf = s.Desc;
      if (StringUtils_1.StringUtils.IsBlank(this.Zdf)) {
        this.GetItem(6).SetUIActive(false);
      } else {
        this.GetItem(6).SetUIActive(true);
        this.GetText(8).ShowTextNew(this.Zdf);
      }
      var n = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurLevel();
      var l = s.IsNumber;
      var o = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetAttrValueByType(r.AttrId, r.Level);
      var a = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetAttrValueByType(r.AttrId, n);
      var h = (o = s.IsPercent ? o / 100 : o) - (a = s.IsPercent ? a / 100 : a);
      let t = h > 0 ? StringUtils_1.StringUtils.Format("+{0}", h.toString()) : h.toString();
      let i = a.toString();
      let e = o.toString();
      t = s.IsPercent ? StringUtils_1.StringUtils.Format("{0}%", t) : t;
      e = s.IsPercent ? StringUtils_1.StringUtils.Format("{0}%", e) : e;
      i = s.IsPercent ? StringUtils_1.StringUtils.Format("{0}%", i) : i;
      if (!StringUtils_1.StringUtils.IsBlank(s.Suffix)) {
        _ = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s.Suffix) ?? "";
        t = StringUtils_1.StringUtils.Format("{0}{1}", t, _);
        e = StringUtils_1.StringUtils.Format("{0}{1}", e, _);
        i = StringUtils_1.StringUtils.Format("{0}{1}", i, _);
      }
      var _ = UE.Color.FromHex("97ff86");
      var g = UE.Color.FromHex("c25757");
      if (!l) {
        l = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MotorBike_Status_Speed_Lv"), o.toString());
        i = h > 0 ? "" : l;
        e = h > 0 ? "" : l;
        l = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MotorBike_Status_Speed_LvUp"), a.toString(), o.toString());
        t = l;
      }
      this.GetText(4).SetText(r.Level > n ? i : e);
      this.GetText(5).SetText(t);
      this.GetText(5).SetColor(r.Level > n ? _ : g);
      this.GetText(5).SetUIActive(r.Level > n && h !== 0);
      this.GetText(3).ShowTextNew(s.Name);
      this.SetTextureByPath(s.Icon, this.GetTexture(2));
    }
  }
}
exports.MotorcycleLevelAttrListScrollItem = MotorcycleLevelAttrListScrollItem;
//# sourceMappingURL=MotorcycleLevelAttrListScrollItem.js.map