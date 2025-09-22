"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleAttributeItem = exports.RoleLevelUpSuccessAttributeView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const StrengthUpgradeBarItem_1 = require("./StrengthUpgradeBarItem");
class RoleLevelUpSuccessAttributeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Ouo = undefined;
    this.XHi = undefined;
    this.x_d = undefined;
    this.U_d = undefined;
    this.nqe = () => {
      var t = this.Pe.ClickFunction;
      if (t) {
        t();
      }
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIDynScrollViewComponent], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[2, this.nqe], [7, this.nqe]];
  }
  OnBeforeCreate() {
    if (this.OpenParam === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 37, "RoleLevelUpSuccessAttributeView 打开失败,未传入界面数据");
      }
    } else {
      this.Pe = this.OpenParam;
      this.Dbt();
    }
  }
  async OnBeforeStartAsync() {
    this.GetItem(10).SetUIActive(false);
    this.GetItem(11).SetUIActive(false);
    var e = this.Pe.StrengthUpgradeData;
    if (e) {
      let t = this.GetItem(10);
      switch (e.AttributeId) {
        case 1:
          t = this.GetItem(10);
          break;
        case 10:
          t = this.GetItem(11);
      }
      this.XHi = new StrengthUpgradeBarItem_1.StrengthUpgradeBarItem();
      await this.XHi.CreateThenShowByActorAsync(t.GetOwner());
    }
  }
  OnStart() {
    var t = this.GetItem(5);
    this.Ouo = new LevelShowItem();
    this.Ouo.CreateThenShowByActor(t.GetOwner());
    var t = this.Pe.WiderScrollView ?? false;
    this.GetItem(9).SetUIActive(t);
    this.GetItem(3).SetUIActive(!t);
    var t = t ? this.GetItem(9) : this.GetItem(3);
    var e = this.GetUIDynScrollViewComponent(6);
    e.RootUIComp.SetWidth(t.GetWidth());
    this.GetItem(8).SetWidth(t.GetWidth());
    this.U_d = new AttributeSlotDynItem();
    this.x_d = new DynScrollView_1.DynamicScrollView(e, t, this.U_d, () => {
      return new AttributeDynScrollItem();
    });
    this.x_d.Init();
  }
  OnBeforeShow() {
    this.Refresh();
  }
  OnBeforeDestroy() {
    this.Ouo.Destroy();
    this.Ouo = undefined;
    this.x_d.ClearChildren();
    this.x_d = undefined;
  }
  Dbt() {
    var t = this.Pe.AudioId;
    if (t) {
      t = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(t).Path;
      this.SetAudioEvent(t);
    }
  }
  Refresh() {
    this.RDt();
    this.uuo();
    this.Fuo();
    this.Vuo();
    this.Huo();
    this.juo();
  }
  uuo() {
    var t = this.Pe.ClickText ?? "Text_BackToView_Text";
    this.GetText(1).ShowTextNew(t);
  }
  RDt() {
    var t = this.Pe.Title ?? "Text_LevelUpSuccessful_Text";
    this.GetText(0).ShowTextNew(t);
  }
  Fuo() {
    var t = this.Pe.LevelInfo;
    if (t !== undefined) {
      this.Ouo.Refresh(t.PreUpgradeLv, t.UpgradeLv, t?.FormatStringId, t?.IsMaxLevel);
    }
    this.GetItem(5).SetUIActive(t !== undefined);
  }
  Vuo() {
    var t = this.Pe.StrengthUpgradeData;
    if (t !== undefined) {
      this.XHi.Update(t);
    }
  }
  Huo() {
    if (this.Pe.AttributeInfo === undefined || this.Pe.AttributeInfo.length === 0) {
      this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(false);
    } else {
      this.x_d.RefreshByData(this.Pe.AttributeInfo);
    }
  }
  juo() {
    this.GetItem(4).SetUIActive(this.Pe.IsShowArrow ?? false);
  }
}
exports.RoleLevelUpSuccessAttributeView = RoleLevelUpSuccessAttributeView;
class LevelShowItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem]];
  }
  Refresh(t, e, i, s) {
    i = i ?? "Text_AddExp_Text";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i, t.toString());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i, e.toString());
    this.GetItem(2).SetUIActive(s ?? false);
  }
}
class AttributeDynScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Wuo = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnStart() {
    this.Wuo = new RoleAttributeItem();
    this.Wuo.CreateThenShowByActor(this.GetItem(0).GetOwner());
  }
  OnBeforeDestroy() {}
  Update(t, e) {
    var i;
    if (t.IsLine ?? false) {
      this.GetItem(1).SetUIActive(false);
      this.GetItem(2).SetUIActive(false);
      this.GetItem(0).SetUIActive(false);
      (i = this.GetItem(3)).SetUIActive(true);
      this.GetRootItem().SetHeight(i.GetHeight());
    } else {
      this.Wuo.Refresh(t);
      this.WNe(t.IsNormalBg);
    }
  }
  WNe(t) {
    t = t ?? true;
    this.GetItem(1).SetUIActive(!t);
    this.GetItem(2).SetUIActive(t);
  }
  GetUsingItem(t) {
    return this.GetRootItem().GetOwner();
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
  }
  ClearItem() {
    this.Destroy();
  }
}
class AttributeSlotDynItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eqe = undefined;
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
  }
  GetItemSize(t) {
    if (this.eqe === undefined) {
      this.eqe = Vector2D_1.Vector2D.Create();
    }
    var e = this.GetRootItem();
    this.eqe.Set(e.GetWidth(), e.GetHeight());
    return this.eqe.ToUeVector2D(true);
  }
  ClearItem() {}
}
class RoleAttributeItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UITexture], [5, UE.UIItem]];
  }
  Refresh(t) {
    this.P5e(t.Name);
    this.Kbe(t.IconPath);
    this.GetItem(2).SetUIActive(t.ShowArrow ?? true);
    var e = [this.GetText(3), this.GetText(1)];
    const i = [t.PreText, t.CurText];
    e.forEach((t, e) => {
      this.Kuo(t, i[e]);
    });
    if (t.InnerShowBg !== undefined) {
      this.Quo(t.InnerShowBg);
    }
  }
  Kbe(t) {
    if (t !== undefined) {
      this.SetTextureByPath(t, this.GetTexture(4));
    }
    this.GetTexture(4).SetUIActive(t !== undefined);
  }
  P5e(t) {
    if (t !== undefined) {
      this.GetText(0).ShowTextNew(t);
    }
    this.GetText(0).SetUIActive(t !== undefined);
  }
  Kuo(t, e) {
    if (e !== undefined) {
      t.SetText(e);
    }
    t.SetUIActive(e !== undefined);
  }
  Quo(t) {
    var e = this.GetItem(5);
    if (e) {
      e.SetUIActive(t);
    }
  }
}
exports.RoleAttributeItem = RoleAttributeItem;
//# sourceMappingURL=RoleLevelUpSuccessAttributeView.js.map