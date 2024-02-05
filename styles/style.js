import { StyleSheet } from "react-native";

export const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
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
});

export const stylesHome = StyleSheet.create({
  txt: {
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    gap: 20,
  },
  list: {
    backgroundColor: "#EFEFEF",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export const stylesEvent = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
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
  dateBar: {
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    padding: 3,
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
});
