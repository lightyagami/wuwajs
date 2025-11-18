"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AndroidBackController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const LguiEventSystemManager_1 = require("../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const LguiUtil_1 = require("../Util/LguiUtil");
const ANDROID_BACK_POINT_ID = 1;
class AndroidBackController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    if (Info_1.Info.IsMobilePlatform()) {
      this.IsLogOpen = true;
    }
    return true;
  }
  static OnAddEvents() {
    InputDistributeController_1.InputDistributeController.BindKey(InputMappingsDefine_1.keyMappings.AndroidBack, this.Tje);
  }
  static OnRemoveEvents() {
    InputDistributeController_1.InputDistributeController.UnBindKey(InputMappingsDefine_1.keyMappings.AndroidBack, this.Tje);
  }
  static Lje() {
    if (UiManager_1.UiManager.IsViewOpen("LoginView")) {
      if (AndroidBackController.IsLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AndroidBack", 10, "在登录界面");
      }
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowExitGameConfirmBox();
    } else if (UiManager_1.UiManager.IsViewOpen("BattleView")) {
      if (ModelManager_1.ModelManager.LoadingModel.IsLoading) {
        if (AndroidBackController.IsLogOpen && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AndroidBack", 10, "loading界面打开");
        }
      } else {
        if (AndroidBackController.IsLogOpen && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AndroidBack", 10, "当前处于主界面并且不在loading界面");
        }
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowReturnLoginConfirmBox();
      }
    } else if (AndroidBackController.IsLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AndroidBack", 10, "不在主界面");
    }
  }
  static Dje(e) {
    var r = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    if (r) {
      r.SimulateClickButton(ANDROID_BACK_POINT_ID, e.RootUIComp, e.ClickPivot);
    }
  }
  static OnClear() {
    UE.UIAndroidBackComponent.ClearAndroidBackComponent();
    return true;
  }
  static GmTestAndroidBack() {
    var e;
    var r;
    if (this.Rje) {
      this.Uje();
    } else {
      e = ResourceSystem_1.ResourceSystem.Load("/Game/Aki/UI/UIResources/Common/Prefabs/UiItem_BackBtn1.UiItem_BackBtn1", UE.PrefabAsset, "Debug");
      this.Rje = UE.LGUIBPLibrary.LoadPrefabWithAsset(GlobalData_1.GlobalData.World, e, UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Debug));
      (e = this.Rje.GetComponentByClass(UE.UIItem.StaticClass())).SetDisplayName("GmTestAndroidBack");
      e.SetAnchorAlign(2, 2);
      e.SetAnchorOffset(new UE.Vector2D(0, 0));
      e = this.Rje.GetComponentByClass(UE.UIButtonComponent.StaticClass());
      if (r = this.Rje.GetComponentByClass(UE.UIAndroidBackComponent.StaticClass())) {
        this.Rje.K2_DestroyComponent(r);
      }
      e.OnClickCallBack.Bind(() => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AndroidBack", 10, "安卓返回点击");
        }
        InputDistributeController_1.InputDistributeController.InputKey(InputMappingsDefine_1.keyMappings.AndroidBack, true);
        InputDistributeController_1.InputDistributeController.InputKey(InputMappingsDefine_1.keyMappings.AndroidBack, false);
      });
      LguiUtil_1.LguiUtil.SetActorIsPermanent(this.Rje, true, true);
    }
  }
  static Uje() {
    this.Rje.GetComponentByClass(UE.UIButtonComponent.StaticClass()).OnClickCallBack.Unbind();
    this.Rje.K2_DestroyActor();
    this.Rje = undefined;
  }
}
exports.AndroidBackController = AndroidBackController;
(_a = AndroidBackController).IsLogOpen = false;
AndroidBackController.Tje = (e, r) => {
  var i;
  if (r !== 0) {
    if (AndroidBackController.IsLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AndroidBack", 10, "安卓返回键触发");
    }
    if (UE.UIAndroidBackComponent.GetActiveAndroidBackComponentSize() <= 0) {
      _a.Lje();
    } else {
      r = UE.UIAndroidBackComponent.GetTopActiveAndroidBack();
      if (AndroidBackController.IsLogOpen && (i = (0, puerts_1.$ref)(""), UE.LGUIBPLibrary.GetFullPathOfActor(GlobalData_1.GlobalData.World, r.GetOwner(), i), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("AndroidBack", 10, "触发了关闭按钮", ["按钮的节点路径", (0, puerts_1.$unref)(i)]);
      }
      _a.Dje(r);
    }
  }
};
AndroidBackController.Rje = undefined; //# sourceMappingURL=AndroidBackController.js.map