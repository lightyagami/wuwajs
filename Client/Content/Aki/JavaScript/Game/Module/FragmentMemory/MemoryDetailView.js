"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryDetailView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const NoCircleAttachView_1 = require("../AutoAttach/NoCircleAttachView");
const ButtonItem_1 = require("../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../Util/LguiUtil");
const FragmentMemoryData_1 = require("./FragmentMemoryData");
const MemoryDetailAttachItem_1 = require("./MemoryDetailAttachItem");
const FRAGMENTMEMORYMASK = "FragmentMemoryMask";
const HIDEVIEWDELAY = 600;
class MemoryDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.ELo = undefined;
    this.Twn = undefined;
    this.Lwn = [];
    this.Dwn = [];
    this.p9t = undefined;
    this.SPe = undefined;
    this.Qho = () => {
      const t = ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(this.Twn.Id);
      if (this.Twn.Id !== -1 && t) {
        this.SPe?.PlaySequencePurely("HideView");
        UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, true);
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          ModelManager_1.ModelManager.FragmentMemoryModel.MemoryFragmentMainViewTryPlayAnimation = "Start02";
          var e = new FragmentMemoryData_1.FragmentMemoryMainViewOpenData();
          e.FragmentMemoryTopicData = t;
          UiManager_1.UiManager.OpenView("MemoryFragmentMainView", e);
          UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, false);
        }, HIDEVIEWDELAY);
      }
    };
    this.Uwn = e => {
      let t = false;
      this.Ovt();
      for (const i of this.Lwn) {
        if (i.Id === e) {
          this.Twn = i;
          t = true;
          break;
        }
      }
      if (!t) {
        this.Twn = undefined;
      }
      ModelManager_1.ModelManager.FragmentMemoryModel.SaveTopicOpened(e);
      this.SPe?.PlayLevelSequenceByName("SwitchOut");
    };
    this.Awn = t => {
      let i = 0;
      for (let e = 0; e < this.Dwn.length; e++) {
        if (this.Dwn[e] === t) {
          i = e;
          break;
        }
      }
      this.ELo?.AttachToIndex(i, false);
    };
    this.Rwn = () => {
      this.Qho();
    };
    this.yTn = e => {
      if (e === "SwitchOut") {
        this.Og();
        this.SPe?.PlayLevelSequenceByName("SwitchIn");
      }
    };
    this.ILo = (e, t, i) => {
      return new MemoryDetailAttachItem_1.MemoryDetailAttachItem(e);
    };
    this.pFe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UITexture]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFragmentTopicSelect, this.Uwn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFragmentTopicClick, this.Awn);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFragmentTopicSelect, this.Uwn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFragmentTopicClick, this.Awn);
  }
  OnStart() {
    this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(3));
    this.p9t.SetFunction(this.Rwn);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.pFe);
    this.lqe.SetHelpBtnActive(true);
    var e = this.GetItem(1);
    var t = this.GetItem(6);
    this.ELo = new NoCircleAttachView_1.NoCircleAttachView(e.GetOwner());
    this.ELo?.SetControllerItem(t);
    this.ELo.CreateItems(this.GetItem(2).GetOwner(), 0, this.ILo, 1);
    this.GetItem(2).SetUIActive(false);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.yTn);
  }
  OnBeforeShow() {
    this.Lwn = ModelManager_1.ModelManager.FragmentMemoryModel.GetAllFragmentTopic();
    if (this.OpenParam && !this.Twn) {
      var e = this.OpenParam;
      for (const t of this.Lwn) {
        if (t.Id === e) {
          this.Twn = t;
          break;
        }
      }
    } else {
      this.Twn ||= this.Lwn[0];
    }
    this.Og();
    this.xwn();
    this.UiBlurBehaviour?.ChangeNeedBlurState(false);
  }
  xwn() {
    this.Dwn = [];
    for (const t of this.Lwn) {
      this.Dwn.push(t.Id);
    }
    this.Dwn.push(-1);
    var e = this.Dwn.indexOf(this.Twn.Id);
    this.ELo?.ReloadView(this.Dwn.length, this.Dwn);
    this.ELo?.AttachToIndex(e, true);
  }
  Og() {
    this.ZGe();
    this.L8i();
    this.Pwn();
    this.BNe();
    this.PKt();
    this.LNn();
  }
  Ovt() {
    if (this.Twn) {
      this.p9t?.UnBindGivenUid(this.Twn.Id);
    }
  }
  BNe() {
    if (this.Twn) {
      this.p9t?.BindGivenUid("FragmentMemoryTopic", this.Twn.Id);
    }
  }
  wwn() {
    return ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicUnlockState(this.Twn.Id);
  }
  ZGe() {
    if (this.Twn !== undefined) {
      this.p9t?.SetActive(this.wwn());
    }
  }
  L8i() {
    if (this.Twn) {
      this.GetItem(4)?.SetUIActive(!this.wwn());
    }
  }
  Pwn() {
    var e;
    if (this.Twn !== undefined && !this.wwn()) {
      e = ModelManager_1.ModelManager.FragmentMemoryModel.GetUnlockConditionText(this.Twn.Id);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e);
    }
  }
  PKt() {
    var e = this.Twn !== undefined;
    this.GetItem(7)?.SetUIActive(e);
    this.GetItem(8)?.SetUIActive(!e);
  }
  LNn() {
    var e;
    if (this.Twn !== undefined) {
      e = this.Twn.TopicTexture;
      this.SetTextureByPath(e, this.GetTexture(9));
    }
  }
  OnBeforeHide() {
    ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation = "ShowView02";
  }
}
exports.MemoryDetailView = MemoryDetailView;
//# sourceMappingURL=MemoryDetailView.js.map