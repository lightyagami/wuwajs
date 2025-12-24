"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StrItem = exports.WheelTowerStrShowPanel = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
class WheelTowerStrShowPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickConfirm = undefined;
    this.qUt = undefined;
    this.ije = () => {
      this.OnClickConfirm?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.ije]];
  }
  OnStart() {
    this.qUt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), () => new StrItem(), undefined);
    var e = ModelManager_1.ModelManager.WheelTowerModel.GetTowerConfig().DefaultCostEnergy;
    this.GetText(3)?.SetText(e.toString());
  }
  Refresh() {
    const r = ModelManager_1.ModelManager.WheelTowerModel;
    var e = [...r.TmpSelectedRoleMap.values()];
    const i = [];
    e.forEach(e => {
      var t;
      var e = r.TryGetRealRoleId(e);
      if (r.IsEnhanceRole(e)) {
        t = r.GetRoleEnhanceDesc(e);
        e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).Name;
        i.push({
          RoleName: e,
          DescList: t
        });
      }
    });
    e = i.length > 0;
    this.SetNullState(!e);
    this.qUt?.RefreshByData(i);
  }
  SetNullState(e) {
    this.GetItem(2)?.SetUIActive(e);
    this.GetScrollViewWithScrollbar(0)?.RootUIComp.SetUIActive(!e);
  }
}
exports.WheelTowerStrShowPanel = WheelTowerStrShowPanel;
class StrItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(t, e, r) {
    var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.RoleName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "WheelBattleRoleInfo_StrTips", i);
    let s = "";
    for (let e = 0; e < t.DescList.length; e++) {
      s += t.DescList[e];
      if (e < t.DescList.length - 1) {
        s += "\n";
      }
    }
    this.GetText(1)?.SetText(s);
  }
}
exports.StrItem = StrItem;
//# sourceMappingURL=WheelTowerStrShowPanel.js.map