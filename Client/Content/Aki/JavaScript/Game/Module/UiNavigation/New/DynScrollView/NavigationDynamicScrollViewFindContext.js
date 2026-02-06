"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationDynamicScrollViewFindContext = undefined;
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
class NavigationDynamicScrollViewFindContext {
  constructor() {
    this.LastListenerPosition = Vector_1.Vector.Create();
    this.WrapMode = 0;
    this.PriorityMode = 1;
    this.IsVertical = false;
    this.NavigateTolerance = 0;
    this.NavigateToleranceReverse = 0;
    this.ScrollView = undefined;
    this.GroupConfig = undefined;
    this.NegativeDirection = false;
    this.Reversed = false;
    this.LastListener = undefined;
    this.NextType = 0;
    this.NeedWaitScroll = false;
    this.IsScrollToEdge = false;
    this.VerticalScrollValue = 0;
    this.HorizontalScrollValue = 0;
  }
}
exports.NavigationDynamicScrollViewFindContext = NavigationDynamicScrollViewFindContext;
//# sourceMappingURL=NavigationDynamicScrollViewFindContext.js.map