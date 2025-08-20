export default function storeLocalHistory(results) {
    const bestWPM = +(localStorage.getItem("bestWPM") || "0");
    const bestAccuracy = +(localStorage.getItem("bestAccuracy") || "0");
    const numOfTestsTaken = +(localStorage.getItem("testsTaken") || "0");
    const maxStreak = +(localStorage.getItem("bestAccuracy") || "0");
}