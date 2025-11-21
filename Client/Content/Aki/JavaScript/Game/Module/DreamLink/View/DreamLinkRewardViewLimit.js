"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkRewardViewLimit = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const ActivityWeaponDescribeComponent_1 = require("../../Activity/ActivityContent/UniversalComponents/ActivityWeaponDescribeComponent");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData");
const DreamLinkController_1 = require("../DreamLinkController");
const DreamLinkWeaponModelHandle_1 = require("../DreamLinkWeaponModelHandle");
const DreamLinkRewardLimitTimeItem_1 = require("./SubView/DreamLinkRewardLimitTimeItem");
const DreamLinkRewardSpecialItem_1 = require("./SubView/DreamLinkRewardSpecialItem");
class DreamLinkRewardViewLimit extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.boh = undefined;
    this.Ntl = true;
    this.Ftl = "";
    this.Ivt = undefined;
    this.qoh = undefined;
    this.Cua = 0;
    this.pcl = undefined;
    this.fcl = undefined;
    this.$pt = undefined;
    this.b2t = undefined;
    this.AHt = undefined;
    this.vcl = undefined;
    this.Ngl = undefined;
    this.TTi = () => {
      this.Mcl(this.Cua);
      this.v4e(this.Cua);
      this.pcl.Refresh();
    };
    this.jdi = (e, i) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.Wdi = e => {
      this.v4e(e);
    };
    this.yqe = e => {
      var [e, i] = this.boh.GetTypeInfoByTabId(e + 1);
      return new CommonTabData_1.CommonTabData(i, new CommonTabTitleData_1.CommonTabTitleData(e));
    };
    this.VOe = () => {
      return new DreamLinkRewardLimitTimeItem_1.DreamLinkRewardLimitTimeItem();
    };
    this.Vtl = () => {
      var e;
      if (this.Ntl) {
        if ((e = this.boh.GetLimitTimeEndTime()) - TimeUtil_1.TimeUtil.GetServerTime() < 0) {
          this.Ntl = false;
          ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView();
        } else {
          e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(e, this.Ftl);
          this.GetText(2).SetText(e);
        }
      }
    };
    this.Fgl = () => {
      var e = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("WeaponRoot"), 1);
      this.Ngl = new DreamLinkWeaponModelHandle_1.DreamLinkWeaponModelHandle(e);
      var e = CommonParamById_1.configCommonParamById.GetIntConfig("DreamLinkModelRotateTime");
      this.Ngl.SetRotateParam(e);
      this.Ngl.StartRotate();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.boh = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    var e = [];
    this.qoh = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.VOe);
    var i = new CommonTabComponentData_1.CommonTabComponentData(this.jdi, this.Wdi, this.yqe);
    this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), i, () => {
      this.CloseMe();
    });
    var i = this.ICi();
    e.push(this.Ivt.RefreshTabItemAsync(i));
    var i = this.boh.GetLimitTimeRewardListByTabId(5);
    this.pcl = new DreamLinkRewardSpecialItem_1.DreamLinkRewardSpecialItem(i[0]);
    e.push(this.pcl.CreateByActorAsync(this.GetItem(3).GetOwner()));
    this.AddChild(this.pcl);
    this.fcl = new ActivityWeaponDescribeComponent_1.ActivityWeaponDescribeComponent();
    e.push(this.fcl.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    await Promise.all(e);
    for (let e = 0; e < this.boh.GetLimitTimeRewardTypeLength(); e++) {
      this.Mcl(e);
    }
    this.Ivt.SelectToggleByIndex(0, true);
  }
  OnStart() {
    this.Ftl = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
    var e = this.boh.GetPreviewWeaponId();
    var i = new WeaponTrialData_1.WeaponTrialData();
    i.SetTrialId(e);
    this.fcl.Refresh(i.GetItemId(), false);
    this.fcl.SetLookButtonVisible(true);
    this.fcl.BindWeaponPreviewFunction([e]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DreamLinkLimitRewardRefresh, this.TTi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DreamLinkLimitRewardRefresh, this.TTi);
  }
  OnTick(e) {
    this.Vtl();
    this.Ngl?.Tick(e);
  }
  OnHandleLoadScene() {
    this.AHt = ModelManager_1.ModelManager.CameraModel.CurrentCameraActor;
    this.vcl = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("DoorCamera"), 1);
    ControllerHolder_1.ControllerHolder.CameraController.SetViewTarget(this.vcl, "DreamLinkRewardViewLimit.OpenAndStartSequence");
    for (const t of [UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("Weapon1"), 1), UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("Weapon2"), 1)]) {
      var e = t.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
      e.SetTickableWhenPaused(true);
      e.SetForcedLOD(1);
    }
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Sequence_DreamLinkRewardStart");
    this.PlaySceneLevelSequence(i, this.Fgl);
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.CameraController.SetViewTarget(this.AHt, "DreamLinkRewardViewLimit.OnBeforeDestroy");
    this.AHt = undefined;
    this.vcl = undefined;
    if (this.b2t?.IsValid()) {
      this.b2t?.K2_DestroyActor();
      this.b2t = undefined;
    }
    if (this.$pt?.IsValid()) {
      this.$pt?.Stop();
      this.$pt = undefined;
    }
    this.Ngl?.StopRotate();
    this.Ngl?.Destroy();
  }
  ICi() {
    return this.Ivt.CreateTabItemDataByLength(this.boh.GetLimitTimeRewardTypeLength());
  }
  Mcl(e) {
    var i = e + 1;
    this.Ivt.GetTabItemByIndex(e).SetRedDotState(this.boh.CheckHasLimitTimeTabReward(i));
  }
  async v4e(e) {
    this.Cua = e;
    e = this.boh.GetLimitTimeRewardListByTabId(e + 1);
    await this.qoh.RefreshByDataAsync(e, true);
  }
  PlaySceneLevelSequence(e, r) {
    if (this.$pt) {
      this.$pt.Stop();
      this.$pt = undefined;
    }
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LevelSequence, e => {
      var i;
      var t;
      if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
        (i = ActorSystem_1.ActorSystem.Spawn(UE.LevelSequenceActor.StaticClass(), new UE.TransformDouble(), undefined)).SetSequence(e);
        (t = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState = false;
        t.bPauseAtEnd = true;
        i.PlaybackSettings = t;
        i.SetTickableWhenPaused(true);
        UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(e, true);
        this.b2t = i;
        this.$pt = i.SequencePlayer;
        this.b2t.bOverrideInstanceData = true;
        t = this.b2t.DefaultInstanceData;
        e = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform());
        t.TransformOrigin = e;
        this.$pt.PlayTo(new UE.MovieSceneSequencePlaybackParams(this.$pt.GetEndTime().Time, 0, "A", 2, 0));
        r?.();
      }
    }, 100, this.MemoryTag);
  }
}
exports.DreamLinkRewardViewLimit = DreamLinkRewardViewLimit;
//# sourceMappingURL=DreamLinkRewardViewLimit.js.map