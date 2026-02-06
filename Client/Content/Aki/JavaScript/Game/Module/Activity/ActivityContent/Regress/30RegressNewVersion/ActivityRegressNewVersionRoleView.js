"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressNewVersionRoleView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const RoleDescribeComponent_1 = require("../../../../Gacha/GachaMainView/RoleDescribeComponent");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const NewPlayerSupportRoleCommonItem_1 = require("../../NewPlayerSupport/View/NewPlayerSupportRoleCommonItem");
const NewPlayerSupportRoleSpineItem_1 = require("../../NewPlayerSupport/View/NewPlayerSupportRoleSpineItem");
const ActivityRegressController_1 = require("../ActivityRegressController");
const ActivityRegressMainSubViewBase_1 = require("../Base/ActivityRegressMainSubViewBase");
const POOL_ITEM_PADDING = 15;
class ActivityRegressNewVersionRoleView extends ActivityRegressMainSubViewBase_1.ActivityRegressMainSubViewBase {
  constructor() {
    super(...arguments);
    this.c$f = undefined;
    this.j2e = undefined;
    this.d$f = undefined;
    this.m$f = [];
    this.ebl = undefined;
    this.hOf = new Map();
    this.lOf = undefined;
    this.aOf = undefined;
    this.wqo = () => {
      var i = new PoolScrollItem();
      i.OnClickToggleCallBack = this.f$f;
      return i;
    };
    this.f$f = (i, e) => {
      if (i && this.d$f !== i) {
        this.d$f = i;
        this.ebl?.SetToggleState(0);
        this.ebl = e;
        this.Og();
      }
    };
    this.g$f = () => {
      ActivityRegressController_1.ActivityRegressController.OpenGameIntroductionByRoleId(this.d$f.PreviewIdList[0]);
    };
    this.Wpa = () => {
      var i;
      var e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaPoolConfig(this.d$f.Id);
      var e = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e.GachaId);
      if (e) {
        i = UiManager_1.UiManager.IsViewOpen("ActivityRegressNewVersionMainView");
        UiManager_1.UiManager.OpenView("GachaMainView", e.Id);
        UiManager_1.UiManager.CloseView(i ? "ActivityRegressNewVersionMainView" : "ActivityRegressMainView");
        UiManager_1.UiManager.CloseView("CommonActivityView");
      } else {
        this.$Oe();
      }
    };
    this.wwe = () => {
      var i;
      if (!!this.d$f && !((i = this.m$f.indexOf(this.d$f)) <= 0)) {
        this.c$f?.GetScrollItemByIndex(--i)?.SelectedToggle();
      }
    };
    this.Pwe = () => {
      var i;
      if (!!this.d$f && !((i = this.m$f.indexOf(this.d$f)) >= this.m$f.length - 1)) {
        this.c$f?.GetScrollItemByIndex(++i)?.SelectedToggle();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UITexture], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIText]];
    this.BtnBindInfo = [[5, this.g$f], [6, this.Wpa], [3, this.wwe], [4, this.Pwe]];
  }
  async OnBeforeStartAsync() {
    this.j2e = new RoleDescribeComponent_1.RoleDescribeComponent();
    var i = this.GetItem(1);
    await this.j2e.CreateThenShowByActorAsync(i.GetOwner());
    await ControllerHolder_1.ControllerHolder.GachaController.GachaInfoRequestAsync();
  }
  OnStart() {
    super.OnStart();
    this.c$f = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.wqo);
    this.m$f = ModelManager_1.ModelManager.ActivityRegressModel.GetGachaPoolUpPool();
    this.c$f.RefreshByData(this.m$f, () => {
      this.c$f?.GetScrollItemByIndex(0)?.SelectedToggle();
    });
    var i = this.c$f.ContentItem;
    var e = i.Width;
    var t = i.GetChildComponent(0).GetOwner().GetComponentByClass(UE.UIItem.StaticClass()).GetWidth() + POOL_ITEM_PADDING;
    if (e <= t * this.m$f.length) {
      i.SetAnchorAlign(1, 2);
      i.SetWidth(t * this.m$f.length);
    }
  }
  Og() {
    var i;
    var e;
    if (this.d$f && (this.j2e?.Update(this.d$f.PreviewIdList[0]), i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(this.d$f.Id)) && (this.SetTextureByPath(i.UnderBgTexturePath, this.GetTexture(7)), e = this.d$f.UiType) && (e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(e))) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e.TypeText);
      this.GetText(9).SetText(this.d$f.Title);
      e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaPoolConfig(this.d$f.Id);
      if (e = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e.GachaId)) {
        if ((e = e.GetPoolEndTimeByPoolInfo(this.d$f)) !== 0) {
          e = e - TimeUtil_1.TimeUtil.GetServerTime();
          e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(e);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Text_GachaRemainingTime_Text", e.CountDownText);
          this.C$f();
          this.cOf(i.SpinePrefabResource, i.TrialRoleId > 0 ? i.TrialRoleId : i.Id);
        }
      } else {
        this.$Oe();
      }
    }
  }
  async cOf(i, e) {
    if (StringUtils_1.StringUtils.IsBlank(i)) {
      await this.MOf();
    } else {
      await this.EOf(i, e);
    }
    for (var [t, s] of this.hOf) {
      s.SetUiActive(t === e);
    }
    this.lOf?.UpdateByRoleId(e);
  }
  async EOf(i, e) {
    let t = this.hOf.get(e);
    var s;
    if (!t) {
      t = new NewPlayerSupportRoleSpineItem_1.NewPlayerSupportRoleSpineItem();
      s = this.GetItem(8);
      await t.CreateThenShowByResourceIdAsync(i, s);
      this.hOf.set(e, t);
    }
    this.lOf = t;
  }
  async MOf() {
    var i;
    var e;
    if (!this.aOf) {
      i = new NewPlayerSupportRoleCommonItem_1.NewPlayerSupportRoleCommonItem();
      e = this.GetItem(8);
      await i.CreateThenShowByResourceIdAsync("UiItem_BaseGachaPool", e);
      this.aOf = i;
    }
    this.lOf = this.aOf;
  }
  C$f() {
    var i;
    if (this.d$f) {
      if ((i = this.m$f.indexOf(this.d$f)) <= 0) {
        this.GetButton(3).RootUIComp.SetUIActive(false);
      } else {
        this.GetButton(3).RootUIComp.SetUIActive(true);
      }
      if (i >= this.m$f.length - 1) {
        this.GetButton(4).RootUIComp.SetUIActive(false);
      } else {
        this.GetButton(4).RootUIComp.SetUIActive(true);
      }
    }
  }
  $Oe() {
    if (UiManager_1.UiManager.IsViewOpen("ActivityRegressMainView")) {
      UiManager_1.UiManager.CloseView("ActivityRegressMainView");
    }
    if (UiManager_1.UiManager.IsViewOpen("ActivityRegressNewVersionMainView")) {
      UiManager_1.UiManager.CloseView("ActivityRegressNewVersionMainView");
    }
  }
}
exports.ActivityRegressNewVersionRoleView = ActivityRegressNewVersionRoleView;
class PoolScrollItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.p$f = undefined;
    this.OnClickToggleCallBack = undefined;
    this.kqe = () => {
      this.OnClickToggleCallBack?.(this.p$f, this.GetExtendToggle(0));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(i, e, t) {
    var s = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(i.Id);
    if (s) {
      this.p$f = i;
      this.SetSpriteByPath(s.TagNotSelectedSpritePath, this.GetSprite(1), true);
      this.GetText(2).SetText(i.Title);
    }
  }
  SelectedToggle() {
    this.GetExtendToggle(0).SetToggleStateForce(1, true);
  }
}
//# sourceMappingURL=ActivityRegressNewVersionRoleView.js.map