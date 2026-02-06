"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopBuffItemBuLing = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const TopBuffItem_1 = require("./TopBuffItem");
const HIDE_ANIM_TIME = 500;
const iconList = ["T_BulingBuffBlueNor", "T_BulingBuffBlueA", "T_BulingBuffOrangeNor", "T_BulingBuffOrangeA"];
class TopBuffItemBuLing extends TopBuffItem_1.TopBuffItem {
  constructor() {
    super(...arguments);
    this.ATm = 0;
    this.DTm = 0;
    this._ii = 0;
    this.ETm = -1;
    this.Cdt = 0;
    this.UTm = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
  }
  OnStart() {
    this.InitTweenAnim(1);
    this.InitTweenAnim(2);
    this.InitTweenAnim(3);
    this.InitTweenAnim(4);
    this.InitTweenAnim(5);
    this.InitTweenAnim(6);
    this.GetItem(8).SetUIActive(false);
    this.GetItem(7).SetUIActive(false);
  }
  Refresh(s, t, i, e = false) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "卜灵能量条图标变化", ["oldId", this.DTm], ["newId", s], ["old", this._ii], ["new", t], ["usedType", i]);
    }
    if (this.DTm !== s) {
      if (s === 0) {
        if (this._ii === 1) {
          if (i === 1) {
            this.PlayTweenAnimOnly(4);
          } else if (i === 2) {
            this.PlayTweenAnimOnly(3);
          }
        } else {
          this.PlayTweenAnimOnly(5);
        }
      } else {
        if (this.DTm === 0) {
          this.PlayTweenAnimOnly(1);
        }
        this.GetItem(8).SetUIActive(s === 1);
        this.GetItem(7).SetUIActive(s === 2);
      }
      this.DTm = s;
    }
    if (this._ii !== t) {
      if (this._ii !== 1 && t === 1) {
        this.StopTweenAnim(6);
        this.PlayTweenAnim(2);
      } else if (this._ii === 1 && t !== 1) {
        this.StopTweenAnim(2);
        this.PlayTweenAnim(6);
      }
      this._ii = t;
    }
    if (s === 0) {
      if (this.UTm === 0) {
        if (e) {
          this.UTm = Time_1.Time.Now + HIDE_ANIM_TIME;
        } else {
          this.SetVisible(1, false);
        }
      }
    } else {
      this.UTm = 0;
      this.SetVisible(1, true);
      if (this.ATm !== (i = (s - 1) * 2 + (t === 1 ? 1 : 0)) && (this.ATm = i, e = iconList[i])) {
        s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
        this.SetIcon(s);
      }
    }
  }
  SetIcon(s) {
    this.GetTexture(0).SetUIActive(false);
    if (s) {
      this.Cdt = ResourceSystem_1.ResourceSystem.LoadAsync(s, UE.Texture, s => {
        var t;
        this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId;
        if (s && (t = this.GetTexture(0))) {
          t.SetUIActive(true);
          t.SetTexture(s);
        }
      }, 103);
    }
  }
  OnBeforeDestroyImplement() {
    super.OnBeforeDestroyImplement();
    if (this.Cdt !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Cdt);
      this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
  PlayTweenAnimOnly(s) {
    if (this.ETm >= 0) {
      this.StopTweenAnim(this.ETm);
    }
    this.ETm = s;
    this.PlayTweenAnim(s);
  }
  TickHiding(s) {
    if (!(this.UTm <= 0) && !(this.UTm > Time_1.Time.Now)) {
      this.SetVisible(1, false);
      this.UTm = 0;
    }
  }
}
exports.TopBuffItemBuLing = TopBuffItemBuLing;
//# sourceMappingURL=TopBuffItemBuLing.js.map