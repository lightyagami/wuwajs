"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttrContent = exports.VisionEquipmentRecommendItem = undefined;
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
    this.Fo_ = new Array();
    this.No_ = new Array();
    this.Vo_ = undefined;
    this.jo_ = undefined;
    this.O5t = 0;
    this.ko_ = 0;
    this.Ho_ = undefined;
    this.jl_ = () => {
      var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRecommendHelpGroupId();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(t);
    };
    this.Yko = () => {
      this.Oo_ = [];
      this.Go_ = [];
      this.Wo_();
    };
    this.Qo_ = s => {
      if (s.Type === 1) {
        let e = false;
        let i = -1;
        for (let t = 0; t < this.Oo_.length; t++) {
          if (this.Oo_[t].AttrId === s.AttrId && this.Oo_[t].AddType === s.AddType) {
            e = true;
            i = t;
            break;
          }
        }
        if (e) {
          this.Oo_.splice(i, 1);
        } else {
          (t = new VisionRecommendModel_1.VisionSelectRecommendData()).AttrId = s.AttrId;
          t.AddType = s.AddType;
          this.Oo_.push(t);
        }
      } else {
        let e = false;
        let i = -1;
        for (let t = 0; t < this.Go_.length; t++) {
          if (this.Go_[t].AttrId === s.AttrId && this.Go_[t].AddType === s.AddType) {
            e = true;
            i = t;
            break;
          }
        }
        var t;
        if (e) {
          this.Go_.splice(i, 1);
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
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.Yko], [1, this.jl_]];
  }
  async OnCreateAsync() {
    this.Vo_ = new RecommendAttrItem();
    await this.Vo_.CreateByActorAsync(this.GetItem(2).GetOwner());
    this.Vo_.SetActive(true);
    this.jo_ = new RecommendAttrItem();
    await this.jo_.CreateByActorAsync(this.GetItem(3).GetOwner());
    this.jo_.SetActive(true);
  }
  BindOnChangeAttrCallBack(t) {
    this.Ho_ = t;
  }
  ChangeCost(t, e) {
    this.O5t = t;
    this.ko_ = e;
    e = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleCostAttrRecommendInfo(e, t);
    if (e) {
      var i = e.GetMainAttrRecommendInfo();
      for (let e = this.Oo_.length - 1; e >= 0; e--) {
        let t = false;
        for (const r of i) {
          if (r.GetAttrId() === this.Oo_[e].AttrId && r.GetAddType() === this.Oo_[e].AddType) {
            t = true;
            break;
          }
        }
        if (!t) {
          this.Oo_.splice(e, 1);
        }
      }
      var s = e.GetSubAttrRecommendInfo();
      for (let e = this.Go_.length - 1; e >= 0; e--) {
        let t = false;
        for (const n of s) {
          if (n.GetAttrId() === this.Go_[e].AttrId && n.GetAddType() === this.Go_[e].AddType) {
            t = true;
            break;
          }
        }
        if (!t) {
          this.Go_.splice(e, 1);
        }
      }
    }
    this.Wo_();
    this.Pd_(t);
  }
  Pd_(t) {
    if (t === 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PrefabTextItem_PhantomRecommendTarget_Text", MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_FilterTextAll_Text"));
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PrefabTextItem_PhantomRecommendTarget_Text", "COST" + t);
    }
  }
  Wo_() {
    var t = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleCostAttrRecommendInfo(this.ko_, this.O5t);
    ModelManager_1.ModelManager.VisionRecommendModel.CurrentSelectMainAttrArray = this.Oo_;
    ModelManager_1.ModelManager.VisionRecommendModel.CurrentSelectSubAttrArray = this.Go_;
    if (t) {
      var e = t.GetMainAttrRecommendInfo();
      this.Fo_ = new Array();
      for (const r of e) {
        var i = new RecommendItemData();
        i.AttrId = r.GetAttrId();
        i.AddType = r.GetAddType();
        i.CurrentSelectArray = this.Oo_;
        i.UsageText = r.GetUsageText();
        i.Type = 1;
        i.OnSelectCallBack = this.Qo_;
        this.Fo_.push(i);
      }
      this.Vo_?.Refresh(this.Fo_);
      e = t.GetSubAttrRecommendInfo();
      this.No_ = new Array();
      for (const n of e) {
        var s = new RecommendItemData();
        s.AttrId = n.GetAttrId();
        s.AddType = n.GetAddType();
        s.CurrentSelectArray = this.Go_;
        s.UsageText = n.GetUsageText();
        s.Type = 2;
        s.OnSelectCallBack = this.Qo_;
        this.No_.push(s);
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
  Refresh(t, e, i) {
    this.$8i = t;
    var s = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(t.AttrId);
    this.SetTextureByPath(s.Icon, this.GetTexture(1));
    var r = this.$8i.AddType === 2;
    var r = r && s.AnotherName !== "" ? s.AnotherName : s.Name;
    this.GetText(2).ShowTextNew(r);
    var s = t.UsageText;
    this.GetText(3).SetText(s);
    let n = false;
    for (const o of t.CurrentSelectArray) {
      if (o.AttrId === t.AttrId && o.AddType === t.AddType) {
        n = true;
        break;
      }
    }
    r = n ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(r);
  }
}
exports.AttrContent = AttrContent;
//# sourceMappingURL=VisionEquipmentRecommendItem.js.map