"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleLevelAttrItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringBuilder_1 = require("../../../../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class MotorcycleLevelAttrItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UISprite]];
  }
  EUf(t, e) {
    var r = new StringBuilder_1.StringBuilder();
    r.Append(t ? "<color=#97ff86>" : "<color=#c25757>");
    r.Append(e);
    r.Append("</color>");
    return r.ToString();
  }
  Refresh(r, t, e) {
    var i = ConfigManager_1.ConfigManager.MotorConfig.GetMotorAttrConfig(r.AttrId);
    if (i) {
      let t = "";
      var l = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurLevel();
      var o = l < r.Level && r.IsSpecial;
      this.GetSprite(4).SetUIActive(o);
      this.GetItem(0).SetUIActive(!o && r.IsShowBg);
      this.SetTextureByPath(i.Icon, this.GetTexture(1));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Name);
      var o = i.IsNumber;
      var n = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetAttrValueByType(r.AttrId, r.Level);
      let e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetAttrValueByType(r.AttrId, l);
      if (r.IsSpecial) {
        e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetAttrValueByType(r.AttrId, r.Level - 1);
      }
      var a = (n = i.IsPercent ? n / 100 : n) - (e = i.IsPercent ? e / 100 : e);
      var s = a > 0 ? StringUtils_1.StringUtils.Format("+{0}", a.toString()) : a.toString();
      var _ = e.toString();
      var n = n.toString();
      var s = i.IsPercent ? StringUtils_1.StringUtils.Format("{0}%", s) : s;
      var _ = i.IsPercent ? StringUtils_1.StringUtils.Format("{0}%", _) : _;
      var n = i.IsPercent ? StringUtils_1.StringUtils.Format("{0}%", n) : n;
      t = a !== 0 ? (i = r.Level > l, o ? (s = this.EUf(i, s), i ? StringUtils_1.StringUtils.Format("{0}{1}", _, s) : n) : (a = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MotorBike_Status_Speed_LvUp"), _, n), r = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MotorBike_Status_Speed_Lv"), n), a = this.EUf(i, a), i ? a : r)) : o ? n : StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MotorBike_Status_Speed_Lv"), n);
      this.GetText(3).SetText(t);
    }
  }
}
exports.MotorcycleLevelAttrItem = MotorcycleLevelAttrItem;
//# sourceMappingURL=MotorcycleLevelAttrItem.js.map