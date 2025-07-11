"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridPopupView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const PopupTypeRightItem_1 = require("../../../../Ui/Common/PopupTypeRightItem");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PopupComponentConditionBar_1 = require("./Components/PopupComponentConditionBar");
const PopupComponentDescription_1 = require("./Components/PopupComponentDescription");
const PopupComponentEventCost_1 = require("./Components/PopupComponentEventCost");
const PopupComponentFunctionButton_1 = require("./Components/PopupComponentFunctionButton");
const PopupComponentInfoList_1 = require("./Components/PopupComponentInfoList");
const PopupComponentRecommendTip_1 = require("./Components/PopupComponentRecommendTip");
const PopupComponentRewardList_1 = require("./Components/PopupComponentRewardList");
class GridPopupView extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Vm = e;
    this.LevelSequencePlayer = undefined;
    this.UiBgItem = undefined;
    this.Description = undefined;
    this.ConditionBar = undefined;
    this.Q_t = Vector2D_1.Vector2D.Create();
    this.SFc = () => {
      this.Vm.GetBtnDetailFunc();
    };
    this.J2i = () => {
      this.Vm.OnClickedClose();
    };
    this.sO1 = () => {
      if (!this.Vm.IsEnd) {
        if (this.Vm.EventAvailable()) {
          var e = this.Vm.GameInfo;
          var t = Global_1.Global.CharacterController;
          var i = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
          this.Q_t.Reset();
          if (t) {
            t = t.GetInputPosition();
            if (t) {
              this.Q_t.AdditionEqual(t);
              t = i.ConvertPositionFromViewportToLGUICanvas(this.Q_t.ToUeVector2D());
              if (e.IsPosInGridRange(t.X, t.Y, e.CurSelectedIndex)) {
                this.Vm.MoveButtonFunction();
                return;
              }
            }
          }
        }
        this.Vm.OnClickedClose();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.SFc], [8, this.sO1]];
  }
  async OnBeforeStartAsync() {
    this.Vm.BindView(this);
    var e = [];
    this.UiBgItem = new PopupTypeRightItem_1.PopupTypeRightItem();
    e.push(this.UiBgItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    e.push(this.U3c());
    e.push(this.Vc1());
    await Promise.all(e);
    this.UiBgItem.AttachItem(this.GetOriginalItem(), this.GetRootItem());
    this.UiBgItem.SetPopupViewBase();
    this.UiBgItem.OverrideBackBtnCallBack(this.J2i);
    await this.Vm.Init();
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueMapEventDetailOpenOrClose, true);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueMapEventDetailOpenOrClose, false);
  }
  OnBeforeShow() {
    this.Refresh();
    this.GetButton(8).RootUIComp.SetUIActive(true);
  }
  async OnShowAsyncImplementImplement() {
    var e = new CustomPromise_1.CustomPromise();
    await this.LevelSequencePlayer.PlaySequenceAsync("Start", e);
  }
  async OnHideAsyncImplementImplement() {
    this.GetButton(8).RootUIComp.SetUIActive(false);
    var e = new CustomPromise_1.CustomPromise();
    await this.LevelSequencePlayer.PlaySequenceAsync("Close", e);
  }
  Refresh() {
    this.OnRefreshCommon();
    this.OnRefreshComponent();
  }
  OnRefreshCommon() {
    var e = this.GetSprite(1);
    var t = this.GetText(2);
    var i = this.GetText(3);
    var n = this.GetButton(4);
    var o = ConfigManager_1.ConfigManager.MapRogueConfig?.GetGridEventConfigById(this.Vm.GridData.GridEventId);
    if (o) {
      if (!StringUtils_1.StringUtils.IsEmpty(o.Icon)) {
        this.SetSpriteByPath(o.Icon, e, false);
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, o.Title);
      this.Description.SetDescriptionByTextId(o.Desc);
      e = this.Vm.GetSubTxtInfo();
      if (e) {
        i.SetText(e);
      }
      i.SetUIActive(!StringUtils_1.StringUtils.IsEmpty(e));
      n.RootUIComp.SetUIActive(this.Vm.HasBtnDetail);
      t = this.Vm.EventAvailable();
      this.ConditionBar.SetUiActive(!t);
      if (!t) {
        this.ConditionBar.SetButtonVisible(false);
        switch (this.Vm.GameInfo.MoveState) {
          case 2:
            this.ConditionBar.SetTextByTextId("RogueRes_Block_UnableMove");
            return;
          case 3:
            this.ConditionBar.SetTextByTextId("RogueRes_Block_UnableMove_Event");
            return;
        }
        i = this.Vm.GridData.ConditionInfo;
        if (i) {
          this.ConditionBar.SetTextByTextId(o.CondText, i.lMs.toString(), i.j6n.toString());
        }
      }
    }
  }
  OnRefreshComponent() {
    this.Vm.RefreshTop();
    this.Vm.RefreshBottom();
    this.Vm.RefreshFunctional();
  }
  GetPanelTop() {
    return this.GetItem(5);
  }
  GetPanelBottom() {
    return this.GetItem(6);
  }
  GetPanelFunctional() {
    return this.GetItem(7);
  }
  async U3c(e = this.GetPanelTop()) {
    this.Description = new PopupComponentDescription_1.PopupComponentDescription();
    await this.Description.CreateThenShowByResourceIdAsync("UiItem_PopupDescription", e);
  }
  async Vc1(e = this.GetPanelFunctional()) {
    this.ConditionBar = new PopupComponentConditionBar_1.PopupComponentConditionBar();
    await this.ConditionBar.CreateByResourceIdAsync("UiItem_PopupConditionBar", e);
  }
  async InitComponentButton(e = this.GetPanelFunctional()) {
    const t = new CustomPromise_1.CustomPromise();
    const i = new PopupComponentFunctionButton_1.PopupComponentFunctionButton();
    i.CreateByResourceIdAsync("UiItem_PopupButton", e).finally(() => {
      t.SetResult(i);
    });
    return t.Promise;
  }
  async InitRecommendTip(e = this.GetPanelFunctional()) {
    const t = new CustomPromise_1.CustomPromise();
    const i = new PopupComponentRecommendTip_1.PopupComponentRecommendTip();
    i.CreateThenShowByResourceIdAsync("UiItem_PopupRecommendTip", e).finally(() => {
      t.SetResult(i);
    });
    return t.Promise;
  }
  async InitInfoList(e = this.GetPanelBottom()) {
    const t = new CustomPromise_1.CustomPromise();
    const i = new PopupComponentInfoList_1.PopupComponentInfoList();
    i.CreateThenShowByResourceIdAsync("UiItem_PopupItemList", e).finally(() => {
      t.SetResult(i);
    });
    return t.Promise;
  }
  async InitEventCost(e = this.GetPanelTop()) {
    const t = new CustomPromise_1.CustomPromise();
    const i = new PopupComponentEventCost_1.PopupComponentEventCost();
    i.CreateThenShowByResourceIdAsync("UiItem_PopupEventCost", e).finally(() => {
      t.SetResult(i);
    });
    return t.Promise;
  }
  async InitRewardList(e = this.GetPanelBottom()) {
    const t = new CustomPromise_1.CustomPromise();
    const i = new PopupComponentRewardList_1.PopupComponentRewardList();
    i.CreateThenShowByResourceIdAsync("UiItem_PopupPreviewReward", e).finally(() => {
      t.SetResult(i);
    });
    return t.Promise;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0) {
      return this.Vm.GetGuideUiItemAndUiItemForShowEx(e);
    }
  }
}
exports.GridPopupView = GridPopupView;
//# sourceMappingURL=GridPopupView.js.map