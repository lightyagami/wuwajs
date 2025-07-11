"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FocusItemText = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const GuideController_1 = require("../GuideController");
const GuideCountDownItem_1 = require("./GuideCountDownItem");
const GuideDescribeNew_1 = require("./GuideDescribeNew");
class FocusItemText extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Xzt = 0;
    this.$zt = true;
    this.iqt = undefined;
    this.Yzt = undefined;
    this.OQt = undefined;
    this.Jzt = () => {
      this.Xzt = 1;
    };
    this.OQt = e;
    this.Yzt = e.Owner;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIHorizontalLayout], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UITexture]];
  }
  OnStart() {
    var e = this.Yzt.TotalDuration;
    var t = this.GetItem(8);
    if (e > 0) {
      this.iqt = new GuideCountDownItem_1.GuideCountDownItem(e);
      this.iqt.Init(t);
      t.SetUIActive(true);
    } else {
      t.SetUIActive(false);
    }
    this.RootItem.SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector);
  }
  ShowText() {
    var e = this.GetText(7);
    this.GetHorizontalLayout(3).OnRebuildLayoutDelegate.Bind(this.Jzt);
    var e = new GuideDescribeNew_1.GuideDescribeNew(e);
    var t = this.Yzt.GetFocusViewConf();
    this.$zt = t.TextInScreen;
    e.SetUpText(t.Content, ...t.Button);
    var i = this.GetItem(1);
    var s = this.GetItem(2);
    var r = this.GetItem(4);
    var a = this.GetItem(5);
    i.SetUIActive(false);
    s.SetUIActive(false);
    r.SetUIActive(false);
    a.SetUIActive(false);
    if (t.ShowArrow) {
      switch (t.ContentDirection) {
        case "D":
          i.SetUIActive(true);
          break;
        case "U":
          s.SetUIActive(true);
          break;
        case "L":
          a.SetUIActive(true);
          break;
        case "R":
          r.SetUIActive(true);
      }
    }
    var e = t.RoleHeadId;
    var t = t.HeadImgPath;
    if (t.length > 0) {
      this.SetTextureByPath(t, this.GetTexture(11));
      this.GetItem(10).SetUIActive(true);
    } else if (e) {
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      this.SetTextureByPath(t.RoleHeadIconBig, this.GetTexture(11));
      this.GetItem(10).SetUIActive(true);
    } else {
      this.GetItem(10).SetUIActive(false);
    }
  }
  OnTick(e) {
    this.zzt();
    this.Zzt();
  }
  zzt() {
    if (GuideController_1.GuideController.GmEnableFocusTextPosTick) {
      var t = this.OQt.RectItem;
      var i = this.GetHorizontalLayout(3);
      var s = this.Yzt.GetFocusViewConf();
      var r = i.RootUIComp.D_K2_GetComponentScale().X;
      let e = 0;
      var a = this.RootItem;
      var h = s.TextOffset[0];
      var o = s.TextOffset[1];
      switch (s.ContentDirection) {
        case "U":
          e = t.Height + a.Height;
          e *= 0.5;
          a.SetAnchorOffsetY(e);
          break;
        case "D":
          e = t.Height + a.Height;
          e *= 0.5;
          a.SetAnchorOffsetY(-e);
          break;
        case "L":
          e = t.Width + i.RootUIComp.Width * r;
          e *= 0.5;
          a.SetAnchorOffsetX(-e);
          break;
        case "R":
          e = t.Width + i.RootUIComp.Width * r;
          e *= 0.5;
          a.SetAnchorOffsetX(e);
          break;
        case "CT":
          var n = ConfigManager_1.ConfigManager.GuideConfig.GetGuideFocusCenterTextPos();
          a.D_K2_SetWorldLocation(n, false, undefined, false);
          break;
        case "FL":
          a.SetAnchorOffsetX(h);
          a.SetAnchorOffsetY(o);
      }
      s = this.GetText(7);
      if (s.GetWidth() > FocusItemText.eZt) {
        s.SetWidth(FocusItemText.eZt);
        s.SetOverflowType(1);
      }
    }
  }
  Zzt() {
    if (!!this.$zt && !(this.Xzt <= 0) && !(--this.Xzt > 0)) {
      var r = this.GetHorizontalLayout(3).RootUIComp;
      var a = r.D_K2_GetComponentLocation();
      var h = this.RootItem.D_K2_GetComponentLocation();
      var o = r.D_K2_GetComponentScale();
      var n = o.X;
      var o = o.Y;
      var u = UiLayer_1.UiLayer.UiRootItem;
      var c = u.Width;
      var U = u.Height;
      var u = u.D_K2_GetComponentLocation();
      var c = c / 2;
      var U = U / 2;
      var _ = r.Width;
      var l = r.Height;
      let e = u.X - c + (r.GetPivot().X * _ + FocusItemText.tZt) * n;
      let t = u.X + c - ((1 - r.GetPivot().X) * _ + FocusItemText.tZt) * n;
      let i = u.Y - U + (r.GetPivot().Y * l + FocusItemText.iZt) * o;
      let s = u.Y + U - ((1 - r.GetPivot().Y) * l + FocusItemText.iZt) * o;
      if (e > t) {
        e += t;
        t = e - t;
        e -= t;
      }
      if (i > s) {
        i += s;
        s = i - s;
        i -= s;
      }
      a.X = MathUtils_1.MathUtils.Clamp(h.X, e, t);
      a.Y = MathUtils_1.MathUtils.Clamp(a.Y, i, s);
      r.D_K2_SetWorldLocation(a, false, undefined, false);
      this.GetVerticalLayout(0).SetEnable(false);
    }
  }
  OnDurationChange(e) {
    if (this.iqt) {
      this.iqt.OnDurationChange(e);
    }
  }
  OnBaseViewCloseWhenFinish() {
    this.iqt?.SetActive(false);
    this.GetItem(9).SetUIActive(true);
  }
}
(exports.FocusItemText = FocusItemText).tZt = 80;
FocusItemText.iZt = 10;
FocusItemText.eZt = 1120; //# sourceMappingURL=GuideFocusItemText.js.map