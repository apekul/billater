import { StyleSheet } from "react-native";

const colors = {
  mainBG: "#4a69bd",
  txtLight: "white",
  txtDark: "#333333",
};

export const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 16,
    marginRight: 16,
    marginTop: 25,
  },
  group: {
    marginTop: 20,
    justifyContent: "space-between",
  },
  textInput: {
    height: 50,
    fontSize: 20,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 50,
    backgroundColor: "#5DB075",
    padding: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  clearBtnGrp: {
    marginBottom: 20,
    alignItems: "center",
  },
  clearBtn: {
    backgroundColor: "#5DB075",
    padding: 10,
  },
});

export const stylesHome = StyleSheet.create({
  txt: {
    color: colors.txtDark,
    fontWeight: "bold",
  },
  txtBalance: {
    fontSize: 20,
    color: colors.txtDark,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    // gap: 20,
    backgroundColor: colors.mainBG,
  },
  list: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,

    backgroundColor: "white",
    marginHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 25,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export const stylesEvent = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#FDFDFD",
  },
  eventGrp: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: "white",
  },
  eventListGrp: {
    backgroundColor: "#FDFDFD",
    flex: 1,
    paddingTop: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  splitOptionGrp: {
    position: "absolute",
    top: 58,
    zIndex: 1,
    backgroundColor: "#F6F6F6",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  setPriceGrp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  textInput: {
    height: 40,
    fontSize: 15,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    padding: 10,
    borderRadius: 10,
  },
  textInputRadiusTop: {
    height: 40,
    fontSize: 15,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabGrp: {
    flex: 1,
    alignItems: "center",
    padding: 8,
  },
  txtLight: {
    color: colors.txtLight,
    fontWeight: "bold",
  },
  txtDark: {
    color: colors.txtDark,
    fontWeight: "bold",
  },
  dateBar: {
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 5,
  },
  listUsers: {
    backgroundColor: "#FFFFFF",
    maxHeight: 200,
    position: "absolute",
    top: 40,
    right: 0,
    zIndex: 10,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: "#898A8D",
    borderRadius: 5,
  },
  group: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    marginHorizontal: 32,
    borderRadius: 5,
    padding: 3,
    alignItems: "center",
  },
  buyerBtn: {
    position: "absolute",
    right: 0,
    top: 1,
    padding: 11,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  btnCurrency: {
    position: "absolute",
    right: 0,
    bottom: 0,
    borderLeftWidth: 1,
    borderColor: "gray",
    backgroundColor: "lightgray",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 40,
    padding: 10,
  },
  button: {
    borderRadius: 50,
    backgroundColor: "#5DB075",
    padding: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export const stylesActivitie = StyleSheet.create({
  txtBold: {
    fontWeight: "bold",
    fontSize: 15,
    color: colors.txtDark,
  },
  group: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 50,
    backgroundColor: "#5DB075",
    padding: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  actItem: {
    width: 100,
    fontSize: 15,
  },
  actGroup: {
    marginBottom: 10,
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export const stylesSummary = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#F6F6F6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  total: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
