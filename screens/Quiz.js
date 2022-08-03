import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { StyleSheet } from "react-native-web";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import { Platform } from "react-native";
import { StatusBar } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";

export default function Quiz({ questions }) {
  const [currQues, setCurrQues] = useState(0);
  const [currOptionSelected, setCurrOptionSelected] = useState(null);
  const [corrOption, setCorrOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [range, setRange] = useState(null);
  const [showResultRange, setShowResultRange] = useState("");

  const validateAnswer = (selected) => {
    let correct = questions[currQues]["ans"];
    setCurrOptionSelected(selected);
    setCorrOption(correct);
    setIsOptionsDisabled(true);

    if (selected == correct) {
      setScore((prev) => prev + 1);
    }
    setShowNext(true);
  };

  const validateAnswerRange = (selected) => {
    let correctL = questions[currQues]["ans"][0];
    let correctR = questions[currQues]["ans"][1];
    setCurrOptionSelected(selected);

    setIsOptionsDisabled(true);

    if (selected >= correctL && selected <= correctR) {
      setScore((prev) => prev + 1);
      setShowResultRange("success");
    } else {
      setShowResultRange("error");
    }
    setShowNext(true);
  };

  const restartQuiz = () => {
    setShowScore(false);

    setCurrQues(0);
    setScore(0);

    setCurrOptionSelected(null);
    setCorrOption(null);
    setIsOptionsDisabled(false);
    setShowNext(false);
  };

  const handleNext = () => {
    if (currQues == questions.length - 1) {
      setShowScore(true);
    } else {
      setCurrQues(currQues + 1);
      setCurrOptionSelected(null);
      setCorrOption(null);
      setIsOptionsDisabled(false);
      setShowNext(false);
      setShowResultRange("");
    }
  };

  const renderNext = () => {
    if (showNext) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            marginTop: 20,
            width: "100%",
            backgroundColor: COLORS.accent,
            padding: 20,
            borderRadius: 5,
          }}
        >
          <Text
            style={{ fontSize: 20, color: COLORS.white, textAlign: "center" }}
          >
            Next
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const renderValidateRange = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          validateAnswerRange(range);
          setShowNext(true);
        }}
        style={{
          marginTop: 20,
          width: "100%",
          backgroundColor: COLORS.accent,
          padding: 20,
          borderRadius: 5,
        }}
      >
        <Text
          style={{ fontSize: 20, color: COLORS.white, textAlign: "center" }}
        >
          Validate
        </Text>
      </TouchableOpacity>
    );
  };

  const renderQuestion = () => {
    return (
      <View>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
            }}
          >
            {currQues + 1}
          </Text>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 18,
              opacity: 0.6,
              marginRight: 2,
            }}
          >
            / {questions.length}
          </Text>
        </View>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 30,
          }}
        >
          {questions[currQues]?.ques}
        </Text>
      </View>
    );
  };

  const renderOptions = () => {
    return (
      <View>
        {questions[currQues]?.type === "single" ? (
          questions[currQues]?.option.map((item) => {
            return (
              <TouchableOpacity
                disabled={isOptionsDisabled}
                onPress={() => validateAnswer(item)}
                key={item}
                style={{
                  borderWidth: 3,
                  borderColor:
                    item == corrOption
                      ? COLORS.success
                      : item == currOptionSelected
                      ? COLORS.error
                      : COLORS.secondary + "40",
                  backgroundColor:
                    item == corrOption
                      ? COLORS.success + "20"
                      : item == currOptionSelected
                      ? COLORS.error + "20"
                      : COLORS.secondary + "20",
                  backgroundColor: COLORS.secondary + "20",
                  height: 60,
                  borderRadius: 20,
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ fontSize: 20, color: COLORS.white }}>
                  {item}
                </Text>
                {item == corrOption ? (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30 / 2,
                      backgroundColor: COLORS.success,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="check"
                      style={{ color: COLORS.white, fontSize: 20 }}
                    />
                  </View>
                ) : item == currOptionSelected ? (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30 / 2,
                      backgroundColor: COLORS.error,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      style={{ color: COLORS.white, fontSize: 20 }}
                    />
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          })
        ) : questions[currQues]?.type === "range" ? (
          <View
            style={{
              paddingTop: SIZES.height / 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text
                style={{
                  color: COLORS.white,
                  textAlign: "center",
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                {range}{" "}
              </Text>

              <View>
                {showResultRange === "success" ? (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30 / 2,
                      backgroundColor: COLORS.success,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="check"
                      style={{ color: COLORS.white, fontSize: 20 }}
                    />
                  </View>
                ) : showResultRange === "error" ? (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30 / 2,
                      backgroundColor: COLORS.error,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      style={{ color: COLORS.white, fontSize: 20 }}
                    />
                  </View>
                ) : null}
              </View>
            </View>
            {!isOptionsDisabled ? (
              <>
                <Slider
                  style={{
                    width: (SIZES.width * 7) / 8,
                    height: SIZES.height / 16,
                  }}
                  minimumValue={questions[currQues]?.option[0]}
                  maximumValue={questions[currQues]?.option[1]}
                  onValueChange={(value) => {
                    setRange(value);
                  }}
                  step={1}
                />
                {renderValidateRange()}
              </>
            ) : null}
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: COLORS.background,
          position: "relative",
          width: SIZES.width,
        }}
      >
        {renderQuestion()}
        {renderOptions()}
        {renderNext()}
        <Modal animationType="slide" transparent={true} visible={showScore}>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                width: "90%",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <Text style={{ fontSize: 30, color: "black" }}>{score}</Text>
                <Text style={{ fontSize: 20, color: COLORS.black }}>
                  {" "}
                  / {questions.length}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.accent,
                  padding: 20,
                  width: "100%",
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    textAlign: "center",
                    fontSize: 20,
                  }}
                  onPress={restartQuiz}
                >
                  Retry
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
