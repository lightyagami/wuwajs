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
    this.CBd = undefined;
    this.Data = undefined;
    this.rHd = new ScrollingNumberTool_1.ScrollingNumberTool();
    this.hqm = false;
    this.pBd = () => {
      return new SurvivorsRogueWeaponEvolveItem_1.SurvivorsRogueWeaponEvolveItem();
    };
    this.Wpu = (i, t) => {
      if (i === "Start" && t === "Got") {
        this.PlayAnim();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIText], [8, UE.UIText], [10, UE.UIHorizontalLayout], [11, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await this.rHd.InitCurve();
  }
  OnStart() {
    this.CBd = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(10), this.pBd, undefined);
    this.RootActor.OnSequencePlayEvent.Bind(this.Wpu);
  }
  OnBeforeDestroy() {
    this.rHd.Clear();
    this.RootActor.OnSequencePlayEvent.Unbind();
  }
  Refresh(i, t, e) {
    if ((this.Data = i).IsDisable) {
      this.RAd();
    } else if (i.IsLock) {
      this.wAd();
    } else {
      this.LAd();
    }
  }
  PlayAnim() {
    if (!this.hqm && !(this.hqm = true, !this.Data) && !this.Data.IsLock && !this.Data.IsDisable) {
      this.l6d();
      this.rHd.StartScrolling();
    }
  }
  RAd() {
    this.GetItem(0).SetUIActive(true);
    this.GetItem(1).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
  }
  wAd() {
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(true);
    this.GetItem(3).SetUIActive(false);
  }
  LAd() {
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
    this.GetItem(3).SetUIActive(true);
    var i;
    var t = this.Data.WeaponData;
    if (t && (i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(t.ConfigId))) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), SurvivorsRogueUiDefine_1.SURVIVORS_LV_KEY, t.Data.F6n);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.Name);
      this.rHd.Init(0, t.Data.vDd, i => {
        this.GetText(8).SetText(Math.round(i).toString());
      });
      this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(4));
    }
  }
  l6d() {
    var t = this.Data.WeaponData;
    if (t) {
      var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(t.ConfigId);
      if (i) {
        var e;
        var r;
        var s = [];
        var o = new Map();
        for ([e, r] of i.EvolveIds.entries()) {
          o.set(r, e);
        }
        var h;
        var i = Array.from(o.values());
        for (let i = 0; i < t.Data.FTd.length; i++) {
          var a = {
            EvolveId: t.Data.FTd[i],
            IsUnlock: true,
            ShowLine: i > 0
          };
          s.push(a);
        }
        for (const n of i) {
          if (!t.Data.FTd.includes(n)) {
            h = {
              EvolveId: n,
              IsUnlock: false,
              ShowLine: s.length !== 0
            };
            s.push(h);
          }
        }
        this.CBd.RefreshByData(s, undefined, true);
      }
    }
  }
}
exports.SurvivorsRogueWeaponSettleItem = SurvivorsRogueWeaponSettleItem;
//# sourceMappingURL=SurvivorsRogueWeaponSettleItem.js.map