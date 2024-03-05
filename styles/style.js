import { StyleSheet } from "react-native";

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
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    // marginHorizontal: 16,
    gap: 20,
  },
  list: {
    backgroundColor: "#EFEFEF",
    borderRadius: 5,
    marginHorizontal: 16,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export const stylesEvent = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 16,
    gap: 10,
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
  dateBar: {
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    paddingVertical: 5,
    marginBottom: 5,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#898A8D",
    borderRadius: 5,
  },
  group: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: "#EFEFEF",
    borderRadius: 5,
    alignItems: "center",
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
});

export const stylesSummary = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "lightgray",
  },
  group: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  total: {
    fontSize: 18,
  },
});
