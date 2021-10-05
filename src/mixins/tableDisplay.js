export const tableDisplay = {
  // data() {
  //   return {
  //     isShowing: true,
  //     isDisabled: false
  //   };
  // },
  methods: {
    showButton(buttonType, valueType = "default") {
      //default
      if (["default", "canceling"].indexOf(valueType) >= 0) {
        if (["edit", "delete"].indexOf(buttonType) >= 0) return true;
        return false;
      }
      // changed
      // if (valueType === "changed" && buttonType === "update") return true;
      // editing
      if (
        ["editing", "changed"].indexOf(valueType) >= 0 &&
        ["delete", "update", "cancel"].indexOf(buttonType) >= 0
      )
        return true;

      if (valueType === "deleting" && buttonType === "edit") return true;
      if (valueType === "updated" && buttonType === "delete") return true;

      return false;
    },
    disableButton(buttonType, valueType = "default") {
      if (
        ["default"].indexOf(valueType) >= 0 &&
        ["edit", "delete"].indexOf(buttonType) < 0
      ) {
        return true;
      }

      if (valueType === "deleting" && buttonType !== "edit") return true;
      if (valueType === "editing" && buttonType === "update") return true;
      // if (valueType === "changed" && buttonType === "update") return false;

      return false;
    }
  }
};
