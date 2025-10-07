"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueWeaponSettleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ScrollingNumberTool_1 = require("../../../ScrollingNumberTool");
const SurvivorsRogueUiDefine_1 = require("../../../SurvivorsRogueUiDefine");
const SurvivorsRogueWeaponEvolveItem_1 = require("./SurvivorsRogueWeaponEvolveItem");
class SurvivorsRogueWeaponSettleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.IDd = undefined;
    this.Data = undefined;
    this.k4d = new ScrollingNumberTool_1.ScrollingNumberTool();
    this.TDd = () => {
      return new SurvivorsRogueWeaponEvolveItem_1.SurvivorsRogueWeaponEvolveItem();
    };
    this.Wpu = (e, t) => {
      if (e === "Start" && t === "Got" && !!this.Data && !this.Data.IsLock && !this.Data.IsDisable) {
        this.EFd();
        this.k4d.StartScrolling();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIText], [8, UE.UIText], [10, UE.UIHorizontalLayout], [11, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await this.k4d.InitCurve();
  }
  OnStart() {
    this.IDd = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(10), this.TDd, undefined);
    this.RootActor.OnSequencePlayEvent.Bind(this.Wpu);
  }
  OnBeforeDestroy() {
    this.k4d.Clear();
    this.RootActor.OnSequencePlayEvent.Unbind();
  }
  Refresh(e, t, i) {
    if ((this.Data = e).IsDisable) {
      this.Zwd();
    } else if (e.IsLock) {
      this.eLd();
    } else {
      this.tLd();
    }
  }
  Zwd() {
    this.GetItem(0).SetUIActive(true);
    this.GetItem(1).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
  }
  eLd() {
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(true);
    this.GetItem(3).SetUIActive(false);
  }
  tLd() {
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
    this.GetItem(3).SetUIActive(true);
    var e;
    var t = this.Data.WeaponData;
    if (t && (e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(t.ConfigId))) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), SurvivorsRogueUiDefine_1.SURVIVORS_LV_KEY, t.Data.F6n);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.Name);
      this.k4d.Init(0, t.Data.qLd, e => {
        this.GetText(8).SetText(Math.round(e).toString());
      });
      this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(4));
    }
  }
  EFd() {
    var t = this.Data.WeaponData;
    if (t) {
      var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(t.ConfigId);
      if (e) {
        var i;
        var r;
        var o = [];
        var s = new Map();
        for ([i, r] of e.EvolveIds.entries()) {
          s.set(r, i);
        }
        var a;
        var e = Array.from(s.values());
        for (let e = 0; e < t.Data.dEd.length; e++) {
          var h = {
            EvolveId: t.Data.dEd[e],
            IsUnlock: true,
            ShowLine: e > 0
          };
          o.push(h);
        }
        for (const n of e) {
          if (!t.Data.dEd.includes(n)) {
            a = {
              EvolveId: n,
              IsUnlock: false,
              ShowLine: o.length !== 0
            };
            o.push(a);
          }
        }
        this.IDd.RefreshByData(o, undefined, true);
      }
    }
  }
}
exports.SurvivorsRogueWeaponSettleItem = SurvivorsRogueWeaponSettleItem;
//# sourceMappingURL=SurvivorsRogueWeaponSettleItem.js.map