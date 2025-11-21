"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionMainFetterSuitItem = exports.MainPhantomContent = exports.AttrContent = exports.VisionEquipmentRecommendItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const VisionRecommendModel_1 = require("../../PhantomBattle/VisionRecommendModel");
class VisionEquipmentRecommendItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Oo_ = new Array();
    this.Go_ = new Array();
    this.hrm = undefined;
    this.Fo_ = new Array();
    this.No_ = new Array();
    this._rm = new Array();
    this.Vo_ = undefined;
    this.jo_ = undefined;
    this.urm = undefined;
    this.O5t = 0;
    this.ko_ = 0;
    this.Ho_ = undefined;
    this.OnDeselectMainPhantomCallback = undefined;
    this.jl_ = () => {
      var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRecommendHelpGroupId();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(t);
    };
    this.Yko = () => {
      this.Oo_ = [];
      this.Go_ = [];
      this.ClearSelectMainPhantom();
    };
    this.crm = t => {
      var i;
      if (this.hrm && t.MonsterId === this.hrm.MonsterId && t.FetterGroupId === this.hrm.FetterGroupId) {
        this.ClearSelectMainPhantom();
      } else {
        (i = new VisionRecommendModel_1.VisionMainSelectPhantomData()).MonsterId = t.MonsterId;
        i.FetterGroupId = t.FetterGroupId;
        this.hrm = i;
        this.Zam(this.O5t, this.ko_);
        this.Wo_();
      }
    };
    this.Qo_ = s => {
      if (s.Type === 1) {
        let i = false;
        let e = -1;
        for (let t = 0; t < this.Oo_.length; t++) {
          if (this.Oo_[t].AttrId === s.AttrId && this.Oo_[t].AddType === s.AddType) {
            i = true;
            e = t;
            break;
          }
        }
        if (i) {
          this.Oo_.splice(e, 1);
        } else {
          (t = new VisionRecommendModel_1.VisionSelectRecommendData()).AttrId = s.AttrId;
          t.AddType = s.AddType;
          this.Oo_.push(t);
        }
      } else {
        let i = false;
        let e = -1;
        for (let t = 0; t < this.Go_.length; t++) {
          if (this.Go_[t].AttrId === s.AttrId && this.Go_[t].AddType === s.AddType) {
            i = true;
            e = t;
            break;
          }
        }
        var t;
        if (i) {
          this.Go_.splice(e, 1);
        } else {
          (t = new VisionRecommendModel_1.VisionSelectRecommendData()).AttrId = s.AttrId;
          t.AddType = s.AddType;
          this.Go_.push(t);
        }
      }
      this.Wo_();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem]];
    this.BtnBindInfo = [[4, this.Yko], [1, this.jl_]];
  }
  async OnCreateAsync() {
    this.Vo_ = new RecommendAttrItem();
    await this.Vo_.CreateByActorAsync(this.GetItem(2).GetOwner());
    this.Vo_.SetActive(true);
    this.jo_ = new RecommendAttrItem();
    await this.jo_.CreateByActorAsync(this.GetItem(3).GetOwner());
    this.jo_.SetActive(true);
    this.urm = new MainPhantomRecommendItem();
    await this.urm.CreateByActorAsync(this.GetItem(5).GetOwner());
    this.urm.SetActive(true);
  }
  BindOnChangeAttrCallBack(t) {
    this.Ho_ = t;
  }
  ChangeCost(t, i) {
    this.ko_ = i;
    this.urm?.SetUiActive(t === 0);
    if (t !== 0) {
      this.hrm = undefined;
    }
    this.Zam(t, i);
    this.Wo_();
    this.Pd_(t);
  }
  Zam(t, i) {
    let e = t;
    if (this.hrm) {
      t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(this.hrm.MonsterId)[0].Rarity;
      e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(t).Cost;
    }
    this.O5t = e;
    t = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleCostAttrRecommendInfo(i, e);
    if (t) {
      var s = t.GetMainAttrRecommendInfo();
      for (let i = this.Oo_.length - 1; i >= 0; i--) {
        let t = false;
        for (const n of s) {
          if (n.GetAttrId() === this.Oo_[i].AttrId && n.GetAddType() === this.Oo_[i].AddType) {
            t = true;
            break;
          }
        }
        if (!t) {
          this.Oo_.splice(i, 1);
        }
      }
      var h = t.GetSubAttrRecommendInfo();
      for (let i = this.Go_.length - 1; i >= 0; i--) {
        let t = false;
        for (const r of h) {
          if (r.GetAttrId() === this.Go_[i].AttrId && r.GetAddType() === this.Go_[i].AddType) {
            t = true;
            break;
          }
        }
        if (!t) {
          this.Go_.splice(i, 1);
        }
      }
    }
  }
  Pd_(t) {
    if (t === 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PrefabTextItem_PhantomRecommendTarget_Text", MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_FilterTextAll_Text"));
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PrefabTextItem_PhantomRecommendTarget_Text", "COST" + t);
    }
  }
  Wo_() {
    var t = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleMainPhantomRecommendInfo(this.ko_);
    ModelManager_1.ModelManager.VisionRecommendModel.CurrentMainPhantom = this.hrm;
    if (t) {
      t = t.GetMainPhantomInfo();
      this._rm = new Array();
      for (const n of t.slice(0, 3)) {
        var i = new MainPhantomItemData();
        i.MonsterId = n.GetMonsterId();
        i.FetterGroupId = n.GetFetterGroupId();
        i.CurrentSelectMainPhantom = this.hrm;
        i.UsageText = n.GetUsageText();
        i.OnMainPhantomCallBack = this.crm;
        this._rm.push(i);
      }
      this.urm?.Refresh(this._rm);
    }
    t = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleCostAttrRecommendInfo(this.ko_, this.O5t);
    ModelManager_1.ModelManager.VisionRecommendModel.CurrentSelectMainAttrArray = this.Oo_;
    ModelManager_1.ModelManager.VisionRecommendModel.CurrentSelectSubAttrArray = this.Go_;
    if (t) {
      var e = t.GetMainAttrRecommendInfo();
      this.Fo_ = new Array();
      for (const r of e) {
        var s = new RecommendItemData();
        s.AttrId = r.GetAttrId();
        s.AddType = r.GetAddType();
        s.CurrentSelectArray = this.Oo_;
        s.UsageText = r.GetUsageText();
        s.Type = 1;
        s.OnSelectCallBack = this.Qo_;
        this.Fo_.push(s);
      }
      this.Vo_?.Refresh(this.Fo_);
      e = t.GetSubAttrRecommendInfo();
      this.No_ = new Array();
      for (const o of e) {
        var h = new RecommendItemData();
        h.AttrId = o.GetAttrId();
        h.AddType = o.GetAddType();
        h.CurrentSelectArray = this.Go_;
        h.UsageText = o.GetUsageText();
        h.Type = 2;
        h.OnSelectCallBack = this.Qo_;
        this.No_.push(h);
      }
      this.jo_?.Refresh(this.No_);
    }
    if (this.Ho_ !== undefined) {
      this.Ho_();
    }
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.VisionRecommendModel.CurrentSelectMainAttrArray = [];
    ModelManager_1.ModelManager.VisionRecommendModel.CurrentSelectSubAttrArray = [];
    ModelManager_1.ModelManager.VisionRecommendModel.CurrentMainPhantom = undefined;
  }
  ClearSelectMainPhantom(t = true) {
    let i = false;
    if (this.hrm) {
      this.hrm = undefined;
      this.O5t = 0;
      i = true;
    }
    this.Zam(this.O5t, this.ko_);
    if (i && t) {
      this.OnDeselectMainPhantomCallback?.();
    } else {
      this.Wo_();
    }
  }
}
exports.VisionEquipmentRecommendItem = VisionEquipmentRecommendItem;
class RecommendItemData {
  constructor() {
    this.AttrId = 0;
    this.AddType = 0;
    this.CurrentSelectArray = new Array();
    this.UsageText = "";
    this.Type = 0;
    this.OnSelectCallBack = undefined;
  }
}
class MainPhantomItemData {
  constructor() {
    this.MonsterId = 0;
    this.FetterGroupId = 0;
    this.CurrentSelectMainPhantom = undefined;
    this.UsageText = "";
    this.OnMainPhantomCallBack = undefined;
  }
}
class RecommendAttrItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.sGe = () => {
      return new AttrContent();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.sGe);
  }
  Refresh(t) {
    this.eGe?.RefreshByData(t);
  }
}
class MainPhantomRecommendItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.sGe = () => {
      return new MainPhantomContent();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.sGe);
  }
  Refresh(t) {
    this.eGe?.RefreshByData(t);
  }
}
class AttrContent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.OnClickTogOption = () => {
      if (this.$8i !== undefined && this.$8i.OnSelectCallBack !== undefined) {
        this.$8i.OnSelectCallBack(this.$8i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.OnClickTogOption]];
  }
  Refresh(t, i, e) {
    this.$8i = t;
    var s = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(t.AttrId);
    this.SetTextureByPath(s.Icon, this.GetTexture(1));
    var h = this.$8i.AddType === 2;
    var h = h && s.AnotherName !== "" ? s.AnotherName : s.Name;
    this.GetText(2).ShowTextNew(h);
    var s = t.UsageText;
    this.GetText(3).SetText(s);
    let n = false;
    for (const r of t.CurrentSelectArray) {
      if (r.AttrId === t.AttrId && r.AddType === t.AddType) {
        n = true;
        break;
      }
    }
    h = n ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(h);
  }
}
exports.AttrContent = AttrContent;
class MainPhantomContent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.drm = undefined;
    this.OnClickTogOption = () => {
      if (this.$8i !== undefined && this.$8i.OnMainPhantomCallBack !== undefined) {
        this.$8i.OnMainPhantomCallBack(this.$8i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText]];
    this.BtnBindInfo = [[0, this.OnClickTogOption]];
  }
  async OnBeforeStartAsync() {
    this.drm = new VisionMainFetterSuitItem(this.GetItem(4));
    await this.drm.Init();
  }
  OnStart() {
    this.GetItem(5).SetUIActive(false);
    this.GetItem(4).SetUIActive(true);
  }
  OnUpdateItem(t) {
    if (t &&= ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(t.FetterGroupId)) {
      this.drm.Update(t);
    }
  }
  Refresh(t, i, e) {
    this.$8i = t;
    var s = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(t.MonsterId);
    var s = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(s.MonsterInfoId);
    if (s) {
      this.SetTextureByPath(s.Icon, this.GetTexture(1));
      s = s.Name;
      this.GetText(2).ShowTextNew(s);
    }
    var s = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(t.FetterGroupId);
    this.drm?.Refresh(s);
    var s = t.UsageText;
    this.GetText(3).SetText(s);
    let h = false;
    s = t.CurrentSelectMainPhantom;
    s = (h = !!s && s.MonsterId === t.MonsterId && s.FetterGroupId === t.FetterGroupId) ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(s);
  }
}
exports.MainPhantomContent = MainPhantomContent;
class VisionMainFetterSuitItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super();
    this.wqe = undefined;
    this.wqe = t;
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture]];
  }
  Update(t) {
    let i = "";
    let e = "";
    e = t ? (i = t.FetterElementColor, t.FetterElementPath) : (i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionFetterDefaultColor(), ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionFetterDefaultTexture());
    t = UE.Color.FromHex(i);
    this.GetSprite(0).SetColor(t);
    this.SetTextureByPath(e, this.GetTexture(1));
    t = this.GetTexture(1);
    t?.SetWidth(100);
    t?.SetHeight(100);
    t?.SetAnchorOffset(new UE.Vector2D(0, 0));
  }
  Refresh(t) {
    if (t) {
      this.Update(t);
    } else {
      this.Update(undefined);
    }
  }
}
exports.VisionMainFetterSuitItem = VisionMainFetterSuitItem;
//# sourceMappingURL=VisionEquipmentRecommendItem.js.map