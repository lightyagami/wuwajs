"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymThirdBossSelectView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const LordGymEntranceById_1 = require("../../../../Core/Define/ConfigQuery/LordGymEntranceById");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const PayShopDefine_1 = require("../../PayShop/PayShopDefine");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const LordGymDefine_1 = require("../LordGymDefine");
const LordGymLordEntranceSelectView_1 = require("./LordGymLordEntranceSelectView");
const LordGymThirdBossItem_1 = require("./LordGymThirdBossItem");
class LordGymThirdBossSelectView extends LordGymLordEntranceSelectView_1.LordGymLordEntranceSelectView {
  constructor() {
    super(...arguments);
    this.x6f = false;
    this.ShopTextId = "BossChanllengeShop";
    this.ConfirmTextId = "BossChanllengeStart";
    this.ShopTabIndex = PayShopDefine_1.LORD_GYM_THIRD_TAB_INDEX;
    this.c1o = new UE.TransformDouble(new UE.Rotator(0, 0, 0), new UE.VectorDouble(0, 0, 0), new UE.VectorDouble(1, 1, 1));
    this.uLf = 0;
    this.I5t = () => {
      var e;
      if (ControllerHolder_1.ControllerHolder.LordGymController.IsInLordGymDungeon()) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(401)).FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(() => {
            this.CloseMe();
          });
        });
        e.IsEscViewTriggerCallBack = false;
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([6, UE.UIItem]);
    this.ComponentRegisterInfos.push([7, UE.UISprite]);
    this.ComponentRegisterInfos.push([8, UE.UIVerticalLayout]);
  }
  OpenSelectView() {
    ModelManager_1.ModelManager.LordGymModel.EntranceEntityId = this.SelectedEntranceId;
    var e = {
      LordEntranceSetId: this.EntranceSetId,
      LordEntranceId: this.SelectedEntranceId,
      IsPlaySpecialSequence: false
    };
    var t = ModelManager_1.ModelManager.LordGymModel.GetLordGymThirdBossSequenceActor();
    if (t) {
      t.SequencePlayer?.Play();
    }
    UiManager_1.UiManager.OpenView("LordGymThirdDifficultySelectView", e, () => {
      UiManager_1.UiManager.CloseView("LordGymThirdBossSelectView");
    });
  }
  OnStart() {
    if (this.LordEntranceList && this.LordEntranceList.length > 7) {
      this.GetVerticalLayout(8).SetAlign(0);
      this.GetVerticalLayout(8).SetHeightFitToChildren(true);
    }
    this.CaptionItem?.SetHomeBtnShowState(false);
    this.CaptionItem?.SetCloseCallBack(this.I5t);
    if (this.OpenParam?.IsPlaySpecialSequence) {
      this.UiViewSequence.StartSequenceName = "StartZ";
    } else {
      this.UiViewSequence.StartSequenceName = "Start01";
    }
  }
  GetBlackScreenTypeOnOpenViewLoadScene() {
    if (this.OpenParam?.NeedBlackScreenAnim) {
      return "Start";
    } else {
      return "None";
    }
  }
  InitSelect() {}
  async OnBeforeStartAsync() {
    var e;
    await super.OnBeforeStartAsync();
    if (!UiSceneManager_1.UiSceneManager.HasLordSkeletalHandle()) {
      UiSceneManager_1.UiSceneManager.InitLordSkeletalHandle();
    }
    await this.InitSelectAsync();
    if (this.OpenParam?.IsPlaySpecialSequence && (e = LordGymEntranceById_1.configLordGymEntranceById.GetConfig(this.SelectedEntranceId))?.LordUISceneEffect) {
      await this.cLf(e.LordUISceneEffect);
    }
  }
  async cLf(e) {
    const r = new CustomPromise_1.CustomPromise();
    EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.c1o, e, "LordGymSceneEffect", undefined, 1, undefined, (e, t) => {
      r.SetResult();
    }, undefined, true, false);
    await r.Promise;
  }
  async InitSelectAsync() {
    let t = 0;
    var r = ModelManager_1.ModelManager.LordGymModel.LastChallengeLordEntranceId;
    if (r > 0) {
      for (let e = 0; e < this.LordEntranceList.length; e++) {
        if (this.LordEntranceList[e] === r) {
          t = e;
          break;
        }
      }
    }
    await this.SelectLordEntranceByIndexAsync(t);
    this.RefreshLordGymCurrency();
    var e = ModelManager_1.ModelManager.LordGymModel;
    for (const n of this.LordEntranceList) {
      e.RecordNewLordGymEntrance(n);
    }
  }
  CreateItem() {
    var e = new LordGymThirdBossItem_1.LordGymThirdBossItem();
    e.OnToggleClick = this.OnLordEntranceToggleClick;
    e.CanExecuteChangeCallBack = this.CanLordEntranceToggleChange;
    return e;
  }
  ReBuildLordEntranceList() {
    if (this.LordEntranceList && this.LordEntranceList.length < 2) {
      this.LordEntranceList.push(0);
    }
  }
  OnHandleLoadScene() {
    var e;
    if (UiSceneManager_1.UiSceneManager.HasLordSkeletalHandle()) {
      ControllerHolder_1.ControllerHolder.LordGymController.CreateLordModelByEntranceId();
    } else {
      UiSceneManager_1.UiSceneManager.InitLordSkeletalHandle();
      ControllerHolder_1.ControllerHolder.LordGymController.CreateLordModelByEntranceId();
      ControllerHolder_1.ControllerHolder.LordGymController.LoadLordModelByEntranceId(this.SelectedEntranceId, true, true);
    }
    if (this.OpenParam?.IsPlaySpecialSequence && !this.x6f && (e = LordGymEntranceById_1.configLordGymEntranceById.GetConfig(this.SelectedEntranceId))?.LordUISceneEffect) {
      this.uLf = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.c1o, e.LordUISceneEffect, "LordGymSceneEffect", undefined, 1);
    }
    ControllerHolder_1.ControllerHolder.LordGymController.PlayLordModelMaterialAnimationByEntranceId(this.SelectedEntranceId, undefined, undefined, this.x6f);
    this.x6f = true;
  }
  async OnHandlePostLoadSceneAsync(e) {
    if (e) {
      await ModelManager_1.ModelManager.LordGymModel.EnterLordGymThirdBossScene(true);
    }
  }
  async OnHandlePreReleaseSceneAsync(e) {
    if (e) {
      ModelManager_1.ModelManager.LordGymModel.ExitLordGymThirdBossScene();
    }
    return Promise.resolve();
  }
  OnHandleReleaseScene() {
    UiSceneManager_1.UiSceneManager.DestroyLordSkeletalHandle();
    if (EffectSystem_1.EffectSystem.IsValid(this.uLf)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.uLf, "[LordGymThirdBossSelectView.OnBeforeDestroy]", true);
      this.uLf = 0;
    }
    ModelManager_1.ModelManager.LordGymModel.DestroyLordGymThirdBossSequenceActor();
  }
  SelectLordEntranceByIndex(e) {
    if (this.LordEntranceList[e] !== 0) {
      super.SelectLordEntranceByIndex(e);
      e = (e + 1).toString();
      this.SetSpriteByPath(StringUtils_1.StringUtils.Format(LordGymDefine_1.LORD_GYM_BOSS_SPRITE_PATH, e, e), this.GetSprite(7), true);
      this.PlaySequence("Switch");
    }
  }
  async SelectLordEntranceByIndexAsync(e) {
    if (this.LordEntranceList[e] !== 0) {
      this.LordEntranceScrollView?.GetGenericLayout()?.SelectGridProxy(e);
      this.SelectedEntranceId = this.LordEntranceList[e];
      await ControllerHolder_1.ControllerHolder.LordGymController.LoadLordModelByEntranceId(this.SelectedEntranceId, false);
      e = (e + 1).toString();
      this.SetSpriteByPath(StringUtils_1.StringUtils.Format(LordGymDefine_1.LORD_GYM_BOSS_SPRITE_PATH, e, e), this.GetSprite(7), true);
      this.PlaySequence("Switch");
    }
  }
  OnBeforeDestroy() {
    if (EffectSystem_1.EffectSystem.IsValid(this.uLf)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.uLf, "[LordGymThirdBossSelectView.OnBeforeDestroy]", true);
      this.uLf = 0;
    }
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
  }
}
exports.LordGymThirdBossSelectView = LordGymThirdBossSelectView;
//# sourceMappingURL=LordGymThirdBossSelectView.js.map