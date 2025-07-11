"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaPoolDropItem = exports.GachaPoolDetailGrid = exports.GachaPoolDetailView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GachaController_1 = require("../GachaController");
class GachaPoolDetailData {
  constructor() {
    this.TitleTextKey = "";
    this.TitleDescKey = "";
    this.ItemList = [];
  }
}
class GachaPoolDetailView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var i;
    var t = this.OpenParam;
    var a = await GachaController_1.GachaController.GachaPoolDetailRequestAsync(t.Id);
    this.GetText(0).SetText(a.Mb_.Mb_);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "GachaPoolDetailTitle", t.Title);
    var t = (i, t) => i.Sb_ ? -1 : t.Sb_ ? 1 : 0;
    var e = [];
    if (a.Mb_?.Eb_ !== undefined && a.Mb_?.Eb_.length > 0) {
      (o = new GachaPoolDetailData()).TitleTextKey = a.Mb_.q4_;
      o.TitleDescKey = a.Mb_.O4_;
      o.ItemList = a.Mb_.Eb_.sort(t);
      (i = new GachaPoolDetailGrid()).Data = o;
      o = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1));
      e.push(i.CreateByActorAsync(o.GetOwner()));
      this.AddChild(i);
    }
    if (a.Mb_?.Ib_ != null && a.Mb_?.Ib_.length > 0) {
      (o = new GachaPoolDetailData()).TitleTextKey = a.Mb_.q4_;
      o.TitleDescKey = a.Mb_.O4_;
      o.ItemList = a.Mb_.Ib_.sort(t);
      (i = new GachaPoolDetailGrid()).Data = o;
      o = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1));
      e.push(i.CreateByActorAsync(o.GetOwner()));
      this.AddChild(i);
    }
    var o = [];
    if (a.Mb_?.Tb_ != null && a.Mb_?.Tb_.length > 0) {
      o.push(...a.Mb_.Tb_);
    }
    if (a.Mb_?.bb_ != null && a.Mb_?.bb_.length > 0) {
      o.push(...a.Mb_.bb_);
    }
    if (o.length > 0) {
      (i = new GachaPoolDetailData()).TitleTextKey = a.Mb_.G4_;
      i.TitleDescKey = a.Mb_.F4_;
      i.ItemList = o.sort(t);
      (o = new GachaPoolDetailGrid()).Data = i;
      i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1));
      e.push(o.CreateByActorAsync(i.GetOwner()));
      this.AddChild(o);
    }
    if (a.Mb_?.Lb_ != null && a.Mb_?.Lb_.length > 0) {
      (i = new GachaPoolDetailData()).TitleTextKey = a.Mb_.N4_;
      i.TitleDescKey = a.Mb_.V4_;
      i.ItemList = a.Mb_.Lb_.sort(t);
      (o = new GachaPoolDetailGrid()).Data = i;
      a = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1));
      e.push(o.CreateByActorAsync(a.GetOwner()));
      this.AddChild(o);
    }
    await Promise.all(e);
    this.GetItem(2).SetUIActive(false);
  }
}
exports.GachaPoolDetailView = GachaPoolDetailView;
class GachaPoolDetailGrid extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.GetText(0).SetText(this.Data.TitleDescKey);
    this.GetText(3).SetText(this.Data.TitleTextKey);
    var i = [];
    for (const e of this.Data.ItemList) {
      var t = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1));
      var a = new GachaPoolDropItem();
      a.Data = e;
      i.push(a.CreateByActorAsync(t.GetOwner()));
      this.AddChild(a);
    }
    this.GetItem(2).SetUIActive(false);
    await Promise.all(i);
  }
}
exports.GachaPoolDetailGrid = GachaPoolDetailGrid;
class GachaPoolDropItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    var i;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(this.Data.L8n);
    var a = this.Data.Sb_ ? "GachaDropItemUp" : "GachaPoolDropItemNormal";
    if (t === 1) {
      i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(this.Data.L8n);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), a, MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name));
    } else if (t === 2) {
      i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(this.Data.L8n);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), a, MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.WeaponName));
    }
  }
}
exports.GachaPoolDropItem = GachaPoolDropItem;
//# sourceMappingURL=GachaPoolDetailView.js.map