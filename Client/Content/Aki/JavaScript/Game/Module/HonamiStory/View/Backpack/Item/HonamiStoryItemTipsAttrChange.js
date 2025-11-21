"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryItemTipsAttrChange = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const HonamiStoryAttrItem_1 = require("./HonamiStoryAttrItem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class HonamiStoryItemTipsAttrChange extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.rcm = undefined;
    this.ocm = new Map();
    this.OWe = () => new HonamiStoryAttrItem_1.HonamiStoryAttrItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    this.rcm = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.OWe, this.GetItem(1).GetOwner());
  }
  CombineDataList(e, t) {
    var i;
    var a;
    var r;
    var e = e.GetMainPropList();
    var t = t.GetMainPropList();
    this.ocm.clear();
    const n = [];
    let o = undefined;
    for (const s of e) {
      if (o = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryProp(s)) {
        i = {
          Name: ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexName(o.PropId),
          IconPath: ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexIcon(o.PropId),
          OldValue: o.StandardProperty,
          NewValue: 0,
          IsPercent: o.ShowPercent
        };
        this.ocm.set(o.PropId, i);
      }
    }
    for (const u of t) {
      if (o = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryProp(u)) {
        a = o.StandardProperty;
        if ((r = this.ocm.get(o.PropId)) !== undefined) {
          r.NewValue = a;
        } else {
          r = {
            Name: ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexName(o.PropId),
            IconPath: ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexIcon(o.PropId),
            OldValue: 0,
            NewValue: a,
            IsPercent: o.ShowPercent
          };
          this.ocm.set(u, r);
        }
      }
    }
    this.ocm.forEach((e, t) => {
      n.push(e);
    });
    return n;
  }
  Refresh(e, t, i) {
    e = this.CombineDataList(e, t);
    this.rcm.RefreshByData(e, () => {
      if (i) {
        i();
      }
    });
  }
  AddHotKey(e) {
    e.SetUIActive(true);
    e.SetUIParent(this.GetItem(2));
  }
  SetAutoLocation(e) {
    var t = LguiUtil_1.LguiUtil.GetAdaptiveTipsPosition(e, this.RootItem);
    var i = this.GetItem(4).Width;
    t.X = t.X + i;
    t.Z = t.Z + e.Height / 2;
    this.RootItem.SetUIWorldLocation(t.ToUeVectorOld());
  }
}
exports.HonamiStoryItemTipsAttrChange = HonamiStoryItemTipsAttrChange;
//# sourceMappingURL=HonamiStoryItemTipsAttrChange.js.map