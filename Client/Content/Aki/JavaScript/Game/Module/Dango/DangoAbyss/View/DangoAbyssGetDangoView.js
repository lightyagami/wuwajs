"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssGetDangoView = undefined;
const UE = require("ue");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiCameraAnimationController_1 = require("../../../UiCameraAnimation/UiCameraAnimationController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const DangoAbyssActorManager_1 = require("../DangoAbyssActorManager");
const HANDLEINDEX = 99;
const DANGOGET = "DangoGet";
class DangoAbyssGetDangoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this._s1 = undefined;
    this.cs1 = undefined;
    this.us1 = 0;
    this.dy1 = 0;
    this.OnClickBtnConfirm = () => {
      this.us1++;
      var e = this.OpenParam.DataList.length;
      if (this.us1 >= e) {
        this.CloseMe();
      } else {
        this.ds1();
      }
    };
    this.EVc = () => {
      this._s1?.SetActive(false);
      this.cs1?.SetActive(true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnHandleLoadScene() {
    DangoAbyssActorManager_1.DangoAbyssActorManager.InitIndexDangoSkeletalObserverHandle(HANDLEINDEX);
  }
  OnHandleReleaseScene() {
    DangoAbyssActorManager_1.DangoAbyssActorManager.DestroyDangoSkeletalObserverHandle(HANDLEINDEX);
  }
  async OnBeforeStartAsync() {
    var e = [];
    this._s1 = new DangoGetTitlePanel();
    e.push(this._s1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.cs1 = new DangoGetDetailPanel();
    e.push(this.cs1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.cs1.OnClickCallback = this.OnClickBtnConfirm;
    await Promise.all(e);
  }
  PushCameraHandle(e, i, t) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(DANGOGET, this.GetViewId(), true);
  }
  PopCameraHandle(e, i, t, s) {
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(DANGOGET, i, t, s);
  }
  OnBeforeShow() {
    this.dy1 = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.NGX.DLSS.Enable");
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Enable 0");
    this.PushCameraHandle(DANGOGET, this.GetViewId(), true);
    this.ds1();
  }
  ds1() {
    this.PlaySequence("Start01", () => {
      this.EVc();
    });
    var e = this.OpenParam.DataList.length;
    if (!(this.us1 >= e)) {
      e = this.OpenParam.DataList[this.us1];
      this._s1.RefreshView(e);
      this._s1.SetActive(true);
      this.cs1.RefreshView(e);
      this.cs1.SetActive(false);
      ControllerHolder_1.ControllerHolder.DangoAbyssController.RefreshAbyssDangoModel(HANDLEINDEX, e.DangoId, "MonsterCase", undefined);
    }
  }
  OnBeforeDestroy() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Enable " + this.dy1);
  }
}
exports.DangoAbyssGetDangoView = DangoAbyssGetDangoView;
class DangoGetTitlePanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite]];
  }
  RefreshView(e) {
    this.GetText(0).SetText(e.UnlockTitle);
    this.GetText(1).SetText(e.UnlockSubTitle);
    this.SetSpriteByPath(e.UnlockWutheringWaveTitleSpritePath, this.GetSprite(2), true);
  }
}
class DangoGetDetailPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickCallback = undefined;
    this.OnClickBtnConfirm = () => {
      this.OnClickCallback?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText]];
    this.BtnBindInfo = [[0, this.OnClickBtnConfirm]];
  }
  RefreshView(e) {
    this.GetText(1).SetText(e.DetailName);
    var i = e.DetailDialog !== "";
    this.GetText(3).SetUIActive(i);
    if (i) {
      this.GetText(3).SetText(e.DetailDialog);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "AbyssDangoLV", e.DangoLevel);
  }
}
//# sourceMappingURL=DangoAbyssGetDangoView.js.map