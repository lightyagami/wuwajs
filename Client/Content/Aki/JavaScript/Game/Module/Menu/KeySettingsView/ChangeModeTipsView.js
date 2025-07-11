"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeModeTipsView = undefined;
const UE = require("ue");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ChangeKeyModeData_1 = require("./ChangeKeyModeData");
const ChangeModeRowView_1 = require("./ChangeModeRowView");
class ChangeModeTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Xea = undefined;
    this.lqe = undefined;
    this.Yea = 0;
    this.gMa = new Map();
    this.Jea = [];
    this.zea = undefined;
    this.JGt = undefined;
    this.x4t = () => {
      this.CloseMe();
    };
    this.CPi = () => {
      if (this.zea?.ChangeKeyModeRowData && this.JGt) {
        this.JGt(this.gMa);
      }
      this.CloseMe();
    };
    this.Exi = () => {
      var i = Math.max(this.Yea - 1, 0);
      if (i !== this.Yea) {
        this.Yea = i;
        this.bl();
      }
    };
    this.yxi = () => {
      var i = this.Xea.GetMaxGroupIndex();
      var i = Math.min(this.Yea + 1, i);
      if (i !== this.Yea) {
        this.Yea = i;
        this.bl();
      }
    };
    this.Zea = i => {
      var t = i.ChangeKeyModeRowData;
      if (t) {
        this.zea?.SetSelected(false);
        this.zea = i;
        this.gMa.set(this.Yea, t.Index);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIInteractionGroup], [4, UE.UIButtonComponent], [5, UE.UIInteractionGroup], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent]];
    this.BtnBindInfo = [[8, this.CPi], [2, this.Exi], [4, this.yxi]];
  }
  async OnBeforeStartAsync() {
    var i = this.OpenParam;
    this.Xea = new ChangeKeyModeData_1.ChangeKeyModeData(i);
    this.Yea = this.Xea.DefaultGroupIndex;
    var t = i.ChangeKeyModeGroupList;
    for (let i = 0; i < t.length; i++) {
      var s = t[i].DefaultKeyModeRowIndex;
      this.gMa.set(i, s);
    }
    this.JGt = i.OnConfirmCallback;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe?.SetTitleByTextIdAndArgNew(this.Xea.TitleName);
    this.lqe?.SetCloseCallBack(this.x4t);
    var i = this.GetItem(7);
    i.SetUIActive(false);
    var h = i.GetOwner();
    var e = this.GetItem(6);
    var r = [];
    for (const u of this.Xea.GetChangeKeyModeGroupDataList()[this.Yea].GetChangeKeyModeRowDataList()) {
      var a = LguiUtil_1.LguiUtil.DuplicateActor(h, e);
      var o = new ChangeModeRowView_1.ChangeModeRowView();
      o.BindOnSelected(this.Zea);
      var a = o.CreateThenShowByActorAsync(a, u);
      this.Jea.push(o);
      r.push(a);
    }
    await Promise.all(r);
    var i = Platform_1.Platform.IsPs5Platform();
    var n = Platform_1.Platform.IsAndroidPlatform();
    var v = Platform_1.Platform.IsIOSPlatform();
    var i = i || n || v;
    this.GetButton(2)?.RootUIComp.SetUIActive(!i);
    this.GetButton(4)?.RootUIComp.SetUIActive(!i);
  }
  OnStart() {
    this.bl();
  }
  OnBeforeDestroy() {
    this.lqe = undefined;
    this.zea = undefined;
    this.Jea.length = 0;
  }
  bl() {
    this.eta();
    this.tta();
    this.RefreshLeftAndRightButtonEnable();
    this.RefreshRowView();
  }
  eta() {
    var i;
    if (this.Xea && (i = this.Xea.GetChangeKeyModeGroupDataList()[this.Yea])) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.GroupName);
    }
  }
  tta() {
    var i;
    this.zea?.SetSelected(false);
    if (this.Xea && this.Xea.GetChangeKeyModeGroupDataList()[this.Yea]) {
      i = this.gMa.get(this.Yea) ?? 0;
      i = this.Jea[i];
      (this.zea = i)?.SetSelected(true);
    }
  }
  RefreshLeftAndRightButtonEnable() {
    var i;
    var t;
    var s;
    var h;
    if (this.Xea && (h = this.Xea.GetMaxGroupIndex(), i = this.GetInteractionGroup(3), t = this.GetInteractionGroup(5), s = this.Yea > 0, h = this.Yea < h, i.GetInteractable() !== s && i.SetInteractable(s), t.GetInteractable() !== h)) {
      t.SetInteractable(h);
    }
  }
  RefreshRowView() {
    if (this.Xea) {
      var i = this.Xea.GetChangeKeyModeGroupDataList()[this.Yea];
      if (i) {
        var t = i.GetChangeKeyModeRowDataList();
        for (let i = 0; i < this.Jea.length; i++) {
          var s = this.Jea[i];
          var h = t[i];
          s.Refresh(h);
        }
      }
    }
  }
}
exports.ChangeModeTipsView = ChangeModeTipsView;
//# sourceMappingURL=ChangeModeTipsView.js.map