"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssRootView = exports.DangoRootViewData = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  DangoAbyssController_1 = require("../DangoAbyssController"),
  DangoAbyssDefine_1 = require("../DangoAbyssDefine"),
  PluginEquipViewModel_1 = require("../PluginEquipViewModel"),
  DangoAbyssRoleInfoItem_1 = require("./DangoAbyssRoleInfoItem"),
  MODELINDEX = 0;
class DangoRootViewData {
  constructor() {
    this.ActivityId = 0, this.DangoId = 0
  }
}
exports.DangoRootViewData = DangoRootViewData;
class DangoAbyssRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.LOe = 0, this.eGe = void 0, this.LSc = void 0, this.yil = new PluginEquipViewModel_1.PluginEquipViewModel, this.jv1 = 0, this.wSc = () => {
      this.LSc.OnDangoInfoUpdate()
    }, this.sGe = () => {
      var e = new DangoItem;
      return e.ViewModel = this.yil, e
    }, this.AMo = () => {
      this.CloseMe()
    }, this.AOe = e => {
      switch (e) {
        case 0:
          this.EGc();
          break;
        case 1:
          this.IGc()
      }
    }, this.Bco = e => {
      this.Cwc(e.Data)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.AMo]
    ]
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance()
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.wSc)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.wSc)
  }
  OnHandleLoadScene() {
    DangoAbyssController_1.DangoAbyssController.InitAbyssDangoObserver(MODELINDEX)
  }
  OnHandleReleaseScene() {
    DangoAbyssController_1.DangoAbyssController.DestroyAbyssDangoObserver(MODELINDEX)
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.LSc = new DangoAbyssRoleInfoItem_1.DangoAbyssRoleInfoItem, this.LSc.ViewModel = this.yil, e.push(this.LSc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())), await Promise.all(e)
  }
  OnStart() {
    this.jv1 = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.NGX.DLSS.Enable"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Enable 0");
    var e = this.OpenParam;
    this.LOe = e.ActivityId;
    let t = e.DangoId;
    0 === t && 0 < (e = this.RSc().GetAllDangoList()).length && (t = e[0].GetId()), this.yil.SetDangoId(t), this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.sGe, this.GetItem(2).GetOwner())
  }
  RSc() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LOe)
  }
  OnBeforeShow() {
    var e;
    this.yil.Bind(this.AOe), 0 === this.RSc().GetAllDangoList().length ? Log_1.Log.CheckError() && Log_1.Log.Error("Activity", 27, "没有团子数据") : (e = this.yil.GetDangoId(), e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e), this.Cwc(e), this.v4e())
  }
  OnAfterDestroy() {
    this.yil.UnBind(this.AOe)
  }
  v4e() {
    var e = [];
    for (const i of this.RSc().GetAllDangoList()) {
      var t = new DangoAbyssDefine_1.DangoListRoleData;
      t.Data = i, t.Id = i.GetId(), t.OnClickCallBack = this.Bco, e.push(t)
    }
    this.eGe.RefreshByData(e)
  }
  Cwc(e) {
    void 0 !== e && (e = e.GetId(), this.yil.SetDangoId(e), ControllerHolder_1.ControllerHolder.DangoAbyssController.RefreshAbyssDangoModel(MODELINDEX, e, "MonsterCase", void 0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssPluginDangoSelect, e))
  }
  EGc() {
    var e = this.yil.GetDangoId();
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Activity", 75, "点击团子", ["DangoId", e]), ModelManager_1.ModelManager.DangoAbyssModel.SetDangoHasCheck(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshAbyssDevelopRedDot), this.eGe.RefreshWithoutDataSync()
  }
  IGc() {
    var e = this.yil.GetSlotIndex();
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Activity", 75, "RootView OnSlotIndexUpdate, " + e)
  }
  OnBeforeDestroy() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Enable " + this.jv1)
  }
}
exports.DangoAbyssRootView = DangoAbyssRootView;
class DangoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.$8i = void 0, this.ViewModel = void 0, this.sS1 = !1, this.N8e = () => {
      this.$8i.OnClickCallBack(this.$8i)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.N8e]
    ]
  }
  Refresh(e, t, i) {
    this.$8i = e;
    var s = this.ViewModel.GetDangoId() === this.$8i.Id,
      o = e.Data.GetIfLock(),
      s = s ? 1 : 0,
      s = (this.GetExtendToggle(0).SetToggleState(s), this.GetItem(5).SetUIActive(o), this.GetItem(4).SetUIActive(!o), this.GetItem(2).SetUIActive(o), this.GetTexture(1));
    this.SetTextureByPath(e.Data.GetTexture(), s), s.SetChangeColor(o, s.changeColor), this.K8e()
  }
  K8e() {
    var e;
    this.Ovt(), !this.sS1 && this.$8i && (e = this.GetItem(3), RedDotController_1.RedDotController.BindRedDot("RedDotDangoRole", e, void 0, this.$8i.Id))
  }
  Ovt() {
    var e;
    this.sS1 = !1, this.sS1 && this.$8i && (e = this.GetItem(3), RedDotController_1.RedDotController.UnBindGivenUi("RedDotDangoRole", e, this.$8i.Id))
  }
  OnBeforeDestroy() {
    this.Ovt()
  }
}
//# sourceMappingURL=DangoAbyssRootView.js.map